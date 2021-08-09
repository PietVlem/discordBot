module.exports = {
    name: 'instagram',
    description: 'Geeft een link terug naar onze instagram!',
    async execute(message, args) {
        await message.channel.send('Instagram: <https://www.instagram.com/jeugdhuis_de_muze/>');
    },
};