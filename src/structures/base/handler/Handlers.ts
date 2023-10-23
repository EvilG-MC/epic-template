import { Base } from "#template/client";
import { ClientEvent, ClientCommand } from "#template/types";
import { loadFiles } from "#template/utils/function/loadFiles.js";

import { AsciiTable3 } from "ascii-table3";
import { pathToFileURL } from "node:url";
import { Events } from "./validation/Events.js";
import { ApplicationCommandType, Awaitable, ContextMenuCommandType } from "discord.js";

export class Handlers {
    private client: Base;

    constructor(client: Base) {
        this.client = client;
    };

    private async import(file: string) {
        return (await import(`${pathToFileURL(file)}?updated=${Date.now()}`)).default;
    };

    async loadEvents() {
        const { client } = this;

        client.removeAllListeners();

        const table = new AsciiTable3("Events").setStyle("unicode-single");
        const files = await loadFiles("events");

        if (!files.length) table.addRow("No events.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const event: ClientEvent = await this.import(file);

                if (!event) return table.addRow("Missing", "Missing event.");
                if (!event.name || !Events.includes(event.name)) return table.addRow("Missing", "Missing event name.");

                if (event.disabled) return table.addRow(event.name, "Disabled.");

                const execute = (...args: any) => event.execute(client, ...args) as Awaitable<void>;

                if (event.once) client.once(event.name, execute);
                else client.on(event.name, execute);

                table.addRow(event.name, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };

    public async loadCommands() {
        const { client } = this;

        const table = new AsciiTable3("Commands").setStyle("unicode-single");
        const files = await loadFiles("commands/interaction");

        if (!files.length) table.addRow("No commands.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const command: ClientCommand<ApplicationCommandType.ChatInput> = await this.import(file);

                if (!command) return table.addRow("Missing", "Missing command.");
                if (!command.data) return table.addRow("Missing", "Missing command data.");
                if (!command.data.name) return table.addRow("Missing", "Missing command name.");

                if (command.data.type !== ApplicationCommandType.ChatInput) return table.addRow(command.data.name, "Invalid command type.");
                if (command.options?.disabled) return table.addRow(command.data.name, "Disabled.");

                if (!command.data.description) return table.addRow(command.data.name, "Missing command description.");

                if (command.options?.toGuild) client.devArray.push(command.data);
                else client.appArray.push(command.data);

                client.commands.interaction.set(command.data.name, command);
                table.addRow(command.data.name, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };

    public async loadContext() {
        const { client } = this;

        const table = new AsciiTable3("Commands").setStyle("unicode-single");
        const files = await loadFiles("commands/context");

        if (!files.length) table.addRow("No commands.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const command: ClientCommand<ContextMenuCommandType> = await this.import(file);

                if (!command) return table.addRow("Missing", "Missing command.");
                if (!command.data) return table.addRow("Missing", "Missing command data.");
                if (!command.data.name) return table.addRow("Missing", "Missing command name.");

                const isContext = command.data.type === ApplicationCommandType.User || command.data.type === ApplicationCommandType.Message;

                if (!isContext) return table.addRow(command.data.name, "Invalid command type.");
                if (command.options?.disabled) return table.addRow(command.data.name, "Disabled.");

                if (command.options?.toGuild) client.devArray.push(command.data);
                else client.appArray.push(command.data);

                client.commands.context.set(command.data.name, command);
                table.addRow(command.data.name, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };
};