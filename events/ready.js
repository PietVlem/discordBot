const cron = require('node-cron')

/*import services*/
const birthdayService = require('../services/birtdays')

module.exports = {
    name: 'ready',
    once: true,
    execute(discordClient) {
        console.log("👉", 'Discord bot is Ready!');

        /*Birthday announcer*/
        cron.schedule('0 0 * * *', () => {
            console.log('Running a job at 00:00 at Europe/Amsterdam timezone');
            birthdayService.checkBirthdays(discordClient)
        }, {
            scheduled: true,
            timezone: "Europe/Amsterdam"
        });
    },
};