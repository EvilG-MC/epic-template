import { ActionRowType } from "../util/ActionRowType.js";

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
};

export type ComponentOptions<K extends ActionRowType> = K extends ActionRowType.SelectMenu ? BaseOptions : Omit<BaseOptions, "multiple" | "value">;