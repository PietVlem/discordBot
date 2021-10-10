const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discord')
        .setDescription('Geeft een link terug naar onze discord!'),
    async execute(interaction) {
        const msg = await notionService.getMsgByKey("discord")
        interaction.reply({
            content: `Discord: ${msg}`
        })
    }
};