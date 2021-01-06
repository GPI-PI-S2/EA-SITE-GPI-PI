import { Api } from '.';
import { ApiService } from './ApiService';

export class Extractors extends ApiService {
	constructor(config: ApiService.Config, options: ApiService.Options) {
		super(config, options);
	}
	list(): Promise<ApiService.Response<Extractors.List.Response>> {
		return this.request('extractors/list', 'GET', {});
	}
	deploy<T extends Extractors.extractor>(
		id: T,
		settings: Extractors.Deploy.RequestC<T>,
	): Promise<ApiService.Response<Extractors.Deploy.Response<T>>> {
		const { config } = settings;
		return this.request('extractors/deploy', 'POST', {
			body: {
				id,
				config,
				options: (settings as Extractors.Deploy.RequestC<'telegram-extractor'>).options,
			},
		});
	}
	obtain<T extends Extractors.extractor>(
		id: T,
		settings: Extractors.Obtain.requestC<T>,
	): Promise<ApiService.Response<Extractors.Obtain.Response<T>>> {
		const { options } = settings;
		return this.request('extractors/obtain', 'POST', {
			body: {
				id,
				options,
			},
		});
	}
}
export namespace Extractors {
	export namespace List {
		export type Response = Record<'id' | 'name' | 'version' | 'extractorVersion'| 'icon' | 'color', string>[];
	}
	export namespace Deploy {
		interface TwitterConfig {
			bearerToken: string;
		}
		interface redditConfig {}
		interface youtubeConfig {
			apiKey: string;
		}
		interface telegramConfig {
			apiId: number;
			apiHash: string;
		}
		interface telegramOptions {
			phone: string;
			code?: number;
			codeHash?: string;
			chatsLimit?: number;
		}
		export type requestId = extractor;
		export type RequestC<T extends extractor> = T extends 'twitter-extractor'
			? { config: TwitterConfig }
			: T extends 'youtube-extractor'
			? { config: youtubeConfig }
			: T extends 'reddit-extractor'
			? { config: redditConfig }
			: T extends 'telegram-extractor'
			? { config: telegramConfig; options: telegramOptions }
			: T extends 'emol-extractor'
			? { config: unknown}
			: never;
		export type Response<T extends extractor> = T extends 'telegram-extractor'
			? {
					status: Response.Status;
					data: {
						type: string;
						message: string;
						codeHash: string;
						chats?: {
							id: number,
							accessHash: string,
							name: string,
							type: 'user' | 'group' | 'channel' 
						}[]
					};
			  }
			: {
					status: Response.Status;
					data: null;
			  };
	}
	export namespace Obtain {
		interface options {
			limit: number;
			minSentenceSize?: number;
			metaKey: string;
		}
		interface RedditOptions extends options {
			subReddit: string;
			postId: string;
		}
		interface TwitterOptions extends options {}
		interface YoutubeOptions extends options {}
		interface EmolOptions extends options {}
		interface TelegramOptions extends options {
			chatId: number;
			accessHash: string;
			type: 'user' | 'group' | 'channel';
		}

		export type requestId = extractor;
		export type requestC<T extends extractor> = T extends 'twitter-extractor'
			? { options: TwitterOptions }
			: T extends 'youtube-extractor'
			? { options: YoutubeOptions }
			: T extends 'reddit-extractor'
			? { options: RedditOptions }
			: T extends 'telegram-extractor'
			? { options: TelegramOptions }
			: T extends 'emol-extractor'
			? { options: EmolOptions }
			: never;
		export interface Response<T extends extractor> {
			status: Response.Status;
			data: {
				modelVersion: string;
				extractor: T;
				metaKey: string;
				result: { input: { content: string }; sentiments: Record<Api.sentiment, number> }[];
			};
		}
	}
	export type extractor =
		| 'telegram-extractor'
		| 'reddit-extractor'
		| 'emol-extractor'
		| 'twitter-extractor'
		| 'youtube-extractor';
	export namespace Response {
		export enum Status {
			'ERROR',
			'NOT_IMPLEMENTED',
			'PENDING',
			'OK',
		}
	}
}
