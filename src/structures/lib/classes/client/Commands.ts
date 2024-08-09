import { type ApplicationCommandData, ApplicationCommandType } from "discord.js";
import type { ClientCommand, ClientCommandAutocomplete, ClientCommandRun, CommandOptions } from "#template/types";

export class Command<K extends ApplicationCommandType> implements ClientCommand<K> {
    readonly data: ApplicationCommandData & { type: K };
    readonly run: ClientCommandRun<K>;

    readonly options?: CommandOptions;
    readonly autocomplete?: ClientCommandAutocomplete;

    /**
     *
     * Create a new command.
     * @param command
     */
    constructor(command: ClientCommand<K>) {
        this.data = command.data;
        this.options = command.options;
        this.run = command.run;
        this.autocomplete = this.autocomplete;
    }

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

type SlashCommand = Command<ApplicationCommandType.ChatInput>;
type MessageCommand = Command<ApplicationCommandType.Message>;
type UserCommand = Command<ApplicationCommandType.User>;
