/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'facebook',
    description: 'Geeft een link terug naar onze facebook!',
    async execute(message) {
        const msg = await notionService.getMsgByKey("facebook")
        await message.channel.send(`Facebook: <${msg}>`);
    },
};