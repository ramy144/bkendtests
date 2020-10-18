import { Errors, HttpErrors } from '../../common/constants';

type ApiErrorArgs = {
	errorType: string;
	message?: string | Array<string>;
	param?: string | Array<string>;
};



export type ApiErrorStaticFunArgs = {
	param?: string | Array<string>;
	message?: string | Array<string>;
};

export type ErrorMessage = {
	message: string;
	param: string;
};

export type ErrorResponse = {
	error: {
		errors: ErrorMessage[];
	};
};
export enum ErrorMessages {
	NOT_FOUND = 'Not Found',
	FORBIDDEN = 'You are not allowed to access this resource',
	INTERNAL_SERVER_ERROR = 'Internal Server Error'
}

export class ApiErrors extends Error {
	public message: string[] | any;
	public name: string;
	public status: number;
	public param: Array<string>;

	constructor({ errorType, message = [], param = [] }: ApiErrorArgs) {
		super();

		if (!Array.isArray(param)) param = [param];
		if (!Array.isArray(message)) message = [message];

		this.message = message;
		this.param = param;
		this.name = errorType;
		this.status = +HttpErrors[errorType];

	}

	static BadRequest = (args: ApiErrorStaticFunArgs) => new ApiErrors({ errorType: Errors.BadRequest, ...args });
	static Unauthenticated = (message?: string | string[]) =>
		new ApiErrors({ errorType: Errors.Unauthenticated, message });
	static NotFound = (args: ApiErrorStaticFunArgs) =>
		new ApiErrors({ errorType: Errors.NotFound, message: ErrorMessages.NOT_FOUND, ...args });
	static InternalServerError = (params?: any) =>
		new ApiErrors({
			errorType: Errors.InternalServerError,
			param: params,
			message: ErrorMessages.INTERNAL_SERVER_ERROR
		});
	static UnprocessableEntity = (args: ApiErrorStaticFunArgs) =>
		new ApiErrors({ errorType: Errors.UnprocessableEntity, ...args });
	static Conflict = (args: ApiErrorStaticFunArgs) => new ApiErrors({ errorType: Errors.Conflict, ...args });
	static Forbidden = (messageOrArgs?: string | ApiErrorStaticFunArgs) => {
		if (typeof messageOrArgs === 'string') {
			messageOrArgs = {
				message: messageOrArgs
			};
		}

		return new ApiErrors({
			errorType: Errors.Forbidden,
			...messageOrArgs
		});
	}

	handle(req, res) {

        const errors: ErrorMessage[] = this.message.map((message: string, messageIndex: number) => {
            let result: any = { message };

            if (this.param[messageIndex])
                result.param = this.param[messageIndex];

            return result;
        });

        res.status(this.status || 500).json({
            error: {
                errors
            }
        } as ErrorResponse);

    }

}
