import { InlineKeyboard } from "grammy";
import { getDb } from "@/db";
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

logModule.callbackQuery(/^log_expense:(\d+):(\w+)$/, async (ctx) => {
  // 1. Extract the data we hid in the button's callback_data
  const [_, amount, category] = ctx.match;

  try {
    // 2. FINALLY talk to the database
    const db = getDb();
    await db.transaction.create({
      data: {
        userId: BigInt(ctx.from.id),
        amount: -parseFloat(amount), // Negative because it's an expense
        type: "EXPENSE",
        category: category,
        description: `Logged via Bot: ${category}`,
      },
    });

    await ctx.editMessageText(`✅ Logged ₹${amount} for *${category}*`, { 
      parse_mode: "Markdown" 
    });

    await ctx.answerCallbackQuery("Transaction Recorded!");
  } catch (e) {
    console.error("DB Error:", e);
    await ctx.answerCallbackQuery({ text: "❌ Database Error!", show_alert: true });
  }
});