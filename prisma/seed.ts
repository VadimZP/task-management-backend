import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const taskStatuses = [
    { id: 1, statusName: "backlog" },
    { id: 2, statusName: "in progress" },
    { id: 3, statusName: "done" },
  ];

  for (const status of taskStatuses) {
    await prisma.taskStatus.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    });
  }

  const taskPriorities = [
    { id: 1, priorityName: "low" },
    { id: 2, priorityName: "medium" },
    { id: 3, priorityName: "high" },
  ];

  for (const priority of taskPriorities) {
    await prisma.taskPriority.upsert({
      where: { id: priority.id },
      update: {},
      create: priority,
    });
  }

  const userRoles = [
    { id: 1, roleName: "read" },
    { id: 2, roleName: "read-edit" },
    { id: 3, roleName: "read-edit-delete" },
    { id: 4, roleName: "owner" },
  ];

  for (const role of userRoles) {
    await prisma.userRole.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
