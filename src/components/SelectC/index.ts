import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SelectC extends Vue {
	@Prop({})
	label!: string;
	@Prop({ default: [] })
	options!: [];
	model = null;
	@Prop({ default: false })
	dense!: boolean;
	@Prop({ default: false })
	denseOpts!: boolean;
	emmitModel() {
		this.$emit('selectModel', this.model);
	}
}
