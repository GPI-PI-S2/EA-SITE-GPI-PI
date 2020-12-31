/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export interface IResponse<Data extends unknown> {
	readonly status: IResponse.Status;
	/**
	 * @deprecated Reemplazada por el getter data
	 */
	get: Data;
	isError: boolean;
	data: Data;
	/**
	 * @deprecated Usar el getter isError para determinar si es error y el getter data para devolver la data
	 */
	error: unknown;
}
export namespace IResponse {
	export enum Status {
		'ERROR',
		'NOT_IMPLEMENTED',
		'PENDING',
		'OK',
	}
}
export namespace IExtractor {
	export interface Register {
		id: string;
		name: string;
		version: string;
	}
	interface Peding {
		message: string;
	}
	export namespace Deploy {
		export interface Config {}
		export interface Options {}
		export interface Response {}
		export interface PendingResponse extends Peding {}
	}
	export namespace Obtain {
		export interface Options {
			metaKey: string;
			limit: number;
			minSentenceSize?: number;
		}
		export interface Response {}
		export interface PendingResponse extends Peding {}
	}
	export namespace UnitaryObtain {
		export interface Options {
			metaKey: string;
		}
		export interface Response {}
		export interface PendingResponse extends Peding {}
	}
	export namespace Destroy {
		export interface Options {}
		export interface Response {}
		export interface PendingResponse extends Peding {}
	}
}
export namespace IEmol {
	export namespace Api {
		export interface Comment {
			id: number;
			creator: string;
			presence: string;
			promotedCreator: boolean;
			disabledCreator: boolean;
			creatorId: number;
			parentId: number;
			banned: boolean;
			authSource: string;
			validated: boolean;
			location: string;
			text: string;
			likes: number;
			dislikes: number;
			denounces: number;
			time: number;
			status: string;
			boost: number;
			highlight: boolean;
			level: number;
			pageSection: string;
			anchor: string;
			pageCmsId: number;
		}
		export interface Data {
			time: number;
			commentsCounter: number;
			userBusiness: boolean;
			userValidated: boolean;
			userPromoted: boolean;
			userTotalFollowers: number;
			userTotalFollowing: number;
			comments: Comment[];
		}
	}
	export namespace Deploy {
		export interface Config extends IExtractor.Deploy.Config {}
		export interface Options extends IExtractor.Deploy.Options {}
		export interface Response extends IExtractor.Deploy.Response {}
	}
	export namespace Obtain {
		export interface Options extends IExtractor.Obtain.Options {}
		export interface Response extends IExtractor.Obtain.Response {}
	}
	export namespace UnitaryObtain {
		export interface Options extends IExtractor.UnitaryObtain.Options {}
		export interface Response extends IExtractor.UnitaryObtain.Response {}
	}
	export namespace Destroy {
		export interface Options extends IExtractor.Destroy.Options {}
		export interface Response extends IExtractor.Destroy.Response {}
	}
}
export namespace IReddit {
	type kind = 'Listing' | 't3' | 't2' | 't1';
	interface Structure<K extends kind, S> {
		kind: K;
		data: S;
	}
	export interface Header
		extends Structure<
			't3',
			{
				subreddit: string;
				selftext: string;
				selftext_html: string;
				title: string;
				subreddit_name_prefixed: string;
				name: string;
				author_fullname: string;
			}
		> {}
	export interface Comment
		extends Structure<
			't1',
			{
				total_awards_received: number;
				link_id: string;
				body: string;
				body_html: string;
				permalink: string;
				name: string;
				author_fullname: string;
				controversiality: number;
				replies: '' | Post<Comment>;
			}
		> {}
	export interface Post<C extends Comment | Header>
		extends Structure<
			'Listing',
			{
				modhash: string;
				dist: number;
				children: C[];
				after: unknown;
				before: unknown;
			}
		> {}
	export type Data = [Post<Header>, Post<Comment>];
	export namespace Deploy {
		export interface Config extends IExtractor.Deploy.Config {}
		export interface Options extends IExtractor.Deploy.Options {}
		export interface Response extends IExtractor.Deploy.Response {}
	}
	export namespace Obtain {
		export interface Options extends IExtractor.Obtain.Options {
			subReddit: string;
			postId: string;
		}
		export interface Response extends IExtractor.Obtain.Response {}
	}
	export namespace UnitaryObtain {
		export interface Options extends IExtractor.UnitaryObtain.Options {}
		export interface Response extends IExtractor.UnitaryObtain.Response {}
	}
	export namespace Destroy {
		export interface Options extends IExtractor.Destroy.Options {}
		export interface Response extends IExtractor.Destroy.Response {}
	}
}
export namespace ITelegram {
	export namespace Deploy {
		export type chat = {
			type: 'user' | 'group' | 'channel';
			id: number;
			accessHash: string;
			name: string;
		};
		export interface Config extends IExtractor.Deploy.Config {
			apiId?: number;
			apiHash?: string;
		}
		export interface Options extends IExtractor.Deploy.Options {
			phone: string;
			code?: number;
			codeHash?: string;
			chatsLimit?: number;
		}
		export interface Response extends IExtractor.Deploy.Response {
			chats: chat[];
		}
		export interface PendingResponse extends IExtractor.Deploy.PendingResponse {
			type: 'verification';
			codeHash: string;
		}
	}
	export namespace Obtain {
		export interface Options extends IExtractor.Obtain.Options {
			chatId: number;
			accessHash: string;
			type: Deploy.chat['type'];
		}
		export interface Response extends IExtractor.Obtain.Response {}
		export interface PendingResponse extends IExtractor.Obtain.PendingResponse {}
	}
	export namespace UnitaryObtain {
		export interface Options extends IExtractor.UnitaryObtain.Options {}
		export interface Response extends IExtractor.UnitaryObtain.Response {}
		export interface PendingResponse extends IExtractor.UnitaryObtain.PendingResponse {}
	}
	export namespace Destroy {
		export interface Options extends IExtractor.Destroy.Options {}
		export interface Response extends IExtractor.Destroy.Response {}
		export interface Destroy extends IExtractor.Destroy.PendingResponse {}
	}
}
export namespace ITwitter {
	export interface Tweet {
		id: string;
		lang?: string;
		text: string;
		created_at?: string;
		conversation_id?: string;
	}
	export interface Search<K extends unknown> {
		data: K[];
		meta: {
			newest_id: string;
			oldest_id: string;
			result_count: number;
			next_token: string;
		};
	}
	export interface RecentSearch extends Search<Tweet> {}
	export namespace Deploy {
		export interface Config extends IExtractor.Deploy.Config {
			bearerToken: string;
		}
		export interface Options extends IExtractor.Deploy.Options {}
		export interface Response extends IExtractor.Deploy.Response {}
	}
	export namespace Obtain {
		export interface Options extends IExtractor.Obtain.Options {}
		export interface Response extends IExtractor.Obtain.Response {}
	}
	export namespace UnitaryObtain {
		export interface Options extends IExtractor.UnitaryObtain.Options {}
		export interface Response extends IExtractor.UnitaryObtain.Response {}
	}
	export namespace Destroy {
		export interface Options extends IExtractor.Destroy.Options {}
		export interface Response extends IExtractor.Destroy.Response {}
	}
}
export namespace IYoutube {
	interface Resource<K extends string> {
		kind: K;
		etag: string;
	}
	export interface Comment extends Resource<'youtube#comment'> {
		id: string;
		snippet: {
			authorDisplayName: string;
			authorProfileImageUrl: string;
			authorChannelUrl: string;
			authorChannelId: {
				value: string;
			};
			channelId: string;
			videoId: string;
			textDisplay: string;
			textOriginal: string;
			parentId: string;
			canRate: boolean;
			viewerRating: string;
			likeCount: number;
			moderationStatus: string;
			publishedAt: string;
			updatedAt: string;
		};
	}
	export interface CommentThread extends Resource<'youtube#commentThread'> {
		id: string;
		snippet: {
			chanelId: string;
			videoId: string;
			topLevelComment: Comment;
			canReply: boolean;
			totalReplyCount: number;
			isPublic: boolean;
		};
		replies: {
			comments: Comment[];
		};
	}
	export interface CommentThreads extends Resource<'youtube#commentThreadListResponse'> {
		nextPageToken: string;
		pageInfo: {
			totalResults: number;
			resultsPerPage: number;
		};
		items: CommentThread[];
	}
	export interface Comments extends Resource<'youtube#commentListResponse'> {
		nextPageToken: string;
		pageInfo: {
			totalResults: number;
			resultsPerPage: number;
		};
		items: Comment[];
	}
	export namespace Deploy {
		export interface Config extends IExtractor.Deploy.Config {
			apiKey: string;
		}
		export interface Options extends IExtractor.Deploy.Options {}
		export interface Response extends IExtractor.Deploy.Response {}
	}
	export namespace Obtain {
		export interface Options extends IExtractor.Obtain.Options {}
		export interface Response extends IExtractor.Obtain.Response {}
	}
	export namespace UnitaryObtain {
		export interface Options extends IExtractor.UnitaryObtain.Options {
			apiKey: string;
			limitComment: number;
		}
		export interface Response extends IExtractor.UnitaryObtain.Response {}
	}
	export namespace Destroy {
		export interface Options extends IExtractor.Destroy.Options {}
		export interface Response extends IExtractor.Destroy.Response {}
	}
}
