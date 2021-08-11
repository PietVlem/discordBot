const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Maak een poll.',
    async execute(message, args) {
        let pollDescription = args.slice(0).join(' ')

        let embedPoll = new MessageEmbed()
            .setTitle('📋 Poll!️')
            .setDescription(pollDescription)
            .setColor('GREEN')
        await embedPoll.react('👍')
        await embedPoll.react('👎')
        await message.delete().catch(console.error)
    },
};