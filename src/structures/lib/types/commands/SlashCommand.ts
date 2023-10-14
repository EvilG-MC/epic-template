import { CommandOptions } from "../shared/CommandOptions.js";

import { ApplicationCommandData, AutocompleteInteraction, Awaitable, ChatInputCommandInteraction } from "discord.js";
import { Base } from "#template/client";

export interface SlashCommand {
    /** The application command data. */
    data: ApplicationCommandData;
    /** The options to handle. */
    options?: CommandOptions;
    /** The command execute function. */
    execute: (interaction: ChatInputCommandInteraction, client: Base) => Awaitable<unknown>;
    /** The autocomplete execute function. */
    autocomplete?: (interaction: AutocompleteInteraction, client: Base) => Awaitable<unknown>;
};