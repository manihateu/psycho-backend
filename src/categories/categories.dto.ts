import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty()
    name: string 

    @IsString()
    @Length(7, 7)
    @IsNotEmpty()
    @ApiProperty()
    bgcolor: string 
}