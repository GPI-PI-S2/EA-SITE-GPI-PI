import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class SettingsPage extends Vue {
	apiKeyYoutube = '';
	apiKeyTwitter = '';
	phoneNumber = '';
	limitComments = 0;
	mounted() {
		const state = this.$store.state as StateInterface;
		this.apiKeyYoutube = state.app.apiKeyYoutube;
		this.apiKeyTwitter = state.app.apiKeyTwitter;
		this.phoneNumber = state.app.phoneNumber;
		this.limitComments = state.app.limit;
	}
	@Watch('apiKeyYoutube')
	onChangeApiKeyYoutube(c: string) {
		this.$store.commit('app/setApiKeyYoutube', c);
	}
	@Watch('apiKeyTwitter')
	onChangeApiKeyTwitter(c: string) {
		this.$store.commit('app/setApiKeyTwitter', c);
	}
	@Watch('phoneNumber')
	onChangeApiKeylimitComments(c: string) {
		this.$store.commit('app/setPhoneNUmber', c);
	}
	@Watch('limitComments')
	onChangeLimit(c: string) {
		this.$store.commit('app/setLimit', c);
	}
}
// id nombre tipo de chat
