import type { Awaitable, ClientEvents } from "discord.js";
import type { Base } from "#template/client";

export type ClientEventRun<K extends keyof ClientEvents> = (client: Base, ...args: ClientEvents[K]) => Awaitable<any>;

export interface ClientEvent<K extends keyof ClientEvents> {
    /** The event name. */
    name: K;
    /** The event run. */
    run: ClientEventRun<K>;
    /** Emit the event one time. */
    once?: boolean;
    /** The event will be ignored */
    disabled?: boolean;
}
