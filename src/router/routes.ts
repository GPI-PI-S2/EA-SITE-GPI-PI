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
