const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shifters')
        .setDescription('Geeft een link naar de shifterslijst!'),
    async execute(interaction) {
        const msg = await notionService.getMsgByKey("shifters")
        interaction.reply({
            content: `Shifters: <${msg}>`
        })
    }
};