import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: () => ({
				storage: multer.memoryStorage(),
				limits: {
					fileSize: 1024 * 1024 * 12
				} 
			})
		}),
	],
	exports: [MulterModule,]
})
export class SharedModule { }
