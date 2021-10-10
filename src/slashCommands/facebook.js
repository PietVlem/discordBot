const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('facebook')
        .setDescription('Geeft een link terug naar onze facebook!'),
    async execute(interaction) {
        const msg = await notionService.getMsgByKey("facebook")
        interaction.reply({
            content: `Facebook: <${msg}>`
        })
    }
};