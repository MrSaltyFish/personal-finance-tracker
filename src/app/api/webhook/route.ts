export const dynamic = "force-dynamic"; // CRITICAL: Prevents build-time execution

import { bot } from "@/bot/bot";
import { webhookCallback } from "grammy";

// Ensure you are NOT using 'export default' for the bot anymore.
// Use named exports for the HTTP verbs.
export const POST = webhookCallback(bot, "std/http");