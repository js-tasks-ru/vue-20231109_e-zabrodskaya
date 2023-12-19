import {createRouter, createWebHistory} from 'vue-router';
import PageNotFound from '../views/PageNotFound';

export const router = createRouter({
	history: createWebHistory('/05-vue-router/02-NotFound'),
	routes: [
		{
			path: '/page-a',
			alias: '/',
			component: () => import('../views/PageA'),
		},
		{
			path: '/page-b',
			component: () => import('../views/PageB'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'PageNotFound',
			component: PageNotFound,
		},
	],
});
