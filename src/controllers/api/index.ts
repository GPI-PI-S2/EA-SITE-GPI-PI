import { ApiService } from './ApiService';
import { DB } from './DB';
import { Extractors } from './Extractors';
import { Stats } from './Stats';

export class Api {
	constructor(private config: ApiService.Config, private options: ApiService.Options) {}
	readonly $db = new DB(this.config, this.options);
	readonly $stats = new Stats(this.config, this.options);
	readonly $extractors = new Extractors(this.config, this.options);
}
export namespace Api {
	export type sentiment =
		| 'asertividad'
		| 'autoconciencia emocional'
		| 'autoestima'
		| 'desarrollar y estimular a los demás'
		| 'empatía'
		| 'autocontrol emocional'
		| 'influencia'
		| 'liderazgo'
		| 'optimismo'
		| 'relación social'
		| 'colaboración y cooperación'
		| 'comprensión organizativa'
		| 'conciencia crítica'
		| 'desarrollo de las relaciones'
		| 'tolerancia a la frustración'
		| 'comunicacion asertiva'
		| 'manejo de conflictos'
		| 'motivación de logro'
		| 'percepción y comprensión emocional'
		| 'violencia';
	export type sentiments = Record<sentiment, number>;
	export type pager = {
		page: number;
		size: number;
	};
	export type pagedList<T extends unknown> = {
		list: T[];
		page: number;
		size: number;
		total: number;
	};
}
