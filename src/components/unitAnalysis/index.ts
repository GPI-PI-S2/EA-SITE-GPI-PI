import barChart from 'components/charts/bar';
import { date } from 'quasar';
import { api } from 'src/boot/api';
import { AnalSentiment } from 'src/controllers/AnalSentiment';
import { ApiService } from 'src/controllers/api/ApiService';
import { DB } from 'src/controllers/api/DB';
import { CustomError } from 'src/controllers/CustomError';
import { DatabasePage } from 'src/pages/database';
import { Column } from 'src/types';
import { Component, Model, Vue, Watch } from 'vue-property-decorator';
@Component({ components: { barChart } })
export default class UnitAnalisis extends Vue {
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
	@Model('vchange')
	change!: DatabasePage.Item;
	@Watch('model', { deep: true, immediate: true })
	onVChangeModel() {
		void this.init();
	}
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
	async init() {
		this.loading = true;
		try {
			const response = await api.$db.analysisFetch(`${this.model._id}`);
			if (!response.ok || !response.data)
				throw new CustomError(response.type as ApiService.ErrorType, response.message);
			this.version = response.data.modelVersion;
			this.completionDate = date.formatDate(response.data.completionDate, 'DD/MM/YYYY');
			const ordered = Object.entries(response.data)
				.filter(
					entry =>
						entry[0] != '_id' &&
						entry[0] != '_entryId' &&
						entry[0] != '_deleted' &&
						entry[0] != 'hash' &&
						entry[0] != 'completionDate' &&
						entry[0] != 'modelVersion',
				)
				.map(entry => ({
					name: entry[0],
					value: this.chanchuyo(entry[1] as number),
				})) as UnitAnalisis.Analysis;
			const analysis = new AnalSentiment(this.model.extractor, ordered);
			this.analysis = analysis.scale;
			this.CE = analysis.CE;
			this.AE = analysis.AE;
			this.CS = analysis.CS;
			this.RS = analysis.RS;
			this.PEC = analysis.PEC;
			this.SEC = analysis.SEC;
			this.IE = analysis.IE;
			await this.$nextTick();
			const chart = this.$refs['barChart'] as barChart;
			chart.init();
		} catch (error) {
			const { message } = CustomError.format(error);
			this.$q.notify({ type: 'negative', message });
		}
		this.loading = false;
	}
	chanchuyo(value: number) {
		const length = this.model.comment.length;
		if (length <= 1) return value;
		else return value / this.logN(511, length);
	}
	logN(base: number, x: number) {
		const a = Math.log(x);
		const b = Math.log(base);
		return a / b;
	}
	get model() {
		return this.change;
	}
	set model(v) {
		this.$emit('vchange', v);
	}
	get formattedDate() {
		if (!this.model) return null;
		return date.formatDate(this.model.created, 'DD/MM/YYYY');
	}
	get prettyExtractor() {
		if (!this.model) return null;
		switch (this.model.extractor) {
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
}
export namespace UnitAnalisis {
	export type Analysis = {
		name: keyof Omit<
			DB.DB.Analysis,
			'_id' | '_entryId' | '_deleted' | 'hash' | 'completionDate' | 'modelVersion'
		>;
		value: number;
	}[];
}
