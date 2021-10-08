/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'shifters',
    description: 'Geeft een link naar de shifterslijst!',
    async execute(message) {
        const msg = await notionService.getMsgByKey("shifters")
        await message.channel.send(`Shifters: <${msg}>`);
    },
};