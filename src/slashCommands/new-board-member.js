const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new-board-member')
        .setDescription('Commando voor het aanmaken van een bestuurslid')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Persoon zijn discord account')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.find(r => r.name === "Admin") || interaction.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = interaction.guild
            const boardMemberRole = await guild.roles.cache.find(role => role.name === 'Bestuurslid')

            /*Adding 'lid'/'nieuw lid' roles to and removing 'Social' role from the user*/
            const user = await interaction.guild.members.cache.get(interaction.options.getUser('user').id)
            user.roles.remove(user.roles.cache).catch(e => console.error(e))
            user.roles.add(boardMemberRole).catch(e => console.error(e))

            interaction.reply({
                content: `${user} is nu bestuurslid in deze discord!`,
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