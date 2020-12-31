export interface Response {}
export interface OkResponse<D extends unknown> extends Response {
	data: D;
}
export namespace Response {
	export interface Generic {}
	export interface Ok<D extends unknown> extends Response {
		data: D;
	}
	export interface Error extends Response {
		type: error;
		message: string;
		data?: string[];
	}
	export type error =
		| 'BAD_REQUEST'
		| 'UNAUTHORIZED'
		| 'EXTRACTOR_TIMEOUT'
		| 'FORBIDEN'
		| 'NOT_FOUND'
		| 'EXTRACTOR_ERROR'
		| 'INTERNAL_ERROR';
}
