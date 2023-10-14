import { createCommand } from "#template/functions";
import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, PermissionsBitField } from "discord.js";

export default createCommand({
    data: {
        type: ApplicationCommandType.ChatInput,
        name: "test",
        description: "A test command.",
        dmPermission: false,
        defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    },
    options: {
        onlyDeveloper: true,
        onlyOwner: true,
        toGuild: true,
    },
    execute: async (interaction, client) => {
        //You can test components here...
    },
});