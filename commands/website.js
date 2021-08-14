/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'website',
    description: 'Geeft een link terug naar onze website!',
    async execute(message) {
        const msg = await notionService.getMsgByKey("website")
        await message.channel.send(`Website: <${msg}>`);
    },
};