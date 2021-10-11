const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom-poll')
        .setDescription('Maak een custom poll.'),
    async execute(interaction) {
        interaction.reply({
            content: `Jh holy bible: <https://positive-ox-8ef.notion.site/Holy-Bible-965bb8a70175487498f968687c7ad9fa>`
        })
    }
};




/*
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'custom-poll',
    description: 'Maak een custom poll.',
    async execute(message) {
        let array = []
        /!*Split the string into an combined array (Question + answer)*!/
        array = message.content.split(' "')
        /!*By checking if there are 2 values in the array, you check if there is a question and at least 1 answer*!/
        if(array.length > 1) {
            const question = array[1].replace('"','')
            const pollValues = []

            /!*Start with i = 2 because array[0] is the command and array[1] is the question*!/
            for (let i = 2; i < array.length; i++) {
                pollValues.push(array[i].replace('"',''))
            }

            /!*Array with emojis*!/
            const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

            /!*Loop over the answers and add an emoji to them*!/
            let pollDescription = null
            for (let i = 0; i < pollValues.length; i++) {
                !pollDescription ?
                    pollDescription = `${emojis[i]} \xa0 ${pollValues[i]}` :
                    pollDescription += `\r\n${emojis[i]} \xa0 ${pollValues[i]}`
            }

            /!*Create a discord-embed with a title, description (possible answers) and color for the poll*!/
            let embedPoll = new MessageEmbed()
                .setTitle(`📋 ${question}️`)
                .setDescription(pollDescription)
                .setColor('GREEN')

            /!*Show the embed in the channel*!/
            let msgEmbed = await message.channel.send({ embeds: [embedPoll] })

            /!*React with the emojis so people can vote*!/
            for (let i = 0; i < pollValues.length; i++) {
                await msgEmbed.react(emojis[i])
            }

            /!*Delete the command to clean up the channel*!/
            await message.delete().catch(console.error)
        }
        else {
            await message.channel.send('Nope, bekijk aandachtig de documentatie hoe het precies moet en try again retard.');
        }
    },
};*/
