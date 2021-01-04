import logo from 'assets/logo.png';
import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';
@Component
export default class MainLayout extends Vue {
	leftDrawerOpen = false;
	expanded = false;
	utem = logo;
	items: Readonly<MainLayout.page[]> = Object.freeze([
		{ name: 'Resultados', icon: 'mdi-contain', to: { name: 'results' } },
		{ name: 'Explorar', icon: 'mdi-database-search', to: { name: 'database' } },
		{ name: 'Extractores', icon: 'mdi-download-multiple', to: { name: 'extractors' } },
		{ name: 'Base de datos', icon: 'mdi-database-settings', to: { name: 'stats' } },
		{ name: 'Ajustes', icon: 'mdi-cog', to: { name: 'settings' } },
		{ name: 'Sobre la app', icon: 'mdi-information', to: { name: 'about' } },
	]);
	@Provide() loader: MainLayout.Loader = { message: 'Cargando', show: false };
	@Watch('$route.name')
	onChangeRoute(c: string) {
		this.loader.message = 'Cargando';
		this.loader.show = false;
	}
	get menuWidth() {
		return this.$q.screen.lt.md ? '55px' : '200px';
	}
}
export namespace MainLayout {
	export type page = { name: string; icon: string; to: RawLocation };
	export interface Loader {
		show: boolean;
		message: string;
	}
}
