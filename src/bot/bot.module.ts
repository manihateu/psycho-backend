import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule],
  providers: [BotService, JwtService],
  controllers: [BotController],
})
export class BotModule {}
