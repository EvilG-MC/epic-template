import { createEvent } from "#template/functions";
import { Events } from "discord.js";

import { VERSION } from "#template/constants";

export default createEvent({
    name: Events.ClientReady,
    once: true,
    execute: async (client) => {
        if (!client.user) return;

        await client.handlers.loadCommands();

        client.logger.log(`API - Logged in as: ${client.user.username}.`);
        client.logger.info(`Client - ${client.user.username} v${VERSION} is now ready.`);
    },
});