const googleServive = require('../services/google')

module.exports = {
    name: 'check-birthdays',
    description: 'Kijkt of er iemand jarig is.',
    async execute(discordClient) {
        googleServive.checkBirthdays(discordClient)
    },
};