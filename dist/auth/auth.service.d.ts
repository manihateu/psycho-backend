import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(name: string, email: string, password: string, role: 'USER' | 'ADMIN'): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateAccessToken(userId: number, email: string, role: 'USER' | 'ADMIN'): {
        accessToken: string;
    };
    generateTokens(userId: number, email: string, role: 'USER' | 'ADMIN'): {
        accessToken: string;
        refreshToken: string;
    };
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
