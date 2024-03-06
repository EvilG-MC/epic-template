import { Commands } from "#template/builders";
import type { Base } from "#template/client";

import { ApplicationCommandType, type ChatInputCommandInteraction } from "discord.js";

export default class PingCommand extends Commands<ApplicationCommandType.ChatInput> {
	constructor() {
		super({
			data: {
				type: ApplicationCommandType.ChatInput,
				name: "ping",
				description: "Respond with the ping.",
			},
			options: {
				toGuild: true,
			},
		});
	}

	public override async run(interaction: ChatInputCommandInteraction, client: Base) {
		const message = await interaction.reply({ content: "`⌛` Calculating...", ephemeral: true, fetchReply: true });

		const wsPing = Math.floor(client.ws.ping);
		const clientPing = Math.floor(message.createdTimestamp - interaction.createdTimestamp);

		await interaction.editReply({ content: `\`🚀\` Pong! (API: \`${wsPing}ms\` - CLIENT: \`${clientPing}ms\`)` });
	}
}
