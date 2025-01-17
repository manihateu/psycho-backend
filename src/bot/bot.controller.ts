import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { BotService } from './bot.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('bot')
@UseGuards(JwtAuthGuard)
export class BotController {
  constructor(private botService: BotService) {}
  @Post('/send')
  async postToBot(@Body() data: { message: string }) {
    return await this.botService.sendMessage(data.message);
  }
}
