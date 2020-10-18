import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BOOK_MODEL_NAME } from "src/common/constants";
import { Public } from "src/common/dcorators/public.decorator";
import { CurrentPrincipal } from "../auth/decrators/principal.decrator";
import { Principal } from "../auth/models/principal.model";
import { BookService } from "./book.service";
import { BookDto, UpdateBookDto } from "./dtos/bookr.dto";
import { BookInterface } from "./interfaces/book.interface";
@ApiBearerAuth()
@Controller()
export class BookController {
    constructor(
        private readonly _bookService: BookService
    ) { }


    @ApiTags("Books")
    @Post(`/${BOOK_MODEL_NAME}s`)
    async createBook(
        
        @Body() bookbody: BookDto,
    ): Promise<BookInterface> {
        return this._bookService.createBook(bookbody)
    }

    @ApiTags("Books")
    @Public()
    @Get(`/${BOOK_MODEL_NAME}s`)
    async findAll(
        @CurrentPrincipal() principal: Principal,
    ): Promise<BookInterface[]> {
        return this._bookService.finAllBooks(principal)
    }

    @HttpCode(204)
    @ApiTags("Books")
    @Delete(`/${BOOK_MODEL_NAME}s/:bookId`)
    async DeleteBook(
        @Param('bookId') bookId: number,
    ): Promise<void> {
        await this._bookService.deleteBook(bookId)
    }


    @ApiTags("Books")
    @Patch(`/${BOOK_MODEL_NAME}s/:bookId`)
    async updateBook(
        @Body() updatedBody: UpdateBookDto,
        @Param('bookId') bookId: number,
    ): Promise<BookInterface> {
        return this._bookService.updateById(updatedBody, bookId)
    }

}