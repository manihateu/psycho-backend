import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuidioDataDto } from './courses.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // Получение всех курсов
  async getAllCourses() {
    return this.prisma.course.findMany({
      include: {
        audioFiles: true, // Включаем аудиофайлы для каждого курса
      },
    });
  }

  async getAudioById(id: number) {
    return await this.prisma.audioFile.findFirst({
        where: {id}
    })
  }

  // Создание нового курса
  async createCourse(data: {
    name: string;
    description: string;
    type?: 'КУРС' | 'МЕДИТАЦИЯ';
    timeFrom: number;
    timeTo: number;
    cardLogoUrl: string;
    cardLogoBgColor: string;
    cardBgUrl: string;
  }) {
    console.log(data)
    return this.prisma.course.create({
      data: {
        ...data,
        countLiked: 0,
        countListened: 0,
      },
    });
  }

  async addListen (id: number) {
    const thisCourse = await this.prisma.course.findFirst({where: {id}})
    return await this.prisma.course.update({
        where: {id},
        data: {
            countListened: thisCourse.countLiked + 1
        }
    })
  }

  async addAudioToCourse(courseId: number, audioData: AuidioDataDto, fileUrl: string) {
    const audioFile = await this.prisma.audioFile.create({
      data: {
        ...audioData,
        fileUrl
      },
    });

    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        audioFiles: {
          connect: { id: audioFile.id },
        },
      },
      include: { audioFiles: true },
    });
  }
}
