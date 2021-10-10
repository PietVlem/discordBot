require('dotenv').config()
/*const DiscordJS = require('discord.js')*/
const { Collection} = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

exports.loadSlashCommands = (discordClient) => {
    // Loading commands from the commands folder
    const commands = [];
    const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));

    // Creating a collection for commands in client
    discordClient.commands = new Collection();

    for (const file of commandFiles) {
        const command = require(`../slashCommands/${file}`);
        commands.push(command.data.toJSON());
        discordClient.commands.set(command.data.name, command);
    }

    // Registering the commands in the client
    const CLIENT_ID = discordClient.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);
    (async () => {
        try {
            if (!process.env.TEST_SERVER_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.TEST_SERVER_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
}


