import { StateInterface } from 'src/store';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InputC extends Vue {
    @Prop({ default:'Ingrese texto' })
    label!:string;
    text='';
    @Prop({default:true})
    dense!:boolean;
}
