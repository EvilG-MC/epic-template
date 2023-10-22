import { createComponent } from "#template/functions";
import { ActionRowType } from "#template/types";

export default createComponent({
    customId: "example-menu",
    type: ActionRowType.StringMenu,
    options: {
        multiple: true,
    },
    execute: async (interaction, client) => {
        const { values } = interaction;

        await interaction.reply({ content: `example menu! (You selected: ${values[0]})`, ephemeral: true });
    },
});