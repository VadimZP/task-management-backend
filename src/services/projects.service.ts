import slugify from "slugify";

import { ProjectsRepository } from "@/repositories/projects.repository";
import {
  FindByCreatorIdAndSlugRequest,
  FindByCreatorIdRequest,
  IProjectsService,
  ProjectCreateRequest,
} from "@/types/projects.types";
import { handleError } from "@/utils";

export class ProjectsService implements IProjectsService {
  constructor(private repository: ProjectsRepository) {
    this.repository = repository;
  }

  async create(data: ProjectCreateRequest) {
    try {
      const slug = slugify(data.title, {
        replacement: "-",
        lower: true,
        strict: false,
        trim: true,
      });

      const payload = {
        title: data.title,
        ...(data.description ? { description: data.description } : {}),
        slug,
        creatorId: data.creatorId,
      };

      const newProject = await this.repository.create(payload);

      return newProject;
    } catch (e) {
      handleError(e);
    }
  }

  async findByCreatorId(data: FindByCreatorIdRequest) {
    try {
      const ownProjects = await this.repository.findByCreatorId(data);

      return ownProjects;
    } catch (e) {
      handleError(e);
    }
  }

  async findByCreatorIdAndSlug(data: FindByCreatorIdAndSlugRequest) {
    try {
      const ownProjects = await this.repository.findByCreatorId(data);

      return ownProjects;
    } catch (e) {
      handleError(e);
    }
  }
}
