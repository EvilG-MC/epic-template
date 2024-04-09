import type {
    ApplicationCommandData,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from "discord.js";
import type { CommandOptions } from "#template/types";

export interface CommandInteractions {
    1: ChatInputCommandInteraction;
    2: UserContextMenuCommandInteraction;
    3: MessageContextMenuCommandInteraction;
}

export interface ClientCommand<K extends ApplicationCommandType> {
    /** The application command data. */
    data: ApplicationCommandData & { type: K };
    /** The options to handle. */
    options?: CommandOptions;
}
