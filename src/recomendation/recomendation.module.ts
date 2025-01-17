import { Module } from '@nestjs/common';
import { RecomendationService } from './recomendation.service';
import { RecomendationController } from './recomendation.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [RecomendationService, PrismaService, JwtService],
  controllers: [RecomendationController]
})
export class RecomendationModule {}
