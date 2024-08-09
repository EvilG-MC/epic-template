import { Listener } from "#template/builders";
import { commandsListener, componentsListener } from "#template/listeners";

import { Events } from "discord.js";

export default new Listener({
    name: Events.InteractionCreate,
    run: async (client, interaction) => {
        await commandsListener(client, interaction);
        await componentsListener(client, interaction);
    },
});
