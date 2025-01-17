import { AuthService } from './auth.service';
import { GenerateRefreshTokenDto, LoginDto, RegisterDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(data: GenerateRefreshTokenDto): Promise<{
        accessToken: string;
    }>;
}
