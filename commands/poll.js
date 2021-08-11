const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Maakt een poll.',
    async execute(message, args) {
        let pollDescription = args.slice(0).join(' ')

        let embedPoll = new MessageEmbed()
            .setTitle('📋 Poll!️')
            .setDescription(pollDescription)
            .setColor('GREEN')
        let msgEmbed = await message.channel.send(({ embeds: [embedPoll] }))
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
        await message.delete().catch(console.error)
    },
};