import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChartC from 'src/components/chart';
@Component({
	components: { ChartC },
})
export default class ResultsPage extends Vue {
	loading=true;
	step= 1;
	PromedioFactor: ResultsPage.Indicator[] = [
		{
			title: 'Coeficiente 1',
			subtitle: 'about 1',
			value: 1234
		},
		{
			title: 'Coeficiente emocional',
			subtitle: 'about promedio1',
			value: 1234,
		},
		{
			title: 'Capital intelectual',
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
	getRandomNumber() {
		return Math.floor(Math.random() * 15) + 1;
	}
	mounted(){
		for (let e = 0; e <= 20; e++) {
			this.dataChart.datasets[0].data.push(this.getRandomNumber());
		}
	}
	extractor: ResultsPage.Extractor[] = [
		{name: 'Telegram Extractor', img:'https://www.maillotmag.com/sites/default/files/fotosprincipales/telegram-logo-27.png', id:'telegram-extractor'},
		{name: 'Youtube Extractor', img:'https://icon-library.com/images/youtube-square-icon/youtube-square-icon-29.jpg', id:'youtube-extractor'},
		{name: 'Reddit Extractor', img:'https://robertkatai.com/wp-content/uploads/2018/09/wsi-imageoptim-reddit-marketing-.jpg', id:'reddit-extractor'},
		{name: 'Twitter Extractor', img:'https://logos-marcas.com/wp-content/uploads/2020/04/Twitter-Logo.png', id:'twitter-extractor'},
		{name: 'EMOL Extractor', img:'https://pbs.twimg.com/profile_images/816281345747980288/XtL97I6M_400x400.jpg', id:'emol-extractor'}
	]
	async onClickExtractor(id: string){
		this.loading=true
		this.step=2
	}
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