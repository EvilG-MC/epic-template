import { Components } from "#template/builders";
import { ActionRowType } from "#template/types";

import type { ButtonInteraction } from "discord.js";

export default class ExampleButton extends Components<ActionRowType.Button> {
    constructor() {
        super({
            customId: "example-button",
            type: ActionRowType.Button,
        });
    }

    public override async run(interaction: ButtonInteraction) {
        await interaction.reply({ content: "example button!", ephemeral: true });
    }
}
