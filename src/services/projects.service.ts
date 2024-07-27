import { ProjectsRepository } from "@/repositories/projects.repository";
import { IProjectsService, ProjectCreateRequest } from "@/types/projects.types";
import { handleError } from "@/utils";

export class ProjectsService implements IProjectsService {
  constructor(private repository: ProjectsRepository) {
    this.repository = repository;
  }

  async create(data: ProjectCreateRequest) {
    try {
      const payload = {
        title: data.title,
        ...(data.description ? { description: data.description } : {}),
        creatorId: data.creatorId,
      };

      const newProject = await this.repository.create(payload);

      return newProject;
    } catch (e) {
      handleError(e);
    }
  }
}
