const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const shifters = require('../cronjobs/shifters')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-shifters')
        .setDescription('Kijkt wie er moet shiften die dag.'),
    async execute(interaction) {
        if (interaction.member.roles.cache.find(r => r.name === "Admin") || interaction.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            await shifters.announceShifters(interaction.client)
            interaction.reply({
                content: 'Check is done ☑️',
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: 'Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:',
                ephemeral: true
            })
        }
    }
}