
//MODEL NAMES
export const USER_MODEL_NAME = "user";
export const BOOK_MODEL_NAME = "book";

/***************************************************************/
//Password Pattern
export const PASSWORD_PATTERN = "(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$";
/***************************************************************/

// Swagger Tags 
export const USER_TAG = "Users"
export const FORGET_PASSWORD_TAG = "Forget-Password"

/***************************************************************/

export enum BookTypes {
	PRIVATE = "private",
	PUBLIC = "public"
}

/***************************************************************/

export enum Strategies {
	JWT = 'jwt'
}

/***************************************************************/


export enum Errors {
	BadRequest = 'BadRequest',
	Unauthenticated = 'Unauthenticated',
	NotFound = 'NotFound',
	InternalServerError = 'InternalServerError',
	Conflict = 'Conflict',
	UnprocessableEntity = 'UnprocessableEntity',
	Forbidden = 'Forbidden'
}

export enum HttpErrors {
	BadRequest = 400,
	Unauthenticated = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	UnprocessableEntity = 422,
	InternalServerError = 500
}