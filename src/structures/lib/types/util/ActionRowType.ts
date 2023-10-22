
export enum ActionRowType {
    Button = 2,
    Modal = 3,

    StringMenu = 4,
    UserMenu = 5,
    RoleMenu = 6,
    ChannelMenu = 7,

    SelectMenu = 8,
};

export type SelectMenuRowType = ActionRowType.ChannelMenu | ActionRowType.RoleMenu | ActionRowType.StringMenu | ActionRowType.UserMenu | ActionRowType.SelectMenu;