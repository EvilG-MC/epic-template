import { createComponent } from "#template/functions";
import { ActionRowType } from "#template/types";

export default createComponent({
    customId: "example-menu",
    type: ActionRowType.SelectMenu,
    options: {
        multiple: true,
    },
    execute: async (interaction, client) => {
        interaction.reply({ content: "example menu!", ephemeral: true });
    },
});