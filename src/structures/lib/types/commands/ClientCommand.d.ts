import {
	type ApplicationCommandData,
	type ApplicationCommandType,
	AutocompleteInteraction,
	Awaitable,
	type ChatInputCommandInteraction,
	type MessageContextMenuCommandInteraction,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import type { CommandOptions } from "#template/types";
import { Base } from "dist/structures/base/Base.ts";

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
