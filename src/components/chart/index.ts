import { Component, Prop, Vue } from 'vue-property-decorator';
import Chart from 'chart.js'

@Component
export default class ChartC extends Vue {
  @Prop({ default: [] }) readonly labels!: Array<string>
  @Prop({ default: [] }) readonly colors!: Array<string>
  @Prop({ default: [] }) readonly data!: Array<number>
  @Prop({default:''})
  label!:string
  @Prop({default:'doughnut'})
  type!: string;
  @Prop({
    default: () => {
      return Chart.defaults.ChartC
    }
  })
  readonly options: object | undefined

  mounted() {
    this.createChart({
      datasets: [
        {
          data: this.data,
          label: this.label,
          backgroundColor: this.colors
        }
      ],
      labels: this.labels
    })
  }

  createChart(chartData: object) {
    const canvas = document.getElementById('ChartC') as HTMLCanvasElement
    const options = {
      type: this.type,
      data: chartData,
      options: this.options
    }
    new Chart(canvas, options)
  }
}

export namespace ChartsPage {
	export interface data {
        labels: string[],
        datasets: datasets,
       options: ChartsPage.options
	}
	export interface options{
        responsive: boolean,
        lineTension: number,
        scales: {
            yAxes: yAxes []
        }
    }
    export interface datasets{
        label: string,
        data: number[],
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number
    }
    export interface yAxes {
        ticks: {
            beginAtZero:boolean,
            padding:number
        }
    }
}
