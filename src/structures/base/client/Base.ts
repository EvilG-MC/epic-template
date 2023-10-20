import { ApplicationCommandDataResolvable, ApplicationCommandType, Client, Collection, ContextMenuCommandType, GatewayIntentBits, Options, Partials } from "discord.js";

import { Configuration } from "#template/config";
import { ActionRowType, ClientComponent, Config, ClientCommand } from "#template/types";

import { Logger } from "#template/utils/Logger.js";
import { Handlers } from "../handler/Handlers.js";

export class Base extends Client {
    public readonly config: Config;

    public logger: Logger;
    public handlers: Handlers;

    public commands: {
        interaction: Collection<string, ClientCommand<ApplicationCommandType.ChatInput>>;
        context: Collection<string, ClientCommand<ContextMenuCommandType>>;
    };

    public components: {
        buttons: Collection<string, ClientComponent<ActionRowType.Button>>,
        menus: Collection<string, ClientComponent<ActionRowType.SelectMenu>>,
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

        this.commands = {
            interaction: new Collection(),
            context: new Collection(),
        };

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
        await this.handlers.loadContext();
        await this.handlers.loadButtons();
        await this.handlers.loadMenus();
        await this.handlers.loadModals();
    };

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

            await this.loadHandlers();
            await this.handlers.loadCommands();

            return this.logger.info("Client - Reload complete.");
        } catch (error) {
            return this.logger.error(`Client - ${error}`);
        };
    };
};