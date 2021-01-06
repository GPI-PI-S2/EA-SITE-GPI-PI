import { arrayValidation, vMax, vNoWhitespaces, vNumber } from 'ea-common-gpi-pi';
import { api } from 'src/boot/api';
import { ApiService } from 'src/controllers/api/ApiService';
import { CustomError } from 'src/controllers/CustomError';
import { MainLayout } from 'src/layouts/main';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
import { AnalSentiment } from 'src/controllers/AnalSentiment';
import searchAnalysis from 'src/components/searchAnalysis';

@Component({ components: { searchAnalysis  } })

export default class searchPage extends Vue {
	showDialog = false;
	CE = NaN;
	AE = NaN;
	CS = NaN;
	RS = NaN;
	PEC = NaN;
	SEC = NaN;
	IE = NaN;
	analysis: AnalSentiment.Analyzed[] = [];
	totalDB = NaN;
	metaKeyError = false;
	metaKeyErrorMsg = '';
	extractor = '';
	inputMetaKey = '';
	metaKey = '';
	extractors: string[] = [];
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	data: DatabasePage.Item[] = [];
	@Inject() loader: MainLayout.Loader;
	@Watch('extractor')
	onChangeExtractor() {
		this.metaKeyError = false;
		this.metaKeyErrorMsg = '';
		this.inputMetaKey = '';
		this.metaKey = '';
	}
	@Watch('inputMetaKey')
	onChangeInputMetaKey(c: string) {
		let rules: ((input: string) => true | string)[] = [];
		if (c !== '') {
			try {
				switch (this.extractor) {
					case 'twitter-extractor': {
						rules = [vMax(50), vNoWhitespaces()];
						break;
					}
					case 'reddit-extractor': {
						rules = [vMax(500)];
						const redditUrl = new URL(c);
						const paths = redditUrl.pathname.split('/');
						if (paths.length != 7) {
							this.metaKeyError = true;
							this.metaKeyErrorMsg = 'URL no válidax';
							return;
						}
						const subReddit = paths[2];
						const postId = paths[4];
						c = JSON.stringify({ subReddit, postId });
						break;
					}
					case 'emol-extractor': {
						rules = [vMax(500)];
						new URL(c);
						break;
					}
					case 'telegram-extractor': {
						rules = [vMax(250), vNumber()];
						break;
					}
					case 'youtube-extractor': {
						rules = [vMax(500)];
						const youtubeUrl = new URL(c);
						const vId = youtubeUrl.searchParams.get('v');
						if (!vId) {
							this.metaKeyError = true;
							this.metaKeyErrorMsg = 'URL no válida';
							return;
						}
						c = vId;
						break;
					}
				}
			} catch (error) {
				this.metaKeyError = true;
				this.metaKeyErrorMsg = 'Meta inválido';
				return;
			}
		}
		const result = arrayValidation(c, rules);
		if (typeof result === 'string') {
			this.metaKeyError = true;
			this.metaKeyErrorMsg = result;
		} else {
			this.metaKeyError = false;
		}
		this.metaKey = c;
	}
	mounted(){
		void this.init ()
	}
	async init() {
		this.loader.show = true;
		try {
			await Promise.all([
				api.$extractors.list().then(response => {
					if (!response.ok || !response.data)
						throw new CustomError(
							response.type as ApiService.ErrorType,
							response.message,
						);
					this.extractors = [...response.data.map(extractor => extractor.id)];
				}),
			]);
		} catch (error) {}
		this.loader.show = false;
	}
	async onRequest() {
		if (this.metaKey=='' || this.extractor==''){
			this.$q.notify({ type: 'negative', message:'Debe escribir un metaKey y seleccionar un extractor' });
			return;
		}
		this.showDialog = true
		try {
			await this.$nextTick();
			const searchAnalysis = this.$refs['searchAnalysis'] as searchAnalysis;
			await searchAnalysis.init();
		} catch (error) {
			console.log('error', error);
		}
	}
	get metaInput() {
        return {
            icon: 'mdi-magnify',
            label: 'Ingrese un metaKey',
        };
	}
}
export namespace DatabasePage {
	export interface Item {
		_id: number;
		comment: string;
		extractor: string;
		created: string;
	}
}
