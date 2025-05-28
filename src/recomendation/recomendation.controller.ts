import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecomendationService } from './recomendation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('recomendation')
@UseGuards(JwtAuthGuard)
export class RecomendationController {
  constructor(private readonly recomendationService: RecomendationService) {}

  @Get()
  async getRecomendations(@Query('limit') limit: string) {
    const parsedLimit = +limit;
    if (isNaN(parsedLimit)) {
      throw new HttpException('limit указан не верно', 400);
    }
    return await this.recomendationService.recommendCourses(parsedLimit);
  }
}
