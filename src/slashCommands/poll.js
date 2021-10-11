const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Maak een poll.')
        .addStringOption((option) =>
            option
                .setName('poll')
                .setDescription('De poll zelf...')
                .setRequired(true)
        ),
    async execute(interaction) {
        const message = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('📋 Poll!️')
                    .setDescription(interaction.options.getString('poll'))
            ], fetchReply: true
        })
        await message.react('👍')
        await message.react('👎')
    }
};