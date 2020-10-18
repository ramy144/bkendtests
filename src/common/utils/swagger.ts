import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export class Swagger {
    static setup(app: INestApplication) {
        const options = new DocumentBuilder()
            .setTitle('bktests')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/docs', app, document);
    }
}