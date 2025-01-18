import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotificationGateway } from './notification.gateway';
@Module({
  imports: [PrismaModule, JwtModule],
  providers: [NotificationService, PrismaService, JwtService, NotificationGateway],
  controllers: [NotificationController]
})
export class NotificationModule {}