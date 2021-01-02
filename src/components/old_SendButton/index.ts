import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SendButton extends Vue {
	@Prop({ default: 'Enviar' })
	label!: string;
	@Prop({ default: 'md' })
	size!: string;
	@Prop({ default: 'md' })
	padding!: string;

	isLoading = false;
	simulateProgress() {
		// Simulando la carga

		this.isLoading = true;
		setTimeout(() => {
			// time out para setearlo falso
			this.isLoading = false;
		}, 3000);
	}
}
