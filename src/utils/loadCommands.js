const fs = require('fs');
const {Collection} = require('discord.js')

exports.loadCommands = (discordClient) => {
    const prefix = "?"

    discordClient.commands = new Collection()
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        // set a new item in the Collection
        // with the key as the command name and the value as the exported module
        discordClient.commands.set(command.name, command)
    }

    discordClient.on('messageCreate', async message => {
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'custom-poll':
                discordClient.commands.get('custom-poll').execute(message)
                break
        }
    })
}
