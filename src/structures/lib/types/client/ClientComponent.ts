import { Awaitable, ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction, RoleSelectMenuInteraction, ChannelSelectMenuInteraction, AnySelectMenuInteraction } from "discord.js";
import { Base } from "#template/client";

import { ActionRowType } from "../util/ActionRowType.js";
import { ComponentOptions } from "../shared/ComponentOptions.js";

interface ComponentInteractions {
    2: ButtonInteraction;
    3: ModalSubmitInteraction;
    4: StringSelectMenuInteraction;
    5: UserSelectMenuInteraction;
    6: RoleSelectMenuInteraction;
    7: ChannelSelectMenuInteraction;
    8: AnySelectMenuInteraction;
};

export interface ClientComponent<K extends ActionRowType> {
    /** The component custom id. */
    customId: string;
    /** The component type. */
    type: K;
    /** The options to handle. */
    options?: ComponentOptions<K>;
    /** The component execute function. */
    execute: (interaction: ComponentInteractions[K], client: Base) => Awaitable<unknown>;
};