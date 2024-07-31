import { prismaClient } from "@/database";
import {
  FindByCreatorIdAndSlugRepository,
  FindByCreatorIdRepository,
  IProjectsRepository,
  ProjectCreateRepository,
  ProjectUpdateRepository,
} from "@/types/projects.types";

export class ProjectsRepository implements IProjectsRepository {
  constructor(private db: typeof prismaClient) {
    this.db = db;
  }

  async create(data: ProjectCreateRepository) {
    return this.db.project.create({ data });
  }

  async findByCreatorId(data: FindByCreatorIdRepository) {
    return this.db.project.findMany({
      where: {
        creatorId: data.creatorId,
      },
    });
  }

  async findByCreatorIdAndSlug(data: FindByCreatorIdAndSlugRepository) {
    return this.db.project.findMany({
      where: {
        creatorId: data.creatorId,
        slug: data.slug,
      },
    });
  }

  async update(data: ProjectUpdateRepository) {
    const { id, creatorId, ...rest } = data;

    return this.db.project.update({
      where: {
        id: data.id,
        creatorId: data.creatorId,
      },
      data: rest,
    });
  }
}
