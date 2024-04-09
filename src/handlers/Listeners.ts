import { Handlers, type Listeners } from "#template/builders";
import type { Base } from "#template/client";

import type { ClientEvents } from "discord.js";

export default class Events extends Handlers {
    public override async load(client: Base) {
        const { table } = this;

        client.removeAllListeners();

        const files = await this.loadFiles("events");
        if (!files.length) table.addRow("No events.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const Event = await this.import(file);
                const event: Listeners<keyof ClientEvents> = new Event();

                if (!event) return table.addRow("Missing", "Missing event.");
                if (!event.name) return table.addRow("Missing", "Missing event name.");

                if (event.disabled) return table.addRow(event.name, "Disabled.");

                const execute = (...args: []) => event.run(client, ...args);

                if (event.once) client.once(event.name, execute);
                else client.on(event.name, execute);

                table.addRow(event.name, "Loaded.");
            }),
        );

        return console.info(table.toString());
    }
}
