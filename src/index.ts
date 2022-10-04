import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { handleEvents } from "./events/handleEvents";
import { ExtendedClient } from "./interfaces/ExtendedClient";
import { loadCommands } from "./utils/loadCommands";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
  bot.env = validateEnv();
  bot.commands = await loadCommands();
  handleEvents(bot);
  await bot.login(bot.env.token);
})();
