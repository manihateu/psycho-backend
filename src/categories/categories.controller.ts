import { Controller, Get, Post, Body, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import {v4 as uuidv4} from 'uuid'
import { extname } from 'path';
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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`
        callback(null, uniqueName)
      }
    })
  }))
  async createCategory(@Body() { name }: { name: string }, @UploadedFile() file) {
    return this.categoriesService.createCategory(name, `/static/images/${file.filename}}`);
  }
}