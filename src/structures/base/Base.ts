import {
    type ApplicationCommandDataResolvable,
    type ApplicationCommandType,
    Client,
    Collection,
    type ContextMenuCommandType,
    GatewayIntentBits,
    Options,
    Partials,
} from "discord.js";

import type { Command, Component } from "#template/builders";
import { Configuration } from "#template/config";
import type { ActionRowType, ClientConfiguration } from "#template/types";

import { Logger } from "#template/utils/Logger.js";
import { Handler } from "./modules/Handlers.js";

export class Base extends Client {
    public readonly config: ClientConfiguration = Configuration;
    public readonly logger: Logger = new Logger();
    
    public handler: Handler;

    public commands: {
        interaction: Collection<string, Command<ApplicationCommandType.ChatInput>>;
        context: Collection<string, Command<ContextMenuCommandType>>;
    };
    public components: {
        buttons: Collection<string, Component<ActionRowType.Button>>;
        menus: Collection<string, Component<ActionRowType.SelectMenu>>;
        modals: Collection<string, Component<ActionRowType.Modal>>;
    };

    public devArray: ApplicationCommandDataResolvable[] = [];
    public appArray: ApplicationCommandDataResolvable[] = [];

    constructor() {
        super({
            partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ],
            allowedMentions: {
                repliedUser: false,
            },
            makeCache: Options.cacheWithLimits({
                ...Options.DefaultMakeCacheSettings,
                GuildScheduledEventManager: 0,
                GuildStickerManager: 0,
                AutoModerationRuleManager: 0,
                ReactionUserManager: 0,
                StageInstanceManager: 0,
                ReactionManager: 0,
            }),
        });

        this.config = Configuration;
        this.handler = new Handler(this);

        this.commands = {
            context: new Collection(),
            interaction: new Collection(),
        };
        this.components = {
            buttons: new Collection(),
            menus: new Collection(),
            modals: new Collection(),
        };

        this.start();
    }

    /**
     * The main bot process.
     */
    private async start() {
        await this.handler.load();
        await this.login(process.env.TOKEN).catch((error) => this.logger.error(`API - ${error}`));
    }

    /**
     *
     * Deploy the interactions to the `application` and `guilds`.
     * @returns
     */
    public async deployInteractions() {
        this.logger.warn("API - Attemping to refresh commands...");

        try {
            await this.application?.commands.set(this.appArray);

            const guildIds = this.config.guildIds.filter(String);
            if (!guildIds.length) return this.logger.warn("There are no developer guild(s)... Ignoring.");

            for (const guildId of guildIds) {
                const guild = await this.guilds.fetch(guildId).catch(() => null);
                if (guild) {
                    await guild.commands.set(this.devArray);
                    this.logger.log(`API - Commands deployed on: ${guild.name}.`);
                }
            }

            this.logger.log("Client - Commands refreshed.");
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * Reload the bot.
     * @returns
     */
    public async reload() {
        this.logger.warn("Client - Attemping to reload...");

        try {
            this.commands.interaction.clear();
            this.commands.context.clear();

            this.components.buttons.clear();
            this.components.menus.clear();
            this.components.modals.clear();

            this.appArray = [];
            this.devArray = [];

            await this.handler.load();
            await this.deployInteractions();

            this.logger.log("Client - Reload complete.");
        } catch (error) {
            this.logger.error(`Client - ${error}`);
        }
    }
}
