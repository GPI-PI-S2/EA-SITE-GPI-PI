import { timeout } from 'ea-common-gpi-pi';
import { QSpinnerGears } from 'quasar';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ExtractorsPage extends Vue {
	showTelegramDialog = false;
	loading = false;
	step = 0;
	extractors: ExtractorsPage.Extractor[] = [
		{
			icon: 'mdi-telegram',
			id: 'asd',
			name: 'Telegram Extractor',
			version: '0.0.0',
			color: 'light-blue-4',
		},
		{
			icon: 'mdi-youtube',
			id: 'asd',
			name: 'Youtube Extractor',
			version: '0.0.0',
			color: 'red',
		},
		{
			icon: 'mdi-reddit',
			id: 'asd',
			name: 'Reddit Extractor',
			version: '0.0.0',
			color: 'orange',
		},
		{
			icon: 'mdi-twitter',
			id: 'asd',
			name: 'Twitter Extractor',
			version: '0.0.0',
			color: 'blue',
		},
		{
			icon: 'mdi-newspaper',
			id: 'asd',
			name: 'EMOL Extractor',
			version: '0.0.0',
			color: 'grey',
		},
	];
	async onClickExtractor(id: string) {
		this.loading = true;
		try {
			console.log('se selecciona este', id);
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
}
export namespace ExtractorsPage {
	export interface Extractor {
		name: string;
		version: string;
		id: string;
		icon: string;
		color: string;
	}
}
