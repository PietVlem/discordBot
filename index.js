/*
* Discord.js needs node 16.6+ to run
*/

/*Packages*/
require('dotenv').config()
const fs = require('fs')
const {Client, Collection, Intents} = require('discord.js')

/*Services*/
const notionService = require('./services/notion')

/*Create discord cleint instance*/
const discordClient = new Client(
    {
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS
        ]
    })

/*Discord events*/
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        discordClient.once(event.name, (...args) => event.execute(...args))
    } else {
        discordClient.on(event.name, (...args) => event.execute(...args))
    }
}

/*Discord commands*/
const prefix = "?"

discordClient.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
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
    }
})

/*Do stuff when someone joins the serve*/
discordClient.on('guildMemberAdd', async (guildMember) => {
    console.log("👉", 'member joined the server...')
    
    /*Add role when someone joins the serve*/
    const guild = guildMember.guild;
    const role = await guild.roles.cache.find(role => role.name === 'Social')
    await guildMember.roles.add(role);

    /*Send him a message to welcome him to the community*/
    const privateMsg = notionService.getMsgByKey("welcomeMessage")
    await guildMember.send(await privateMsg)
});

/*Login into the discordClient*/
discordClient.login(process.env.TOKEN);