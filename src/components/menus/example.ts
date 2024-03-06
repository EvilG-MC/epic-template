import { Components } from "#template/builders";
import { ActionRowType } from "#template/types";

import type { StringSelectMenuInteraction } from "discord.js";

export default class ExampleMenu extends Components<ActionRowType.SelectMenu> {
	constructor() {
		super({
			customId: "example-menu",
			type: ActionRowType.SelectMenu,
		});
	}

	public override async run(interaction: StringSelectMenuInteraction) {
		interaction.reply({ content: "example button!", ephemeral: true });
	}
}
