import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post('/assign')
  async assignCategoriesToUser(
    @Req() req: any,
    @Body() { categoryIds }: { categoryIds: number[] },
  ) {
    const userId = req.user.sub; 
    return this.categoriesService.addCategoryToUser(userId, categoryIds);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  async createCategory(@Body() { name }: { name: string }) {
    return this.categoriesService.createCategory(name);
  }
}
