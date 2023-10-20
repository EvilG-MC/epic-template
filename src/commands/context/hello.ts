import { createCommand } from "#template/functions";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
    /**
     * @important
     * First it is defined for the handler.
     */
    type: ApplicationCommandType.User,
    data: {
        /**
         * @important
         * Second for the discord.js types
         * It is important to define it twice, otherwise the discord.js types will die.
         */
        type: ApplicationCommandType.User,
        name: "hello",
    },
    execute: async (interaction) => {
        const { targetUser } = interaction;

        await interaction.reply({ content: `Hello ${targetUser.displayName}!`, ephemeral: true });
    },
})