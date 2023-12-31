import {defineComponent} from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js';
import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem.js';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';

export default defineComponent({
	name: 'MeetupView',

	props: {
		meetup: {
			type: Object,
			required: true,
		},
	},

	components: {
		UiAlert,
		UiContainer,
		MeetupDescription,
		MeetupCover,
		MeetupInfo,
		MeetupAgendaItem,
		MeetupAgenda,
	},

	template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image"/>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description"/>
            <h3>Программа</h3>
            <MeetupAgenda v-if="meetup.agenda.length !== 0" :agenda="meetup.agenda"/>
            <UiAlert v-else-if="meetup.agenda.length == 0">Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer"
        :place="meetup.place"
        :date="meetup.date"/>
          </div>
        </div>
      </UiContainer>
    </div>`,
});
