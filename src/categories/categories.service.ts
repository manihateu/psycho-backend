import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async deleteCategoryToUser(userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        categories: {
          disconnect: [],
        },
      },
    });
  }

  async updateCategoriesForUser(userId: number, categoryIds: number[]) {
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
          set: categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
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
    // const selectedCategoriesIds = existingCategories.map(category => ({connect: { id: category.id }}))
    console.log(
      'categoryIds - ',
      categoryIds.map((id) => ({ id })),
    );
    console.log('userId - ', userId);

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

  async createCategory(name: string, imageUrl: string, bgcolor: string) {
    return this.prisma.category.create({
      data: {
        name,
        imageurl: imageUrl,
        bgcolor,
      },
    });
  }
}
