import type { AnySelectMenuInteraction, Awaitable, ButtonInteraction, ModalSubmitInteraction } from "discord.js";

import type { Base } from "#template/client";
import type { ComponentOptions } from "../shared/ComponentOptions.js";
import { ActionRowType } from "../util/Enums.js";

export type ClientComponentRun<K extends ActionRowType> = (interaction: ComponentInteractions[K], client: Base) => Awaitable<any>;

interface ComponentInteractions {
    [ActionRowType.Button]: ButtonInteraction;
    [ActionRowType.Modal]: ModalSubmitInteraction;
    [ActionRowType.SelectMenu]: AnySelectMenuInteraction;
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
