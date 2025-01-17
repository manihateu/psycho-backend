import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}

export class GenerateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
