import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ProjectCreateRequest = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "title" | "description" | "creatorId"
>;
export type ProjectCreateRepository = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "title" | "description" | "creatorId" | "slug"
>;

export type FindByCreatorIdRequest = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "creatorId"
>;
export type FindByCreatorIdRepository = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "creatorId"
>;

export type FindByCreatorIdAndSlugRequest = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "creatorId" | "slug"
>;

export type FindByCreatorIdAndSlugRepository = Pick<
  Prisma.ProjectUncheckedCreateInput,
  "creatorId" | "slug"
>;

export interface IProjectsRepository {
  create: (data: ProjectCreateRepository) => void;
  findByCreatorId: (data: FindByCreatorIdRepository) => void;
  findByCreatorIdAndSlug: (data: FindByCreatorIdAndSlugRepository) => void;
}

export interface IProjectsService {
  create: (data: ProjectCreateRequest) => void;
  findByCreatorId: (data: FindByCreatorIdRequest) => void;
  findByCreatorIdAndSlug: (data: FindByCreatorIdAndSlugRequest) => void;
}

export const ProjectCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50),
    description: z.string().optional(),
    creatorId: z.number(),
  }),
});

export const FindByCreatorIdSchema = z.object({
  body: z.object({
    creatorId: z.number(),
  }),
});

export const findByCreatorIdAndSlugSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});
