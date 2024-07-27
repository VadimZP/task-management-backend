import express, { Request, Response } from "express";

import { prismaClient } from "@/database";
import { ROUTES } from "@/utils/constants";

import { validate } from "@/middlewares";
import { ProjectsRepository } from "@/repositories/projects.repository";
import { ProjectsService } from "@/services/projects.service";
import {
  ProjectCreateRequest,
  ProjectCreateSchema,
} from "@/types/projects.types";

export const projectsRouter = express.Router();

const projectsRepository = new ProjectsRepository(prismaClient);
const projectsService = new ProjectsService(projectsRepository);

projectsRouter.post(
  ROUTES.PROJECTS,
  validate(ProjectCreateSchema),
  async (req: Request<{}, {}, ProjectCreateRequest>, res: Response, next) => {
    try {
      const payload = {
        title: req.body.title,
        ...(req.body.description ? { description: req.body.description } : {}),
        creatorId: req.body.creatorId,
      };

      const result = await projectsService.create(payload);

      res
        .status(201)
        .json({ data: result, message: "Project successfully created" });
    } catch (e) {
      next(e);
    }
  },
);
