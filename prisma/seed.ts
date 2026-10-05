import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../server/crypto";
import { createPrismaAdapter } from "../server/prisma-adapter";

const prisma = new PrismaClient({
  adapter: createPrismaAdapter(),
});

async function main() {
  const email = process.env.SEED_USER_EMAIL;
  const password = process.env.SEED_USER_PASSWORD;

  if (email && password) {
    if (password.length < 12) {
      throw new Error("SEED_USER_PASSWORD must be at least 12 characters.");
    }

    await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: { passwordHash: await hashPassword(password) },
      create: {
        email: email.toLowerCase(),
        name: "Template User",
        passwordHash: await hashPassword(password),
      },
    });
    console.log(`Seeded user: ${email}`);
  } else {
    console.log("No SEED_USER_EMAIL and SEED_USER_PASSWORD provided; skipping user seed.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
