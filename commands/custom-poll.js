const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'custom-poll',
    description: 'Maak een custom poll.',
    async execute(message) {
        let array = message.content.split(' "')
        const question = array[1].replace('"','')
        const pollValues = []

        /*Start with i = 2 because array[0] is the command and array[1] is the question*/
        for (let i = 2; i < array.length; i++) {
            pollValues.push(array[i].replace('"',''))
        }

        let pollDescription = null
        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
        for (let i = 0; i < pollValues.length; i++) {
            !pollDescription ?
                pollDescription = `${emojis[i]} \xa0 ${pollValues[i]}` :
                pollDescription += `\r\n${emojis[i]} \xa0 ${pollValues[i]}`
        }

        let embedPoll = new MessageEmbed()
            .setTitle(`📋 ${question}️`)
            .setDescription(pollDescription)
            .setColor('GREEN')
        let msgEmbed = await message.channel.send(({ embeds: [embedPoll] }))
        for (let i = 0; i < pollValues.length; i++) {
            await msgEmbed.react(emojis[i])
        }
        await message.delete().catch(console.error)
    },
};