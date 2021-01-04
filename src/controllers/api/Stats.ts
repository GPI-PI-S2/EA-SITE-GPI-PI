import { Api } from '.';
import { ApiService } from './ApiService';

export class Stats extends ApiService {
	constructor(config: ApiService.Config, options: ApiService.Options) {
		super(config, options);
	}
	calc(filter: Stats.Calc.Filter = {}): Promise<ApiService.Response<Stats.Calc.Response>> {
		return this.request('stats/calc', 'POST', { body: { ...filter } });
	}
	extractors(): Promise<ApiService.Response<Stats.Extractors.Response>> {
		return this.request('stats/extractors', 'GET', {});
	}
	async contributions(): Promise<ApiService.Response<Record<string, number>>> {
		const response = await fetch('https://www.gpi.valdomero.live/contributions.json', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			const data = (await response.json()) as Record<string, number>;
			return { code: 200, ok: true, message: 'Ok response', type: 'OK', data };
		} else
			return {
				code: -1,
				data: null,
				message: 'Problemas al realizar la llamada',
				ok: false,
				type: 'INTERNAL_ERROR',
			};
	}
}
export namespace Stats {
	export namespace Calc {
		export interface Filter {
			metaKey?: string;
			extractor?: string;
		}
		export interface Response {
			sentiments: Api.sentiments;
			total: number;
		}
	}
	export namespace Extractors {
		export type Response = { [key: string]: number };
	}
}
