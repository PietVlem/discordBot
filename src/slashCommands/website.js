const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Geeft een link terug naar onze website!'),
    async execute(interaction) {
        const msg = await notionService.getMsgByKey("website")
        interaction.reply({ content: `Website: <${msg}>` })
    }
};