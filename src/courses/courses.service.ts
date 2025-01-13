import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  // Добавление аудиофайла к курсу
  async addAudioToCourse(courseId: number, audioData: { name: string; fileUrl: string; duration: number }) {
    // Сначала создаём аудиофайл
    const audioFile = await this.prisma.audioFile.create({
      data: {
        ...audioData,
      },
    });

    // Привязываем аудиофайл к курсу
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
