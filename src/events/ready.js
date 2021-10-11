const cron = require('node-cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

/*import cronjobs*/
const birthdayBot = require('../cronjobs/birthdayBot')
const shifters = require('../cronjobs/shifters')

/*Slash-commands*/
const slashCommands = require('../utils/loadSlashCommands');

/*Log current date-time*/
const logDateTime = () => {
    console.log("👉", `Today is ${dayjs().tz("Europe/Brussels").format("MM/DD HH:mm:ss")}`)
}

module.exports = {
    name: 'ready',
    once: true,
    execute(discordClient) {
        console.log("👉", 'Discord bot is Ready!');
        logDateTime()

        /*Birthday announcer*/
        cron.schedule('0 9 * * *', () => {
            console.log("👉", 'Running a job at 09:00 at Europe/Brussels timezone');
            logDateTime()
            birthdayBot.checkBirthdays(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Brussels"
        });

        /*Shifter announcer*/
        cron.schedule('0 12 * * *', () => {
            console.log("👉", 'Running a job at 12:00 at Europe/Brussels timezone');
            logDateTime()
            shifters.announceShifters(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Brussels"
        });

        /*Load slash-commands*/
        slashCommands.loadSlashCommands(discordClient)
    },
};