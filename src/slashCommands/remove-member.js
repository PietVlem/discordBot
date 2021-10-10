const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-member')
        .setDescription('Commando voor het verwijderen van een lid.')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Persoon zijn discord account')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.find(r => r.name === "Admin") || interaction.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = interaction.guild
            const oldMemberRole = await guild.roles.cache.find(role => role.name === 'Oud lid')

            /*Removing all roles and adding the 'Oud lid' Role to the user*/
            const user = await interaction.guild.members.cache.get(interaction.options.getUser('user').id)
            user.roles.remove(user.roles.cache).catch(e => console.error(e))
            user.roles.add(oldMemberRole).catch(e => console.error(e))

            interaction.reply({
                content: `${user} is nu geen lid meer in deze discord!`,
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