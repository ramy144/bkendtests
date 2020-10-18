import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { BookTypes } from 'src/common/constants';

export class BookDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    title: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    description: string;


    @ApiProperty()
    @IsDefined()
    @IsString()
    author: string;


    @ApiProperty({
        enum: [BookTypes.PRIVATE, BookTypes.PUBLIC]

    })
    @IsDefined()
    @IsString()
    @IsEnum([BookTypes.PRIVATE, BookTypes.PUBLIC])
    type: string;

    @ApiPropertyOptional()
    @IsDefined()
    cover: string;

}


export class UpdateBookDto {
    @ApiPropertyOptional()
    @IsDefined()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsDefined()
    @IsOptional()
    @IsString()
    description?: string;


    @ApiPropertyOptional()
    @IsDefined()
    @IsOptional()
    @IsString()
    author?: string;


    @ApiPropertyOptional()
    @IsDefined()
    @IsOptional()
    @IsString()
    @IsEnum([BookTypes.PRIVATE, BookTypes.PUBLIC])
    type?: string;

}