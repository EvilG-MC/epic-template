import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits, Options, Partials } from "discord.js";

import { Configuration } from "#template/config";
import { ActionRowType, ClientComponent, Config, SelectMenuRowType, SlashCommand } from "#template/types";

import { Logger } from "#template/utils/Logger.js";
import { Handlers } from "../handler/Handlers.js";

export class Base extends Client {
    public readonly config: Config;

    public logger: Logger;
    public handlers: Handlers;

    public commands: Collection<string, SlashCommand>;
    public components: {
        buttons: Collection<string, ClientComponent<ActionRowType.Button>>,
        menus: Collection<string, ClientComponent<SelectMenuRowType>>,
        modals: Collection<string, ClientComponent<ActionRowType.Modal>>,
    };

    public devArray: ApplicationCommandDataResolvable[];
    public appArray: ApplicationCommandDataResolvable[];

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
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

        this.logger = new Logger();
        this.handlers = new Handlers(this);

        this.commands = new Collection();
        this.components = {
            buttons: new Collection(),
            menus: new Collection(),
            modals: new Collection(),
        };

        this.appArray = [];
        this.devArray = [];

        this.start();
    };

    private async start() {
        await this.loadHandlers();
        await this.login(this.config.token).catch((error) => this.logger.error(`API - ${error}`));
    };

    private async loadHandlers() {
        await this.handlers.loadEvents();
        await this.handlers.loadButtons();
        await this.handlers.loadMenus();
        await this.handlers.loadModals();
        await this.handlers.loadCommands();
    };

    public async deployInteractions() {
        this.logger.warn("API - Attemping to refresh commands...");

        try {
            await this.application?.commands.set(this.appArray);

            for (const guildId of this.config.guildIds) {
                const guild = await this.guilds.fetch(guildId).catch(() => null);
                if (guild) {
                    await guild.commands.set(this.devArray);
                    this.logger.info(`API - Commands deployed on: ${guild.name}.`);
                };
            };

            this.logger.log("Client - Commands refreshed.");
        } catch (error) {
            return this.logger.error(`API - ${error}`);
        };
    };

    public async reload() {
        this.logger.warn("Client - Attemping to reload...");

        try {
            this.commands.clear();

            this.components.buttons.clear();
            this.components.menus.clear();
            this.components.modals.clear();

            this.appArray = [];
            this.devArray = [];

            await this.loadHandlers();
            await this.deployInteractions();

            return this.logger.info("Client - Reload complete.");
        } catch (error) {
            return this.logger.error(`Client - ${error}`);
        };
    };
};