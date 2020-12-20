import { Vue, Component} from 'vue-property-decorator';
import tableC from 'src/components/tableC';
import ChartC from 'src/components/chart';
@Component({
	components: { tableC, ChartC },
})
export default class statsPage extends Vue {
    isLoading = true
    isLoadingChart = true
    realData: StatsPage.data[] =[]
    dataChart: StatsPage.DataChart = {
		labels: [

		],
		datasets: [
			{
				data: [

                ],
			},
		],
	};
    async getContribTable(){
        await fetch('https://www.gpi.valdomero.live/contributions.json',{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=> response.json())
        .then((data) => {
            JSON.parse(JSON.stringify(data), (email: string, contribs: number) => {
                if (email!=''){   
                    this.realData.push({
                        email: email,
                        contribuciones: contribs
                    })
                }
                
            })
            this.isLoading=false
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    async getPieChartData(){
        await fetch('https://www.gpi.valdomero.live/stats/extractors',{
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'rayaparalasuma'
            }
        })
        .then(response => response.json())
        .then((data) =>{
            JSON.parse(JSON.stringify(data), (id: string, contribNumber: number) => {
                if (id!='data' && id!=''){
                    this.dataChart.labels.push(id)
                    this.dataChart.datasets[0].data.push(contribNumber)
                }
            })
            this.isLoadingChart = false
        })
        .catch((err) => {
            console.log(err);
        })
    }
    mounted(){
        void this.getContribTable()
        this.getPieChartData()
        console.log(this.dataChart)
    }
}
export namespace StatsPage{
    export interface data{
        email:string,
        contribuciones: number
    }
    export interface Factors {
		label: string;
		data: number[];
	}
	export interface DataChart {
		labels: string[];
		datasets: ResultsPage.Factors[];
	}
}