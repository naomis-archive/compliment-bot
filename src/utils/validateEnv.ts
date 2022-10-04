import { WebhookClient } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";

/**
 * Module to validate the environment variables and cache them in the bot.
 *
 * @returns {ExtendedClient["env"]} The environment variables.
 */
export const validateEnv = (): ExtendedClient["env"] => {
  if (
    !process.env.TOKEN ||
    !process.env.GUILD ||
    !process.env.CHANNEL ||
    !process.env.HOOK
  ) {
    throw new Error("Missing environment variables");
  }

  return {
    token: process.env.TOKEN,
    guild: process.env.GUILD,
    channel: process.env.CHANNEL,
    hook: new WebhookClient({ url: process.env.HOOK }),
  };
};
