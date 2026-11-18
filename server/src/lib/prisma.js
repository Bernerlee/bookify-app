import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";

// Create the PostgreSQL adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Create one reusable Prisma Client
const prisma = new PrismaClient({
  adapter,
});

export default prisma;
