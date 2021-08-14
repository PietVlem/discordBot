module.exports = {
    name: 'new-board-member',
    description: 'Commando voor het aanmaken van een bestuurslid',
    async execute(message, args) {
        /*check if the person you init this command is an admin/rvb*/
        if(message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = message.member.guild
            const boardMemberRole = await guild.roles.cache.find(role => role.name === 'Bestuurslid')

            /*Adding 'lid'/'nieuw lid' roles to and removing 'Social' role from the user*/
            message.mentions.members.forEach(member => {
                member.roles.remove(member.roles.cache).catch(e => console.error(e))
                member.roles.add(boardMemberRole).catch(e => console.error(e))
            });

            /*Creating a new loop over the arguments because you cant have an async function in a foreach*/
            /*Also I'm too stupid to add user roles to args so i use the mention members function for that*/
            for (let i = 0; i < args.length; i++) {
                if (!(args[i].startsWith('<@') && args[i].endsWith('>'))) {
                    await message.channel.send(`${args[i]} is geen user in deze discord :(`)
                }
            }
        } else {
            await mßessage.channel.send('Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:');
        }
        await message.delete().catch(e => console.error(e))
    },
};