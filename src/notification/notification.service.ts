import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async createNotification(userId: number, message: string) {
    const notification = await this.prisma.notification.create({
      data: {
        message,
        user: {
          connect: { id: userId },
        },
      },
    });
    return notification;
  }

  async markRead(notificationId: number) {
    await this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}
