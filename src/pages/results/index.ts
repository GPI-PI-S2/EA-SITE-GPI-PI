import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChartC from 'src/components/chart';
@Component({
	components: { ChartC },
})
export default class ResultsPage extends Vue {
	loading=true;
	step= 1;
	PromedioFactor= [
		{
			title: 'Indice de inteligencia emocional',
			subtitle: 'about 1',
			value: 1234
		},
		{
			title: 'Capital emocional',
			subtitle: 'about promedio1',
			value: 1234,
		},
		{
			title: 'Capital relacional',
			subtitle: 'about promedio2',
			value: 4321,
		},
	];
	dataChart: ResultsPage.DataChart = {
		labels: [
		'Asertividad',
		'Autoconsciencia emocional',
		'Autocontrol emocional',
		'Autoestima',
		'Colaboración y cooperación',
		'Comprensión organizativa',
		'Consciencia crítica',
		'Comunicacion asertiva',
		'Desarrollo de las relaciones',
		'Desarrollar y estimular a los demás',
		'Empatía',
		'Influencia',
		'Liderazgo',
		'Manejo de conflictos',
		'Motivación de logro',
		'Optimismo',
		'Percepción y comprensión Emocional',
		'Relación social',
		'Tolerancia a la frustración',
		'Violencia',
	],
		datasets: [
			{
				label: 'Factores emocionales',
				data: [],
			},
		],
	};
	async onClickExtractor(id: string){
		this.loading=true
		await fetch('http://localhost:8000/api/v1/stats/calc',{
			method: 'POST',
			credentials:'include',
			headers:{
				'Content-type': 'application/json',
				'X-API-KEY': 'rayaparalasuma'
			},
			body: JSON.stringify({
				extractor: id
			})
		})
		.then(response => {return response.json()})
		.then(data => {
			this.dataChart.datasets[0].data = []
			this.dataChart.datasets[0].data.push(data.data.sentiments['asertividad'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['autoconciencia emocional'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['autocontrol emocional'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['autoestima'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['colaboración y cooperación'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['comprensión organizativa'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['conciencia crítica'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['comunicacion asertiva'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['desarrollo de las relaciones'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['desarrollar y estimular a los demás'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['empatía'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['influencia'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['liderazgo'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['manejo de conflictos'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['motivación de logro'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['optimismo'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['percepción y comprensión emocional'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['relación social'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['tolerancia a la frustración'])
			this.dataChart.datasets[0].data.push(data.data.sentiments['violencia'])
			this.step=2
		})
		.catch((error) =>{
			this.$q.notify({ type: 'negative', message: `Error: ${error.message}.`});
		})
		this.loading = false
	}
	getRandomNumber() {
		return Math.floor(Math.random() * 15) + 1;
	}
	extractor: ResultsPage.Extractor[] = [
		{name: 'Telegram Extractor', img:'https://www.maillotmag.com/sites/default/files/fotosprincipales/telegram-logo-27.png', id:'telegram-extractor'},
		{name: 'Youtube Extractor', img:'https://icon-library.com/images/youtube-square-icon/youtube-square-icon-29.jpg', id:'youtube-extractor'},
		{name: 'Reddit Extractor', img:'https://robertkatai.com/wp-content/uploads/2018/09/wsi-imageoptim-reddit-marketing-.jpg', id:'reddit-extractor'},
		{name: 'Twitter Extractor', img:'https://logos-marcas.com/wp-content/uploads/2020/04/Twitter-Logo.png', id:'twitter-extractor'},
		{name: 'EMOL Extractor', img:'https://pbs.twimg.com/profile_images/816281345747980288/XtL97I6M_400x400.jpg', id:'emol-extractor'}
	]
}

export namespace ResultsPage{
	export interface Extractor{
		name: string;
		img: string;
		id: string;
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