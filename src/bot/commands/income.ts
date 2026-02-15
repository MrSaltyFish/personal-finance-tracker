import { db } from "@/db";
import { Composer } from "grammy";

export const incomeModule = new Composer();

incomeModule.command("income", async (ctx) => {
    const amount = 20000; // Hardcoded for your stipend, or parse from ctx.message.text
  
  try {
    await db.transaction.create({
      data: {
        userId: BigInt(ctx.from!.id),
        amount: amount,
        type: "INCOME",
        category: "STIPEND",
        description: "Monthly Stipend",
      }
    });
    await ctx.reply(`💰 Stipend of ₹${amount} credited to your ledger.`);
  } catch (e) {
    await ctx.reply("❌ Failed to record income. Check server logs.");
  }
});