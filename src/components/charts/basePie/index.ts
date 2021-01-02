import { mixins, Pie } from 'vue-chartjs';
import { Component, Mixins, Prop } from 'vue-property-decorator';
const { reactiveProp } = mixins;

@Component({
	extends: { Pie } as never,
})
export default class BasePie extends Mixins(Pie, reactiveProp) {
	@Prop({ default: null })
	xAxisLabel!: string;
	@Prop({ default: null })
	yAxisLabel!: string;
	@Prop({ default: '#1976D2' })
	gridColor!: string;
	options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: true,
			labels: {
				fontColor: 'black',
			},
		},
		tooltips: {
			enabled: true,
			backgroundColor: this.gridColor,
			callbacks: {
				/* eslint-disable */
				label: (tooltipItem, data) => {
					if (!data.datasets) return '';
					const dataset = data.datasets[tooltipItem.datasetIndex as number];
					if (!dataset || !dataset.data) return '';
					const meta = (dataset as any)._meta[Object.keys((dataset as any)._meta)[0]];
					const total = meta.total;
					const currentValue = dataset.data[tooltipItem.index as number];
					const percentage = parseFloat(
						(((currentValue as number) / total) * 100).toFixed(1),
					);
					return ' ' + currentValue + ' (' + percentage + '%)';
				},
				title: (tooltipItem, data) => {
					return data.labels[tooltipItem[0].index] as any;
				},
				/* eslint-enable */
			},
		},
	};
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
}
