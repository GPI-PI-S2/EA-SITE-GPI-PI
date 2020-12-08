export interface State {
	apiKeyYoutube: string;
	apiKeyTwitter: string;
	phoneNumber: string;
	limit: number;
}
const defaultState = (): State => ({
	apiKeyTwitter: '',
	apiKeyYoutube: '',
	limit: NaN,
	phoneNumber: '',
});

export default defaultState;
