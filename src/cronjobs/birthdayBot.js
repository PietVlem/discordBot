/*Packages*/
const {google} = require('googleapis')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

/*google-service*/
const googleService = require('../services/google')

dayjs.extend(utc)
dayjs.extend(timezone)

const googleClient = googleService.client

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