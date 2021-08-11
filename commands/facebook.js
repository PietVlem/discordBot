module.exports = {
    name: 'facebook',
    description: 'Geeft een link terug naar onze facebook!',
    async execute(message) {
        await message.channel.send('Facebook: <https://www.facebook.com/jhdemuze/>');
    },
};