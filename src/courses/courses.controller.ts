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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { join } from 'path';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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
  constructor(private coursesService: CoursesService) {}

  @Get()
  async getAllCourses() {
    return this.coursesService.getAllCourses();
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
  }
}
