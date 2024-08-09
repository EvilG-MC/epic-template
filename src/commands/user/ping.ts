import { ApplicationCommandType } from "discord.js";
import { Command } from "#template/builders";

export default new Command({
    data: {
        type: ApplicationCommandType.ChatInput,
        name: "ping",
        description: "Respond with the ping.",
    },
    options: {
        toGuild: false,
    },
    run: async (interaction, client) => {
        const message = await interaction.reply({ content: "`⌛` Calculating...", ephemeral: true, fetchReply: true });

        const wsPing = Math.floor(client.ws.ping);
        const clientPing = Math.floor(message.createdTimestamp - interaction.createdTimestamp);

        await interaction.editReply({ content: `\`🚀\` Pong! (API: \`${wsPing}ms\` - CLIENT: \`${clientPing}ms\`)` });
    },
});
