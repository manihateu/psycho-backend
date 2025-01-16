import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(userId: number, message: string) {
    // Сохранение уведомления в БД
    const notification = await this.prisma.notification.create({
      data: {
        userId: userId,
        message,
      },
    });

    return notification;
  }
}
