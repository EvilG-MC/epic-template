import { Listener } from "#template/builders";
import { VERSION } from "#template/constants";

import { Events } from "discord.js";

export default new Listener({
    name: Events.ClientReady,
    once: true,
    run: async (client) => {
        if (!client.user) return;

        await client.deployInteractions();

        client.logger.log(`API - Logged in as: ${client.user.username}.`);
        client.logger.log(`Client - ${client.user.username} v${VERSION} is now ready.`);
    },
});
