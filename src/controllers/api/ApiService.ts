export class ApiService {
	constructor(protected config: ApiService.Config, protected options: ApiService.Options) {}
	async request<T extends unknown, M extends ApiService.mode>(
		path: string,
		mode: M,
		vars: ApiService.requestVars<M>,
	): Promise<ApiService.Response<T>> {
		const url = `${this.config.endpoint}/${path}`;
		const query = new URLSearchParams(vars.query).toString();
		const fullUrl = url + (query ? '?' + query : '');
		const { credentials, headers } = this.requestOptions;
		try {
			let data: ApiService.ApiResponse<T>;
			let ok: boolean;
			let code: number;
			switch (mode) {
				case 'GET': {
					const response = await fetch(fullUrl, {
						method: mode,
						credentials,
						headers,
					});
					data = (await response.json()) as ApiService.ApiResponse<T>;
					ok = response.ok;
					code = response.status;
				}
				default: {
					const oBody = (vars as ApiService.requestVars<'POST'>).body;
					const response = await fetch(fullUrl, {
						method: mode,
						credentials,
						headers,
						body: JSON.stringify(oBody),
					});
					data = (await response.json()) as ApiService.ApiResponse<T>;
					ok = response.ok;
					code = response.status;
				}
			}
			return {
				code,
				ok,
				data: data.data ? data.data : (null as never),
				type: data.type ? data.type : ('OK' as ApiService.ErrorType | ApiService.OkType),
				message: data.message ? data.message : 'Ok response',
			};
		} catch (error) {
			console.log('error', error);
			return {
				data: null,
				code: -1,
				ok: false,
				type: 'NO_CONNECTION',
				message: 'No se pudo realizar la llamada',
			};
		}
	}
	private get requestOptions(): ApiService.RequestOptions {
		return {
			credentials: this.config.credentials ? 'include' : 'omit',
			headers: {
				'Content-type': 'application/json',
				'X-API-KEY': this.options.apiKey,
			},
		};
	}
}
export namespace ApiService {
	export type mode = 'GET' | 'POST';
	export type Status = ErrorType | OkType | LocalErrorType;
	export type LocalErrorType = 'NO_CONNECTION';
	export type ErrorType =
		| 'FORBIDEN'
		| 'BAD_REQUEST'
		| 'UNAUTHORIZED'
		| 'INTERNAL_ERROR'
		| 'NOT_FOUND'
		| 'EXTRACTOR_ERROR'
		| 'EXTRACTOR_TIMEOUT';
	export type OkType = 'OK';
	export type requestVars<M extends mode> = M extends 'GET'
		? { query?: string }
		: M extends 'POST'
		? { query?: string; body: Record<string, unknown> }
		: never;
	export interface RequestOptions {
		credentials: RequestCredentials;
		headers: Record<string, string>;
	}
	export type Response<D extends unknown> = {
		data: D | null;
		ok: boolean;
		code: number;
		type: Status;
		message: string;
	};
	export interface ApiResponse<T extends unknown> {
		data?: T;
		type?: Status;
		message?: string;
	}
	export interface Config {
		endpoint: string;
		debug?: string;
		credentials?: boolean;
	}
	export interface Options {
		apiKey: string;
	}
}
