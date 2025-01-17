import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, PrismaService, JwtService],
  imports: [PrismaModule, JwtModule.register({})],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
