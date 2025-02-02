import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const dbUrl = new URL(process.env.DATABASE_URL!);

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: dbUrl.hostname,
    database: dbUrl.pathname.slice(1), // Remove leading `/`
    user: dbUrl.username,
    password: dbUrl.password,
    ssl: "require",
  },
});
