import { Bot, webhookCallback } from "grammy";
import { NextResponse } from "next/server";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined in environment variables.");
}

const bot = new Bot(token);

// 2. Define your Logic (The "Brain")
bot.command("start", (ctx) => ctx.reply("System Online. Status: Optimizing..."));
bot.on("message", (ctx) => ctx.reply(`Acknowledged: ${ctx.message.text}`));

// 3. Export the Webhook Handler for Next.js App Router
// grammY's webhookCallback converts the request to a format Next.js understands
export const POST = webhookCallback(bot, "std/http");