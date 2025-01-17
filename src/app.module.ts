import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { BotModule } from './bot/bot.module';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoursesModule } from './courses/courses.module';
import { RecomendationModule } from './recomendation/recomendation.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    AuthModule, UsersModule, PrismaModule, BotModule, CategoriesModule, CoursesModule, RecomendationModule
    AuthModule,
    UsersModule,
    PrismaModule,
    BotModule,
    CategoriesModule,
    CoursesModule,
    RecomendationModule
  ],
})
export class AppModule {}
