import { CommandOptions } from "../shared/CommandOptions.js";

import { ApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, Awaitable, ChatInputCommandInteraction, ContextMenuCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { Base } from "#template/client";

interface CommandInteraction {
    1: ChatInputCommandInteraction;
    2: UserContextMenuCommandInteraction;
    3: MessageContextMenuCommandInteraction;
};

export interface BaseCommand<K extends ApplicationCommandType> {
    /**
     * The application command type.
     * @deprecated
     * @important Don't use this, use `data#type` instead.
     */
    type?: K;
    /** The application command data. */
    data: ApplicationCommandData & { type: K };
    /** The options to handle. */
    options?: CommandOptions;
    /** The command execute function. */
    execute: (interaction: CommandInteraction[K], client: Base) => Awaitable<unknown>;
    /** The autocomplete execute function. */
    autocomplete?: (interaction: AutocompleteInteraction, client: Base) => Awaitable<unknown>;
};

export type ClientCommand<K extends ApplicationCommandType> = K extends ApplicationCommandType.ChatInput ? BaseCommand<K> : Omit<BaseCommand<K>, "autocomplete">;