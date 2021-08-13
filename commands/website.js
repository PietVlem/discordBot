module.exports = {
    name: 'discord',
    description: 'Geeft een link terug naar onze website!',
    async execute(message) {
        await message.channel.send('Website: https://jhdemuze.be/');
    },
};