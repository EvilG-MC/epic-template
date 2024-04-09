import { Listeners } from "#template/builders";
import type { Base } from "#template/client";
import { commandsListener, componentsListener } from "#template/listeners";

import { Events, type Interaction } from "discord.js";

export default class InteractionCreate extends Listeners<Events.InteractionCreate> {
    constructor() {
        super({
            name: Events.InteractionCreate,
        });
    }

    public override async run(client: Base, interaction: Interaction) {
        await commandsListener(client, interaction);
        await componentsListener(client, interaction);
    }
}
