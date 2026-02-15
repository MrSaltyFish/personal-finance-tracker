// app/api/webhook/route.ts
import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;
const MY_ID = Number(process.env.MY_ID);

if (!token) throw new Error("TELEGRAM_BOT_TOKEN missing");

const bot = new Bot(token);

/** * CRITICAL: Global Guard Middleware
 * This MUST come before any bot.command or bot.on
 */
bot.use(async (ctx, next) => {
  // We check the 'from.id' of the incoming update
  console.log("Incoming User ID:", ctx.from?.id); // Look for this in Vercel Logs
  if (ctx.from?.id !== MY_ID) {
    console.warn(`Unauthorized access by ID: ${ctx.from?.id}`);
    // We don't call next(), so the request dies here
    return ctx.reply("Permission Denied: Unauthorized User.");
  }
  // If it is you, we proceed to the next middleware (your commands)
  await next();
});

// Define your logic AFTER the security guard
bot.command("start", (ctx) => ctx.reply("System Online, Sir."));
bot.on("message", (ctx) => ctx.reply(`Logged: ${ctx.message.text}`));

export const POST = webhookCallback(bot, "std/http");