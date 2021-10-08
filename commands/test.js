const googleServive = require('../services/google')

module.exports = {
    name: 'test',
    description: 'Kijkt wie er moet shiften die dag.',
    async execute(message, discordClient) {
        googleServive.announceShifters(discordClient)
        await message.delete().catch(e => console.error(e))
    },
};