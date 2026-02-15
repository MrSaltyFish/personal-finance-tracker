// app/api/webhook/route.ts
import bot from "@/bot/bot";
import { webhookCallback } from "grammy";

export const POST = webhookCallback(bot, "std/http");
