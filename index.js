/*
* Discord.js needs node 16.6+ to run
*/

/*Packages*/
require('dotenv').config()
const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js');

/*Create discord cleint instance*/
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

/*Discord events*/
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

/*Discord commands*/
const prefix = "?"

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command)
}

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'facebook':
            client.commands.get('facebook').execute(message, args)
            break
        case 'instagram':
            client.commands.get('instagram').execute(message, args)
            break
        case 'discord':
            client.commands.get('discord').execute(message, args)
            break
        case 'bible':
            client.commands.get('bible').execute(message, args)
            break
    }
})

/*Add role when someone joins the serve*/
client.on('guildMemberAdd', (guildMember) => {
    const myGuild = client.guilds.cache.get('539096504237817866')
    const role = myGuild.roles.cache.find(role => role.name === 'Social')
    guildMember.roles.add(role);
});

/*Login into the client*/
client.login(process.env.TOKEN);