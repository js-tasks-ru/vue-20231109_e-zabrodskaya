import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = defineComponent({
	name: 'App',
	data() {
		return {
			input: {
				number1: '',
				number2: '',
				radio: 'sum',
			},
		};
	},
	computed: {
		result() {
			if (this.input.radio === 'sum') {
				return this.input.number1 + this.input.number2;
			} else if (this.input.radio === 'subtract') {
				return this.input.number1 - this.input.number2;
			} else if (this.input.radio === 'multiply') {
				return this.input.number1 * this.input.number2;
			} else if (this.input.radio === 'divide') {
				return this.input.number1 / this.input.number2;
			}
		},
	},
});
const app = createApp(App);

window.vm = app.mount('#app');
