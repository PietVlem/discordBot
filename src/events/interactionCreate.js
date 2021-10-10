module.exports = {
    name: 'interactionCreate',
    once: true,
    async execute(interaction, discordClient) {
        // There are multiple types of interactions
        // Make sure this is a command
        if (!interaction.isCommand()) return;

        const command = discordClient.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}