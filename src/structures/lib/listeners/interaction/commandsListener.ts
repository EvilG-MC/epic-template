import type { Interaction } from "discord.js";
import type { Base } from "#template/client";

export async function commandsListener(client: Base, interaction: Interaction) {
    if (interaction.isAutocomplete()) {
        const { commandName, guild, user } = interaction;

        if (!guild) return;

        const command = client.commands.interaction.get(commandName);
        if (!command?.autocomplete) return;

        if (command.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return;
        if (command.options?.onlyOwner && guild.ownerId !== user.id) return;

        try {
            await command.autocomplete(interaction, client);
        } catch (error) {
            return client.logger.error(`Error - ${error}`);
        }
    } else if (interaction.isChatInputCommand()) {
        const { commandName, guild, user } = interaction;

        if (!guild) return;

        const command = client.commands.interaction.get(commandName);
        if (!command) return;

        if (command.options?.onlyDeveloper && !client.config.developerIds.includes(user.id))
            return interaction.reply({ content: "`❌` Only the bot developer(s) can use this command.", ephemeral: true });
        if (command.options?.onlyOwner && guild.ownerId !== user.id)
            return interaction.reply({ content: "`❌` Only the guild owner(s) can use this command.", ephemeral: true });

        try {
            await command.run(interaction, client);
        } catch (error) {
            return client.logger.error(`Error - ${error}`);
        }
    }
}
