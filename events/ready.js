const cron = require('node-cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

/*import services*/
const googleService = require('../services/google')

dayjs.tz.setDefault("Europe/Amsterdam")

module.exports = {
    name: 'ready',
    once: true,
    execute(discordClient) {
        console.log("👉", 'Discord bot is Ready!');
        console.log("👉", `Today is ${dayjs().format("MM/DD HH:mm:ss")}`)

        /*Birthday announcer*/
        cron.schedule('0 9 * * *', () => {
            console.log("👉", 'Running a job at 09:00 at Europe/Amsterdam timezone');
            console.log("👉", `Today is ${dayjs().format("MM/DD")}`)
            googleService.checkBirthdays(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Amsterdam"
        });

        /*Shifter announcer*/
        cron.schedule('0 12 * * *', () => {
            console.log("👉", 'Running a job at 12:00 at Europe/Amsterdam timezone');
            console.log("👉", `Today is ${dayjs().format("MM/DD")}`)
            googleService.announceShifters(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Amsterdam"
        });
    },
};