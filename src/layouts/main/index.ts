import { Component, Vue } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';
@Component
export default class MainLayout extends Vue {
	leftDrawerOpen = false;
	items: Readonly<MainLayout.page[]> = Object.freeze([
		{ name: 'Home', icon: 'mdi-home', to: { name: 'home' } },
		{ name: 'Ajustes', icon: 'mdi-cog', to: { name: 'settings' } },
		{ name: 'Sobre la app', icon: 'mdi-information', to: { name: 'about' } },
	]);
}
export namespace MainLayout {
	export type page = { name: string; icon: string; to: RawLocation };
}
