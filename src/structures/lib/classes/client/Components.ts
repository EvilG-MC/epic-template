import type { Awaitable } from "discord.js";
import type { Base } from "#template/client";
import { ActionRowType, type ClientComponent, type ComponentInteractions, type ComponentOptions } from "#template/types";

export abstract class Components<K extends ActionRowType> implements ClientComponent<K> {
    readonly type: K;
    readonly customId: string;
    readonly options?: ComponentOptions<K>;

    /**
     *
     * Create a new component.
     * @param component
     */
    constructor(component: ClientComponent<K>) {
        this.customId = component.customId;
        this.type = component.type;
        this.options = component.options;
    }

    /**
     *
     * The component run callback.
     * @param interaction
     * @param client
     */
    public abstract run(interaction: ComponentInteractions[K], client: Base): Awaitable<any>;

    /**
     *
     * Check if the component is a `button`.
     * @returns
     */
    public isButton(): this is ButtonComponent {
        return this.type === ActionRowType.Button;
    }

    /**
     *
     * Check if the component is a `modal`.
     * @returns
     */
    public isModal(): this is ModalComponent {
        return this.type === ActionRowType.Modal;
    }

    /**
     *
     * Check if the component is a `select menu`.
     * @returns
     */
    public isMenu(): this is MenuComponent {
        return this.type === ActionRowType.SelectMenu;
    }
}

type ButtonComponent = Components<ActionRowType.Button>;
type ModalComponent = Components<ActionRowType.Modal>;
type MenuComponent = Components<ActionRowType.SelectMenu>;
