const { SlashCommandBuilder } = require('@discordjs/builders');

/*Services*/
const birthdayBot = require('../cronjobs/birthdayBot')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-birthdays')
        .setDescription('Kijkt of er iemand jarig is.'),
    async execute(interaction, discordClient) {
        if (interaction.member.roles.cache.find(r => r.name === "Admin") || interaction.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            await birthdayBot.checkBirthdays(discordClient)
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