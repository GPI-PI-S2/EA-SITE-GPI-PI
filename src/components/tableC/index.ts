import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TableC extends Vue {
	@Prop({ default: true })
    dense!:boolean;
    @Prop({})
    data!: tableComponent.data []
    @Prop({default: 'Tabla'})
    title!:string;
}

export namespace tableComponent{
    export interface data{
        email: string,
        contrib: number;
    }
}