import { createCommand } from "#template/functions";
import { ActionRowBuilder, ApplicationCommandType, PermissionsBitField, StringSelectMenuBuilder } from "discord.js";

export default createCommand({
    data: {
        type: ApplicationCommandType.ChatInput,
        name: "test",
        description: "A test command.",
        dmPermission: false,
        defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    },
    options: {
        onlyDeveloper: true,
        onlyOwner: true,
        toGuild: true,
    },
    execute: async (interaction, client) => {
        //You can test components here...

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("example-menu")
                    .setPlaceholder("Test menu")
                    .addOptions(
                        {
                            value: "example-value",
                            label: "Example value!",
                            description: "This is a example value!",
                        },
                    ),
            );

            await interaction.reply({ components: [row] });
    },
});