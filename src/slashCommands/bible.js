const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bible')
        .setDescription('Geeft een link terug naar onze holy bible!'),
    async execute(interaction) {
        interaction.reply({
            content: `Jh holy bible: <https://positive-ox-8ef.notion.site/Holy-Bible-965bb8a70175487498f968687c7ad9fa>`
        })
    }
};