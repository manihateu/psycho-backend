import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateRefreshTokenDto, LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto,) {
    return this.authService.register(registerDto.name, registerDto.email, registerDto.password, "USER");
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('generate-refresh')
  async refresh(@Body() data: GenerateRefreshTokenDto) {
    return this.authService.refreshTokens(data.refreshToken)
  }
}
