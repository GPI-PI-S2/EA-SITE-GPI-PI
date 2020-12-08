import { LocalStorage } from 'quasar';
import { MutationTree } from 'vuex';
import { State } from './state';

const mutation: MutationTree<State> = {
	setApiKeyYoutube(state, value: string) {
		try {
			LocalStorage.set('apiKeyYoutube', value);
		} catch (error) {
			console.warn('Localstore is not available');
		}
		state.apiKeyYoutube = value;
	},
	setApiKeyTwitter(state, value: string) {
		try {
			LocalStorage.set('apiKeyTwitter', value);
		} catch (error) {
			console.warn('Localstore is not available');
		}
		state.apiKeyTwitter = value;
	},
	setPhoneNUmber(state, value: string) {
		try {
			LocalStorage.set('phoneNumber', value);
		} catch (error) {
			console.warn('Localstore is not available');
		}
		state.phoneNumber = value;
	},
	setLimit(state, value: number) {
		try {
			LocalStorage.set('limit', value);
		} catch (error) {
			console.warn('Localstore is not available');
		}
		state.limit = value;
	},
};

export default mutation;
