import { PrismaClient } from "./generated-client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Use a function to get the database instance instead of a constant
export const getDb = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
};
