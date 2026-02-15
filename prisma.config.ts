import { defineConfig } from '@prisma/config';
import { config } from 'dotenv';

config();

export default defineConfig({
  schema: 'src/db/schema.prisma', // THE KEY: Tell Prisma where to look
  datasource: {
    url: process.env.COCKROACHDB_DATABASE_URL,
  },
});