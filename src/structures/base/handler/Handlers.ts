import { Base } from "#template/client";
import { ActionRowType, ClientComponent, ClientEvent, SelectMenuRowType, SlashCommand } from "#template/types";
import { loadFiles } from "#template/utils/function/loadFiles.js";

import { AsciiTable3 } from "ascii-table3";
import { pathToFileURL } from "node:url";
import { Events } from "./validation/Events.js";
import { ApplicationCommandType, Awaitable } from "discord.js";

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
        const files = await loadFiles("commands");

        if (!files.length) table.addRow("No commands.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const command: SlashCommand = await this.import(file);

                if (!command) return table.addRow("Missing", "Missing command.");
                if (!command.data) return table.addRow("Missing", "Missing command data.");
                if (!command.data.name) return table.addRow("Missing", "Missing command name.");

                if (command.data.type !== ApplicationCommandType.ChatInput) return table.addRow(command.data.name, "Invalid command type.");
                if (command.options?.disabled) return table.addRow(command.data.name, "Disabled.");

                if (!command.data.description) return table.addRow(command.data.name, "Missing command description.");

                if (command.options?.toGuild) client.devArray.push(command.data);
                else client.appArray.push(command.data);

                client.commands.set(command.data.name, command);
                table.addRow(command.data.name, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };

    public async loadButtons() {
        const { client } = this;

        const table = new AsciiTable3("Buttons").setStyle("unicode-single");
        const files = await loadFiles("components/buttons");

        if (!files.length) table.addRow("No buttons.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const button: ClientComponent<ActionRowType.Button> = await this.import(file);

                if (!button) return table.addRow("Missing", "Missing button.");
                if (!button.customId) return table.addRow("Missing", "Missing button customId.");

                if (button.type !== ActionRowType.Button) return table.addRow(button.customId, "Missing button type.");

                if (button.options?.disabled) return table.addRow(button.customId, "Disabled.");

                client.components.buttons.set(button.customId, button);
                table.addRow(button.customId, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };

    public async loadMenus() {
        const { client } = this;

        const table = new AsciiTable3("Menus").setStyle("unicode-single");
        const files = await loadFiles("components/menus");

        if (!files.length) table.addRow("No buttons.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const menu: ClientComponent<SelectMenuRowType> = await this.import(file);

                if (!menu) return table.addRow("Missing", "Missing menu.");
                if (!menu.customId) return table.addRow("Missing", "Missing menu customId.");

                // don't ask, i don't want a if of a 3m of large. 
                const isSelectMenu = menu.type === ActionRowType.StringMenu
                    || menu.type === ActionRowType.UserMenu
                    || menu.type === ActionRowType.RoleMenu
                    || menu.type === ActionRowType.ChannelMenu
                    || menu.type === ActionRowType.SelectMenu;

                if (!isSelectMenu) return table.addRow(menu.customId, "Invalid menu type.");
                if (menu.options?.multiple && menu.options.value) return table.addRow(menu.customId, "Invalid listen type.");
                
                if (!menu.options?.multiple && !menu.options?.value) return table.addRow(menu.customId, "Invalid listen type.");

                if (menu.options?.disabled) return table.addRow(menu.customId, "Disabled.");

                client.components.menus.set(menu.customId, menu);
                table.addRow(menu.customId, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };

    public async loadModals() {
        const { client } = this;

        const table = new AsciiTable3("Buttons").setStyle("unicode-single");
        const files = await loadFiles("components/modals");

        if (!files.length) table.addRow("No buttons.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const modal: ClientComponent<ActionRowType.Modal> = await this.import(file);

                if (!modal) return table.addRow("Missing", "Missing modal.");
                if (!modal.customId) return table.addRow("Missing", "Missing modal customId.");

                if (modal.type !== ActionRowType.Modal) return table.addRow(modal.customId, "Missing modal type.");

                if (modal.options?.disabled) return table.addRow(modal.customId, "Disabled.");

                client.components.modals.set(modal.customId, modal);
                table.addRow(modal.customId, "Loaded.");
            }),
        );

        return console.log(table.toString());
    };
};