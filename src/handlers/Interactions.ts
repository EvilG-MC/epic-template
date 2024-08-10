import type { ApplicationCommandType } from "discord.js";
import { type Command, Handlers } from "#template/builders";
import type { Base } from "#template/client";

const commandTypes: Record<ApplicationCommandType, string> = {
    "1": "Slash",
    "2": "User Context",
    "3": "Message Context",
};

export default class Interactions extends Handlers {
    public override async load(client: Base) {
        const { table } = this;

        const files = await this.loadFiles("commands");
        if (!files.length) table.addRow("No commands.", "Empty.");

        await Promise.all(
            files.map(async (file) => {
                const command = await this.import<Command<ApplicationCommandType>>(file);

                if (!command) return table.addRow("Missing", "Missing command.");
                if (!command.data) return table.addRow("Missing", "Missing command data.");
                if (!command.data.name) return table.addRow("Missing", "Missing command name.");

                if (command.isUserCommand() || command.isMessageCommand() && command.autocomplete) return table.addRow(command.data.name, "Context cannot have autocomplete.")

                if (command.options?.disabled) return table.addRow(command.data.name, "Disabled.");

                if (command.options?.toGuild) client.devArray.push(command.data);
                else client.appArray.push(command.data);

                if (command.isSlashCommand()) client.commands.interaction.set(command.data.name, command);
                else if (command.isUserCommand() || command.isMessageCommand()) client.commands.context.set(command.data.name, command);

                table.addRow(command.data.name, "Loaded.", commandTypes[command.data.type]);
            }),
        );

        return console.info(table.toString());
    }
}
