import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('layouts/main'),
		children: [
			{
				path: 'extractors',
				name: 'extractors',
				component: () => import('src/pages/extractors'),
			},
			{ path: 'settings', name: 'settings', component: () => import('pages/settings') },
			{ path: 'about', name: 'about', component: () => import('pages/about') },
			{ path: 'stats', name: 'stats', component: () => import('pages/stats') },
			{ path: 'database', name: 'database', component: () => import('pages/database') },
			{ path: 'results', name: 'results', component: () => import('pages/results') },
			{ path: 'search', name: 'search', component: () => import('pages/search') },
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
