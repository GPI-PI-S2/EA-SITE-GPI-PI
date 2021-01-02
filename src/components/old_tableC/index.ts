import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TableC extends Vue {
	@Prop({ default: true })
    dense!:boolean;
    @Prop({})
    data!: tableComponent.data []
    @Prop({default: 'Tabla'})
    title!:string;
    @Prop({default:10})
    records!:number;
}

export namespace tableComponent{
    export interface data{
        email: string,
        contrib: number;
    }
}