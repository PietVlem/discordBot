const googleServive = require('../services/google')

module.exports = {
    name: 'check-birthdays',
    description: 'Kijkt of er iemand jarig is.',
    async execute(message, discordClient) {
        if (message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            googleServive.checkBirthdays(discordClient)
        } else {
            await message.channel.send('Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:');
        }
        await message.delete().catch(e => console.error(e))
    },
};