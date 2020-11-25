import gpiButton from 'components/gpiButton';
import SendButton from 'src/components/SendButton';
import InputC from 'src/components/InputC';
import SelectC from 'src/components/SelectC';
import cardC from 'src/components/cardC'
import { StateInterface } from 'src/store';
import { Component, Vue } from 'vue-property-decorator';
@Component({
	components: { gpiButton, cardC,SendButton, InputC, SelectC},
})
export default class HomePage extends Vue {
	modelSelect!: string;
	showTelegram = false;
	selectModelUpdate(selectModel: string) {
		selectModel=='Telegram' ? this.showTelegram=true: this.showTelegram=false;
		this.modelSelect=selectModel;
	}
	extractors = [
		{title:'YouTube',img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/1200px-YouTube_social_red_square_%282017%29.svg.png', color:'red'},
		{title:'Twitter',img:'https://hipertextual.com/files/2012/06/twitter-bird-white-on-blue.jpg?width=1200&enable=upscale', color:'blue'},
		{title:'Telegram',img:'https://image.flaticon.com/icons/png/512/124/124019.png', color:'black'},
		{title:'Emol',img:'https://static.emol.cl/emol50/img/servicios/moviles/movilesNuevos/icon_mov_ipad.png', color:'red'},
		{title:'Reddit',img:'https://cdn.fastly.picmonkey.com/content4/previews/social/social_54_550.png', color:'red'}
	]
	step =1; 
	onClick() {
		const prop = (this.$store.state as StateInterface).example.prop;
		this.$store.commit('example/change', !prop);
	}

}
