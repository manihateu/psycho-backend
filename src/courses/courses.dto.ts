import { ApiParam, ApiProperty, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export enum CourseTypes {
  КУРС = 'КУРС',
  МЕДИТАЦИЯ = 'МЕДИТАЦИЯ',
}

export class FindOneCourseParams {
  @IsNumberString()
  courseId: number;
}

export class AuidioDataDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  duration: number;
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  description: string;

  @IsEnum(CourseTypes)
  @ApiProperty()
  type?: 'КУРС' | 'МЕДИТАЦИЯ';

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  timeFrom: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  timeTo: number;

  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  @ApiProperty()
  cardLogoBgColor: string;
}

export class FilesOnCreateCourseDto {
  cardLogoUrl?: Express.Multer.File[];
  cardBgUrl?: Express.Multer.File[];
}

export class SwaggerCreateCourseDto extends PartialType(CreateCourseDto) {
  cardLogoUrl?: Express.Multer.File[];
  cardBgUrl?: Express.Multer.File[];
}
