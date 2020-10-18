import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Matches } from 'class-validator';
import { PASSWORD_PATTERN } from 'src/common/constants';

export class UserDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    lastName: string;

    @ApiProperty()
    @Matches(new RegExp(PASSWORD_PATTERN))
    @IsDefined()
    password: string;

    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

}


export class SignInDto {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    password: string;

}


export class ResetPasswordDto {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;
}


export class ChangePasswordDto {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    verifyCode: string;

    @ApiProperty()
    @Matches(new RegExp(PASSWORD_PATTERN))
    @IsDefined()
    password: string;
}