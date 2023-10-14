
export interface CommandOptions {
    /** The command only can be executed by the developer(s). */
    onlyDeveloper?: boolean;
    /** The command only can be executed by the server owner(s). */
    onlyOwner?: boolean;
    /** Send the command to the developer guild(s). */
    toGuild?: boolean;
    /** The command will be ignored by the handler. */
    disabled?: boolean;
};