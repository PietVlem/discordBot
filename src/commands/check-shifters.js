const googleServive = require('../services/google')

module.exports = {
    name: 'check-shifters',
    description: 'Kijkt wie er moet shiften die dag.',
    async execute(message, discordClient) {
        if (message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            googleServive.announceShifters(discordClient)
        } else {
            await message.channel.send('Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:');
        }
        await message.delete().catch(e => console.error(e))
    },
};