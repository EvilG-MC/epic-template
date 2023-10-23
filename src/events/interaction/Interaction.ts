import { createEvent } from "#template/functions";
import { ApplicationCommandType, Events } from "discord.js";

export default createEvent({
    name: Events.InteractionCreate,
    execute: async (client, interaction) => {
        if (interaction.isAutocomplete()) {
            const { commandName, guild, user } = interaction;

            const command = client.commands.interaction.get(commandName);
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

            const command = client.commands.interaction.get(commandName);
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
        } else if (interaction.isContextMenuCommand()) {
            const { commandName, guild, user, commandType } = interaction;

            const command = client.commands.context.get(commandName);
            if (!command || !guild) return;

            const member = await guild.members.fetch({ user });
            if (!member) return;

            if (command.options?.onlyDeveloper && !client.config.developerIds.includes(user.id)) return interaction.reply({ content: "`❌` Only the bot developer(s) can use this command.", ephemeral: true });
            if (command.options?.onlyOwner && guild.ownerId !== member.id) return interaction.reply({ content: "`❌` Only the guild owner(s) can use this command.", ephemeral: true });

            try {
                // i think the types are badly created, but i made this
                // in 30 minutos i think, if it works, don't touch it.
                if (command.type === ApplicationCommandType.Message && commandType === ApplicationCommandType.Message) {
                    await command.execute(interaction, client);
                } else if (command.type === ApplicationCommandType.User && commandType === ApplicationCommandType.User) {
                    await command.execute(interaction, client);
                };
            } catch (error) {
                return client.logger.error(`Error - ${error}`);
            };
        };
    },
});