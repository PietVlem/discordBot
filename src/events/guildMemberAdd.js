/*Notion-service*/
const notionService = require('../services/notion')

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(guildMember) {
        console.log("👉", 'member joined the server...')

        /*Add role when someone joins the serve*/
        const guild = guildMember.guild;
        const role = await guild.roles.cache.find(role => role.name === 'Social')
        await guildMember.roles.add(role);
        
        /*Send him a message to welcome him to the community*/
        const privateMsg = await notionService.getMsgByKey("welcomeMessage")
        await guildMember.send(privateMsg)
    }
}