import gpiButton from 'components/gpiButton';
import InputC from 'components/InputC';
import SelectC from 'src/components/SelectC';
import SendButton from 'src/components/SendButton';
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: { gpiButton, InputC, SelectC, SendButton },
})
export default class SettingsPage extends Vue {
	value=0;
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
			content: [{ label: 'Limite de comentarios', icon: 'mdi-comment' }],
		},
	];
	telegram = {
		title: 'Telegram',
		icon: 'mdi-telegram',
		items: [],
	};
	options = ['+56'];
}
// id nombre tipo de chat
