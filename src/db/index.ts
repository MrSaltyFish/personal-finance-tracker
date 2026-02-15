import { PrismaClient } from "./generated-client"; // Adjust path to your generated folder

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const getDb = () => {
  // If we already have a client, return it (Singleton)
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  // Initialization only happens here, when getDb() is called
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
};