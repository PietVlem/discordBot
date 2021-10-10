const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bible')
        .setDescription('Replies with our bible link'),
    async execute(interaction) {
        const content = `Jh holy bible: <https://positive-ox-8ef.notion.site/Holy-Bible-965bb8a70175487498f968687c7ad9fa>`
        interaction.reply({ content: content })
    }
};