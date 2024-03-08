import type { ClientEvents } from "discord.js";

export interface ClientEvent<K extends keyof ClientEvents> {
	/** The event name. */
	name: K;
	/** Emit the event one time. */
	once?: boolean;
	/** The event will be ignored */
	disabled?: boolean;
}
