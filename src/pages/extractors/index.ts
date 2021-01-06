/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from 'src/boot/api';
import barChart from 'src/components/charts/bar';
import { NetworkAnalisis } from 'src/components/networkAnalysis';
import { AnalSentiment } from 'src/controllers/AnalSentiment';
import { Api } from 'src/controllers/api';
import { ApiService } from 'src/controllers/api/ApiService';
import { Extractors } from 'src/controllers/api/Extractors';
import { CustomError } from 'src/controllers/CustomError';
import { MainLayout } from 'src/layouts/main';
import { StateInterface } from 'src/store';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

@Component({
	components: { barChart },
})
export default class ExtractorsPage extends Vue {
	apiKeyYoutube = '';
	apiKeyTwitter = '';
	phoneNumber = '';
	analysis: AnalSentiment.Analyzed[] = [];
	codeHash!: string;
	limitComments = NaN;
	showTelegramDialog = false;
	loading = false;
	step = 0;
	actualId = '';
	alert = true;
	registered = false;
	pending = false;
	metakey = '';
	urlYoutube = '';
	codeConfirmation = '';
	CE = NaN;
	AE = NaN;
	CS = NaN;
	RS = NaN;
	PEC = NaN;
	SEC = NaN;
	IE = NaN;
	data: number[] = [];
	labels: string[] = [];
	@Inject() loader: MainLayout.Loader;
	extractors = [];
	average!: ExtractorsPage.ResultsObtain;
	fillChatsTelegram(
		chats: {
			id: number;
			accessHash: string;
			type: 'user' | 'group' | 'channel';
			name: string;
		}[],
	) {
		chats.map(chat => {
			this.chats.push({
				id: chat.id,
				accessHash: chat.accessHash,
				type: chat.type,
				name: chat.name,
				icon: 'mdi-telegram',
			});
		});
	}
	async validateTelegram(id: Extractors.extractor) {
		let requestC: Extractors.Deploy.RequestC<Extractors.extractor>;
		(requestC as Extractors.Deploy.RequestC<'telegram-extractor'>) = {
			config: {
				apiId: 1862196,
				apiHash: 'ecf4f984d701a3ee7a909d0c505d2df5',
			},
			options: {
				phone: this.phoneNumber,
				code: parseInt(this.codeConfirmation, 10),
				codeHash: this.codeHash,
			},
		};
		await api.$extractors.deploy(id, requestC).then(response2 => {
			if (!response2.ok || !response2.data) {
				this.pending = true;
				this.registered = false;
				throw new CustomError(response2.type as ApiService.ErrorType, response2.message);
			}
			this.pending = false;
			this.registered = true;
			this.fillChatsTelegram(response2.data.data.chats);
		});
	}
	chats: ExtractorsPage.chatsTelegram[] = [];
	async onClickExtractor(id: Extractors.extractor) {
		this.loader.show = true;
		this.loading = true;
		this.actualId = id;
		let requestC: Extractors.Deploy.RequestC<Extractors.extractor>;
		switch (id) {
			case 'telegram-extractor': {
				(requestC as Extractors.Deploy.RequestC<'telegram-extractor'>) = {
					config: {
						apiId: 1862196,
						apiHash: 'ecf4f984d701a3ee7a909d0c505d2df5',
					},
					options: {
						phone: this.phoneNumber,
					},
				};
				break;
			}
			case 'youtube-extractor': {
				(requestC as Extractors.Deploy.RequestC<'youtube-extractor'>) = {
					config: { apiKey: this.apiKeyYoutube },
				};
				break;
			}
			case 'reddit-extractor': {
				(requestC as Extractors.Deploy.RequestC<'reddit-extractor'>) = {
					config: {},
				};
				break;
			}
			case 'twitter-extractor': {
				(requestC as Extractors.Deploy.RequestC<'twitter-extractor'>) = {
					config: { bearerToken: this.apiKeyTwitter },
				};
				break;
			}
			case 'emol-extractor': {
				(requestC as Extractors.Deploy.RequestC<'emol-extractor'>) = {
					config: {},
				};
				break;
			}
		}
		await api.$extractors.deploy(id, requestC).then(response => {
			const verification = true;
			if (!response.ok || !response.data) {
				throw new CustomError(response.type as ApiService.ErrorType, response.message);
			}
			if (id == 'telegram-extractor') {
				const verification = false;
				if (response.data.status == 2) {
					this.pending = true;
					this.codeHash = response.data.data.codeHash;
				}
				if (response.data.status == 3 || verification) {
					this.registered = true;
					this.fillChatsTelegram(response.data.data.chats);
				}
			}
			this.loading = false;
			this.loader.show = false;
			verification ? (this.step = 1) : this.step;
		});
	}
	chartData() {
		this.analysis.forEach(factor => {
			this.data.push(factor.value);
			this.labels.push(factor.name);
		});
	}
	get extractorsData() {
		const extractorsLocal = [];
		api.$extractors
			.list()
			.then(response => {
				if (!response.ok || !response.data) {
					throw new CustomError(response.type as ApiService.ErrorType, response.message);
				}
				response.data.map((extractor, index) => {
					extractorsLocal.push(extractor);
					switch (extractor.id) {
						case 'telegram-extractor': {
							extractorsLocal[index].icon = 'mdi-telegram';
							extractorsLocal[index].color = 'light-blue-4';
							break;
						}
						case 'youtube-extractor': {
							extractorsLocal[index].icon = 'mdi-youtube';
							extractorsLocal[index].color = 'red';
							break;
						}
						case 'twitter-extractor': {
							extractorsLocal[index].icon = 'mdi-twitter';
							extractorsLocal[index].color = 'blue';
							break;
						}
						case 'reddit-extractor': {
							extractorsLocal[index].icon = 'mdi-reddit';
							extractorsLocal[index].color = 'orange';
							break;
						}
						case 'emol-extractor': {
							extractorsLocal[index].icon = 'mdi-newspaper';
							extractorsLocal[index].color = 'grey';
							break;
						}
					}
				});
			})
			.catch(error => {
				this.$q.notify({ type: 'negative', message: error.message });
			});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return extractorsLocal;
	}
	mounted() {
		this.extractors = this.extractorsData;
		const state = this.$store.state as StateInterface;
		this.apiKeyYoutube = state.app.apiKeyYoutube;
		this.apiKeyTwitter = state.app.apiKeyTwitter;
		this.phoneNumber = state.app.phoneNumber;
		this.limitComments = state.app.limit;
	}
	selectExtractId(id: string) {
		this.extractors.find(extract => {
			extract.id == id;
		});
	}
	canUseExtractor(id: string) {
		switch (id) {
			case 'youtube-extractor':
				return this.apiKeyYoutube ? true : false;
			case 'twitter-extractor':
				return this.apiKeyTwitter ? true : false;
			case 'telegram-extractor':
				return this.phoneNumber ? true : false;
			default:
				return true;
		}
	}
	getSentimentsMetaKey(
		results: { input: { content: string }; sentiments: Record<Api.sentiment, number> }[],
	) {
		const localAverage = {
			asertividad: 0,
			'autoconciencia emocional': 0,
			'autocontrol emocional': 0,
			autoestima: 0,
			'colaboración y cooperación': 0,
			'comprensión organizativa': 0,
			'conciencia crítica': 0,
			'comunicacion asertiva': 0,
			'desarrollo de las relaciones': 0,
			'desarrollar y estimular a los demás': 0,
			empatía: 0,
			influencia: 0,
			liderazgo: 0,
			'manejo de conflictos': 0,
			'motivación de logro': 0,
			optimismo: 0,
			'percepción y comprensión emocional': 0,
			'relación social': 0,
			'tolerancia a la frustración': 0,
			violencia: 0,
		};
		results.map(comment => {
			localAverage.asertividad += comment.sentiments.asertividad;
			localAverage['autoconciencia emocional'] +=
				comment.sentiments['autoconciencia emocional'];
			localAverage['autocontrol emocional'] += comment.sentiments['autocontrol emocional'];
			localAverage['autoestima'] += comment.sentiments['autoestima'];
			localAverage['colaboración y cooperación'] +=
				comment.sentiments['colaboración y cooperación'];
			localAverage['comprensión organizativa'] +=
				comment.sentiments['comprensión organizativa'];
			localAverage['conciencia crítica'] += comment.sentiments['conciencia crítica'];
			localAverage['comunicacion asertiva'] += comment.sentiments['comunicacion asertiva'];
			localAverage['desarrollo de las relaciones'] +=
				comment.sentiments['desarrollo de las relaciones'];
			localAverage['desarrollar y estimular a los demás'] +=
				comment.sentiments['desarrollar y estimular a los demás'];
			localAverage.empatía += comment.sentiments.empatía;
			localAverage.influencia += comment.sentiments.influencia;
			localAverage.liderazgo += comment.sentiments.liderazgo;
			localAverage['manejo de conflictos'] += comment.sentiments['manejo de conflictos'];
			localAverage['motivación de logro'] += comment.sentiments['motivación de logro'];
			localAverage.optimismo += comment.sentiments.optimismo;
			localAverage['percepción y comprensión emocional'] +=
				comment.sentiments['percepción y comprensión emocional'];
			localAverage['relación social'] += comment.sentiments['relación social'];
			localAverage['tolerancia a la frustración'] +=
				comment.sentiments['tolerancia a la frustración'];
			localAverage.violencia += comment.sentiments.violencia;
		});
		return localAverage;
	}
	async obtainExtractorData(
		id: Extractors.extractor,
		chat: ExtractorsPage.chatsTelegram = undefined,
	) {
		this.loader.show = true;
		this.loading = true;
		this.actualId = id;
		let requestC: Extractors.Obtain.requestC<Extractors.extractor>;
		switch (id) {
			case 'telegram-extractor': {
				(requestC as Extractors.Obtain.requestC<'telegram-extractor'>) = {
					options: {
						limit: this.limitComments,
						metaKey: 'undef',
						chatId: chat.id,
						accessHash: chat.accessHash,
						type: chat.type,
					},
				};
				break;
			}
			case 'youtube-extractor': {
				(requestC as Extractors.Obtain.requestC<'youtube-extractor'>) = {
					options: {
						limit: this.limitComments,
						metaKey: this.urlYoutube.split('v=')[1].substring(0, 11),
					},
				};
				break;
			}
			case 'reddit-extractor': {
				const cURL = new URL(this.metakey);
				const paths = cURL.pathname.split('/');
				if (paths.length != 7) throw new Error('URL inválido');
				const subRedditlocal = paths[2];
				const postIdlocal = paths[4];
				(requestC as Extractors.Obtain.requestC<'reddit-extractor'>) = {
					options: {
						limit: this.limitComments,
						metaKey: `{${subRedditlocal},${postIdlocal}}`,
						subReddit: subRedditlocal,
						postId: postIdlocal,
					},
				};
				break;
			}
			case 'twitter-extractor': {
				(requestC as Extractors.Obtain.requestC<'twitter-extractor'>) = {
					options: {
						limit: this.limitComments,
						metaKey: this.metakey,
					},
				};
				break;
			}
			case 'emol-extractor': {
				(requestC as Extractors.Obtain.requestC<'emol-extractor'>) = {
					options: {
						limit: this.limitComments,
						metaKey: this.metakey,
					},
				};
				break;
			}
		}
		await api.$extractors.obtain(id, requestC).then(response => {
			if (!response.ok || !response.data) {
				throw new CustomError(response.type as ApiService.ErrorType, response.message);
			}
			const sentiments = this.getSentimentsMetaKey(response.data.data.result);
			const ordered = Object.entries(sentiments).map(entry => ({
				name: entry[0],
				value: entry[1] / response.data.data.result.length,
			})) as NetworkAnalisis.Analysis;
			const analysis = new AnalSentiment(id, ordered);
			this.analysis = analysis.scale;
			this.CE = analysis.CE;
			this.AE = analysis.AE;
			this.CS = analysis.CS;
			this.RS = analysis.RS;
			this.PEC = analysis.PEC;
			this.SEC = analysis.SEC;
			this.IE = analysis.IE;
			this.step = 2;
		});
		this.loading = false;
		this.loader.show = false;
		this.chartData();
		await this.$nextTick();
		const chart = this.$refs['chart2'] as barChart;
		chart.init();
	}
	@Watch('codeConfirmation')
	onChangeCodeConfirmation(c: string) {
		this.codeConfirmation = c;
	}
	@Watch('metakey')
	onChangeMetaKey(key: string) {
		this.metakey = key;
	}
	@Watch('urlYoutube')
	onChangeUrlYoutube(meta: string) {
		this.urlYoutube = meta;
	}
}
export namespace ExtractorsPage {
	export interface Factors {
		label: string;
		data: number[];
	}
	export interface DataChart {
		labels: string[];
		datasets: ExtractorsPage.Factors[];
	}
	export interface ExtractorData {
		id: string;
		config?: {
			bearerToken?: string;
			apiKey?: string;
			apiId?: number;
			apiHash?: string;
		};
		options?: {
			metaKey?: string;
			limit?: number;
			minSentenceSize?: number;
			subReddit?: string;
			postId?: string;
			phone?: string;
			code?: string;
			codeHash?: string;
			type?: string;
			accessHash?: string;
			chatId?: number;
		};
	}
	export interface ResultsObtain {
		input: {
			content: string;
		};
		sentiments: {
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
		};
	}
	export interface chatsTelegram {
		id: number;
		accessHash: string;
		type: 'user' | 'group' | 'channel';
		name: string;
		icon?: string;
	}
	export interface telegramRes {
		data: {
			codeHash?: string;
			message?: string;
			type?: string;
			chats?: chatsTelegram[];
		};
		status: number;
	}
	export interface RedditMeta {
		postId: string;
		subReddit: string;
	}
	export interface ErrorType {
		type: string;
		message: string;
		data: string[];
	}
}
