import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecomendationModule } from 'src/recomendation/recomendation.module';
import { RecomendationService } from 'src/recomendation/recomendation.service';

@Module({
  imports: [PrismaModule, JwtModule, RecomendationModule],
  providers: [CoursesService, PrismaService, JwtService, RecomendationService],
  controllers: [CoursesController],
})
export class CoursesModule {}
