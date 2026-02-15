import { Bot, webhookCallback } from "grammy";
import { db } from "../db";

const token = process.env.TELEGRAM_BOT_TOKEN;
const MY_ID = Number(process.env.MY_ID);

if (!token) throw new Error("TELEGRAM_BOT_TOKEN missing");

const bot = new Bot(token);

bot.use(async (ctx, next) => {
  console.log("Incoming User ID:", ctx.from?.id);
  if (ctx.from?.id !== MY_ID) {
    console.warn(`Unauthorized access by ID: ${ctx.from?.id}`);
    return ctx.reply("Permission Denied: Unauthorized User.");
  }
  await next();
});


bot.command("start", (ctx) => ctx.reply("System Online, Sir."));
bot.on("message", (ctx) => ctx.reply(`Logged: ${ctx.message.text}`));

export default bot;