import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async addCategoryToUser(userId: number, categoryIds: number[]) {
    const selectedCategories = []
    for (let id of categoryIds) {
      const category = await this.prisma.category.findFirst({where: {id}})
      selectedCategories.push(category)
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        categories: selectedCategories as any,
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
