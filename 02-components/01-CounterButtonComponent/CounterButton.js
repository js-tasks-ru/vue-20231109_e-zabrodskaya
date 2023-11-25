import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
	name: 'CounterButton',

	// Компонент должен иметь входной параметр и порождать событие
	props: {
		count: {
			type: Number,
			default: 0,
		},
	},
	emits: ['update:count'],

	methods: {
		update(count) {
			this.$emit('update:count', count + 1);
		},
	},

	template: `<button type="button" @click="update(count)">{{count}}</button>`,
});
