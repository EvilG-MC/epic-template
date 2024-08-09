import { ApplicationCommandType, PermissionsBitField } from "discord.js";
import { Command } from "#template/builders";

export default new Command({
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
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: true });
        await client
            .reload()
            .then(() => interaction.editReply({ content: "`✅` - The bot has been reloaded." }))
            .catch(() => interaction.editReply({ content: "`❌` - An error ocurred in the reload." }));
    },
});
