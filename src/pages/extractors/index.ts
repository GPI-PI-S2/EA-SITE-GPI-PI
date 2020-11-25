import { timeout } from 'ea-common-gpi-pi';
import { QSpinnerGears } from 'quasar';
import { Component, Vue } from 'vue-property-decorator';
import InputC from 'src/components/InputC'
@Component({
	components: { InputC},
})
export default class ExtractorsPage extends Vue {
	showTelegramDialog = false;
	loading = false;
	step = 0;
	actualId!:number;
	alert = true;
	registered = false;
	urlYoutube!:string;
	chats: ExtractorsPage.Chat[] = [
		{
			id:1,
			type: 'chat',
			comments: 104,
			name: 'Chile yaoi 2020',
			icon: 'mdi-telegram'
		},
		{
			id:2,
			type: 'chat',
			comments: 1000,
			name: 'Chayanne fan club',
			icon: 'mdi-telegram'
		},
		{
			id:3,
			type: 'chat',
			comments: 500,
			name: 'Argentina is white ',
			icon: 'mdi-telegram'
		},
		{
			id:4,
			type: 'chat',
			comments: 104,
			name: 'Elpepe vs Etesech',
			icon: 'mdi-telegram'
		}
	]
	extractors: ExtractorsPage.Extractor[] = [
		{
			icon: 'mdi-telegram',
			id: 0,
			name: 'Telegram Extractor',
			version: '0.0.0',
			color: 'light-blue-4',
			label: ''
		},
		{
			icon: 'mdi-youtube',
			id: 1,
			name: 'Youtube Extractor',
			version: '0.0.0',
			color: 'red',
			label: 'Ingrese el url del video a analizar'
		},
		{
			icon: 'mdi-reddit',
			id: 2,
			name: 'Reddit Extractor',
			version: '0.0.0',
			color: 'orange',
			label: 'Ingrese el url del reddit a analizar'
		},
		{
			icon: 'mdi-twitter',
			id: 3,
			name: 'Twitter Extractor',
			version: '0.0.0',
			color: 'blue',
			label: 'Ingrese el Hashtag o término a analizar'
		},
		{
			icon: 'mdi-newspaper',
			id: 4,
			name: 'EMOL Extractor',
			version: '0.0.0',
			color: 'grey',
			label: 'Ingrese el url de la noticia a analizar'
		},
	];
	async onClickExtractor(id: number) {
		this.loading = true;
		try {
			console.log('se selecciona este', id);
			this.actualId = id;
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Inicializando...',
			});
			await timeout(2000);
			dismiss();
			this.step = 1;
		} catch (error) {
			console.error(error);
			this.$q.notify({ type: 'negative', message: 'Problemas al iniciar el extractor' });
		}
		this.loading = false;
	}
	selectExtractId(id: number){
		this.extractors.find(extract => {
			extract.id==id
		})
	}
	async onclickTelegram (code: string){
		this.loading = true;
		try {
			await timeout(2000);
			this.loading=false;
			this.registered=true;
		} catch (error){
			console.error(error)
		}
	}
	async onClickChat(id :number){
		this.loading=true;
		try{
			console.log('chat elegido', id);
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			await timeout(2000);
			dismiss();
			this.step = 2;
		}
		catch (error){
			console.error(error)
		}
	}
	async onSendYoutube(){
		this.loading=true;
		try{
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			await timeout(2000);
			dismiss();
			this.step = 2;
		}
		catch (error){
			console.error(error)
		}
	}
	async onSendReddit(){
		this.loading=true;
		try{
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			await timeout(2000);
			dismiss();
			this.step = 2;
		}
		catch (error){
			console.error(error)
		}
	}
	async onSendTwitter(){
		this.loading=true;
		try{
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			await timeout(2000);
			dismiss();
			this.step = 2;
		}
		catch (error){
			console.error(error)
		}
	}
	async onSendEmol(){
		this.loading=true;
		try{
			const dismiss = this.$q.notify({
				spinner: (QSpinnerGears as unknown) as Vue,
				message: 'Cargando los resultados...',
			});
			await timeout(2000);
			dismiss();
			this.step = 2;
		}
		catch (error){
			console.error(error)
		}
	}
}
export namespace ExtractorsPage {
	export interface Extractor {
		name: string;
		version: string;
		id: number;
		icon: string;
		color: string;
		label: string;
	}
	export interface Chat{
		id: number;
		type: string;
		comments: number;
		name: string;
		icon: string;
	}
}
