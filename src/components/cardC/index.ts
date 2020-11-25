import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class cardC extends Vue {

    @Prop({default:'https://cdn.quasar.dev/img/mountains.jpg'})
    src!:string;
    @Prop({default:[{color:'red',icon:'favorite'},{color:'accent',icon:'bookmark'},{color:'primary',icon:'share'}]})
    buttons!:[{color:string,icon:string}];
    onClick (){
        console.log('hola from')
    }
}
