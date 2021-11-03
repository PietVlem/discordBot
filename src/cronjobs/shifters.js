/*Packages*/
require('dotenv').config()
const {google} = require('googleapis')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

/*google-service*/
const googleService = require('../services/google')

dayjs.extend(utc)
dayjs.extend(timezone)

const googleClient = googleService.client

exports.announceShifters = async(discordClient) => {
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

        /*Get shifters channel*/
        const shiftersChannel = await discordClient.channels.cache.find(i => i.name === 'shifters')

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
            /* Get the shifter sheet of this month */
            let res = await gsapi.spreadsheets.values.get({
                spreadsheetId: process.env.SHIFTERSLIST_SPREADSHEETS_ID,
                range: `'${sheet.properties.title}'!b5:m18`
            })

            /* Get the sheet with all the shifters */
            let shiftersSheet = await gsapi.spreadsheets.values.get({
                spreadsheetId: process.env.SHIFTERSLIST_SPREADSHEETS_ID,
                range: `'Shifters'!a2:d80`
            })

            /*Get the Jeugdhuis discord with it's id*/
            const guild = discordClient.guilds.cache.get(process.env.JH_SERVER_ID);
            /*Fetch all users. This is needed to loop over them.*/
            await guild.members.fetch()

            /* Get the discord user by their discord tag */
            const getUserByDiscordTag = async (name) => {
                let user = null
                for (const k in shiftersSheet.data.values) {
                    const shifter = shiftersSheet.data.values[k]
                    if (shifter[0] === name) {
                        if (shifter[3]) user = guild.members.cache.find(member => member.user.tag === shifter[3])
                        break
                    }
                }
                return user ? user : name;
            }

            /* Loop over all the rows of this months shifters list */
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
        } else if (sheetsMatches.length === 1) {
            await getShifters(sheetsMatches[0])
        } else {
            shiftersChannel.send(`Ik zou jullie graag vertellen wie er moet shiften, maar ik kan geen lijst vinden voor deze maand 😕.`)
        }
    }
}