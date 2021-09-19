const cron = require('node-cron')

/*import services*/
const googleService = require('../services/google')

module.exports = {
    name: 'ready',
    once: true,
    execute(discordClient) {
        console.log("👉", 'Discord bot is Ready!');

        /*Birthday announcer*/
        cron.schedule('0 9 * * *', () => {
            console.log('Running a job at 09:00 at Europe/Amsterdam timezone');
            googleService.checkBirthdays(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Amsterdam"
        });

        /*Shifter announcer*/
        cron.schedule('0 12 * * *', () => {
            console.log('Running a job at 12:00 at Europe/Amsterdam timezone');
            googleService.announceShifters(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Amsterdam"
        });
    },
};