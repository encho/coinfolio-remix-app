import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // cleanup the existing database table
  await prisma.riskLevel.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.riskLevel.create({
    data: {
      type: "LOW_RISK",
      name: "Basso Rischio",
      description: "10% VaR",
    },
  });
  await prisma.riskLevel.create({
    data: {
      type: "MEDIUM_RISK",
      name: "Medio Rischio",
      description: "30% VaR",
    },
  });
  await prisma.riskLevel.create({
    data: {
      type: "HIGH_RISK",
      name: "Alto Rischio",
      description: "50% VaR",
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
