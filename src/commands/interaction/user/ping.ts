import { createCommand } from "#template/functions";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
    /**
     * @important
     * First it is defined for the handler.
     */
    type: ApplicationCommandType.ChatInput,
    data: {
        /**
         * @important
         * Second for the discord.js types
         * It is important to define it twice, otherwise the discord.js types will die.
         */
        type: ApplicationCommandType.ChatInput,
        name: "ping",
        description: "Respond with the ping."
    },
    options: {
        toGuild: true,
    },
    execute: async (interaction, client) => {
        const message = await interaction.reply({ content: `\`⌛\` Calculating...`, ephemeral: true, fetchReply: true });

        const wsPing = Math.floor(client.ws.ping);
        const clientPing = Math.floor(message.createdTimestamp - interaction.createdTimestamp);

        await interaction.editReply({ content: `\`🚀\` Pong! (API: \`${wsPing}ms\` - CLIENT: \`${clientPing}ms\`)` });
    },
})