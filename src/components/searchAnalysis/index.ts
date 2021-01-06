import barChart from 'components/charts/bar';
import { api } from 'src/boot/api';
import { AnalSentiment } from 'src/controllers/AnalSentiment';
import { ApiService } from 'src/controllers/api/ApiService';
import { DB } from 'src/controllers/api/DB';
import { CustomError } from 'src/controllers/CustomError';
import { Column } from 'src/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({ components: { barChart } })

export default class SearchAnalysis extends Vue {
	loading = true;
	analysis: AnalSentiment.Analyzed[] = [];
	version = '';
	
	completionDate = '';
	CE = NaN;
	AE = NaN;
	CS = NaN;
	RS = NaN;
	PEC = NaN;
	SEC = NaN;
	IE = NaN;
	totalDB = NaN;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	columns: Readonly<Column<AnalSentiment.Analyzed>[]> = Object.freeze([
		{ name: 'name', label: 'Factor', align: 'left', field: e => e.name as string },
		{
			name: 'value',
			label: 'Valor',
			align: 'center',
			field: e => `${e.value}`,
			sortable: true,
		},
	]);
	@Prop({ type: String })
    extractor!: string;
    
    @Prop({type: String})
    metakey!: string;
	async init() {
		this.loading = true;
		console.log(this.metakey)
		try {
			const response = await api.$stats.calc({ extractor: this.extractor, metaKey: this.metakey });
			if (!response.ok || !response.data)
				throw new CustomError(response.type as ApiService.ErrorType, response.message);
			const ordered = Object.entries(response.data.sentiments)
				.map(entry => ({
					name: entry[0],
					value: entry[1],
				})) as SearchAnalysis.Analysis;
			const analysis = new AnalSentiment(this.extractor, ordered);
			this.analysis = analysis.scale;
			this.CE = analysis.CE;
			this.AE = analysis.AE;
			this.CS = analysis.CS;
			this.RS = analysis.RS;
			this.PEC = analysis.PEC;
			this.SEC = analysis.SEC;
			this.IE = analysis.IE;
			this.totalDB = response.data.total;
			if (response.data.total==0){
				this.$q.notify({ type: 'negative', message:'No se encontraron datos asociados a este metakey' });
			}
			await this.$nextTick();
			const chart = this.$refs['barChart'] as barChart;
			chart.init();
		} catch (error) {
			const { message } = CustomError.format(error);
			this.$q.notify({ type: 'negative', message });
		}
		this.loading = false;
	}

	get chartData() {
		const data: number[] = [];
		const labels: string[] = [];
		this.analysis.forEach(factor => {
			data.push(factor.value);
			labels.push(factor.name);
		});
		return {
			data,
			labels,
		};
	}
	get prettyExtractor() {
		switch (this.extractor) {
			case 'telegram-extractor': {
				return {
					icon: 'mdi-telegram',
					name: 'Telegram',
					color: 'light-blue-4',
				};
			}
			case 'youtube-extractor': {
				return {
					icon: 'mdi-youtube',
					name: 'Youtube',
					color: 'red',
				};
			}
			case 'reddit-extractor': {
				return {
					icon: 'mdi-reddit',
					name: 'Reddit',
					color: 'orange',
				};
			}
			case 'twitter-extractor': {
				return {
					icon: 'mdi-twitter',
					name: 'Twitter',
					color: 'blue',
				};
			}
			case 'emol-extractor': {
				return {
					icon: 'mdi-newspaper',
					name: 'EMOL',
					color: 'grey',
				};
			}
		}
	}
}
export namespace SearchAnalysis {
	export type Analysis = {
		name: keyof Omit<
			DB.DB.Analysis,
			'_id' | '_entryId' | '_deleted' | 'hash' | 'completionDate' | 'modelVersion'
		>;
		value: number;
	}[];
}
