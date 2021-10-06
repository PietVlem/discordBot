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
            const genderRef = person[6].toLowerCase() === 'man' ? 'hem' : 'haar'
            const birthday = dayjs(person[5], "MM/DD/YYYY").format("MM/DD")

            /*If it's someone's birthday today, send a message in the chit-chat channel*/
            if (now === birthday) {
                const message = await birthdayChannel.send(`${person[0]} is jarig vandaag! Wens ${genderRef} een gelukkige verjaardag! 🎂🎉`)
                await message.react('🥳')
            }
        }
    }
}

exports.announceShifters = (discordClient) => {
    console.log("👉", 'Checking for shifters...')

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
        }

        /*Save the response into a var*/
        const sheet_metadata = await gsapi.spreadsheets.get(options)
        const sheets = sheet_metadata.data.sheets;

        /*month arrays*/
        const monthsNl = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
        const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        /*Get today's date*/
        let today = dayjs().tz("Europe/Brussels")

        /*Save matching sheets*/
        const sheetsMatches = []

        for (let j = 0; j < sheets.length; j++) {
            /*Get the title and split the word into an array*/
            const title = sheets[j].properties.title.toLowerCase()
            const splitTitle = title.split(" ")

            /*Get the index of the month*/
            let monthIndex = null;
            splitTitle.forEach(word => {
                if (monthsNl.includes(word)) monthIndex = monthsNl.indexOf(word)
            })

            /*Check current month */
            if (monthIndex && monthsEn[monthIndex] === today.format('MMMM')) {
                sheetsMatches.push(sheets[j])
            }
        }

        const getShifters = async (sheet) => {
            let res = await gsapi.spreadsheets.values.get({
                spreadsheetId: process.env.SHIFTERSLIST_SPREADSHEETS_ID,
                range: `'${sheet.properties.title}'!b5:m18`
            })

            let shiftersSheet = await gsapi.spreadsheets.values.get({
                spreadsheetId: process.env.SHIFTERSLIST_SPREADSHEETS_ID,
                range: `'Shifters'!a2:d80`
            })

            const getUserByDiscordTag = async (name) => {
                let user = null
                for (const k in shiftersSheet.data.values) {
                    const shifter = shiftersSheet.data.values[k]
                    if (shifter[0] === name) {
                        if (shifter[3]) user = discordClient.users.cache.find(user => user.tag === shifter[3])
                        break
                    }
                }
                return user ? user : name;
            }

            for (const i in res.data.values) {
                const row = res.data.values[i]

                /*Get today's date*/
                let todayDate = today.format("DD/MM")
                if (todayDate.charAt(0) === '0') todayDate = todayDate.substring(1)

                /*reformat date from spreadsheet (remove '0' at the beginning if there is one)*/
                let spreadsheetDate = row[0];
                if (spreadsheetDate && spreadsheetDate.charAt(0) === '0') spreadsheetDate = spreadsheetDate.substring(1)

                if (spreadsheetDate === todayDate) {
                    /*Create arrays to group shifters*/
                    let afterSchool = []

                    let first = row.slice(6, 9).filter(n => n)
                    let firstDCTags = []
                    for (const i in first) {
                        let user = await getUserByDiscordTag(first[i])
                        firstDCTags.push(user)
                    }

                    let second = row.slice(9, 12).filter(n => n)
                    let secondDCTags = []
                    for (const i in second) {
                        let user = await getUserByDiscordTag(second[i])
                        secondDCTags.push(user)
                    }

                    /*Get shifters channel*/
                    const shiftersChannel = await discordClient.channels.cache.find(i => i.name === 'test')

                    /*Create and send message in channel*/
                    let msg = `**Shifters voor vandaag: ** \r\n\r\n`
                    if (row[1]) msg += `**Evenement:** ${row[1]} \r\n`

                    if (dayjs().tz("Europe/Brussels").format('dddd') === 'Friday') {
                        afterSchool = row.slice(3, 6).filter(n => n)
                        let afterSchoolDCTags = []
                        for (const i in afterSchool) {
                            let user = await getUserByDiscordTag(afterSchool[i])
                            afterSchoolDCTags.push(user)
                        }
                        msg += `**After school shift:** ${afterSchoolDCTags.join(', ')} \r\n`
                    }

                    msg += `**Eerste shift:** ${firstDCTags.join(', ')} \r\n`
                    msg += `**Tweede shift:** ${secondDCTags.join(', ')}`
                    shiftersChannel.send(msg)
                }
            }
        }

        if (sheetsMatches.length > 1) {
            for (const i in sheetsMatches) {
                /*Get the title and split the word into an array*/
                const title = sheetsMatches[i].properties.title.toLowerCase()
                const splitTitle = title.split(" ")

                if (splitTitle.includes(today.format('YYYY'))) await getShifters(sheetsMatches[i])
            }
        } else {
            await getShifters(sheetsMatches[0])
        }
    }
}