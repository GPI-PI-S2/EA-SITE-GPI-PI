import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('layouts/main'),
		children: [
			{ path: 'home', name: 'home', component: () => import('pages/home') },
			{ path: 'settings', name: 'settings', component: () => import('pages/settings') },
			{ path: 'about', name: 'about', component: () => import('pages/about') },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/error'),
	},
];

export default routes;
