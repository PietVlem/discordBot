/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'discord',
    description: 'Geeft een link terug naar onze discord!',
    async execute(message) {
        const msg = await notionService.getMsgByKey("discord")
        await message.channel.send(`Discord: ${msg}`);
    },
};