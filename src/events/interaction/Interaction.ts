import { createEvent } from "#template/functions";
import { Events } from "discord.js";

export default createEvent({
    name: Events.InteractionCreate,
    execute: async (client, interaction) => {
        if (interaction.isAutocomplete()) {
            const { commandName, guild, user } = interaction;

            const command = client.commands.get(commandName);
            if (!command || !guild || !command.autocomplete) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (command.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return;
            if (command.options?.onlyOwner && guild.ownerId !== member.id) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        } else if (interaction.isChatInputCommand()) {
            const { commandName, guild, user } = interaction;

            const command = client.commands.get(commandName);
            if (!command || !guild) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (command.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return interaction.reply({ content: "`❌` Only the bot developer(s) can use this command.", ephemeral: true });
            if (command.options?.onlyOwner && guild.ownerId !== member.id) return interaction.reply({ content: "`❌` Only the guild owner(s) can use this command.", ephemeral: true });

            try {
                await command.execute(interaction, client);
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        } else if (interaction.isButton()) {
            const { customId, guild, user } = interaction;

            const button = client.components.buttons.get(customId);
            if (!button || !guild) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (button.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return interaction.reply({ content: "`❌` Only the bot developer(s) can use this button.", ephemeral: true });
            if (button.options?.onlyOwner && guild.ownerId !== member.id) return interaction.reply({ content: "`❌` Only the guild owner(s) can use this button.", ephemeral: true });

            try {
                await button.execute(interaction, client);
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        } else if (interaction.isModalSubmit()) {
            const { customId, guild, user } = interaction;

            const modal = client.components.modals.get(customId);
            if (!modal || !guild) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (modal.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return interaction.reply({ content: "`❌` Only the bot developer(s) can use this modal.", ephemeral: true });
            if (modal.options?.onlyOwner && guild.ownerId !== member.id) return interaction.reply({ content: "`❌` Only the guild owner(s) can use this modal.", ephemeral: true });

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        } else if (interaction.isAnySelectMenu()) {
            const { customId, guild, user } = interaction;

            const menu = client.components.menus.get(customId);
            if (!menu || !guild) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (menu.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return interaction.reply({ content: "`❌` Only the bot developer(s) can use this menu.", ephemeral: true });
            if (menu.options?.onlyOwner && guild.ownerId !== member.id) return interaction.reply({ content: "`❌` Only the guild owner(s) can use this menu.", ephemeral: true });

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        };
    },
});