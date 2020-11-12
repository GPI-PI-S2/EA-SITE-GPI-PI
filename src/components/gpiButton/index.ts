import { StateInterface } from 'src/store';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class GpiButton extends Vue {
	@Prop({ default: 'Sin nombre' })
	name!: string;
	text = 'hola';
	mounted() {
		console.warn('montado');
	}

	emitir(name: string) {
		const state = this.$store.state as StateInterface;
		state.example.prop;
		console.log('=>', state.example.prop);
		name = 'El alumno ' + name;
		this.$q
			.dialog({
				title: 'Título',
				message: 'Hola',
				cancel: 'Cancelar',
			})
			.onOk(() => this.$q.notify({ message: 'Aceptado' }))
			.onCancel(() => this.$q.notify({ message: 'Rechazado', type: 'negative' }));
		this.$emit('magna', name);
	}
}
