import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, Res, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer'
import {v4 as uuidv4} from 'uuid'
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RecomendationService } from 'src/recomendation/recomendation.service';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private coursesService: CoursesService, private readonly recomenationService: RecomendationService) {}

  @Get()
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Get("/:id")
  async getCourseById(@Param("id") id: string) {
    return await this.coursesService.getCourseById(+id);
  }

  @Post("like/:courseId")
  async likeCourse (@Param("courseId") courseId: string, @Req() req: any) {
    return await this.coursesService.likeCourse(+courseId, req.user.sub)
  }

  @Post("dislike/:courseId")
  async dislikeCourse (@Param("courseId") courseId: string, @Req() req: any) {
    return await this.coursesService.dislikeCourse(+courseId, req.user.sub)
  }

  @Get("/listen-count/:courseId")
  async getListenCount (@Param("courseId") courseId: string) {
    return await this.coursesService.getLikesCountByCourseId(+courseId)
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cardLogoUrl', maxCount: 1 }, 
        { name: 'cardBgUrl', maxCount: 1 },  
      ],
      {
        storage: diskStorage({
          destination: './public/images', 
          filename: (req, file, callback) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
      },
    ),
  )
  async createCourse(
    @UploadedFiles() files: { cardLogoUrl?: Express.Multer.File[]; cardBgUrl?: Express.Multer.File[] },
    @Body() createCourseDto: {
      name: string;
      description: string;
      type?: 'КУРС' | 'МЕДИТАЦИЯ';
      timeFrom: number;
      timeTo: number;
      cardLogoBgColor: string;
    },
  ) {
    const cardLogoUrl = files.cardLogoUrl ? `/static/images/${files.cardLogoUrl[0].filename}` : null;
    const cardBgUrl = files.cardBgUrl ? `/static/images/${files.cardBgUrl[0].filename}` : null;
    createCourseDto.timeFrom = +createCourseDto.timeFrom
    createCourseDto.timeTo = +createCourseDto.timeTo
    return this.coursesService.createCourse({
      ...createCourseDto,
      cardLogoUrl,
      cardBgUrl,
    });
  }


  @Post(':courseId/audio')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'audio', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/audio', 
          filename: (req, file, callback) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
      },
    ),
  )
  async addAudioToCourse(
    @UploadedFiles() files: { audio?: Express.Multer.File[] },
    @Param('courseId') courseId: string,
    @Body() audioData: { name: string; duration: number },
  ) {
    const fileUrl = files.audio ? `/static/audio/${files.audio[0].filename}` : null;
    audioData.duration = +audioData.duration;
    if (!fileUrl) {
      throw new Error('Audio file is required');
    }

    return this.coursesService.addAudioToCourse(+courseId, {
      ...audioData,
      fileUrl,
    });
  }

  @Get(':courseId/audio/:audioId')
  async streamAudio(
    @Param('audioId') audioId: string,
    @Param("courseId") courseId: string,
    @Res() res: Response,
    @Req() req: any
  ) {
    const audiofile = await this.coursesService.getAudioById(+audioId)
    const audioPath = join(__dirname, '..', '..', 'public', 'audio', audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1]);

    if (!existsSync(audioPath)) {
      throw new NotFoundException('Аудиофайл не найден.');
    }

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `inline; filename="${audiofile.fileUrl.split('/')[audiofile.fileUrl.split('/').length - 1]}.mp3"`,
    });

    const audioStream = createReadStream(audioPath);
    audioStream.pipe(res);
    audioStream.on("open", async () => {
      await this.recomenationService.addInteraction(+req.user.sub, +courseId, "STARTED")
      await this.coursesService.addListen(+courseId)
    })
    audioStream.on("end", async () => {
      await this.recomenationService.addInteraction(+req.user.sub, +courseId, "COMPLETED")
    })
  }
}

