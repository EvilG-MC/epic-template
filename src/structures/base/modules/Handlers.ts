import { Handlers } from "#template/builders";
import type { Base } from "#template/client";

export class Handler extends Handlers {
	private client: Base;

	constructor(client: Base) {
		super();
		this.client = client;
	}

	/**
	 *
	 * Load the bot handlers.
	 * @returns
	 */
	public override async load() {
		const { client, table } = this;

		const files = await this.loadFiles("handlers");
		if (!files.length) return client.logger.warn("There are no handlers to load.");

		await Promise.all(
			files.map(async (file) => {
				const Handler = await this.import(file);
				const handler: Handlers = new Handler();

				if (!(handler instanceof Handlers)) return;
				if (!handler) table.addRow("Missing", "Missing handler.");

				await handler.load(client);

				table.addRow(handler.name, "Loaded.");
			}),
		);

		console.log(table.toString());
		client.logger.log(`Client - Loaded: ${files.length} handlers.`);
	}
}
