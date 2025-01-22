import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/user')
  async getUser(@Req() req: any) {
    const userId = req.user.sub;
    return await this.usersService.getUserInfo(userId);
  }

  @Get('/user/categories')
  async getCategories(@Req() req: any) {
    const userId = req.user.sub;
    return await this.usersService.getUserCategories(userId);
  }
}
