import { ComponentType } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { registerCommands } from "../utils/registerCommands";

/**
 * Mounts the event listeners to the bot.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const handleEvents = (bot: ExtendedClient): void => {
  bot.on("ready", async () => {
    await registerCommands(bot, bot.commands);
    await bot.env.hook.send({ content: `Logged in as ${bot.user?.tag}` });
  });

  bot.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = bot.commands.find(
        (c) => c.data.name === interaction.commandName
      );

      if (!command) {
        await interaction.editReply({ content: "Unknown command!" });
        return;
      }
      await command.run(bot, interaction);
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === "compliment") {
        const input = interaction.fields.getField(
          "compliment-input",
          ComponentType.TextInput
        ).value;
        await bot.env.hook.send({ content: input });
        await interaction.reply({
          content: "Compliment sent!",
          ephemeral: true,
        });
      }
    }
  });
};
