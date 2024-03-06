import { type ApplicationCommandData, ApplicationCommandType, type AutocompleteInteraction, type Awaitable } from "discord.js";
import type { ClientCommand, CommandInteractions, CommandOptions } from "#template/types";
import type { Base } from "#template/client";

export abstract class Commands<K extends ApplicationCommandType> implements ClientCommand<K> {
	readonly data: ApplicationCommandData & { type: K };
	readonly options?: CommandOptions;

	/**
	 *
	 * Create a new command.
	 * @param command
	 */
	constructor(command: ClientCommand<K>) {
		this.data = command.data;
		this.options = command.options;
	}

	/**
	 *
	 * The command run callback.
	 * @param interaction
	 * @param client
	 */
	public abstract run(interaction: CommandInteractions[K], client: Base): Awaitable<any>;

	/**
	 *
	 * The command autocomplete callback.
	 * @param interaction
	 * @param client
	 */
	public autocomplete?(interaction: AutocompleteInteraction, client: Base): Awaitable<any>;

	/**
	 *
	 * Check if the command is a `slash command`.
	 * @returns
	 */
	public isSlashCommand(): this is SlashCommand {
		return this.data.type === ApplicationCommandType.ChatInput;
	}

	/**
	 *
	 * Check if the command is a `message context command`.
	 * @returns
	 */
	public isMessageCommand(): this is MessageCommand {
		return this.data.type === ApplicationCommandType.Message;
	}

	/**
	 *
	 * Check if the command is a `user context command`.
	 * @returns
	 */
	public isUserCommand(): this is UserCommand {
		return this.data.type === ApplicationCommandType.User;
	}
}

type SlashCommand = Commands<ApplicationCommandType.ChatInput>;
type MessageCommand = Commands<ApplicationCommandType.Message>;
type UserCommand = Commands<ApplicationCommandType.User>;
