import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../lib/auth";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@portfolio.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin user already exists, updating password...");
    await prisma.user.update({
      where: { email },
      data: { password: hashPassword(password) },
    });
  } else {
    await prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
        name: "Admin",
      },
    });
    console.log("Admin user created");
  }

  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
