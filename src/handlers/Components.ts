import { type Component, Handlers } from "#template/builders";
import type { Base } from "#template/client";
import { ActionRowType } from "#template/types";

const componentTypes: Record<ActionRowType, string> = {
    [ActionRowType.Button]: "Button",
    [ActionRowType.Modal]: "Modal",
    [ActionRowType.SelectMenu]: "Select Menu",

    [ActionRowType.StringSelect]: "String Menu",
    [ActionRowType.UserSelect]: "User Menu",
    [ActionRowType.RoleSelect]: "Role Menu",
    [ActionRowType.MentionableSelect]: "Mentionable Menu",    
    [ActionRowType.ChannelSelect]: "Channel Menu",
};

export default class Rows extends Handlers {
    public override async load(client: Base) {
        const { table } = this;

        const files = await this.loadFiles("components");
        if (!files.length) table.addRow("No components.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const component = await this.import<Component<ActionRowType>>(file);

                if (!component) return table.addRow("Missing", "Missing component.");
                if (!component.customId) return table.addRow("Missing", "Missing component customId.");

                if (component.options?.disabled) return table.addRow(component.customId, "Disabled.");

                if (component.isButton()) client.components.buttons.set(component.customId, component);
                else if (component.isModal()) client.components.modals.set(component.customId, component);
                else if (component.isMenu()) client.components.menus.set(component.customId, component);

                table.addRow(component.customId, "Loaded.", componentTypes[component.type]);
            }),
        );

        return console.info(table.toString());
    }
}
