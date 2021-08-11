module.exports = {
    name: 'bible',
    description: 'Gives you a link to our holy book!',
    async execute(message) {
        await message.channel.send('Jh holy bible: <https://positive-ox-8ef.notion.site/Holy-Bible-965bb8a70175487498f968687c7ad9fa>');
    },
};