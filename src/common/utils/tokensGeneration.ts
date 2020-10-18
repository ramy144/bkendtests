import * as jwt from 'jsonwebtoken';

function _generateToken({ userId, tokenSecret, expiresIn }) {
    return jwt.sign(
        {
            sub: userId,
            iss: process.env.SECRET_KEY,
            iat: new Date().getTime() / 1000
        },
        tokenSecret,
        { expiresIn }
    );
}


export function generateToken(id: number) {
    return _generateToken({
        userId: id, tokenSecret: process.env.SECRET_KEY,
        expiresIn: process.env.JWT_LIFE_TIME
    });
}

