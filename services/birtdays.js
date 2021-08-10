require('dotenv').config()
const {google} = require('googleapis')
const dayjs = require('dayjs')

exports.checkBirthdays = (discordClient) => {
    console.log("👉", 'Checking birthdays...')

    /*Create new google instance*/
    const googleClient = new google.auth.JWT(
        process.env.GOOGLE_API_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_API_PRIVATE_KEY,
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
            range: 'A4:h64'
        }

        let res = await gsapi.spreadsheets.values.get(options)
        const now = dayjs().format("MM/DD")
        const birthdayChannel = await discordClient.channels.cache.find(i => i.name === 'chit-chat')

        /*Loop through the data and check if its anyone's birthday today*/
        for (const i in res.data.values) {
            const person = res.data.values[i]
            const birthday = dayjs(person[5], "MM/DD/YYYY").format("MM/DD")

            if (now === birthday) {
                console.log("👉", `${person[0]} is jarig vandaag! Wens hem/haar een gelukkige verjaardag!`)
                const message = await birthdayChannel.send(`${person[0]} is jarig vandaag! Wens hem/haar een gelukkige verjaardag! 🎂🎉`)
                message.react('🥳')
            }
        }
    }
}