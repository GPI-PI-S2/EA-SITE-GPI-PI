import { Api } from './api';
import { DB } from './api/DB';

export class AnalSentiment {
	static IQR = {
		'emol-extractor': {
			asertividad: 1.345,
			'autoconciencia emocional': 1.375,
			autoestima: 2.395,
			empatía: 1.825,
			influencia: 3.635,
			liderazgo: 1.725,
			optimismo: 1.26,
			'relación social': 2.625,
			'colaboración y cooperación': 1.45,
			'comprensión organizativa': 1.325,
			'conciencia crítica': 2.135,
			'desarrollo de las relaciones': 1.655,
			'tolerancia a la frustración': 1.565,
			'manejo de conflictos': 2.05,
			'motivación de logro': 1.36,
			'percepción y comprensión emocional': 1.485,
			violencia: 3.56,
		},
		'reddit-extractor': {
			asertividad: 1.405,
			'autoconciencia emocional': 1.7225,
			autoestima: 2.3775,
			empatía: 2.175,
			influencia: 4.26,
			liderazgo: 1.8725,
			optimismo: 1.695,
			'relación social': 3.03,
			'colaboración y cooperación': 1.2775,
			'comprensión organizativa': 1.3625,
			'conciencia crítica': 2.535,
			'desarrollo de las relaciones': 2.005,
			'tolerancia a la frustración': 1.8525,
			'manejo de conflictos': 2.54,
			'motivación de logro': 1.9975,
			'percepción y comprensión emocional': 1.95,
			violencia: 3.505,
		},
		'youtube-extractor': {
			asertividad: 0.97,
			'autoconciencia emocional': 0.975,
			autoestima: 1.545,
			empatía: 1.25,
			influencia: 2.585,
			liderazgo: 1.375,
			optimismo: 1.035,
			'relación social': 1.79,
			'colaboración y cooperación': 1.1,
			'comprensión organizativa': 0.875,
			'conciencia crítica': 1.51,
			'desarrollo de las relaciones': 1.155,
			'tolerancia a la frustración': 1.165,
			'manejo de conflictos': 1.52625,
			'motivación de logro': 1.31,
			'percepción y comprensión emocional': 1.085,
			violencia: 2.235,
		},
		'twitter-extractor': {
			asertividad: 1.065,
			'autoconciencia emocional': 1.1,
			autoestima: 2.06625,
			empatía: 1.735,
			influencia: 2.89,
			liderazgo: 1.625,
			optimismo: 1.32,
			'relación social': 2.495,
			'colaboración y cooperación': 0.94,
			'comprensión organizativa': 1,
			'conciencia crítica': 1.83125,
			'desarrollo de las relaciones': 1.745,
			'tolerancia a la frustración': 1.40125,
			'manejo de conflictos': 1.625,
			'motivación de logro': 1.545,
			'percepción y comprensión emocional': 1.70875,
			violencia: 2.07,
		},
		'telegram-extractor': {
			asertividad: 0.575,
			'autoconciencia emocional': 0.475,
			autoestima: 0.6,
			empatía: 0.8,
			influencia: 1.08,
			liderazgo: 0.575,
			optimismo: 0.45,
			'relación social': 1.15,
			'colaboración y cooperación': 0.425,
			'comprensión organizativa': 0.45,
			'conciencia crítica': 0.875,
			'desarrollo de las relaciones': 0.475,
			'tolerancia a la frustración': 0.675,
			'manejo de conflictos': 0.825,
			'motivación de logro': 1.05,
			'percepción y comprensión emocional': 0.65,
			violencia: 1.3,
		},
	};
	static mean(elem: number[]) {
		return elem.reduce((p, c) => p + c) / elem.length;
	}
	static round(num: number) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
	constructor(private extractor: string, private original: AnalSentiment.Analysis) {}

	get scale(): AnalSentiment.Analyzed[] {
		return this.original
			.filter(
				sentiment =>
					sentiment.name !== 'desarrollar y estimular a los demás' &&
					sentiment.name !== 'autocontrol emocional' &&
					sentiment.name !== 'comunicacion asertiva',
			)
			.map(sentiment => {
				const { name, value } = sentiment;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const max = AnalSentiment.IQR[this.extractor][name] as number;
				const nValue = AnalSentiment.round((value * 100) / max);
				return { name, value: nValue > 100 ? 100 : nValue };
			}) as AnalSentiment.Analyzed[];
	}
	get CE() {
		return AnalSentiment.round(
			AnalSentiment.mean(
				this.scale
					.filter(
						sentiment =>
							sentiment.name == 'asertividad' ||
							sentiment.name == 'autoconciencia emocional' ||
							sentiment.name == 'autoestima',
					)
					.map(sentiment => sentiment.value),
			),
		);
	}
	get AE() {
		return AnalSentiment.round(
			AnalSentiment.mean(
				this.scale
					.filter(
						sentiment =>
							sentiment.name == 'tolerancia a la frustración' ||
							sentiment.name == 'motivación de logro' ||
							sentiment.name == 'optimismo',
					)
					.map(sentiment => sentiment.value),
			),
		);
	}
	get CS() {
		return AnalSentiment.round(
			AnalSentiment.mean(
				this.scale
					.filter(
						sentiment =>
							sentiment.name == 'comprensión organizativa' ||
							sentiment.name == 'empatía' ||
							sentiment.name == 'percepción y comprensión emocional' ||
							sentiment.name == 'relación social',
					)
					.map(sentiment => sentiment.value),
			),
		);
	}
	get RS() {
		return AnalSentiment.round(
			AnalSentiment.mean(
				this.scale
					.filter(
						sentiment =>
							sentiment.name == 'colaboración y cooperación' ||
							sentiment.name == 'influencia' ||
							sentiment.name == 'conciencia crítica' ||
							sentiment.name == 'liderazgo' ||
							sentiment.name == 'manejo de conflictos' ||
							sentiment.name == 'violencia',
					)
					.map(sentiment => sentiment.value),
			),
		);
	}
	get PEC() {
		return AnalSentiment.round((this.CE + this.AE) / 2);
	}
	get SEC() {
		return AnalSentiment.round((this.CS + this.RS) / 2);
	}
	get IE() {
		console.log(this.PEC, this.SEC);
		return this.PEC + this.SEC;
	}
}

export namespace AnalSentiment {
	export type sentiment = Exclude<
		Api.sentiment,
		'desarrollar y estimular a los demás' | 'autocontrol emocional' | 'comunicacion asertiva'
	>;
	export type Analysis = {
		name: keyof Omit<
			DB.DB.Analysis,
			'_id' | '_entryId' | '_deleted' | 'hash' | 'completionDate' | 'modelVersion'
		>;
		value: number;
	}[];
	export type Analyzed = {
		name: sentiment;
		value: number;
	};
}
