import type { Awaitable, ClientEvents } from "discord.js";
import type { ClientEvent } from "#template/types";
import type { Base } from "#template/client";

export abstract class Listeners<K extends keyof ClientEvents> implements ClientEvent<K> {
	readonly name: K;
	readonly disabled?: boolean;
	readonly once?: boolean;

	/**
	 *
	 * Create a new event.
	 * @param event
	 */
	constructor(event: ClientEvent<K>) {
		this.name = event.name;
		this.disabled = event.disabled;
		this.once = event.once;
	}

	/**
	 *
	 * The event run callback.
	 * @param client
	 * @param args
	 */
	public abstract run(client: Base, ...args: ClientEvents[K]): Awaitable<any>;
}
