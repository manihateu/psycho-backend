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
  async getRecomendations(@Req() req: any, @Query('limit') limit: string) {
    const parsedLimit = +limit;
    const userId = req.user.sub;
    if (isNaN(parsedLimit)) {
      throw new HttpException('limit указан не верно', 400);
    }
    return await this.recomendationService.recommendCourses(userId, parsedLimit);
  }
}
function Req(): (target: RecomendationController, propertyKey: "getRecomendations", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

