const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Geeft een link naar de documentatie'),
    async execute(interaction) {
        interaction.reply({
            content: `Documentatie: <https://github.com/PietVlem/discordBot>`,
            ephemeral: true
        })
    }
};