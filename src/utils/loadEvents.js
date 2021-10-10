const fs = require('fs');

exports.loadEvents = (discordClient) => {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
        const event = require(`../events/${file}`)
        if (event.name === 'interactionCreate') {
            discordClient.once(event.name, (...args) => event.execute(...args, discordClient))
        } else if (event.once) {
            discordClient.once(event.name, (...args) => event.execute(...args))
        } else {
            discordClient.on(event.name, (...args) => event.execute(...args))
        }
    }
}