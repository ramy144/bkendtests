import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                return {
                    uri: "mongodb://admin123:admin123@ds113866.mlab.com:13866/bkendtests" //'mongodb://localhost:27017/bkendtest',

                }
            },

        }),
        AuthModule,
        UserModule,
        BookModule
    ]

})
export class CoreModule { }
