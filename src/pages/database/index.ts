import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';
import tableC from 'src/components/tableC';
import ChartC from 'src/components/chart';
import {date} from 'quasar'
@Component({
	components: { tableC, ChartC },
})
export default class DatabasePage extends Vue {
	isLoading = false;
	dialog = false;
	maximizedToggle = true
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
	dataChart: DatabasePage.DataChart = {
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

	selectOptions = [
		{name: 'All', id: null},
		{name: 'Youtube', id: 'youtube-extractor'},
		{name: 'Twitter', id: 'twitter-extractor'},
		{name: 'Reddit', id: 'reddit-extractor'},
		{name: 'Telegram', id: 'telegram-extractor'},
		{name: 'EMOL', id: 'emol-extractor'},
	]
	selectModel = null

	filter = ''
	
	realData :DatabasePage.Comments [] = [
	]
	pagination = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 20,
		rowsNumber: 0
	}
	columns = [
		{
			name: 'name',
			label: 'Comentario',
			required: true,
			align:'left',
			sortable: true,
			classes: 'ellipsis',
			headerStyle: 'width: 450px',
			style: 'max-width: 450px',
			field: (row: { name: string; }) => row.name,
			format: (val: any) => `${val}`
		},
		{ name: 'extractor', align: 'left', label: 'Extractor', field: 'extractor', sortable: true },
        { name: 'created', align: 'left', label: 'Fecha', field: 'created', sortable: true },
        { name: 'action', align:'left' ,label: 'Factores Emocionales', field: 'action'},
	]
	body: DatabasePage.bodyDatabase = {
		pager:{
			page:this.pagination.page,
			size:this.pagination.rowsPerPage
		},
		filter: {
		}
	}
	async getDataFromDatabase(){
		console.log(this.body)
		console.log(this.pagination)
		await fetch('http://localhost:8000/api/v1/db/entry/list',{
			method: 'POST',
			credentials:'include',
			headers:{
				'Content-type': 'application/json',
				'X-API-KEY': 'rayaparalasuma'
			},
			body: JSON.stringify(this.body)
		})
		.then(response => response.json())
		.then((data) => {
			this.realData = []
			if (data.data.total != 0){
				this.pagination.rowsNumber = data.data.total
				this.pagination.rowsPerPage = data.data.size
				let lista = data.data.list
				if (lista!=undefined){
					lista.forEach(comment => {
						this.realData.push({
							_id: comment._id,
							hash: comment.hash,
							created:  date.formatDate(comment.created,'DD-MM-YYYY'),
							extractor: comment.extractor,
							metaKey: comment.metaKey,
							name: comment.content
						})
					});
				}
			}
		})
		.catch((error) =>{
			this.$q.notify({ type: 'negative', message: `Error: ${error.message}.`});
		})
		this.isLoading= false
	}
	async onRequest(props){
		this.isLoading = true
		const { page, rowsPerPage, sortBy, descending} = props.pagination
		this.pagination.sortBy = sortBy
		this.pagination.descending = descending
		this.pagination.page = page
		this.pagination.rowsPerPage = rowsPerPage
		this.body.pager.page = page
		this.body.pager.size = rowsPerPage
		if (this.selectModel!=null){
			this.body.filter.extractor = this.selectModel
		} else {
			delete this.body.filter.extractor
		}
		this.getDataFromDatabase()
	}
	async onClickComment(props: { row: any; }){
		this.isLoading = true
		const rowData = props.row
		console.log(rowData)
		await fetch('http://localhost:8000/api/v1/db/anal/fetch',{
			method: 'POST',
			credentials:'include',
			headers:{
				'Content-type': 'application/json',
				'X-API-KEY': 'rayaparalasuma'
			},
			body: JSON.stringify({
				id: rowData._id.toString()
			})
		})
		.then(response => response.json())
		.then(data => {
			this.dataChart.datasets[0].data = []
			this.dataChart.datasets[0].data.push(data.data['asertividad'])							//0
			this.dataChart.datasets[0].data.push(data.data['autoconciencia emocional'])				//1
			this.dataChart.datasets[0].data.push(data.data['autocontrol emocional'])				//2
			this.dataChart.datasets[0].data.push(data.data['autoestima'])							//3
			this.dataChart.datasets[0].data.push(data.data['colaboración y cooperación'])			//4
			this.dataChart.datasets[0].data.push(data.data['comprensión organizativa'])				//5
			this.dataChart.datasets[0].data.push(data.data['conciencia crítica'])					//6
			this.dataChart.datasets[0].data.push(data.data['comunicacion asertiva'])				//7
			this.dataChart.datasets[0].data.push(data.data['desarrollo de las relaciones'])			//8
			this.dataChart.datasets[0].data.push(data.data['desarrollar y estimular a los demás'])	//9
			this.dataChart.datasets[0].data.push(data.data['empatía'])								//10
			this.dataChart.datasets[0].data.push(data.data['influencia'])							//11
			this.dataChart.datasets[0].data.push(data.data['liderazgo'])							//12
			this.dataChart.datasets[0].data.push(data.data['manejo de conflictos'])					//13
			this.dataChart.datasets[0].data.push(data.data['motivación de logro'])					//14
			this.dataChart.datasets[0].data.push(data.data['optimismo'])							//15
			this.dataChart.datasets[0].data.push(data.data['percepción y comprensión emocional'])	//16
			this.dataChart.datasets[0].data.push(data.data['relación social'])						//17
			this.dataChart.datasets[0].data.push(data.data['tolerancia a la frustración'])			//18
			this.dataChart.datasets[0].data.push(data.data['violencia'])							//19
		})
		.catch((error) =>{
			this.$q.notify({ type: 'negative', message: `Error: ${error.message}.`});
		})
		this.isLoading = false
		this.dialog=true
	}

	mounted(){
		this.onRequest({
			pagination: this.pagination,
			filter: this.selectModel
		})
	}
}
export namespace DatabasePage {
	export interface bodyDatabase{
		pager: {
			page: number,
			size: number
		},
		filter: {
			extractor?: string | null,
		}
	}
	export interface Comments{
		_id: string,
		name: string,
		extractor: string,
		created: string,
		metaKey: string,
		hash: string
	}
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
		datasets: DatabasePage.Factors[];
	}
}