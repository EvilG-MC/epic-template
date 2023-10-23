import { createCommand } from "#template/functions";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
    data: {
        type: ApplicationCommandType.User,
        name: "hello",
    },
    execute: async (interaction) => {
        const { targetUser } = interaction;

        await interaction.reply({ content: `Hello ${targetUser.displayName}!`, ephemeral: true });
    },
})