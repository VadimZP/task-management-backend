import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ProjectCreateRequest = Pick<
  Prisma.ProjectCreateInput,
  "title" | "description" | "creator"
>;
export type ProjectCreateRepository = Pick<
  Prisma.ProjectCreateInput,
  "title" | "description" | "creator"
>;

export interface IProjectsRepository {
  create: (data: ProjectCreateRequest) => void;
}

export interface IProjectsService {
  create: (data: ProjectCreateRepository) => void;
}
