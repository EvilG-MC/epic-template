import { Component } from "#template/builders";
import { ActionRowType } from "#template/types";

export default new Component({
    customId: "example-button",
    type: ActionRowType.Button,
    run: async (interaction) => {
        await interaction.reply({ content: "example button!", ephemeral: true });
    },
});
