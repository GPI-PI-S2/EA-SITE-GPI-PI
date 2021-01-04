import { Api } from './api';
import { DB } from './api/DB';

export class AnalSentiment {
	static IQR = {
		'emol-extractor': {
			asertividad: 2.12,
			'autoconciencia emocional': 2.54,
			autoestima: 3.89,
			empatía: 3.38,
			influencia: 5.72,
			liderazgo: 3.33,
			optimismo: 2.4,
			'relación social': 3.74,
			'colaboración y cooperación': 2.24,
			'comprensión organizativa': 2.3,
			'conciencia crítica': 3.59,
			'desarrollo de las relaciones': 3.19,
			'tolerancia a la frustración': 2.88,
			'manejo de conflictos': 3.12,
			'motivación de logro': 3.33,
			'percepción y comprensión emocional': 4.09,
			violencia: 6.21,
		},
		'reddit-extractor': {
			asertividad: 2.28,
			'autoconciencia emocional': 3.12,
			autoestima: 4.63,
			empatía: 3.25,
			influencia: 6.36,
			liderazgo: 3.3,
			optimismo: 2.68,
			'relación social': 4.41,
			'colaboración y cooperación': 2.62,
			'comprensión organizativa': 2.11,
			'conciencia crítica': 4.19,
			'desarrollo de las relaciones': 3.45,
			'tolerancia a la frustración': 3.45,
			'manejo de conflictos': 4.71,
			'motivación de logro': 3.88,
			'percepción y comprensión emocional': 3.13,
			violencia: 4.97,
		},
		'youtube-extractor': {
			asertividad: 2.45,
			'autoconciencia emocional': 2.01,
			autoestima: 2.63,
			empatía: 2.58,
			influencia: 3.89,
			liderazgo: 2.16,
			optimismo: 2.13,
			'relación social': 3.68,
			'colaboración y cooperación': 2.4,
			'comprensión organizativa': 1.58,
			'conciencia crítica': 3.63,
			'desarrollo de las relaciones': 2.02,
			'tolerancia a la frustración': 2.06,
			'manejo de conflictos': 2.44,
			'motivación de logro': 2.79,
			'percepción y comprensión emocional': 2.11,
			violencia: 4.56,
		},
		'twitter-extractor': {
			asertividad: 1.64,
			'autoconciencia emocional': 1.95,
			autoestima: 3.49,
			empatía: 2.9,
			influencia: 4.2,
			liderazgo: 2.49,
			optimismo: 2.51,
			'relación social': 3.63,
			'colaboración y cooperación': 1.69,
			'comprensión organizativa': 1.6,
			'conciencia crítica': 2.3,
			'desarrollo de las relaciones': 2.62,
			'tolerancia a la frustración': 1.91,
			'manejo de conflictos': 2.56,
			'motivación de logro': 2.85,
			'percepción y comprensión emocional': 2.84,
			violencia: 4.07,
		},
		'telegram-extractor': {
			asertividad: 0.53,
			'autoconciencia emocional': 0.8,
			autoestima: 1.1,
			empatía: 1.53,
			influencia: 1.97,
			liderazgo: 1.11,
			optimismo: 0.69,
			'relación social': 1.17,
			'colaboración y cooperación': 0.63,
			'comprensión organizativa': 0.77,
			'conciencia crítica': 0.87,
			'desarrollo de las relaciones': 0.92,
			'tolerancia a la frustración': 0.85,
			'manejo de conflictos': 0.79,
			'motivación de logro': 0.97,
			'percepción y comprensión emocional': 0.82,
			violencia: 1.44,
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
		return AnalSentiment.round(this.PEC + this.SEC);
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
