import { Awaitable, type ClientEvents } from "discord.js";
import { Base } from "dist/structures/base/Base.ts";

export interface ClientEvent<K extends keyof ClientEvents> {
	/** The event name. */
	name: K;
	/** Emit the event one time. */
	once?: boolean;
	/** The event will be ignored */
	disabled?: boolean;
}
