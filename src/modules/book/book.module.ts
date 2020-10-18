import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { uploadCoverImage } from 'src/common/middlewares/handle-imgs';
import { BOOK_MODEL_NAME } from '../../common/constants';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepo } from './repos/book.repo';
import { BookSchema } from './schemas/book.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: BOOK_MODEL_NAME,
                schema: BookSchema
            }
        ]),
    ],
    providers: [
        BookService,
        BookRepo
    ],
    controllers: [
        BookController
    ],
    exports: [
        BookService,
        BookRepo
    ]
})
export class BookModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(uploadCoverImage)
            .forRoutes(
                { path: `/${BOOK_MODEL_NAME}s`, method: RequestMethod.POST },
            );
    }
}