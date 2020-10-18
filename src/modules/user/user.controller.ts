import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FORGET_PASSWORD_TAG, USER_TAG } from "src/common/constants";
import { Public } from "src/common/dcorators/public.decorator";
import { ChangePasswordDto, ResetPasswordDto, SignInDto, UserDto } from "./dtos/user.dto";
import { UserInterface } from "./interfaces/user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) { }

    @ApiTags(USER_TAG)
    @Public()
    @Post('/signup')
    async signup(
        @Body() signUpDto: UserDto
    ): Promise<{ user: UserInterface, accessToken: string }> {
        return this._userService.signup(signUpDto)
    }

    @ApiTags(USER_TAG)
    @Public()
    @Post('/signin')
    async userSignIn(
        @Body() signInDto: SignInDto,
    ) {
        return this._userService.signin(signInDto)
    }

    @ApiTags(FORGET_PASSWORD_TAG)
    @Public()
    @Post('/send-verify-code')
    async sendVrifyCode(
        @Body() sendcode: ResetPasswordDto,
    ): Promise<{verifyCode:string}> {
        return await this._userService.sendVerifyCodeTochangePassword(sendcode)
    }

    @ApiTags(FORGET_PASSWORD_TAG)
    @Public()
    @Post('/reset-password')
    async changePassword(
        @Body() changePassword: ChangePasswordDto,
    ):  Promise<{ user: UserInterface, accessToken: string }> {
        return await this._userService.confirmAndChangePassword(changePassword)
    }
}