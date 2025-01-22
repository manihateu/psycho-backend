import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private notificationGateway: NotificationGateway, // WebSocket Gateway
  ) {}

  @Post('send')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  async sendNotification(@Body() body: { userId: number; message: string }) {
    const { userId, message } = body;
    const notification = await this.notificationService.createNotification(
      userId,
      message,
    );
    this.notificationGateway.sendNotificationToUser(userId, notification);
    return { success: true, notification };
  }

  @Post('mark-as-read')
  async markAsRead(@Body() body: { notificationId: number }) {
    await this.notificationService.markRead(body.notificationId);
    return { success: true };
  }
}
