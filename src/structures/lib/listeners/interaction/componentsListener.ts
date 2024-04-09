import type { Interaction } from "discord.js";
import type { Base } from "#template/client";

export async function componentsListener(client: Base, interaction: Interaction) {
    const { guild, user } = interaction;

    if (!guild) return;
    if (interaction.isButton()) {
        const { customId } = interaction;

        const button = client.components.buttons.get(customId);
        if (!button) return;

        if (button.options?.onlyDeveloper && !client.config.developerIds.includes(user.id))
            return interaction.reply({ content: "`❌` Only the bot developer(s) can use this button.", ephemeral: true });
        if (button.options?.onlyOwner && guild.ownerId !== user.id)
            return interaction.reply({ content: "`❌` Only the guild owner(s) can use this button.", ephemeral: true });

        try {
            await button.run(interaction, client);
        } catch (error) {
            return client.logger.error(`Error - ${error}`);
        }
    } else if (interaction.isModalSubmit()) {
        const { customId } = interaction;

        const modal = client.components.modals.get(customId);
        if (!modal) return;

        if (modal.options?.onlyDeveloper && !client.config.developerIds.includes(user.id))
            return interaction.reply({ content: "`❌` Only the bot developer(s) can use this modal.", ephemeral: true });
        if (modal.options?.onlyOwner && guild.ownerId !== user.id)
            return interaction.reply({ content: "`❌` Only the guild owner(s) can use this modal.", ephemeral: true });

        try {
            await modal.run(interaction, client);
        } catch (error) {
            return client.logger.error(`Error - ${error}`);
        }
    } else if (interaction.isAnySelectMenu()) {
        const { customId } = interaction;

        const menu = client.components.menus.get(customId);
        if (!menu) return;

        if (menu.options?.onlyDeveloper && !client.config.developerIds.includes(user.id))
            return interaction.reply({ content: "`❌` Only the bot developer(s) can use this menu.", ephemeral: true });
        if (menu.options?.onlyOwner && guild.ownerId !== user.id)
            return interaction.reply({ content: "`❌` Only the guild owner(s) can use this menu.", ephemeral: true });

        try {
            await menu.run(interaction, client);
        } catch (error) {
            return client.logger.error(`Error - ${error}`);
        }
    }
}
