require('dotenv').config()
const {google} = require('googleapis')
const _ = require('lodash');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)


const googleApiKey = _.replace(process.env.GOOGLE_API_PRIVATE_KEY, new RegExp("\\\\n", "\g"), "\n")

const googleClient = new google.auth.JWT(
    process.env.GOOGLE_API_CLIENT_EMAIL,
    null,
    googleApiKey,
    [
        'https://www.googleapis.com/auth/spreadsheets.readonly'
    ]
)

exports.checkBirthdays = (discordClient) => {
    console.log("👉", 'Checking birthdays...')

    /*Get today's date*/
    const now = dayjs().tz("Europe/Brussels").format("MM/DD")

    /*Authenticate with the google api*/
    googleClient.authorize((err, tokens) => {
        err ? console.log("👉", err) : gsrun(googleClient)
    })

    /*Get data from the api*/
    async function gsrun(client) {
        console.log("👉", 'Google api connected ...')

        const gsapi = google.sheets({
            version: 'v4',
            auth: client
        })

        const options = {
            spreadsheetId: process.env.MEMBERLIST_SPREADSHEET_ID,
            range: 'A4:h71'
        }

        /*Save the response into a var*/
        let res = await gsapi.spreadsheets.values.get(options)
        /*Get the channel for the announcement*/
        const birthdayChannel = await discordClient.channels.cache.find(i => i.name === 'chit-chat')

        /*Loop through the data and check if its anyone's birthday today*/
        for (const i in res.data.values) {
            const person = res.data.values[i]
            const birthday = dayjs(person[5], "MM/DD/YYYY").format("MM/DD")

            /*If it's someone's birthday today, send a message in the chit-chat channel*/
            if (now === birthday) {
                const message = await birthdayChannel.send(`${person[0]} is jarig vandaag! Wens hem/haar een gelukkige verjaardag! 🎂🎉`)
                await message.react('🥳')
            }
        }
    }
}

exports.announceShifters = (discordClient) => {
    console.log("👉", 'Checking for shifters...')

    /*Get today's date*/
    const now = dayjs().tz("Europe/Brussels").format("MM/DD")

    /*Authenticate with the google api*/
    googleClient.authorize((err, tokens) => {
        err ? console.log("👉", err) : gsrun(googleClient)
    })

    /*Get data from the api*/
    async function gsrun(client) {
        console.log("👉", 'Google api connected ...')

        const gsapi = google.sheets({
            version: 'v4',
            auth: client
        })

        const options = {
            spreadsheetId: process.env.SHIFTERSLIST_SPREADSHEETS_ID,
            range: 'b5:m18'
        }

        /*Save the response into a var*/
        let res = await gsapi.spreadsheets.values.get(options)

        for (const i in res.data.values) {
            const row = res.data.values[i]
            if (row[0] === dayjs().tz("Europe/Brussels").format("DD/MM")){
                /*Create arrays to group shifters*/
                let afterSchool = []
                let first = row.slice(6,9).filter(n => n)
                let second = row.slice(9,12).filter(n => n)

                /*Get shifters channel*/
                const shiftersChannel = await discordClient.channels.cache.find(i => i.name === 'shifters')

                /*Create and send message in channel*/
                let msg = `@everyone \r\n **Shifters voor vandaag: ** \r\n\r\n`
                if (row[1]) msg +=`**Evenement:** ${row[1]} \r\n`

                if (dayjs().tz("Europe/Brussels").format('dddd') === 'Friday') {
                    afterSchool = row.slice(3,6).filter(n => n)
                    msg += `**After school shift:** ${afterSchool.join(', ')} \r\n`
                }

                msg += `**Eerste shift:** ${first.join(', ')} \r\n`
                msg += `**Tweede shift:** ${second.join(', ')}`
                shiftersChannel.send(msg)
            }
        }
    }
}