const googleServive = require('../services/google')

module.exports = {
    name: 'check-shifters',
    description: 'Kijkt wie er moet shiften die dag.',
    async execute(discordClient) {
        googleServive.announceShifters(discordClient)
    },
};