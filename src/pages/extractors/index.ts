import ChartC from 'src/components/old_chart';
import InputC from 'src/components/old_InputC';
import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
	components: { ChartC, InputC },
})
export default class ExtractorsPage extends Vue {
	apiKeyYoutube = '';
	apiKeyTwitter = '';
	phoneNumber = '';
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
	average!: ExtractorsPage.ResultsObtain;
	PromedioFactor: ExtractorsPage.Indicator[] = [];
	// PromedioFactor: ExtractorsPage.Indicator[] = [
	// 	{
	// 		title: 'Coeficiente emocional',
	// 		subtitle: 'about promedio1',
	// 		value: 1234,
	// 	},
	// 	{
	// 		title: 'Capital intelectual',
	// 		subtitle: 'about promedio2',
	// 		value: 4321,
	// 	},
	// ];
	dataChart: ExtractorsPage.DataChart = {
		labels: [
			'Asertividad',
			'Autoconsciencia emocional',
			'Autocontrol emocional',
			'Autoestima',
			'Colaboración y cooperación',
			'Comprensión organizativa',
			'Consciencia crítica',
			'Comunicacion asertiva',
			'Desarrollo de las relaciones',
			'Desarrollar y estimular a los demás',
			'Empatía',
			'Influencia',
			'Liderazgo',
			'Manejo de conflictos',
			'Motivación de logro',
			'Optimismo',
			'Percepción y comprensión Emocional',
			'Relación social',
			'Tolerancia a la frustración',
			'Violencia',
		],
		datasets: [
			{
				label: 'Factores emocionales',
				data: [],
			},
		],
	};
	chats: ExtractorsPage.chatsTelegram[] = [
		// icon: 'mdi-telegram',
	];
	extractors: ExtractorsPage.Extractor[] = [
		{
			icon: 'mdi-telegram',
			id: 'telegram-extractor',
			name: 'Telegram Extractor',
			version: '0.0.0',
			color: 'light-blue-4',
		},
		{
			icon: 'mdi-youtube',
			id: 'youtube-extractor',
			name: 'Youtube Extractor',
			version: '0.0.0',
			color: 'red',
		},
		{
			icon: 'mdi-reddit',
			id: 'reddit-extractor',
			name: 'Reddit Extractor',
			version: '0.0.0',
			color: 'orange',
		},
		{
			icon: 'mdi-twitter',
			id: 'twitter-extractor',
			name: 'Twitter Extractor',
			version: '0.0.0',
			color: 'blue',
		},
		{
			icon: 'mdi-newspaper',
			id: 'emol-extractor',
			name: 'EMOL Extractor',
			version: '0.0.0',
			color: 'grey',
		},
	];
	mounted() {
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
	async fetchExtractor(url: string, bodyToSend: ExtractorsPage.ExtractorData) {
		return fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
				'X-API-KEY': 'rayaparalasuma',
			},
			body: JSON.stringify(bodyToSend),
		}).then(response => {
			const res = response.json();
			if (response.status == 200) {
				return res;
			} else {
				return res.then(Promise.reject.bind(Promise));
			}
		});
	}
	async onClickExtractor(id: string) {
		this.loading = true;
		if (this.actualId == 'telegram-extractor' && this.pending == true) {
			this.actualId = id;
			await this.fetchExtractor('http://localhost:8000/api/v1/extractors/deploy', {
				id: this.actualId,
				config: {
					apiId: 1862196,
					apiHash: 'ecf4f984d701a3ee7a909d0c505d2df5',
				},
				options: {
					phone: this.phoneNumber,
					code: this.codeConfirmation,
					codeHash: this.codeHash,
				},
			})
				.then(data => {
					const telegramResponse: ExtractorsPage.telegramRes = data.data;
					console.log(telegramResponse);
					if (telegramResponse.data.chats) {
						telegramResponse.data.chats.map(chat => {
							this.chats.push({
								id: chat.id,
								accessHash: chat.accessHash,
								type: chat.type,
								name: chat.name,
								icon: 'mdi-telegram',
							});
						});
					}
					this.pending = false;
					this.registered = true;
				})
				.catch((error: ExtractorsPage.ErrorType) => {
					this.$q.notify({ type: 'negative', message: `Error: ${error.message}.` });
				});
		} else {
			this.actualId = id;
			await this.fetchExtractor('http://localhost:8000/api/v1/extractors/deploy', {
				id: this.actualId,
				config: {
					bearerToken:
						this.actualId == 'twitter-extractor' ? this.apiKeyTwitter : undefined,
					apiId: this.actualId == 'telegram-extractor' ? 1862196 : undefined,
					apiHash:
						this.actualId == 'telegram-extractor'
							? 'ecf4f984d701a3ee7a909d0c505d2df5'
							: undefined,
					apiKey: this.actualId == 'youtube-extractor' ? this.apiKeyYoutube : undefined,
				},
				options: {
					phone: this.actualId == 'telegram-extractor' ? this.phoneNumber : undefined,
				},
			})
				.then(data => {
					if (this.actualId == 'telegram-extractor') {
						const telegramResponse: ExtractorsPage.telegramRes = data.data;
						if (telegramResponse.status == 2) {
							if (telegramResponse.data.codeHash) {
								this.codeHash = telegramResponse.data.codeHash;
							}
							if (telegramResponse.status == 3) {
								if (telegramResponse.data.chats) {
									telegramResponse.data.chats.map(chat => {
										this.chats.push({
											id: chat.id,
											accessHash: chat.accessHash,
											type: chat.type,
											name: chat.name,
											icon: 'mdi-telegram',
										});
									});
								}
								this.registered = true;
								this.pending = false;
								this.loading = false;
							}
						}
					}
					this.step = 1;
				})
				.catch((error: ExtractorsPage.ErrorType) => {
					this.$q.notify({ type: 'negative', message: `Error: ${error.message}.` });
				});
		}
		this.loading = false;
	}
	async obtainExtractorData() {
		this.loading = true;
		const body: ExtractorsPage.ExtractorData = {
			id: this.actualId,
			options: {
				limit: this.limitComments,
				minSentenceSize: 3,
			},
		};
		if (this.actualId == 'reddit-extractor') {
			const cURL = new URL(this.metakey);
			const paths = cURL.pathname.split('/');
			if (paths.length != 7) throw new Error('URL inválido');
			const subRedditlocal = paths[2];
			const postIdlocal = paths[4];
			if (!subRedditlocal || !postIdlocal) throw new Error('Subreddit o PostId Inválido');
			else {
				(body.options.metaKey = `{${subRedditlocal},${postIdlocal}}`),
					(body.options.postId = postIdlocal);
				body.options.subReddit = subRedditlocal;
			}
		} else if (this.actualId == 'youtube-extractor') {
			body.options.metaKey = this.urlYoutube.split('v=')[1].substring(0, 11);
		} else {
			body.options.metaKey = this.metakey;
		}
		await this.fetchExtractor('http://localhost:8000/api/v1/extractors/obtain', body)
			.then(data => {
				const result: ExtractorsPage.ResultsObtain[] = data.data.data.result;
				const localAverage: ExtractorsPage.ResultsObtain = {
					input: {
						content: 'Analisis',
					},
					sentiments: {
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
					},
				};
				result.map(comment => {
					localAverage.sentiments.asertividad += comment.sentiments.asertividad;
					localAverage.sentiments['autoconciencia emocional'] +=
						comment.sentiments['autoconciencia emocional'];
					localAverage.sentiments['autocontrol emocional'] +=
						comment.sentiments['autocontrol emocional'];
					localAverage.sentiments['autoestima'] += comment.sentiments['autoestima'];
					localAverage.sentiments['colaboración y cooperación'] +=
						comment.sentiments['colaboración y cooperación'];
					localAverage.sentiments['comprensión organizativa'] +=
						comment.sentiments['comprensión organizativa'];
					localAverage.sentiments['conciencia crítica'] +=
						comment.sentiments['conciencia crítica'];
					localAverage.sentiments['comunicacion asertiva'] +=
						comment.sentiments['comunicacion asertiva'];
					localAverage.sentiments['desarrollo de las relaciones'] +=
						comment.sentiments['desarrollo de las relaciones'];
					localAverage.sentiments['desarrollar y estimular a los demás'] +=
						comment.sentiments['desarrollar y estimular a los demás'];
					localAverage.sentiments.empatía += comment.sentiments.empatía;
					localAverage.sentiments.influencia += comment.sentiments.influencia;
					localAverage.sentiments.liderazgo += comment.sentiments.liderazgo;
					localAverage.sentiments['manejo de conflictos'] +=
						comment.sentiments['manejo de conflictos'];
					localAverage.sentiments['motivación de logro'] +=
						comment.sentiments['motivación de logro'];
					localAverage.sentiments.optimismo += comment.sentiments.optimismo;
					localAverage.sentiments['percepción y comprensión emocional'] +=
						comment.sentiments['percepción y comprensión emocional'];
					localAverage.sentiments['relación social'] +=
						comment.sentiments['relación social'];
					localAverage.sentiments['tolerancia a la frustración'] +=
						comment.sentiments['tolerancia a la frustración'];
					localAverage.sentiments.violencia += comment.sentiments.violencia;
				});
				this.dataChart.datasets[0].data = Object.values(localAverage.sentiments).map(
					factor => {
						return factor / result.length;
					},
				);
				this.loading = false;
				this.step = 2;
			})
			.catch((error: ExtractorsPage.ErrorType) => {
				this.$q.notify({ type: 'negative', message: `Error: ${error.message}.` });
			})
			.then(data => {
				const result: ExtractorsPage.ResultsObtain[] = data.data.data.results;
				const localAverage: ExtractorsPage.ResultsObtain = {
					input: {
						content: 'Analisis',
					},
					sentiments: {
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
					},
				};
				result.map(comment => {
					localAverage.sentiments.asertividad += comment.sentiments.asertividad;
					localAverage.sentiments['autoconciencia emocional'] +=
						comment.sentiments['autoconciencia emocional'];
					localAverage.sentiments['autocontrol emocional'] +=
						comment.sentiments['autocontrol emocional'];
					localAverage.sentiments['autoestima'] += comment.sentiments['autoestima'];
					localAverage.sentiments['colaboración y cooperación'] +=
						comment.sentiments['colaboración y cooperación'];
					localAverage.sentiments['comprensión organizativa'] +=
						comment.sentiments['comprensión organizativa'];
					localAverage.sentiments['conciencia crítica'] +=
						comment.sentiments['conciencia crítica'];
					localAverage.sentiments['comunicacion asertiva'] +=
						comment.sentiments['comunicacion asertiva'];
					localAverage.sentiments['desarrollo de las relaciones'] +=
						comment.sentiments['desarrollo de las relaciones'];
					localAverage.sentiments['desarrollar y estimular a los demás'] +=
						comment.sentiments['desarrollar y estimular a los demás'];
					localAverage.sentiments.empatía += comment.sentiments.empatía;
					localAverage.sentiments.influencia += comment.sentiments.influencia;
					localAverage.sentiments.liderazgo += comment.sentiments.liderazgo;
					localAverage.sentiments['manejo de conflictos'] +=
						comment.sentiments['manejo de conflictos'];
					localAverage.sentiments['motivación de logro'] +=
						comment.sentiments['motivación de logro'];
					localAverage.sentiments.optimismo += comment.sentiments.optimismo;
					localAverage.sentiments['percepción y comprensión emocional'] +=
						comment.sentiments['percepción y comprensión emocional'];
					localAverage.sentiments['relación social'] +=
						comment.sentiments['relación social'];
					localAverage.sentiments['tolerancia a la frustración'] +=
						comment.sentiments['tolerancia a la frustración'];
					localAverage.sentiments.violencia += comment.sentiments.violencia;
				});
				this.dataChart.datasets[0].data = Object.values(localAverage.sentiments).map(
					factor => {
						return factor / result.length;
					},
				);
			})
			.catch(error => {
				this.$q.notify({ type: 'negative', message: `Error: ${error.message}.` });
			});
	}
	async obtainTelegramData(chat: ExtractorsPage.chatsTelegram){
		this.loading=true
		console.log(chat)
		const body: ExtractorsPage.ExtractorData = {
			id: this.actualId,
			options:{
				chatId: chat.id,
				metaKey: chat.id.toString(),
				limit: this.limitComments,
				accessHash: chat.accessHash,
				type: chat.type
			}
		}
		await this.fetchExtractor('http://localhost:8000/api/v1/extractors/obtain',body).then((data) => {
			const result: ExtractorsPage.ResultsObtain [] = data.data.data.result
			const localAverage: ExtractorsPage.ResultsObtain = {
				input:{
					content:'Analisis'
				},
				sentiments: {
				'asertividad': 0,
				'autoconciencia emocional': 0,
				'autocontrol emocional': 0,
				'autoestima': 0,
				'colaboración y cooperación': 0,
				'comprensión organizativa': 0,
				'conciencia crítica': 0,
				'comunicacion asertiva': 0,
				'desarrollo de las relaciones': 0,
				'desarrollar y estimular a los demás': 0,
				'empatía': 0,
				'influencia':0,
				'liderazgo':0,
				'manejo de conflictos': 0,
				'motivación de logro': 0,
				'optimismo':0,
				'percepción y comprensión emocional': 0,
				'relación social': 0,
				'tolerancia a la frustración': 0,
				'violencia': 0
				}
			}
			result.map((comment)=>{
				localAverage.sentiments.asertividad += comment.sentiments.asertividad
				localAverage.sentiments['autoconciencia emocional']+=comment.sentiments['autoconciencia emocional']
				localAverage.sentiments['autocontrol emocional']+=comment.sentiments['autocontrol emocional']
				localAverage.sentiments['autoestima']+=comment.sentiments['autoestima']
				localAverage.sentiments['colaboración y cooperación']+=comment.sentiments['colaboración y cooperación']
				localAverage.sentiments['comprensión organizativa']+=comment.sentiments['comprensión organizativa']
				localAverage.sentiments['conciencia crítica']+=comment.sentiments['conciencia crítica']
				localAverage.sentiments['comunicacion asertiva']+=comment.sentiments['comunicacion asertiva']
				localAverage.sentiments['desarrollo de las relaciones']+=comment.sentiments['desarrollo de las relaciones']
				localAverage.sentiments['desarrollar y estimular a los demás']+=comment.sentiments['desarrollar y estimular a los demás']
				localAverage.sentiments.empatía+=comment.sentiments.empatía
				localAverage.sentiments.influencia+=comment.sentiments.influencia
				localAverage.sentiments.liderazgo+=comment.sentiments.liderazgo
				localAverage.sentiments['manejo de conflictos']+=comment.sentiments['manejo de conflictos']
				localAverage.sentiments['motivación de logro']+=comment.sentiments['motivación de logro']
				localAverage.sentiments.optimismo+=comment.sentiments.optimismo
				localAverage.sentiments['percepción y comprensión emocional']+=comment.sentiments['percepción y comprensión emocional']
				localAverage.sentiments['relación social']+=comment.sentiments['relación social']
				localAverage.sentiments['tolerancia a la frustración']+=comment.sentiments['tolerancia a la frustración']
				localAverage.sentiments.violencia+=comment.sentiments.violencia
			})
			this.dataChart.datasets[0].data = Object.values(localAverage.sentiments).map((factor)=>{return (factor/result.length)})
			this.loading = false
			this.step=2
		})
		.catch((error: ExtractorsPage.ErrorType)=>{
			this.$q.notify({ type: 'negative', message: `Error: ${error.message}.`});
		})
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
	export interface Extractor {
		name: string;
		version: string;
		id: string;
		icon: string;
		color: string;
	}
	export interface Factors {
		label: string;
		data: number[];
	}
	export interface DataChart {
		labels: string[];
		datasets: ExtractorsPage.Factors[];
	}
	export interface Indicator {
		title: string;
		subtitle?: string;
		value: number;
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
		type: string;
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
