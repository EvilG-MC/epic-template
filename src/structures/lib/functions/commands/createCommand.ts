import { ClientCommand } from "#template/types";
import { ApplicationCommandType } from "discord.js";

export function createCommand<K extends ApplicationCommandType>(command: ClientCommand<K>) {
    command.data.type = command.type;
    return command;
};