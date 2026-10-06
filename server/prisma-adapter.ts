import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { developmentFallbackEnabled } from "../shared/development";

// Kept framework-free so Prisma scripts can reuse the same adapter.
export function createPrismaAdapter() {
  const connectionString =
    process.env.DATABASE_URL || "mysql://unused:unused@127.0.0.1:3306/unused";

  if (!connectionString.startsWith("mysql://")) {
    throw new Error("DATABASE_URL must use the mysql:// protocol.");
  }

  const adapterUrl = new URL(connectionString);
  if (
    developmentFallbackEnabled(process.env.NODE_ENV, process.env.DEMO_MODE) &&
    !adapterUrl.searchParams.has("acquireTimeout")
  ) {
    adapterUrl.searchParams.set("acquireTimeout", "1000");
  }

  return new PrismaMariaDb(adapterUrl.toString());
}
