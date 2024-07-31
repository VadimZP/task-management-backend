import express, { NextFunction, Request, Response } from "express";

import { prismaClient } from "@/database";
import { ROUTES } from "@/utils/constants";

import { protect, validate } from "@/middlewares";
import { ProjectsRepository } from "@/repositories/projects.repository";
import { ProjectsService } from "@/services/projects.service";
import {
  ProjectCreateRequest,
  ProjectCreateSchema,
  ProjectUpdateRequest,
  ProjectUpdateSchema,
  findByCreatorIdAndSlugSchema,
} from "@/types/projects.types";

const projectsRepository = new ProjectsRepository(prismaClient);
const projectsService = new ProjectsService(projectsRepository);

export const projectsRouter = express.Router();

projectsRouter.use(protect);

projectsRouter.post(
  ROUTES.PROJECTS,
  validate(ProjectCreateSchema),
  async (
    req: Request<{}, {}, ProjectCreateRequest>,
    res: Response,
    next: NextFunction,
  ) => {
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

projectsRouter.get(
  ROUTES.PROJECTS,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const creatorId = req.session.user.id;

      const result = await projectsService.findByCreatorId({
        creatorId,
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  },
);

projectsRouter.get(
  ROUTES.PROJECTS_SLUG,
  validate(findByCreatorIdAndSlugSchema),
  async (req: Request<{ slug: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const creatorId = req.session.user.id;

      const result = await projectsService.findByCreatorIdAndSlug({
        creatorId,
        slug: req.params.slug,
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  },
);

projectsRouter.patch(
  ROUTES.PROJECTS,
  validate(ProjectUpdateSchema),
  async (
    req: Request<{}, {}, ProjectUpdateRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // @ts-ignore
      const creatorId = req.session.user.id;

      const payload = {
        id: req.body.id,
        ...(req.body.title ? { title: req.body.title } : {}),
        ...(req.body.description ? { description: req.body.description } : {}),
        creatorId: creatorId,
      };

      const result = await projectsService.update(payload);

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  },
);
