import {defineComponent} from '../vendor/vue.esm-browser.js';
import {agendaItemIcons, agendaItemDefaultTitles} from '../meetupService.js/';

export default defineComponent({
	name: 'MeetupAgendaItem',

	props: {
		agendaItem: {
			type: Object,
			required: true,
		},
	},

	agendaItemIcons,
	agendaItemDefaultTitles,

	template: `
    <div class="agenda-item">
      <div class="agenda-item__col" >
        <img :src="\`/assets/icons/icon-\${$options.agendaItemIcons[this.agendaItem.type]}.svg\`" class="icon" :alt="this.agendaItem.type" />
      </div>
      <div class="agenda-item__col">{{this.agendaItem.startsAt + ' - ' + this.agendaItem.endsAt}}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{this.agendaItem.title ? this.agendaItem.title : $options.agendaItemDefaultTitles[this.agendaItem.type]}}</h3>
        <p v-if="this.agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{this.agendaItem.speaker}}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{this.agendaItem.language}}</span>
        </p>
        <p v-if="this.agendaItem.description">{{this.agendaItem.description}}</p>
      </div>
    </div>`,
});
