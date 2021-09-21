const cron = require('node-cron')
const dayjs = require('dayjs')

/*import services*/
const googleService = require('../services/google')

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