import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiErrors } from 'src/common/utils/api-errors';
import { UserService } from 'src/modules/user/user.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly _userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "APP" 
		});
	}

	public async validate(payload: IJwtPayload, done: Function) {
		const user = await this._userService.findById(payload.sub);
		if (!user) return done(ApiErrors.Forbidden());

		done(null, user);
	}
}
