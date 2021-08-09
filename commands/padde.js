module.exports = {
    name: 'padde',
    description: 'Replies with: Das uw mama, een dikke zelf!',
    async execute(message, args) {
        await message.channel.send('Das uw mama, een dikke zelf!');
    },
};