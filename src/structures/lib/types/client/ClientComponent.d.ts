import {
	Awaitable,
	type ButtonInteraction,
	type ModalSubmitInteraction,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
	RoleSelectMenuInteraction,
	ChannelSelectMenuInteraction,
	type AnySelectMenuInteraction,
} from "discord.js";
import { Base } from "dist/structures/base/Base.ts";

import type { ActionRowType } from "../util/Enums.ts";
import type { ComponentOptions } from "../shared/ComponentOptions.ts";

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
