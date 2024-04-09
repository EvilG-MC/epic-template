import type { AnySelectMenuInteraction, ButtonInteraction, ModalSubmitInteraction } from "discord.js";

import type { ComponentOptions } from "../shared/ComponentOptions.ts";
import type { ActionRowType } from "../util/Enums.ts";

interface ComponentInteractions {
    1: ButtonInteraction;
    2: ModalSubmitInteraction;
    3: AnySelectMenuInteraction;
}

export interface ClientComponent<K extends ActionRowType> {
    /** The component custom id. */
    customId: string;
    /** The component type. */
    type: K;
    /** The options to handle. */
    options?: ComponentOptions<K>;
}
