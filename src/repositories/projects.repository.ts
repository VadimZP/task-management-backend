import { prismaClient } from "@/database";
import {
  IProjectsRepository,
  ProjectCreateRepository,
} from "@/types/projects.types";

export class ProjectsRepository implements IProjectsRepository {
  constructor(private db: typeof prismaClient) {
    this.db = db;
  }

  async create(data: ProjectCreateRepository) {
    return this.db.project.create({ data });
  }
}
