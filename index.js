/*
* Discord.js needs node 16.6+ to run
*/

/*Packages*/
require('dotenv').config()
const {Client, Intents} = require('discord.js')
const events = require('./src/utils/loadEvents')
const commands = require('./src/utils/loadCommands')

/*Create discord cleint instance*/
const discordClient = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

/*Discord events*/
events.loadEvents(discordClient)
/*Discord commands*/
commands.loadCommands(discordClient)

/*Login into the discordClient*/
discordClient.login(process.env.TOKEN);