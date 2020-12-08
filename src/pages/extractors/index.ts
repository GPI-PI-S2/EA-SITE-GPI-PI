import { timeout } from 'ea-common-gpi-pi';
import { QSpinnerGears } from 'quasar';
import ChartC from 'src/components/chart';
import InputC from 'src/components/InputC';
import { StateInterface } from 'src/store';
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: { ChartC, InputC },
})
export default class ExtractorsPage extends Vue {
	apiKeyYoutube = '';
	apiKeyTwitter = '';
	phoneNumber = '';
	limitComments = NaN;
	showTelegramDialog = false;
	loading = false;
	step = 0;
	actualId = '';
	alert = true;
	registered = false;
	urlYoutube!: string;
	PromedioFactor: ExtractorsPage.Indicator[] = [
		{
			title: 'Promedio 1',
			subtitle: 'about promedio1',
			value: 1234,
		},
		{
			title: 'Promedio 2',
			subtitle: 'about promedio2',
			value: 4321,
		},
	];
	dataChart: ExtractorsPage.DataChart = {
		labels: [],
		datasets: [
			{
				label: '',
				data: [],
			},
		],
	};
	chats: ExtractorsPage.Chat[] = [
		{
			id: 1,
			type: 'chat',
			comments: 104,
			name: 'Chile yaoi 2020',
			icon: 'mdi-telegram',
		},
		{
			id: 2,
			type: 'chat',
			comments: 1000,
			name: 'Chayanne fan club',
			icon: 'mdi-telegram',
		},
		{
			id: 3,
			type: 'chat',
			comments: 500,
			name: 'Argentina is white ',
			icon: 'mdi-telegram',
		},
		{
			id: 4,
			type: 'chat',
			comments: 104,
			name: 'Elpepe vs Etesech',
			icon: 'mdi-telegram',
		},
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
	getRandomNumber() {
		return Math.floor(Math.random() * 15) + 1;
	}
	getChartInfo() {
		this.dataChart = {
			labels: [
				'Asertividad',
				'Autoconsciencia emocional',
				'Autoestima',
				'Colaboración y cooperación',
				'Comprensión organizativa',
				'Consciencia crítica',
				'Desarrollo de las relaciones',
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
					label: 'Factores emocionales de maguna',
					data: [],
				},
			],
		};
		for (let e = 0; e <= 17; e++) {
			this.dataChart.datasets[0].data.push(this.getRandomNumber());
		}
	}
	async onClickExtractor(id: string) {
		this.loading = true;
		try {
			this.actualId = id;
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Inicializando...',
			});
			await timeout(2000);
			dismiss();
			this.step = 1;
		} catch (error) {
			console.error(error);
			this.$q.notify({ type: 'negative', message: 'Problemas al iniciar el extractor' });
		}
		this.loading = false;
	}
	async onclickTelegram(code: number) {
		this.loading = true;
		try {
			await timeout(2000);
			this.loading = false;
			this.registered = true;
		} catch (error) {
			console.error(error);
		}
	}
	async onClickChat(id: number) {
		this.loading = true;
		try {
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			this.getChartInfo();
			await timeout(2000);
			dismiss();
			this.step = 2;
		} catch (error) {
			console.error(error);
		}
	}
	async onSendYoutube() {
		this.loading = true;
		try {
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			this.getChartInfo();
			await timeout(2000);
			dismiss();
			this.step = 2;
		} catch (error) {
			console.error(error);
		}
	}
	async onSendReddit() {
		this.loading = true;
		try {
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			this.getChartInfo();
			await timeout(2000);
			dismiss();
			this.step = 2;
		} catch (error) {
			console.error(error);
		}
	}
	async onSendTwitter() {
		this.loading = true;
		try {
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			this.getChartInfo();
			await timeout(2000);
			dismiss();
			this.step = 2;
		} catch (error) {
			console.error(error);
		}
	}
	async onSendEmol() {
		this.loading = true;
		try {
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			this.getChartInfo();
			await timeout(2000);
			dismiss();
			this.step = 2;
		} catch (error) {
			console.error(error);
		}
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
	export interface Chat {
		id: number;
		type: string;
		comments: number;
		name: string;
		icon: string;
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
		subtitle: string;
		value: number;
	}
}
