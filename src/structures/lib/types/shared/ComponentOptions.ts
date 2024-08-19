import type { ActionRowType, When } from "#template/types";

export interface BaseOptions {
    /** The component only can be executed by the developer(s). */
    onlyDeveloper?: boolean;
    /** The component only can be executed by the server owner(s). */
    onlyOwner?: boolean;
    /** The component will be ignored by the handler. */
    disabled?: boolean;

    /** The menu will listen all values. */
    multiple?: boolean;
    /** The menu will listen a specific value. */
    value?: string;
}

type NonMenuOptions = Omit<BaseOptions, "multiple" | "value">;
type AnySelectMenuType = ActionRowType.SelectMenu | ActionRowType.StringSelect | ActionRowType.UserSelect | ActionRowType.RoleSelect | ActionRowType.MentionableSelect | ActionRowType.ChannelSelect;

export type ComponentOptions<K extends ActionRowType> = When<K, AnySelectMenuType, BaseOptions, NonMenuOptions>;
