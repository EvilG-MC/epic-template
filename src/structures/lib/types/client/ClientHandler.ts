import type { Awaitable } from "discord.js";
import type { Base } from "#template/client";

export type ClientHandlerRun = (client: Base) => Awaitable<any>;

export interface ClientHandler {
    /** The handler name. */
    name: string;
    /** The handler load callback. */
    load: ClientHandlerRun;
}
