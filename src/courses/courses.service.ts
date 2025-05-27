import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuidioDataDto } from './courses.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses() {
    return await this.prisma.course.findMany({
      include: {
        audioFiles: true,
      },
    });
  }

  async addCategoryesToCourse(courseId: number, categoriesIds: number[]) {
    return await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        categories: {
          connect: categoriesIds.map((id) => ({ id })),
        },
      },
    });
  }

  async deleteCategoriesToCourse(courseId: number) {
    return await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        categories: {
          disconnect: [],
        },
      },
    });
  }

  async getCourseById(id: number) {
    return await this.prisma.course.findFirst({
      where: {
        id,
      },
      include: { audioFiles: true },
    });
  }

  async likeCourse(courseId: number, userId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        likedCourses: {
          connect: { id: courseId },
        },
      },
    });
  }

  async getLikesCountByCourseId(courseId: number) {
    const { usersLiked } = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        usersLiked: true,
      },
    });
    return usersLiked.length;
  }

  async dislikeCourse(courseId: number, userId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        likedCourses: {
          disconnect: { id: courseId },
        },
      },
    });
  }

  async getAudioById(id: number) {
    return await this.prisma.audioFile.findFirst({
      where: { id },
    });
  }

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
    console.log(data);
    return this.prisma.course.create({
      data: {
        ...data,
        countLiked: 0,
        countListened: 0,
      },
    });
  }

  async addListen(id: number) {
    const thisCourse = await this.prisma.course.findFirst({ where: { id } });
    return await this.prisma.course.update({
      where: { id },
      data: {
        countListened: thisCourse.countLiked + 1,
      },
    });
  }

  async addAudioToCourse(
    courseId: number,
    audioData: AuidioDataDto,
    fileUrl: string,
  ) {
    const {duration, ...data} = audioData
    const audioFile = await this.prisma.audioFile.create({
      data: {
        ...data,
        duration: +duration,
        fileUrl,
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
