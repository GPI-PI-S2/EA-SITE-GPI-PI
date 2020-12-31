import tableC from 'src/components/tableC';
import { IReddit } from 'src/types';
import { Component, Vue } from 'vue-property-decorator';
@Component({
	components: { tableC },
})
export default class DatabasePage extends Vue {
	isLoading = false;
	realData = [];
	deployed = false;
	loading = false;
	async onClickDeploy() {
		this.loading = true;
		try {
			this.deployed = true;
			const response = await fetch('http://localhost:8000/api/v1/extractors/deploy', {
				credentials: 'include',
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'X-API-KEY': 'rayaparalasuma',
				},
				body: JSON.stringify({ id: 'reddit-extractor' }),
			});
			if (response.ok) {
				const jsonResponse = (await response.json()) as Record<string, unknown>;
				console.debug('deploy response', jsonResponse);
			}
		} catch (error) {
			this.deployed = false;
			console.error(error);
			this.$q.notify({ type: 'error', message: 'Error al hacer deploy' });
		}
		this.loading = false;
	}
	async onClickObtain() {
		this.loading = true;
		try {
			const url =
				'https://www.reddit.com/r/chile/comments/kh3j0n/encontr%C3%A9_unas_fotos_que_saqu%C3%A9_el_a%C3%B1o_pasado_en/';
			const redditUrl = new URL(url);
			const paths = redditUrl.pathname.split('/');
			const subReddit = paths[2];
			const postId = paths[4];
			const options: IReddit.Obtain.Options = {
				limit: 300,
				metaKey: JSON.stringify({ subReddit, postId }),
				postId,
				subReddit,
			};
			const response = await fetch('http://localhost:8000/api/v1/extractors/obtain', {
				credentials: 'include',
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'X-API-KEY': 'rayaparalasuma',
				},
				body: JSON.stringify({ id: 'reddit-extractor', options }),
			});
			if (response.ok) {
				const jsonResponse = (await response.json()) as Record<string, unknown>;
				console.debug('obtain response', jsonResponse);
			}
		} catch (error) {
			this.deployed = false;
			console.error(error);
			this.$q.notify({ type: 'error', message: 'Error al hacer obtain' });
		}
		this.loading = false;
	}
}
