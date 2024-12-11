import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @Get("/user")
    async getUser (@Req() req: any) {
        const userId = req.user.sub;
        return await this.usersService.getUserInfo(userId)
    }

    @Post('/update-access')
    async updateAccessToken ( @Body() data: {refreshToken: string}) {
        try {
            const payload = this.jwtService.verify(data.refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET
            })
            if (!payload.role) {
                throw new UnauthorizedException('Role not found in token');
            }
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            });
            return accessToken
        }
        catch (e) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    @Post("/check-access")
    async checkAccessToken (@Body() data: {accessToken: string}) {
        try {
            const payload = this.jwtService.verify(data.accessToken, {
                secret: process.env.JWT_SECRET
            })
            if (!payload.role) {
                throw new UnauthorizedException('Role not found in token');
            }
        }
        catch (e) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
