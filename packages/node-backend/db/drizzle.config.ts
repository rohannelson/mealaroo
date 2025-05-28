import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./lib/db/drizzle",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  introspect: {
    casing: "preserve",
  },
} satisfies Config;
