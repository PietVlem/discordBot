const {SlashCommandBuilder} = require('@discordjs/builders');

/*Services*/
const notionService = require('../services/notion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new-member')
        .setDescription('Commando voor het aanmaken van een nieuw lid.')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Persoon zijn discord account')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.find(r => r.name === "Admin") || interaction.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = interaction.member.guild
            const memberRole = await guild.roles.cache.find(role => role.name === 'Lid')
            const newMemberRole = await guild.roles.cache.find(role => role.name === 'Nieuw lid')
            const privateMsg = await notionService.getMsgByKey("newMemberMessage")

            /*Adding 'lid'/'nieuw lid' roles to and removing 'Social' role from the user*/
            const user = await interaction.guild.members.cache.get(interaction.options.getUser('user').id)
            await user.roles.remove(user.roles.cache).catch(e => console.error(e))
            await user.roles.add(memberRole).catch(e => console.error(e))
            await user.roles.add(newMemberRole).catch(e => console.error(e))

            /*Send them a message with some basic info*/
            await user.send(privateMsg)

            /*Announce the new member in the 'leden' channel*/
            const memberChannel = await interaction.client.channels.cache.find(i => i.name === 'leden')
            const message = await memberChannel.send(`${user} heeft aangegeven dat hij/zij graag lid zou willen worden van het jeugdhuis. Welkom!`)
            await message.react('👋')

            interaction.reply({
                content: `${user} is nu lid in deze discord!`,
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: 'Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:',
                ephemeral: true
            })
        }
    }
};