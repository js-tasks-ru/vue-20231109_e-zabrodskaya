import {createRouter, createWebHistory} from 'vue-router';
import {isAuthenticated} from '../services/authService.js';

const router = createRouter({
	history: createWebHistory('/05-vue-router/05-AuthGuard'),
	routes: [
		{
			path: '/',
			name: 'index',
			alias: '/meetups',
			component: () => import('../views/PageMeetups.vue'),
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				requireGuest: true,
			},
			component: () => import('../views/PageLogin.vue'),
		},
		{
			path: '/register',
			meta: {
				requireGuest: true,
			},
			component: () => import('../views/PageRegister.vue'),
		},
		{
			path: '/meetups/create',
			meta: {
				requireAuth: true,
			},
			component: () => import('../views/PageCreateMeetup.vue'),
		},
		{
			path: '/meetups/:meetupId(\\d+)/edit',
			meta: {
				requireAuth: true,
			},
			component: () => import('../views/PageEditMeetup.vue'),
		},
	],
});

router.beforeEach(async (to, from) => {
	let isLogin = isAuthenticated();
	if (to.meta.requireGuest && isLogin) {
		return {name: 'index'};
	} else if (to.meta.requireAuth && !isLogin) {
		console.log(to.meta.requireAuth);
		return {name: 'login', query: {from: to.fullPath}};
	}
});

export {router};
