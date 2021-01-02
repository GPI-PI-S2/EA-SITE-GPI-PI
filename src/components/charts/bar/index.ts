import { ChartData } from 'chart.js';
import { Component, Prop, Vue } from 'vue-property-decorator';
import baseBar from '../baseBar';

@Component({ components: { baseBar } })
export default class BarChart extends Vue {
	@Prop({ default: '300px', type: String })
	height: string;
	@Prop({ default: '100%', type: String })
	width: string;
	@Prop({ default: () => [], type: Array })
	colors: string[];
	@Prop({ default: () => [], type: Array })
	labels: string[];
	@Prop({ default: () => [], type: Array })
	data: number[];
	chartData: ChartData = {
		datasets: [],
		labels: [],
	};
	loading = true;
	init() {
		this.loading = true;
		this.chartData.datasets = [this.newDataset('% de puntuación', this.data)];
		this.chartData.labels = this.labels;
		this.loading = false;
	}
	newDataset(label: string, data: number[]): Chart.ChartDataSets {
		return {
			label,
			data,
			fill: false,
			borderWidth: 0,
			backgroundColor: this.colors,
		};
	}
	get styles() {
		return {
			position: 'relative',
			height: this.height,
			width: this.width,
		};
	}
}
