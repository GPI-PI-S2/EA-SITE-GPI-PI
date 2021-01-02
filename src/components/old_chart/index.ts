import Chart from 'chart.js';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChartC extends Vue {
	@Prop({ default: () => [] }) readonly labels!: Array<string>;
	@Prop({ default: () => [] }) readonly colors!: Array<string>;
	@Prop({ default: () => [] }) readonly data!: Array<number>;
	@Prop({ default: '' })
	readonly label!: string;
	@Prop({ default: 'doughnut' })
	readonly type!: string;
	@Prop()
	readonly options: Record<string, unknown> | undefined;

	mounted() {
		this.createChart({
			datasets: [
				{
					data: this.data,
					label: this.label,
					backgroundColor: this.colors,
				},
			],
			labels: this.labels,
		});
	}

	createChart(chartData: Record<string, unknown>) {
		const canvas = document.getElementById('ChartC') as HTMLCanvasElement;
		const options = {
			type: this.type,
			data: chartData,
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
		new Chart(canvas, options);
	}
}
