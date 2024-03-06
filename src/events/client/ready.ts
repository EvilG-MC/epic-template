import { VERSION } from "#template/constants";
import { Listeners } from "#template/builders";
import type { Base } from "#template/client";

import { Events } from "discord.js";

export default class ReadyEvent extends Listeners<Events.ClientReady> {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	public override async run(client: Base) {
		if (!client.user) return;

		await client.deployInteractions();

		client.logger.log(`API - Logged in as: ${client.user.username}.`);
		client.logger.log(`Client - ${client.user.username} v${VERSION} is now ready.`);
	}
}
