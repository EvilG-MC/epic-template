import { Command } from "#template/builders";

import { ActionRowBuilder, ApplicationCommandType, PermissionsBitField, StringSelectMenuBuilder } from "discord.js";

export default new Command({
    data: {
        type: ApplicationCommandType.Message,
        name: "test",
        dmPermission: false,
        defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    },
    options: {
        onlyDeveloper: true,
        onlyOwner: true,
        toGuild: true,
    },
    autocomplete: () => {},
    run: async (interaction) => {
        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder().setCustomId("example-menu").setPlaceholder("Test menu").addOptions({
                value: "example-value",
                label: "Example value!",
                description: "This is a example value!",
            }),
        );

        await interaction.reply({ components: [row] });
    },
});
