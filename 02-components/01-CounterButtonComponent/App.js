import {defineComponent} from './vendor/vue.esm-browser.js';
import CounterButton from './CounterButton.js';

export default defineComponent({
	name: 'App',

	components: {
		CounterButton,
	},

	data() {
		return {
			count: undefined,
		};
	},

	methods: {
		increase() {
			if (this.count == undefined) {
				this.count = 1;
			} else {
				this.count += 1;
			}
		},
	},

	template: `
    <div class="sample container">
      <p>count = {{ count }}</p>
      <p>
        <CounterButton :count="count" @update:count="increase" />
      </p>
      <p>
        <CounterButton v-model:count="count" @update:count="increase" />
      </p>
      <p>
        <CounterButton v-model:count="count" @update:count="increase" />
      </p>
    </div>
  `,
});
