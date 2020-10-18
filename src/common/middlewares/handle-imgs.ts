import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrors } from '../utils/api-errors';
const fs = require('fs');
const mime = require('mime');



@Injectable()
export class uploadCoverImage implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log('Request...');

        let matches = req.body.cover.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response: any = {};
        if (matches != null) {
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + extension;
            console.log("LoggerMiddleware -> use -> fileName", fileName)
            try {
                //any logic we would apply
                fs.writeFileSync("../../../uploads" + fileName, imageBuffer, 'utf8');
                console.log("uploadImage -> , success")
            } catch (e) {
                next(e);
            }
            next();
        } else {
            throw ApiErrors.BadRequest({ message: "Invalid image" })
        }


    }

}




