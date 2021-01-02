import { Api } from '.';
import { ApiService } from './ApiService';

export class DB extends ApiService {
	constructor(config: ApiService.Config, options: ApiService.Options) {
		super(config, options);
	}
	entryList(
		options: DB.EntryList.Request,
	): Promise<ApiService.Response<Api.pagedList<DB.DB.Entry>>> {
		return this.request('db/entry/list', 'POST', { body: { ...options } });
	}
	analysisFetch(
		id: DB.AnalysisFetch.Request['id'],
	): Promise<ApiService.Response<DB.AnalysisFetch.Response>> {
		return this.request('db/anal/fetch', 'POST', { body: { id } });
	}
}
export namespace DB {
	export namespace EntryList {
		export interface Request {
			pager: Api.pager;
			filter?: {
				extractor: string;
				metaKey: string;
			};
		}
	}
	export namespace AnalysisFetch {
		export interface Request {
			id: string;
		}
		export interface Response extends DB.Analysis {}
	}
	export namespace Extractors {
		export type Response = { [key: string]: number };
	}
	export namespace DB {
		export interface Entry {
			_id: number;
			hash: string;
			created: string;
			extractor: string;
			metaKey: string;
			content: string;
		}
		export interface Analysis {
			_id: number;
			_entryId: number;
			asertividad: number;
			'autoconciencia emocional': number;
			autoestima: number;
			'desarrollar y estimular a los demás': number;
			empatía: number;
			'autocontrol emocional': number;
			influencia: number;
			liderazgo: number;
			optimismo: number;
			'relación social': number;
			'colaboración y cooperación': number;
			'comprensión organizativa': number;
			'conciencia crítica': number;
			'desarrollo de las relaciones': number;
			'tolerancia a la frustración': number;
			'comunicacion asertiva': number;
			'manejo de conflictos': number;
			'motivación de logro': number;
			'percepción y comprensión emocional': number;
			violencia: number;
			modelVersion: string;
			_deleted: boolean;
			completionDate: string;
			hash: string;
		}
	}
}
