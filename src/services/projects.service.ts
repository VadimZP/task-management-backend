import slugify from "slugify";

import { ProjectsRepository } from "@/repositories/projects.repository";
import {
  FindByCreatorIdAndSlugRequest,
  FindByCreatorIdRequest,
  IProjectsService,
  ProjectCreateRequest,
  ProjectUpdateRequest,
} from "@/types/projects.types";
import { generateSlug, handleError } from "@/utils";

export class ProjectsService implements IProjectsService {
  constructor(private repository: ProjectsRepository) {
    this.repository = repository;
  }

  async create(data: ProjectCreateRequest) {
    try {
      const slug = generateSlug(data.title);

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
      const project = await this.repository.findByCreatorIdAndSlug(data);

      return project;
    } catch (e) {
      handleError(e);
    }
  }

  async update(data: ProjectUpdateRequest) {
    try {
      const slug = data.title ? generateSlug(data.title) : undefined;

      const payload = {
        id: data.id,
        ...(data.title ? { title: data.title } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(slug ? { slug } : {}),
        creatorId: data.creatorId,
      };

      const updatedProject = await this.repository.update(payload);

      return updatedProject;
    } catch (e) {
      handleError(e);
    }
  }
}
