require('dotenv').config()
const {google} = require('googleapis')
const dayjs = require('dayjs')
const _ = require('lodash');

exports.checkBirthdays = (discordClient) => {
    console.log("👉", 'Checking birthdays...')
    const googleApiKey = _.replace(process.env.GOOGLE_API_PRIVATE_KEY, new RegExp("\\\\n", "\g"), "\n")

    const googleClient = new google.auth.JWT(
        process.env.GOOGLE_API_CLIENT_EMAIL,
        null,
        googleApiKey,
        [
            'https://www.googleapis.com/auth/spreadsheets.readonly'
        ]
    )

    /*Authenticate with the google api*/
    googleClient.authorize((err, tokens) => {
        if (err) {
            console.log("👉", err)
        } else {
            console.log("👉", 'Google api connected ...')
            gsrun(googleClient)
        }
    })

    /*Get data from the api*/
    async function gsrun(client) {
        const gsapi = google.sheets({
            version: 'v4',
            auth: client
        })

        const options = {
            spreadsheetId: process.env.MEMBERLIST_SPREADSHEET_ID,
            range: 'A4:h63'
        }

        /*Save the response into a var*/
        let res = await gsapi.spreadsheets.values.get(options)
        /*Get today's date*/
        const now = dayjs().format("MM/DD")
        /*Get the channel for the announcement*/
        const birthdayChannel = await discordClient.channels.cache.find(i => i.name === 'chit-chat')

        /*Loop through the data and check if its anyone's birthday today*/
        for (const i in res.data.values) {
            const person = res.data.values[i]
            const birthday = dayjs(person[5], "MM/DD/YYYY").format("MM/DD")
            console.log("👉", `checking birthday of ${person[0]}`)

            /*If it's someone's birthday today, send a message in the chit-chat channel*/
            if (now === birthday) {
                const message = await birthdayChannel.send(`${person[0]} is jarig vandaag! Wens hem/haar een gelukkige verjaardag! 🎂🎉`)
                await message.react('🥳')
            }
        }
    }
}