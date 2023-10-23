import { ClientCommand } from "#template/types";
import { ApplicationCommandType } from "discord.js";

export function createCommand<K extends ApplicationCommandType>(command: ClientCommand<K>) {
    if (!command.type) command.type = command.data.type;
    return command;
};