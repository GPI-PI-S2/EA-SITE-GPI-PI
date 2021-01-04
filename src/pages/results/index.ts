import networkAnalysis from 'components/networkAnalysis';
import { Component, Vue } from 'vue-property-decorator';
@Component({ components: { networkAnalysis } })
export default class ResultsPage extends Vue {
	showDialog = false;
	loading = false;
	selectedExtractor = '';
	extractors: ResultsPage.Extractor[] = [
		{
			icon: 'mdi-telegram',
			id: 'telegram-extractor',
			name: 'Telegram',
			color: 'light-blue-4',
		},
		{
			icon: 'mdi-youtube',
			id: 'youtube-extractor',
			name: 'Youtube',
			color: 'red',
		},
		{
			icon: 'mdi-reddit',
			id: 'reddit-extractor',
			name: 'Reddit',
			color: 'orange',
		},
		{
			icon: 'mdi-twitter',
			id: 'twitter-extractor',
			name: 'Twitter',
			color: 'blue',
		},
		{
			icon: 'mdi-newspaper',
			id: 'emol-extractor',
			name: 'EMOL',
			color: 'grey',
		},
	];
	async onClickExtractor(id: string) {
		this.selectedExtractor = id;
		this.showDialog = true;
		try {
			await this.$nextTick();
			const networkAnalysis = this.$refs['networkAnalysis'] as networkAnalysis;
			await networkAnalysis.init();
		} catch (error) {
			console.log('error', error);
		}
	}
}

export namespace ResultsPage {
	export interface Extractor {
		name: string;
		id: string;
		icon: string;
		color: string;
	}
}
