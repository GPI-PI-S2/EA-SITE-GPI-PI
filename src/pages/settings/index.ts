import gpiButton from 'components/gpiButton';
import InputC from 'components/InputC';
import SelectC from 'src/components/SelectC';
import SendButton from 'src/components/SendButton';
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: { gpiButton, InputC, SelectC, SendButton },
})
export default class SettingsPage extends Vue {
	items = [
		{
			title: 'YouTube',
			icon: 'mdi-youtube',
			content: [{ label: 'Apikey', icon: 'mdi-key-variant' }],
		},
		{
			title: 'Twitter',
			icon: 'mdi-twitter',
			content: [{ label: 'Apikey', icon: 'mdi-key-variant' }],
		},
		{
			title: 'General',
			icon: 'mdi-cog',
			content: [{ label: 'Limite de comentarios', icon: 'mdi-key-variant' }],
		},
		// {title: 'Reddit',icon:'mdi-reddit', content:[{label:'Apikey',icon:'mdi-key-variant'}]},
		// {title: 'Emol', icon:'mdi-newspaper', content: [{label:'Apikey',icon:'mdi-key-variant'}]},
	];
	telegram = {
		title: 'Telegram',
		icon: 'mdi-telegram',
		items: [],
	};
	options = ['+56'];
}

// id nombre tipo de chat
