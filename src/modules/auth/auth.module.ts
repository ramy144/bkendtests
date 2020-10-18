import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Strategies } from '../../common/constants';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule.register({ defaultStrategy: Strategies.JWT }),
		JwtModule.register({
			secret:process.env.SECRET_KEY,
			signOptions: {
				expiresIn: process.env.JWT_LIFE_TIME
			}
		}),

	],
	controllers: [
	],
	providers: [
		JwtStrategy,
	],
	exports: []
})
export class AuthModule { }
