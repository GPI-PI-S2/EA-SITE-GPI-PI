import unitAnalysis from 'components/unitAnalysis';
import { arrayValidation, vMax, vNoWhitespaces, vNumber } from 'ea-common-gpi-pi';
import { date } from 'quasar';
import { api } from 'src/boot/api';
import { ApiService } from 'src/controllers/api/ApiService';
import { CustomError } from 'src/controllers/CustomError';
import { MainLayout } from 'src/layouts/main';
import { Column, Pagination } from 'src/types';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
@Component({ components: { unitAnalysis } })
export default class DatabasePage extends Vue {
	showDialog = false;
	loadingTable = false;
	metaKeyError = false;
	metaKeyErrorMsg = '';
	extractor = 'todos';
	inputMetaKey = '';
	metaKey = '';
	extractors: string[] = [];
	pagination: Pagination = {
		page: 1,
		rowsNumber: 5,
		rowsPerPage: 5,
	};
	selectedItem: DatabasePage.Item = null;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	columns: Readonly<Column<DatabasePage.Item>[]> = Object.freeze([
		{
			name: 'comment',
			label: 'Comentario',
			align: 'left',
			field: d => d.comment,
		},
		{
			name: 'extractor',
			label: 'Extractor',
			align: 'center',
			field: d => d.extractor,
		},
		{
			name: 'created',
			label: 'Fecha de extracción',
			align: 'center',
			field: d => date.formatDate(d.created, 'DD/MM/YYYY'),
		},
		{
			name: '_id',
			label: 'Factores emocionales',
			align: 'center',
			field: d => `${d._id}`,
		},
	]);
	data: DatabasePage.Item[] = [];
	@Inject() loader: MainLayout.Loader;
	@Watch('extractor')
	onChangeExtractor() {
		this.metaKeyError = false;
		this.metaKeyErrorMsg = '';
		this.inputMetaKey = '';
		this.metaKey = '';
		void this.onRequest({ pagination: { page: 1, rowsPerPage: 5, rowsNumber: 0 } });
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
		void this.onRequest({ pagination: { page: 1, rowsPerPage: 5, rowsNumber: 0 } });
	}
	mounted() {
		void this.init();
	}
	onClickComment(item: DatabasePage.Item) {
		this.selectedItem = item;
		this.showDialog = true;
	}
	async init() {
		this.loader.show = true;
		try {
			await Promise.all([
				this.onRequest({ pagination: this.pagination }),
				api.$extractors.list().then(response => {
					if (!response.ok || !response.data)
						throw new CustomError(
							response.type as ApiService.ErrorType,
							response.message,
						);
					this.extractors = ['todos', ...response.data.map(extractor => extractor.id)];
				}),
			]);
		} catch (error) {}
		this.loader.show = false;
	}
	async onRequest(props: { pagination: Pagination }) {
		this.loadingTable = true;
		const { page, rowsPerPage } = props.pagination;
		const extractor = this.extractor == 'todos' ? undefined : this.extractor;
		const metaKey = this.metaKey === '' ? undefined : this.metaKey;
		try {
			const size = rowsPerPage;
			const response = await api.$db.entryList({
				pager: { page: page - 1, size },
				filter: { extractor, metaKey },
			});
			if (!response.ok || !response.data)
				throw new CustomError(response.type as ApiService.ErrorType, response.message);
			this.data = response.data.list.map(entry => ({
				_id: entry._id,
				comment: entry.content,
				created: entry.created,
				extractor: entry.extractor,
			}));
			this.pagination.page = response.data.page + 1;

			this.pagination.rowsNumber = response.data.total;
		} catch (error) {
			const { message } = CustomError.format(error);
			this.$q.notify({ type: 'negative', message });
		}
		this.loadingTable = false;
		return;
	}
	get metaInput() {
		switch (this.extractor) {
			case 'emol-extractor': {
				return {
					icon: 'mdi-newspaper',
					label: 'URL de la noticia',
				};
			}
			case 'twitter-extractor': {
				return {
					icon: 'mdi-twitter',
					label: 'Palabra o hashtag',
				};
			}
			case 'reddit-extractor': {
				return {
					icon: 'mdi-reddit',
					label: 'URL del post',
				};
			}
			case 'telegram-extractor': {
				return {
					icon: 'mdi-telegram',
					label: 'ID del chat',
				};
			}
			case 'youtube-extractor': {
				return {
					icon: 'mdi-youtube',
					label: 'URL del video',
				};
			}
			default: {
				return {
					icon: 'mdi-cancel',
					label: 'Extractor no seleccionado',
				};
			}
		}
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
