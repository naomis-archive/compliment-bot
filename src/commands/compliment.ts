import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

import { Command } from "../interfaces/Command";

export const compliment: Command = {
  data: new SlashCommandBuilder()
    .setName("compliment")
    .setDescription("Send an anonymous compliment to Naomi!"),
  run: async (bot, interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("compliment")
      .setTitle("Anonymous Compliment!");
    const input = new TextInputBuilder()
      .setCustomId("compliment-input")
      .setLabel("What do you want to say to Naomi? Be nice!")
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(1)
      .setMaxLength(4000);
    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input);
    modal.addComponents(row);
    await interaction.showModal(modal);
  },
};
