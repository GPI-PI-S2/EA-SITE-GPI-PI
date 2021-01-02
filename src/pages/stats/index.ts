import { api } from 'src/boot/api';
import pieChart from 'src/components/charts/pie';
import ChartC from 'src/components/old_chart';
import tableC from 'src/components/old_tableC';
import { ApiService } from 'src/controllers/api/ApiService';
import { CustomError } from 'src/controllers/CustomError';
import { MainLayout } from 'src/layouts/main';
import { Component, Inject, Vue } from 'vue-property-decorator';
@Component({
	components: { tableC, ChartC, pieChart },
})
export default class statsPage extends Vue {
	contributions: StatsPage.data[] = [];
	data: number[] = [];
	labels: string[] = [];
	chartColors = Object.freeze(['#ff4500']);
	@Inject() loader: MainLayout.Loader;
	mounted() {
		void this.init();
	}
	async init() {
		this.loader.show = true;
		try {
			await Promise.all([
				api.$stats.contributions().then(response => {
					if (!response.ok || !response.data)
						throw new CustomError(
							response.type as ApiService.ErrorType,
							response.message,
						);
					this.contributions = Object.entries(response.data).map(entry => ({
						email: entry[0],
						total: entry[1],
					}));
				}),
				api.$stats.extractors().then(response => {
					if (!response.ok || !response.data)
						throw new CustomError(
							response.type as ApiService.ErrorType,
							response.message,
						);
					Object.entries(response.data).forEach(extractor => {
						this.labels.push(extractor[0]);
						this.data.push(extractor[1]);
					});
				}),
			]);
			const chart = this.$refs['pieChart'] as pieChart;
			chart.init();
		} catch (error) {
			const { message, type } = CustomError.format(error);
			console.error(type, message);
			this.$q.notify({ type: 'negative', message });
		}
		this.loader.show = false;
	}
	get prettyList() {
		return this.labels.map((label, i) => ({ name: label, total: this.data[i] }));
	}
}
export namespace StatsPage {
	export interface data {
		email: string;
		total: number;
	}
}
