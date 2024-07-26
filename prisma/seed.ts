import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const taskStatuses = [
    { id: 1, statusName: 'backlog' },
    { id: 2, statusName: 'in progress' },
    { id: 3, statusName: 'done' },
  ];

  for (const status of taskStatuses) {
    await prisma.taskStatus.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    });
  }

  const taskPriorities = [
    { id: 1, priorityName: 'low' },
    { id: 2, priorityName: 'medium' },
    { id: 3, priorityName: 'high' },
  ];

  for (const priority of taskPriorities) {
    await prisma.taskPriority.upsert({
      where: { id: priority.id },
      update: {},
      create: priority,
    });
  }
}

main()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
