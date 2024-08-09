import { Component } from "#template/builders";
import { ActionRowType } from "#template/types";

export default new Component({
    customId: "example-menu",
    type: ActionRowType.SelectMenu,
    run: async (interaction) => {
        //you can change the type of the menu!
        if (!interaction.isStringSelectMenu()) return;

        await interaction.reply({ content: "example menu!", ephemeral: true });
    },
});
