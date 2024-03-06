import { Commands } from "#template/builders";
import type { Base } from "#template/client";

import { ApplicationCommandType, type ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export default class ReloadCommand extends Commands<ApplicationCommandType.ChatInput> {
	constructor() {
		super({
			data: {
				type: ApplicationCommandType.ChatInput,
				name: "reload",
				description: "Reload this epic bot.",
				dmPermission: false,
				defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
			},
			options: {
				toGuild: true,
				onlyDeveloper: true,
				onlyOwner: true,
			},
		});
	}

	public override async run(interaction: ChatInputCommandInteraction, client: Base) {
		await interaction.deferReply({ ephemeral: true });

		await client
			.reload()
			.then(() => interaction.editReply({ content: "`✅` - The bot has been reloaded." }))
			.catch(() => interaction.editReply({ content: "`❌` - An error ocurred in the reload." }));
	}
}
