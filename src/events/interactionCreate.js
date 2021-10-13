module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // There are multiple types of interactions
        // Make sure this is a command
        if (!interaction.isCommand()) return;

        if (interaction.member.roles.cache.find(r => r.name === "Social")) {
            interaction.reply({
                content: `Enkel leden uit deze discord kunnen commandos gebruiken (:`,
                ephemeral: true
            })
        } else {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                if (error) console.error(error);
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }
}