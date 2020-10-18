import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiErrors, ErrorMessages } from 'src/common/utils/api-errors';

@Injectable()
export class VerificationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const http = context.switchToHttp();
        const req = http.getRequest();
        if (!req.user)
            throw ApiErrors.Forbidden({ message: ErrorMessages.FORBIDDEN, param: 'unverified-user' });

        return true;
    }
}

