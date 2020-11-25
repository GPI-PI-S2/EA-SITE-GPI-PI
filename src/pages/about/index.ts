import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AboutPage extends Vue {
	infoExpansion = [
		{
			title: '¿Quienes somos?',
			icon: 'mdi-information-outline',
			caption: '',
			cardContent: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis nec velit a gravida. Mauris a urna odio. Etiam condimentum rhoncus ornare. Nullam rutrum elit commodo elit gravida commodo. Proin at consectetur sapien, et gravida neque. Sed posuere fringilla hendrerit. Duis venenatis molestie turpis et sagittis. Cras finibus commodo velit sit amet tempus. Ut vel nulla cursus, tincidunt ex quis, ultrices nunc. Mauris venenatis nibh vel enim posuere, id convallis lectus imperdiet. Integer commodo at mi ut interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ornare a nisl et lobortis. Fusce hendrerit auctor velit vitae ullamcorper. Nullam at hendrerit augue, lobortis fringilla velit. Aliquam bibendum venenatis justo, faucibus ultrices dolor commodo ac.`,
		},
		{
			title: 'Integrantes',
			icon: 'mdi-account-group',
			caption: 'Estudiantes',
			cardContent: 'Texto',
		},
		{ title: 'Sobre la aplicación', icon: 'mdi-application', caption: '', cardContent: 'Text' },
	];

	// emol y reddit lim comments
	toggle = false;
}
