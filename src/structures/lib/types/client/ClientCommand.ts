import {
    type ApplicationCommandData,
    ApplicationCommandType,
    type AutocompleteInteraction,
    type Awaitable,
    type ChatInputCommandInteraction,
    type MessageContextMenuCommandInteraction,
    type UserContextMenuCommandInteraction,
} from "discord.js";
import type { Base } from "#template/client";
import type { CommandOptions } from "#template/types";

interface CommandInteractions {
    [ApplicationCommandType.ChatInput]: ChatInputCommandInteraction;
    [ApplicationCommandType.User]: UserContextMenuCommandInteraction;
    [ApplicationCommandType.Message]: MessageContextMenuCommandInteraction;
}

export type ClientCommandRun<K extends ApplicationCommandType> = (interaction: CommandInteractions[K], client: Base) => Awaitable<any>;
export type ClientCommandAutocomplete = (interaction: AutocompleteInteraction, client: Base) => Awaitable<any>;

export interface ClientCommand<K extends ApplicationCommandType> {
    /** The application command data. */
    data: ApplicationCommandData & { type: K };
    /** The command run. */
    run: ClientCommandRun<K>;
    /** The options to handle. */
    options?: CommandOptions;
    /** The command autocomplete. */
    autocomplete?: ClientCommandAutocomplete;
}
