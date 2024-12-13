import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async addCategoryToUser(userId: number, categoryIds: number[]) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  }

  async createCategory(name: string, imageUrl: string) {
    return this.prisma.category.create({
      data: { 
        name,
        imageUrl
      },
    });
  }
}
