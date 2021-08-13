/*Services*/
const notionService = require('../services/notion')

module.exports = {
    name: 'new-member',
    description: 'Commando voor het aanmaken van een nieuw lid',
    async execute(message, args, discordClient) {
        /*check if the person you init this command is an admin/rvb*/
        if(message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = message.member.guild
            const memberRole = await guild.roles.cache.find(role => role.name === 'Lid')
            const newMemberRole = await guild.roles.cache.find(role => role.name === 'Nieuw lid')
            const socialRole = await guild.roles.cache.find(role => role.name === 'Social')
            const privateMsg = notionService.getNewMemberMessage()

            /*Adding 'lid'/'nieuw lid' roles to and removing 'Social' role from the user*/
            message.mentions.members.forEach(member => {
                /*Adding 'lid' and 'nieuw lid' roles to all mentions*/
                member.roles.add(memberRole).catch(e => console.error(e));
                member.roles.add(newMemberRole).catch(e => console.error(e));
                member.roles.remove(socialRole).catch(e => console.error(e));
            });

            for (let i = 0; i < args.length; i++) {
                if (args[i].startsWith('<@') && args[i].endsWith('>')) {
                    /*Get user object*/
                    let userCode = args[i].slice(2, -1)
                    if (userCode.startsWith('!')) userCode = userCode.slice(1)
                    const user = await discordClient.users.cache.get(userCode);

                    /*Send them a message with some basic info*/
                    await user.send(await privateMsg)

                    /*Announce the new member in the 'leden' channel*/
                    const memberChannel = await discordClient.channels.cache.find(i => i.name === 'leden')
                    const message = await memberChannel.send(`${args[i]} heeft aangegeven dat hij/zij graag lid zou willen worden van het jeugdhuis. Welkom!`)
                    await message.react('👋')

                } else {
                    await message.channel.send(`${args[i]} is geen user in deze discord :(`);
                }
            }
        } else {
            await message.channel.send('Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:');
        }
    },
};