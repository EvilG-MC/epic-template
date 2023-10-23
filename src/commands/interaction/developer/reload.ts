import { createCommand } from "#template/functions";
import { ApplicationCommandType, PermissionsBitField } from "discord.js";

export default createCommand({
    data: {
        type: ApplicationCommandType.ChatInput,
        name: "reload",
        description: "Reload this epic bot.",
        dmPermission: false,
        defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    },
    options: {
        toGuild: true,
        onlyDeveloper: true,
        onlyOwner: true,
    },
    execute: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: true });

        await client.reload()
            .then(() => interaction.editReply({ content: "`✅` - The bot has been reloaded." }))
            .catch(() => interaction.editReply({ content: "`❌` - An error ocurred in the reload." }));
    },
});