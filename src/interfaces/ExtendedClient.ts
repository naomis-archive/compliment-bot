import { Client, WebhookClient } from "discord.js";

import { Command } from "./Command";

export interface ExtendedClient extends Client {
  env: {
    token: string;
    guild: string;
    channel: string;
    hook: WebhookClient;
  };
  commands: Command[];
}
