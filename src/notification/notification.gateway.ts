import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotificationToUser(userId: number, notification: any) {
    this.server.emit(`notifications:${userId}`, notification);
  }
}
