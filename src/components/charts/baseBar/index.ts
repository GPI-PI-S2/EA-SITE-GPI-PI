import { Bar, mixins } from 'vue-chartjs';
import { Component, Mixins, Prop } from 'vue-property-decorator';
const { reactiveProp } = mixins;

@Component({
	extends: { Bar } as never,
})
export default class BaseBar extends Mixins(Bar, reactiveProp) {
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
		},
	};
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
}
