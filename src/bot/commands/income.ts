import { getDb } from "@/db";
import { Composer } from "grammy";

export const incomeModule = new Composer();

incomeModule.command("income", async (ctx) => {
    if (!ctx.message?.text) return;
    const inputAmount = parseFloat(ctx.match) || 0;
  try {
    const db = getDb();
    await db.transaction.create({
      data: {
        userId: BigInt(ctx.from!.id),
        amount: inputAmount,
        type: "INCOME",
        category: "STIPEND",
        description: "Monthly Stipend",
      }
    });
    await ctx.reply(`💰 Stipend of ₹${inputAmount} credited to your ledger.`);
  } catch (e) {
    await ctx.reply("❌ Failed to record income. Check server logs.");
  }
});