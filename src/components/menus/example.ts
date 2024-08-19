import { Component } from "#template/builders";
import { ActionRowType } from "#template/types";

export default new Component({
    customId: "example-menu",
    type: ActionRowType.StringSelect,
    run: async (interaction) => {
        await interaction.reply({ content: "example menu!", ephemeral: true });
    },
});
