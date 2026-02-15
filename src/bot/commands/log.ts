import { InlineKeyboard } from "grammy";
import bot from "../bot"
import { db } from "@/db";
import { Composer } from "grammy";

export const logModule = new Composer();

logModule.command("log", async (ctx) => {
  const amount = ctx.match;
  if (!amount) return ctx.reply("Please specify an amount: `/log 100`", { parse_mode: "Markdown" });

  const keyboard = new InlineKeyboard()
    .text("🍔 Food", `log_expense:${amount}:FOOD`)
    .text("🚌 Travel", `log_expense:${amount}:TRAVEL`)
    .row() 
    .text("💻 Tech", `log_expense:${amount}:TECH`)
    .text("📈 Investment", `log_expense:${amount}:INVESTMENT`);

  await ctx.reply(`₹${amount}? Pick a category:`, { reply_markup: keyboard });
});