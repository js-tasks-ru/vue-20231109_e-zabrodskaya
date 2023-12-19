import {createRouter, createWebHistory} from 'vue-router';

export const router = createRouter({
	history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('../views/PageMeetups.vue'),
		},
		{
			path: '/meetups',
			name: 'meetups',
			redirect: {name: 'index'},
		},
		{
			path: '/meetups/:meetupId(\\d+)',
			name: 'meetup',
			meta: {
				showReturnToMeetups: true,
				saveScrollPosition: true,
			},
			props: true,
			redirect: (to) => ({name: 'meetup.description', params: to.params}),
			component: () => import('../views/PageMeetup.vue'),
			children: [
				{
					path: '',
					alias: 'description',
					name: 'meetup.description',
					props: true,
					component: () => import('../views/PageMeetupDescription.vue'),
				},
				{
					path: 'agenda',
					name: 'meetup.agenda',
					props: true,
					component: () => import('../views/PageMeetupAgenda.vue'),
				},
			],
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (from.meta.saveScrollPosition == true && to.meta.saveScrollPosition == true) {
			let top = document.scrollTop;
			return {top: top};
		} else if (to.hash) {
			return {
				el: to.hash,
			};
		} else if (savedPosition) {
			return savedPosition;
		} else {
			return {left: 0, top: 0};
		}
	},
});
