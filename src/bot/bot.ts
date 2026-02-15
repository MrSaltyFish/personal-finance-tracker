import { Bot } from "grammy";
import { incomeModule } from "./commands/income";
import { logModule } from "./commands/log";

const token = process.env.TELEGRAM_BOT_TOKEN;
const MY_ID = BigInt(process.env.MY_ID || "0"); // Use BigInt for DB consistency

if (!token) throw new Error("TELEGRAM_BOT_TOKEN missing");

export const bot = new Bot(token);

bot.use(async (ctx, next) => {
  if (ctx.from?.id !== Number(MY_ID)) {
    return ctx.reply("Permission Denied.");
  }
  await next();
});

bot.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`CockroachDB Response time: ${ms}ms`);
});

bot.use(incomeModule);
bot.use(logModule);

bot.command("start", (ctx) => ctx.reply("System Online, Sir."));