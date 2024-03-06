import { type Components, Handlers } from "#template/builders";
import type { Base } from "#template/client";
import type { ActionRowType } from "#template/types";

const componentTypes: Record<ActionRowType, string> = {
	"1": "Button",
	"2": "Modal",
	"3": "Select Menu",
};

export default class Rows extends Handlers {
	public override async load(client: Base) {
		const { table } = this;

		const files = await this.loadFiles("components");
		if (!files.length) table.addRow("No components.", "Empty.");

		await Promise.all(
			files.map(async (file) => {
				const Component = await this.import(file);
				const component: Components<ActionRowType> = new Component();

				if (!component) return table.addRow("Missing", "Missing component.");
				if (!component.customId) return table.addRow("Missing", "Missing component customId.");

				if (component.options?.disabled) return table.addRow(component.customId, "Disabled.");

				if (component.isButton()) client.components.buttons.set(component.customId, component);
				else if (component.isModal()) client.components.modals.set(component.customId, component);
				else if (component.isMenu()) client.components.menus.set(component.customId, component);

				table.addRow(component.customId, "Loaded.", componentTypes[component.type]);
			}),
		);

		return console.log(table.toString());
	}
}
