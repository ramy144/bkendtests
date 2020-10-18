import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from 'src/common/base-repo';
import { BOOK_MODEL_NAME } from '../../../common/constants';
import { BookInterface } from '../interfaces/book.interface';


@Injectable()
export class BookRepo extends BaseRepo<BookInterface> {
    constructor(@InjectModel(BOOK_MODEL_NAME) private readonly _bookModel: Model<BookInterface>) {
        super(_bookModel);
    }

}
