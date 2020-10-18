import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import * as generator from 'password-generator';
import { ApiErrors } from "src/common/utils/api-errors";
import { hashPassword } from "src/common/utils/hashPassword";
import { generateToken } from "src/common/utils/tokensGeneration";
import { ChangePasswordDto, ResetPasswordDto, SignInDto, UserDto } from "./dtos/user.dto";
import { UserInterface } from "./interfaces/user.interface";
import { UserRepo } from "./repos/user.repo";

@Injectable()
export class UserService {
    constructor(
        private readonly _userRepo: UserRepo
    ) { }


    async signup(signUpDto: UserDto): Promise<{ user: UserInterface, accessToken: string }> {

        let userWithEmail = await this._userRepo.findOne({ email: signUpDto.email });
        if (userWithEmail)
            throw ApiErrors.Conflict({ message: "email already registered" })


        let createdUser = await this._userRepo.create({
            ...signUpDto,
            password: await hashPassword(signUpDto.password),
        });

        return {
            user: createdUser,
            accessToken: generateToken(createdUser._id)
        }
    }


    async signin(signInDto: SignInDto): Promise<{ user: UserInterface, accessToken: string }> {
        let user = await this._userRepo.findOne({ email: signInDto.email })

        if (!user || !bcrypt.compareSync(signInDto.password, user.password))
            throw ApiErrors.Unauthenticated();

        return {
            user,
            accessToken: generateToken(user._id),
        }
    }

    public generateVerifyCode() {
        return generator(4, false, /\d/);
    }

    async sendVerifyCodeTochangePassword(resetPasswordDto: ResetPasswordDto): Promise<{ verifyCode: string }> {
        //this end point must send an email on a text msg on real life
        // but it will give U the verify code 
        let verificationCode = this.generateVerifyCode();

        await this._userRepo.findOneAndUpdate({ email: resetPasswordDto.email }, { $set: { verifyCode: verificationCode } })

        return { verifyCode: verificationCode };
    }


    async confirmAndChangePassword(changePasswordDto: ChangePasswordDto): Promise<{ user: UserInterface, accessToken: string }> {
        let user = await this._userRepo.findOne({ email: changePasswordDto.email });

        if (+user.verifyCode !== +changePasswordDto.verifyCode)
            throw ApiErrors.BadRequest({ message: "Wrong Verify Code" });

        let updatedUser = await this._userRepo.findOneAndUpdate({ email: changePasswordDto.email }, {
            password: await hashPassword(changePasswordDto.password),
        })

        return {
            user: updatedUser,
            accessToken: generateToken(updatedUser._id)
        }

    }

    async findById(userId: number): Promise<UserInterface> {
        let user = await this._userRepo.findById(userId);
        if (!user) throw ApiErrors.NotFound({ message: 'user not found' })
        return user;
    }


}