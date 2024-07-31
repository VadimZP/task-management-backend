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

export type ProjectUpdateRequest = {
  id: number;
  title?: string;
  description?: string;
  creatorId: number;
};

export type ProjectUpdateRepository = {
  id: number;
  title?: string;
  description?: string;
  slug?: string;
  creatorId: number;
};

export interface IProjectsRepository {
  create: (data: ProjectCreateRepository) => void;
  findByCreatorId: (data: FindByCreatorIdRepository) => void;
  findByCreatorIdAndSlug: (data: FindByCreatorIdAndSlugRepository) => void;
  update: (data: ProjectUpdateRepository) => void;
}

export interface IProjectsService {
  create: (data: ProjectCreateRequest) => void;
  findByCreatorId: (data: FindByCreatorIdRequest) => void;
  findByCreatorIdAndSlug: (data: FindByCreatorIdAndSlugRequest) => void;
  update: (data: ProjectUpdateRequest) => void;
}

export const ProjectCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(200).optional(),
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

export const ProjectUpdateSchema = z.object({
  body: z
    .object({
      id: z.number(),
      title: z.string().min(3).max(50).optional(),
      description: z.string().min(3).max(200).optional(),
      creatorId: z.number(),
    })
    .refine((data) => data.title || data.description, {
      message: "Either title or description must be provided",
      path: ["title", "description"],
    }),
});
