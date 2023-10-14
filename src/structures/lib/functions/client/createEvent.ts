import { ClientEvent } from "#template/types";
import { ClientEvents } from "discord.js";

export function createEvent<K extends keyof ClientEvents>(event: ClientEvent<K>) {
    return event;
};