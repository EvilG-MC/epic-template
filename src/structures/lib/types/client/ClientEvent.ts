import { Awaitable, ClientEvents } from "discord.js";
import { Base } from "#template/client";

export interface ClientEvent<K extends keyof ClientEvents = keyof ClientEvents> {
    /** The event name. */
    name: K;
    /** Emit the event one time. */
    once?: boolean;
    /** The event will be ignored */
    disabled?: boolean;
    /** The event execute function. */
    execute: (client: Base, ...args: ClientEvents[K]) => Awaitable<unknown>;
};