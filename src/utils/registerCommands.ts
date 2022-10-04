import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import { Command } from "../interfaces/Command";
import { ExtendedClient } from "../interfaces/ExtendedClient";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 *
 * Will register commands globally if in a production environment, otherwise defaults to the
 * home guild only.
 *
 * @param {ExtendedClient} Bot The bot's Discord instance.
 * @param {Command[]} commands The array of command data.
 * @returns {boolean} True if the commands were registered, false on error.
 */
export const registerCommands = async (
  Bot: ExtendedClient,
  commands: Command[]
): Promise<boolean> => {
  const rest = new REST({ version: "9" }).setToken(Bot.env.token);

  const commandData = commands.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(Bot.user?.id || "oopsie", Bot.env.guild),
    {
      body: commandData,
    }
  );
  Bot.env.hook.send({ content: "Loaded commands!" });
  return true;
};
