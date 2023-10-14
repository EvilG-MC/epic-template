import { createComponent } from "#template/functions";
import { ActionRowType } from "#template/types";

export default createComponent({
    customId: "example-modal",
    type: ActionRowType.Modal,
    execute: async (interaction, client) => {
        interaction.reply({ content: "example modal!", ephemeral: true });
    },
})