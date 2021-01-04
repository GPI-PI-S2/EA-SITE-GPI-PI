import { ApiService } from './api/ApiService';

export class CustomError extends Error {
	static format(e: Error): { type: CustomError.type; message: string } {
		if (e instanceof CustomError) return { type: e.type, message: e.message };
		else if (e.message && (e as CustomError).type)
			return { type: (e as CustomError).type, message: e.message };
		else return { type: 'INTERNAL_ERROR', message: 'Se ha producido un error' };
	}
	constructor(
		readonly type: CustomError.type,
		message: string,
		private readonly _error?: unknown,
	) {
		super(message);
		this._error = _error;
	}
	readonly isCustom = true;
	get error(): unknown {
		return this._error;
	}
}
export namespace CustomError {
	export type type = ApiService.ErrorType;
}
