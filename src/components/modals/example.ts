import { Components } from "#template/builders";
import { ActionRowType } from "#template/types";

import type { ModalSubmitInteraction } from "discord.js";

export default class ExampleModal extends Components<ActionRowType.Modal> {
    constructor() {
        super({
            customId: "example-modal",
            type: ActionRowType.Modal,
        });
    }

    public override async run(interaction: ModalSubmitInteraction) {
        await interaction.reply({ content: "example modal!", ephemeral: true });
    }
}
