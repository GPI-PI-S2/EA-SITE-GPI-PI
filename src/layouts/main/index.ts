import { Component, Vue } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';
@Component
export default class MainLayout extends Vue {
	leftDrawerOpen = false;
	expanded = false;
	items: Readonly<MainLayout.page[]> = Object.freeze([
		{ name: 'Resultados', icon:'mdi-contain', to:{ name: 'results' }},
		{ name: 'Extractores', icon: 'mdi-home', to: { name: 'extractors' } },
		{ name: 'Stats', icon: 'mdi-state-machine', to: { name: 'stats' } },
		{ name: 'Database', icon: 'mdi-database-arrow-down-outline', to: { name: 'database' } },
		{ name: 'Ajustes', icon: 'mdi-cog', to: { name: 'settings' } },
		{ name: 'Sobre la app', icon: 'mdi-information', to: { name: 'about' } },
	]);
	get menuWidth() {
		return this.$q.screen.lt.md ? '55px' : '200px';
	}
}
export namespace MainLayout {
	export type page = { name: string; icon: string; to: RawLocation };
}
