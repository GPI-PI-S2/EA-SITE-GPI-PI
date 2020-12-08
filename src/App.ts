import { LocalStorage } from 'quasar';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
	mounted() {
		try {
			const apiKeyYoutube = LocalStorage.getItem('apiKeyYoutube');
			const apiKeyTwitter = LocalStorage.getItem('apiKeyTwitter');
			const phoneNumber = LocalStorage.getItem('phoneNumber');
			const limit = LocalStorage.getItem('limit');
			if (apiKeyYoutube) this.$store.commit('app/setApiKeyYoutube', apiKeyYoutube);
			if (apiKeyTwitter) this.$store.commit('app/setApiKeyTwitter', apiKeyYoutube);
			if (phoneNumber) this.$store.commit('app/setPhoneNUmber', phoneNumber);
			if (limit) this.$store.commit('app/setLimit', limit);
		} catch (error) {
			console.warn('Localstore is not available');
		}
	}
}
