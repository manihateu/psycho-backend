import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Res,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { join } from 'path';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RecomendationService } from 'src/recomendation/recomendation.service';
import {
  AuidioDataDto,
  CreateCourseDto,
  FilesOnCreateCourseDto,
  FindOneCourseParams,
  SwaggerCreateCourseDto,
} from './courses.dto';
import {
  AddAudioFileInterceptor,
  CoursesCreateFilesFieldsInterceptor,
} from 'src/shared/file.images.interceptor';
import { ApiBody } from '@nestjs/swagger';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private readonly recomenationService: RecomendationService,
  ) {}

  @Get()
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    return await this.coursesService.getCourseById(+id);
  }

  @Post('/add-categories/:id')
  async addCategoriesToCourse(
    @Param('id') id: string,
    @Body() categories: number[],
  ) {
    return await this.coursesService.addCategoryesToCourse(+id, categories);
  }

  @Post('/update-categories/:id')
  async updateCategoriesToCourse(
    @Param('id') id: string,
    @Body() categories: number[],
  ) {
    await this.coursesService.deleteCategoriesToCourse(+id);
    return await this.coursesService.addCategoryesToCourse(+id, categories);
  }

  @Post('like/:courseId')
  async likeCourse(@Param('courseId') courseId: string, @Req() req: any) {
    return await this.coursesService.likeCourse(+courseId, req.user.sub);
  }

  @Post('dislike/:courseId')
  async dislikeCourse(@Param('courseId') courseId: string, @Req() req: any) {
    return await this.coursesService.dislikeCourse(+courseId, req.user.sub);
  }

  @Get('/listen-count/:courseId')
  async getListenCount(@Param('courseId') courseId: string) {
    return await this.coursesService.getLikesCountByCourseId(+courseId);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @UseInterceptors(CoursesCreateFilesFieldsInterceptor)
  @ApiBody({
    description: 'Данные курса',
    type: SwaggerCreateCourseDto,
  })
  async createCourse(
    @UploadedFiles() files: FilesOnCreateCourseDto,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    const cardLogoUrl = files.cardLogoUrl
      ? `/static/images/${files.cardLogoUrl[0].filename}`
      : null;
    const cardBgUrl = files.cardBgUrl
      ? `/static/images/${files.cardBgUrl[0].filename}`
      : null;
    createCourseDto.timeFrom = +createCourseDto.timeFrom;
    createCourseDto.timeTo = +createCourseDto.timeTo;
    return this.coursesService.createCourse({
      ...createCourseDto,
      cardLogoUrl,
      cardBgUrl,
    });
  }

  @Post(':courseId/audio')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @UseInterceptors(AddAudioFileInterceptor)
  async addAudioToCourse(
    @UploadedFiles() files: { audio?: Express.Multer.File[] },
    @Param('courseId') courseId: FindOneCourseParams,
    @Body() audioData: AuidioDataDto,
  ) {
    const fileUrl = files.audio
      ? `/static/audio/${files.audio[0].filename}`
      : null;
    if (!fileUrl) {
      throw new Error('Audio file is required');
    }

    return this.coursesService.addAudioToCourse(+courseId, audioData, fileUrl);
  }

  @Get(':courseId/audio/:audioId')
  async streamAudio(
    @Param('audioId') audioId: string,
    @Param('courseId') courseId: string,
    @Res() res: Response,
    @Req() req: any,
  ) {
    const audiofile = await this.coursesService.getAudioById(+audioId);
    await this.coursesService.addListen(+courseId);
    const audioPath = join(
      __dirname,
      '..',
      '..',
      'public',
      'audio',
      audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1],
    );

    if (!existsSync(audioPath)) {
      throw new NotFoundException('Аудиофайл не найден.');
    }

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `inline; filename="${audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1]}.mp3"`,
    });

    const audioStream = createReadStream(audioPath);
    audioStream.pipe(res);
    audioStream.on('open', async () => {
      await this.recomenationService.addInteraction(
        +req.user.sub,
        +courseId,
        'STARTED',
      );
      await this.coursesService.addListen(+courseId);
    });
    audioStream.on('end', async () => {
      await this.recomenationService.addInteraction(
        +req.user.sub,
        +courseId,
        'COMPLETED',
      );
    });
  }
}
