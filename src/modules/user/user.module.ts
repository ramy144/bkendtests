import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME } from '../../common/constants';
import { UserRepo } from './repos/user.repo';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: USER_MODEL_NAME,
                schema: UserSchema
            }
        ]),
    ],
    providers: [
        UserService,
        UserRepo
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService,
        UserRepo
    ]
})
export class UserModule { }
