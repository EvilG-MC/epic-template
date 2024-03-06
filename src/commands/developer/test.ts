import { Commands } from "#template/builders";

import {
	ActionRowBuilder,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	PermissionsBitField,
	StringSelectMenuBuilder,
} from "discord.js";

export default class TestCommand extends Commands<ApplicationCommandType.ChatInput> {
	constructor() {
		super({
			data: {
				type: ApplicationCommandType.ChatInput,
				name: "test",
				description: "A test command.",
				dmPermission: false,
				defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
			},
			options: {
				onlyDeveloper: true,
				onlyOwner: true,
				toGuild: true,
			},
		});
	}

	public override async run(interaction: ChatInputCommandInteraction) {
		const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder().setCustomId("example-menu").setPlaceholder("Test menu").addOptions({
				value: "example-value",
				label: "Example value!",
				description: "This is a example value!",
			}),
		);

		await interaction.reply({ components: [row] });
	}
}
