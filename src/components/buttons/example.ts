import { createComponent } from "#template/functions";
import { ActionRowType } from "#template/types";

export default createComponent({
    customId: "example-button",
    type: ActionRowType.Button,
    execute: async (interaction, client) => {
        interaction.reply({ content: "example button!", ephemeral: true });
    },
})