import { Component } from "#template/builders";
import { ActionRowType } from "#template/types";

export default new Component({
    customId: "example-modal",
    type: ActionRowType.Modal,
    run: async (interaction) => {
        await interaction.reply({ content: "example modal!", ephemeral: true });
    },
});
