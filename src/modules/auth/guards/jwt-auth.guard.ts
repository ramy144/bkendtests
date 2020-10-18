import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ApiErrors } from 'src/common/utils/api-errors';
import { Strategies } from 'src/common/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(Strategies.JWT) {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context: ExecutionContext) {
        const isPublicOnMethod = this.reflector.get<boolean>("isPublic", context.getHandler());
        const isPublicOnClass = this.reflector.get<boolean>("isPublic", context.getClass());
        if ((typeof isPublicOnMethod !== 'undefined' && !!isPublicOnMethod) || (typeof isPublicOnMethod === 'undefined' && !!isPublicOnClass)) {
            if (user){
                return user;
            }
            else{
                return null;
            }
        }
        if (err || !user) {
            throw err || ApiErrors.Unauthenticated("you are not allowed");
        }
        return user;
    }
}