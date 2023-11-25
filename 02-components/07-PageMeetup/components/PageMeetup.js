import {defineComponent} from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import {fetchMeetupById} from '../meetupService.js';

import MeetupView from '../../06-MeetupView/components/MeetupView.js';

const States = {
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

export default defineComponent({
	name: 'PageMeetup',

	States,

	components: {
		UiAlert,
		UiContainer,
		MeetupView,
	},

	props: {
		meetupId: {
			type: Number,
			required: true,
		},
	},

	data() {
		return {
			state: States.IDLE,
			meetup: null,
			error: null,
		};
	},

	async mounted() {
		this.fetch();
	},

	watch: {
		meetupId() {
			this.fetch();
		},
	},

	methods: {
		async fetch() {
			this.state = States.LOADING;
			this.meetup = null;
			this.error = null;

			try {
				this.meetup = await fetchMeetupById(this.meetupId);
				this.state = States.SUCCESS;
			} catch (error) {
				this.state = States.ERROR;
				this.error = error.message;
			}
		},
	},

	template: `
    <div class="page-meetup">
      <MeetupView v-if="state === $options.States.SUCCESS" :meetup="meetup"/>

      <UiContainer v-if="state === $options.States.LOADING">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="state === $options.States.ERROR">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>

    </div>`,
});
