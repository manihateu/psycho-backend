import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private notificationGateway: NotificationGateway, // WebSocket Gateway
  ) {}

  @Post('send')
  async sendNotification(@Body() body: { userId: number; message: string }) {
    const { userId, message } = body;

    const notification = await this.notificationService.createNotification(
      userId,
      message,
    );

    this.notificationGateway.sendNotificationToUser(userId, notification);

    return { success: true, notification };
  }
}
