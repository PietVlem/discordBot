/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'instagram',
    description: 'Geeft een link terug naar onze instagram!',
    async execute(message) {
        const msg = await notionService.getMsgByKey("instagram")
        await message.channel.send(`Instagram: <${msg}>`);
    },
};