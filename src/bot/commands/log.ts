import { InlineKeyboard } from "grammy";
import bot from "../bot"
import { db } from "@/db";

bot.command("log", async (ctx) => {
  const amount = ctx.match; // Grab the number after /log
  if (!amount) return ctx.reply("Please specify an amount: `/log 100`", { parse_mode: "Markdown" });

  const keyboard = new InlineKeyboard()
    .text("🍔 Food", `log_expense:${amount}:FOOD`)
    .text("🚌 Travel", `log_expense:${amount}:TRAVEL`)
    .row() // New line
    .text("💻 Tech", `log_expense:${amount}:TECH`)
    .text("📈 Investment", `log_expense:${amount}:INVESTMENT`);

  await ctx.reply(`₹${amount}? Pick a category:`, { reply_markup: keyboard });
});

// Handling the button click
bot.callbackQuery(/^log_expense:(\d+):(\w+)$/, async (ctx) => {
  const [_, amount, category] = ctx.match;
  
  // Save to CockroachDB via Prisma
  await db.transaction.create({
    data: {
      userId: BigInt(ctx.from.id),
      amount: -parseFloat(amount),
      category: category,
      type: "EXPENSE"
    }
  });

  await ctx.editMessageText(`✅ Logged ₹${amount} for ${category}!`);
});