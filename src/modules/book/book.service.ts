import { Injectable } from "@nestjs/common";
import { BookTypes } from "src/common/constants";
import { ApiErrors } from "src/common/utils/api-errors";
import { Principal } from "../auth/models/principal.model";
import { BookDto, UpdateBookDto } from "./dtos/bookr.dto";
import { BookInterface } from "./interfaces/book.interface";
import { BookRepo } from "./repos/book.repo";

@Injectable()
export class BookService {
    constructor(
        private readonly _bookRepo: BookRepo
    ) { }
    async createBook(bookBody: BookDto): Promise<BookInterface> {
        return await this._bookRepo.create({
            ...bookBody,
            publicationDate: Date.now()
        })
    }

    async finAllBooks(principal: Principal): Promise<BookInterface[]> {
        let query: { type?: BookTypes } = {}
        if (!principal) {
            query.type = BookTypes.PUBLIC
        }
        return await this._bookRepo.findAll(query);
    }

    async findById(bookId: number): Promise<BookInterface> {
        let book = await this._bookRepo.findById(+bookId)
        if (!book) throw ApiErrors.NotFound({ message: "Book not found", param: bookId.toString() });
        return book;
    }

    async deleteBook(bookId: number) {
        await this.findById(+bookId)
        await this._bookRepo.model.findByIdAndDelete(bookId);
    }

    async updateById(updatedBody: UpdateBookDto, bookId: number) {
        await this.findById(+bookId);
        return await this._bookRepo.findOneAndUpdate({ _id: bookId }, updatedBody)

    }


}