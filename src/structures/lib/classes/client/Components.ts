import { ActionRowType, type ClientComponent, type ClientComponentRun, type ComponentOptions } from "#template/types";

export class Component<K extends ActionRowType> implements ClientComponent<K> {
    readonly type: K;
    readonly customId: string;
    readonly run: ClientComponentRun<K>;

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
        this.run = component.run;
    }

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
        const selectMenus: ActionRowType[] = [
            ActionRowType.ChannelSelect,
            ActionRowType.MentionableSelect,
            ActionRowType.RoleSelect,
            ActionRowType.SelectMenu,
            ActionRowType.StringSelect,
            ActionRowType.UserSelect,
        ];

        return selectMenus.includes(this.type);
    }
}

type ButtonComponent = Component<ActionRowType.Button>;
type ModalComponent = Component<ActionRowType.Modal>;
type MenuComponent = Component<ActionRowType.SelectMenu>;
