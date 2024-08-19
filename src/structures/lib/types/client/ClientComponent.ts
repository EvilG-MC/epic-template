import type { AnySelectMenuInteraction, Awaitable, ButtonInteraction, ChannelSelectMenuInteraction, MentionableSelectMenuInteraction, ModalSubmitInteraction, RoleSelectMenuInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";

import type { Base } from "#template/client";
import type { ActionRowType, ComponentOptions } from "#template/types";

export type ClientComponentRun<K extends ActionRowType> = (interaction: ComponentInteractions[K], client: Base) => Awaitable<any>;

interface ComponentInteractions {
    [ActionRowType.Button]: ButtonInteraction;
    [ActionRowType.Modal]: ModalSubmitInteraction;
    [ActionRowType.SelectMenu]: AnySelectMenuInteraction;
    [ActionRowType.StringSelect]: StringSelectMenuInteraction;
    [ActionRowType.UserSelect]: UserSelectMenuInteraction;
    [ActionRowType.RoleSelect]: RoleSelectMenuInteraction;
    [ActionRowType.MentionableSelect]: MentionableSelectMenuInteraction;
    [ActionRowType.ChannelSelect]: ChannelSelectMenuInteraction;

}

export interface ClientComponent<K extends ActionRowType> {
    /** The component custom id. */
    customId: string;
    /** The component type. */
    type: K;
    /** The component run callback. */
    run: ClientComponentRun<K>;
    /** The options to handle. */
    options?: ComponentOptions<K>;
}
