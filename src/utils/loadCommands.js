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
            case 'facebook':
                discordClient.commands.get('facebook').execute(message)
                break
            case 'instagram':
                discordClient.commands.get('instagram').execute(message)
                break
            case 'discord':
                discordClient.commands.get('discord').execute(message)
                break
            case 'website':
                discordClient.commands.get('website').execute(message)
                break
            case 'bible':
                discordClient.commands.get('bible').execute(message)
                break
            case 'poll':
                discordClient.commands.get('poll').execute(message, args)
                break
            case 'custom-poll':
                discordClient.commands.get('custom-poll').execute(message)
                break
            case 'shifters':
                discordClient.commands.get('shifters').execute(message)
                break
            case 'new-member':
                discordClient.commands.get('new-member').execute(message, args, discordClient)
                break
            case 'new-board-member':
                discordClient.commands.get('new-board-member').execute(message, args)
                break
            case 'remove-member':
                discordClient.commands.get('remove-member').execute(message, args)
                break
            case 'check-birthdays':
                discordClient.commands.get('check-birthdays').execute(message, discordClient)
                break
            case 'check-shifters':
                discordClient.commands.get('check-shifters').execute(message, discordClient)
                break
            /*case 'test':
                discordClient.commands.get('test').execute(message, discordClient)
                break*/
        }
    })
}
