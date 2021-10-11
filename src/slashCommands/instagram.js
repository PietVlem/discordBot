const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instagram')
        .setDescription('Geeft een link terug naar onze instagram!'),
    async execute(interaction) {
        const msg = await notionService.getMsgByKey("instagram")
        interaction.reply({
            content: `Instagram: <${msg}>`
        })
    }
};