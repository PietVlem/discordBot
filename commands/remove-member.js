module.exports = {
    name: 'remove-member',
    description: 'Commando voor het verwijderen van een lid',
    async execute(message, args) {
        /*check if the person you init this command is an admin/rvb*/
        if(message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Raad van bestuur")) {
            const guild = message.member.guild
            const oldMemberRole = await guild.roles.cache.find(role => role.name === 'Oud lid')

            /*Removing all roles and adding the 'Oud lid' Role to the user*/
            message.mentions.members.forEach(member => {
                member.roles.remove(member.roles.cache).catch(e => console.error(e))
                member.roles.add(oldMemberRole).catch(e => console.error(e))
            });

            /*Creating a new loop over the arguments because you cant have an async function in a foreach*/
            /*Also I'm too stupid to add user roles to args so i use the mention members function for that*/
            for (let i = 0; i < args.length; i++) {
                if (!(args[i].startsWith('<@') && args[i].endsWith('>'))) {
                    await message.channel.send(`${args[i]} is geen user in deze discord :(`);
                }
            }
        } else {
            await message.channel.send('Enkel admins of mensen uit de raad van bestuur kunnen dit commando uitvoeren (:');
        }
        await message.delete().catch(e => console.error(e))
    },
};