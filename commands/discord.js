module.exports = {
    name: 'discord',
    description: 'Geeft een link terug naar onze discord!',
    async execute(message) {
        await message.channel.send('Discord: https://discord.gg/BjgtWZt');
    },
};