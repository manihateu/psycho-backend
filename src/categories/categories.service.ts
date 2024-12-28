import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async addCategoryToUser(userId: number, categoryIds: number[]) {
    const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { categories: true },
    });
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }
    const existingCategories = await this.prisma.category.findMany({
        where: {
            id: { in: categoryIds },
        },
    });
    if (existingCategories.length !== categoryIds.length) {
        throw new Error('Some categories not found');
    }
    return this.prisma.user.update({
        where: { id: userId },
        data: {
            categories: {
                connect: existingCategories.map(category => ({ id: category.id })),
            },
        },
        include: { categories: true },
    });
}

  async createCategory(name: string, imageUrl: string) {
    return this.prisma.category.create({
      data: { 
        name,
        imageurl: imageUrl
      },
    });
  }
}
