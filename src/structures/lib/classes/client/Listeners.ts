import type { ClientEvents } from "discord.js";
import type { ClientEvent, ClientEventRun } from "#template/types";

export class Listener<K extends keyof ClientEvents> implements ClientEvent<K> {
    readonly name: K;
    readonly run: ClientEventRun<K>;

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
        this.run = event.run;
    }

    /**
     * 
     * Return if the event only will be executed once.
     * @returns 
     */
    public isOnce(): boolean {
        return !!this.once;
    }
}
