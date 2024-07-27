import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ProjectCreateRequest = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "title" | "description" | "creatorId"
>;
export type ProjectCreateRepository = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "title" | "description" | "creatorId"
>;

export interface IProjectsRepository {
  create: (data: ProjectCreateRequest) => void;
}

export interface IProjectsService {
  create: (data: ProjectCreateRepository) => void;
}

export const ProjectCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50),
    description: z.string().optional(),
    creatorId: z.number(),
  }),
});
