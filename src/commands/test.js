const shifters = require('../cronjobs/shifters')

module.exports = {
    name: 'test',
    description: 'Kijkt wie er moet shiften die dag.',
    async execute(message, discordClient) {
        await shifters.announceShifters(discordClient)
        await message.delete().catch(e => console.error(e))
    },
};