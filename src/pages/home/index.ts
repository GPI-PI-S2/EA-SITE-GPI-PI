import gpiButton from 'components/gpiButton';
import { StateInterface } from 'src/store';
import { Component, Vue } from 'vue-property-decorator';
@Component({
	components: { gpiButton },
})
export default class HomePage extends Vue {
	name = 'juanito';
	recibido(name: string) {
		console.log('recibi2: ', name);
	}
	onClick() {
		const prop = (this.$store.state as StateInterface).example.prop;
		this.$store.commit('example/change', !prop);
	}
}
