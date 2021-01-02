import barChart from 'components/charts/bar';
import { date } from 'quasar';
import { api } from 'src/boot/api';
import { ApiService } from 'src/controllers/api/ApiService';
import { DB } from 'src/controllers/api/DB';
import { CustomError } from 'src/controllers/CustomError';
import { DatabasePage } from 'src/pages/database';
import { Column } from 'src/types';
import { Component, Model, Vue, Watch } from 'vue-property-decorator';
@Component({ components: { barChart } })
export default class UnitAnalisis extends Vue {
	loading = true;
	analysis: UnitAnalisis.Analysis = [];
	version = '';
	completionDate = '';
	@Model('vchange')
	change!: DatabasePage.Item;
	@Watch('model', { deep: true, immediate: true })
	onVChangeModel() {
		void this.init();
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	columns: Readonly<Column<UnitAnalisis.Item>[]> = Object.freeze([
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
			this.completionDate = date.formatDate(
				response.data.completionDate,
				'DD/MM/YYYY [a las] hh:mm:ss',
			);
			this.analysis = Object.entries(response.data)
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
					value: entry[1] as number,
				})) as UnitAnalisis.Analysis;
			await this.$nextTick();
			const chart = this.$refs['barChart'] as barChart;
			chart.init();
		} catch (error) {
			const { message } = CustomError.format(error);
			this.$q.notify({ type: 'negative', message });
		}
		this.loading = false;
	}
	get model() {
		return this.change;
	}
	set model(v) {
		this.$emit('vchange', v);
	}
	get formattedDate() {
		if (!this.model) return null;
		return date.formatDate(this.model.created, 'DD/MM/YYYY [a las] hh:mm:ss');
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
	get CE() {
		return 25;
	}
	get AE() {
		return 30;
	}
	get CS() {
		return 40;
	}
	get RS() {
		return 36;
	}
	get PEC() {
		return (this.CE + this.AE) / 2;
	}
	get SEC() {
		return (this.CS + this.RS) / 2;
	}
	get IE() {
		return this.PEC + this.SEC;
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
	export interface Item {
		name: keyof Analysis;
		value: number;
	}
}
