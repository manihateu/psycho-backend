import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { BotService } from './bot.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('bot')
@UseGuards(JwtAuthGuard)
export class BotController {
  constructor(private botService: BotService) {}

  @Get()
  async getFromBot(@Query('endpoint') endpoint: string) {
    return this.botService.forwardRequest(endpoint, 'GET');
  }

  @Post()
  async postToBot(
    @Query('endpoint') endpoint: string,
    @Body() data: any,
  ) {
    return this.botService.forwardRequest(endpoint, 'POST', data);
  }
}
