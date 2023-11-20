import {createApp} from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
	return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			return response.json().then((error) => {
				throw error;
			});
		}
	});
}

// Требуется создать Vue приложение

window.vm = createApp({
	name: 'App',
	data() {
		return {
			filter: '',
			meetup: {
				title: 'MEETUP_TITLE',
			},
		};
	},
	watch: {
		filter(newValue) {
			fetchMeetupById(newValue).then((data) => {
				this.meetup = data;
			});
		},
	},
	template: `
    <div>
      <label v-for="n in 5"><input type="radio" name="meetupId" :value="n" v-model="filter"/>{{n}}</label>
    <hr />
    <h3>{{meetup.title}}</h3>
  </div>
  `,
}).mount('#app');
