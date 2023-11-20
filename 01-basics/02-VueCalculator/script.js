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
			const {number1, number2, radio} = this.input;

			if (radio === 'sum') {
				return number1 + number2;
			} else if (radio === 'subtract') {
				return number1 - number2;
			} else if (radio === 'multiply') {
				return number1 * number2;
			} else if (radio === 'divide') {
				return number1 / number2;
			}
		},
	},
});
const app = createApp(App);

window.vm = app.mount('#app');
