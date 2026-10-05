import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Client generation does not connect to MySQL, so keep it possible before
    // local environment variables have been configured.
    url: process.env.DATABASE_URL ?? "mysql://unused:unused@127.0.0.1:3306/unused",
  },
});
