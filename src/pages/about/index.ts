import arquiTabla from 'assets/about/arqui-tabla.png';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AboutPage extends Vue {
	readonly imgArquiTabla = arquiTabla;
	toggle = false;
	infoExpansion = Object.freeze([
		{
			title: '¿Quienes somos?',
			icon: 'mdi-information-outline',
			caption: '',
			cardContent: `Estudiantes de la carrera ingeniería civil en computación mención informática de la UTEM cursando la asignatura
			Gestión de proyectos informáticos impartida por el Dr. Oscar Magna, en esta ocasión se desarrolló el proyecto asociado al análisis de sentimientos en redes sociales el segundo semestre del año 2020

			`,
		},
		{
			title: 'Integrantes',
			icon: 'mdi-account-group',
			caption: 'Estudiantes',
			cardContent: `Los estudiantes que participaron en el planteamiento, desarrollo y solución de la tesis
			se organizaron en 3 grupos los cuales se presentan a continuación
			`,
		},
		{
			title: 'Sobre la aplicación',
			icon: 'mdi-application',
			caption: '',
			cardContent: ` La aplicación está compuesta por los repositorios
		EA-CORE-GPI-PI, EA-SERVER-GPI-PI, EA-CLIENT-GPI-PI, EA-COMMON-GPI-PI, EA-WEB-GPI-PI el detalle se encuentra a continuación		
		`,
		},
	]);
	IntegrantesList: Readonly<aboutPage.TeammInfo[]> = Object.freeze([
		{
			name: 'Líderes de equipo',
			integrantes: [
				{
					name: 'Diego Sepúlveda',
					img:
						'https://i.imgur.com/D6Sjc06.png',
					lider: true,
					extra: 'Jefe de proyecto',
					email: 'diego.sepulvedas@utem.cl',
				},
				{
					name: 'Daniel Fredes Lizama',
					img: 'https://avatars1.githubusercontent.com/u/72327723?s=460&u=71afedeadab1bd5327c690e5a89566ee98ec18a9&v=4',
					lider: true,
					extra: 'Líder de desarrollo',
					email: 'daniel.fredesl@utem.cl',
				},
				{
					name: 'Mathias Cáceres',
					img: 'https://i.imgur.com/wTp6Dlz.jpg?1',
					lider: true,
					extra: 'Líder de investigación',
					email: 'mathias.caceresb@utem.cl',
				},
				{
					name: 'Israel Ramirez',
					img:
						'https://scontent.fscl15-1.fna.fbcdn.net/v/t1.0-9/32381025_10209606525034580_6105904243057623040_n.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=ex0Vv1_pzUoAX8QlsPq&_nc_ht=scontent.fscl15-1.fna&oh=8b0f63f7b99ed6b7c21cfc21e3b3b7e7&oe=5FF3998B',
					lider: true,
					extra: 'Líder de documentación',
					email: 'israel.ramirezc@utem.cl',
				},
			],
		},
		{
			name: 'Equipo de investigación',
			integrantes: [
				{
					name: 'Daniel Aguilera',
					img: '',
					lider: false,
					extra: '',
					email: 'daniel.aguilerat@utem.cl',
				},
				{
					name: 'Nicolás Andrews',
					img: 'https://cdn.discordapp.com/attachments/666791661363265536/785603323276951582/Untitled.png',
					lider: false,
					extra: '',
					email: 'nicolas.andrewss@utem.cl',
				},
				{
					name: 'Daniel Cajas',
					img: 'https://i.imgur.com/VbtXjrM.jpg?1',
					lider: false,
					extra: '',
					email: 'daniel0cajas@gmail.com',
				},
				{
					name: 'Rodrigo Carmona',
					img: 'https://i.imgur.com/5uOga6a.jpg',
					lider: false,
					extra: '',
					email: 'rodrigo.carmonar@utem.cl',
				},
				{
					name: 'Hector Carter',
					img: 'https://i.imgur.com/765Fzg7.jpg',
					lider: false,
					extra: '',
					email: 'hector.carterc@utem.cl',
				},
				{
					name: 'Byron Diaz',
					img: 'https://i.imgur.com/Sz6Vz6X.jpg',
					lider: false,
					extra: '',
					email: 'byron.diazj@utem.cl',
				},
				{
					name: 'Miguel Gallardo',
					img: 'https://i.imgur.com/4mGG0LS.png?1',
					lider: false,
					extra: '',
					email: 'Miguel.and.gallardo@gmail.com',
				},
				{
					name: 'Allan Morales',
					img: 'https://i.imgur.com/SJo1R1p.jpg?1',
					lider: false,
					extra: '',
					email: 'allan.moralesp@utem.cl',
				},
				{
					name: 'Janira Navarro',
					img: '',
					lider: false,
					extra: '',
					email: 'janira.navarroq@utem.cl',
				},
				{
					name: 'Humberto Román',
					img: 'https://i.imgur.com/ZxvLo8o.jpg',
					lider: false,
					extra: '',
					email: 'humberto.romanm@utem.cl',
				},
				{
					name: 'Lester Vásquez',
					img: 'https://i.imgur.com/QL1qWQS.jpg',
					lider: false,
					extra: '',
					email: 'lester.vasquezr@utem.cl',
				},
				{
					name: 'Shu-yi Wong',
					img: 'https://scontent.fscl18-1.fna.fbcdn.net/v/t1.0-9/92728559_10222990941385963_5028443007444058112_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=NPAeli0-eNAAX-CRW90&_nc_ht=scontent.fscl18-1.fna&oh=df7c2564a93aff5e735a975805ac7e27&oe=5FF2851F',
					lider: false,
					extra: '',
					email: 'shu-yi.wongb@utem.cl',
				},
			],
		},
		{
			name: 'Equipo de desarrollo',
			integrantes: [
				{
					name: 'Victor Araya',
					img: '',
					lider: true,
					extra: '',
					email: 'victor.arayar@utem.cl',
				},
				{
					name: 'Sebastian Pérez',
					img: 'https://i.imgur.com/JzvEK4j.jpg',
					lider: false,
					extra: 'El pixula',
					email: 'sebastian.perezb@utem.cl',
				},
				{
					name: 'Luis Felipe Jaña',
					img: 'https://avatars0.githubusercontent.com/u/32202571?s=400&u=b8366a382d24b4c72a0d00c5bced9fa699450edc&v=4',
					lider: false,
					extra: '',
					email: 'luis.janag@utem.cl',
				},
				{
					name: 'Juan Avendaño',
					img:
						'https://media-exp1.licdn.com/dms/image/C4E03AQGac_oyUvM8iw/profile-displayphoto-shrink_400_400/0?e=1613001600&v=beta&t=mMl6lU1-jtQbc0MCmYyw3HHEfsyEPLnw2ILUils07tk',
					lider: false,
					extra: '',
					email: 'juan.avendanon@utem.cl',
				},
			],
		},
		{
			name: 'Equipo de documentación',
			integrantes: [
				{
					name: 'Ricardo Aliste',
					img: 'https://i.imgur.com/0GqqJiM.jpg',
					lider: false,
					extra: 'https://i.imgur.com/0GqqJiM.jpg',
					email: 'ricardo.alisteg@utem.cl',
				},
				{
					name: 'Mattias Alvarado',
					img: '',
					lider: false,
					extra: '',
					email: 'mattias.alvaradoo@utem.cl',
				},
				{
					name: 'Gonzalo Barcaza',
					img: 'https://i.imgur.com/YMwi9et.jpg',
					lider: false,
					extra: '',
					email: 'gonzalo.barcazat@utem.cl',
				},
				{
					name: 'Lucas Carmona',
					img: 'https://i.imgur.com/K4Witgw.jpeg',
					lider: false,
					extra: '',
					email: 'lucas.carmonam@utem.cl',
				},
				{
					name: 'José Carvallo',
					img:
						'https://bn02pap001files.storage.live.com/y4mppgDmqhOeCz_xDCXkdA49LAqNR5lBba_6sMx35CurkWQN4YPNfAinqMacKNaJVa-xkS8f_nZXct8Maw8f66fdhXPbVQcsdO6Oj1UgGTHQalfgm5hQDk20RbnAS9pfaomxLy9pkXg5kDx_-C-h89JbWPjDeYiX8U18bayc6LNzt3ZBf_65aE8Xhx0ssGE74OxlY2HlWFPIR63c7vKC7XHJg/2018-09-28%20Foto%20de%20Perfil%20Cuadrado.jpg?psid=1&width=720&height=720&cropMode=center',
					lider: false,
					extra: '',
					email: 'JoseCarvalloxc@outlook.cl',
				},
				{
					name: 'Cristian Flores',
					img: 'https://i.imgur.com/1lCgg4x.jpeg',
					lider: false,
					extra: '',
					email: 'cristian.floresa@utem.cl',
				},
				{
					name: 'Felipe Flores',
					img: 'https://i.imgur.com/qgiATc1.jpg?1',
					lider: false,
					extra: '',
					email: 'fuerte.felipe@gmail.com',
				},
				{
					name: 'Yerko Foncea',
					img: 'https://i.imgur.com/iwsOCDp.jpeg',
					lider: false,
					extra: 'https://i.imgur.com/iwsOCDp.jpg',
					email: 'yerko.fonceac@utem.cl',
				},
				{
					name: 'Javier Gálves',
					img: 'https://scontent.fscl26-1.fna.fbcdn.net/v/t31.0-8/202528_103009999848276_1941411796_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=tdhktYsbMw0AX8BIpbL&_nc_ht=scontent.fscl26-1.fna&oh=d7ebfa4a45d5eac0fd15eb5caa395c5a&oe=5FF3A00F',
					lider: false,
					extra: '',
					email: 'javier.galvezg@utem.cl',
				},
				{
					name: 'Sebastian Garrido',
					img:
						'https://scontent.fscl26-1.fna.fbcdn.net/v/t1.0-9/51748952_2302481043343000_5662803685583880192_o.jpg?_nc_cat=110&ccb=2&_nc_sid=174925&_nc_ohc=sbFDtI9zjWkAX_7m98N&_nc_ht=scontent.fscl26-1.fna&oh=8c2ae77fe1a97969116328354ed68ff5&oe=5FF164F8',
					lider: false,
					extra: '',
					email: 'sebastian.garridov@utem.cl',
				},
				{
					name: 'Mohamed Gorayeb',
					img: 'https://i.imgur.com/hXGISkB.jpg',
					lider: false,
					extra: '',
					email: 'mohamed.gorayebm@utem.cl',
				},
				{
					name: 'Benjamín Martinez',
					img: 'https://i.imgur.com/JHnkkcB.jpg',
					lider: false,
					extra: '',
					email: 'benjamin.martinezg@utem.cl',
				},
				{
					name: 'Brayan Parra',
					img: '',
					lider: false,
					extra: '',
					email: 'Brayan.parrar@utem.cl',
				},
				{
					name: 'Ivan Pérez',
					img: 'https://scontent.fscl29-1.fna.fbcdn.net/v/t1.0-9/82937988_2811728638848360_9123587087436611584_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=AzDfLiCWiAYAX9aCBJu&_nc_ht=scontent.fscl29-1.fna&oh=f2ba4f72dd2ffa597c4bf8c5d1697221&oe=5FF4662F',
					lider: false,
					extra: '',
					email: 'ivan.perez.alarcon@utem.cl',
				},
				{
					name: 'Daniel Sisinni',
					img: 'https://i.imgur.com/nCQwfAH.jpg',
					lider: false,
					extra: '',
					email: 'diss_metal95@hotmail.com',
				},
			],
		},
	]);
	githubRoutes: Readonly<aboutPage.Groute[]> = Object.freeze([
		{ label: 'CORE-GPI-PI', href: 'https://github.com/GPI-PI-S2/EA-CORE-GPI-PI' },
		{ label: 'SERVER-GPI-PI', href: 'https://github.com/GPI-PI-S2/EA-SERVER-GPI-PI' },
		{ label: 'CLIENT-GPI-PI', href: 'https://github.com/GPI-PI-S2/EA-EXE-GPI-PI' },
		{ label: 'COMMON-GPI-PI', href: 'https://github.com/GPI-PI-S2/EA-COMMON-GPI-PI' },
		{ label: 'WEB-GPI-PI', href: 'https://github.com/GPI-PI-S2/EA-SITE-GPI-PI' },
	]);
	onClickRepo(href: string) {
		window.open(href, '_blank');
	}
	// emol y reddit lim comments
}
export namespace aboutPage {
	export interface Groute {
		label: string;
		href: string;
	}
	export interface Integrantes {
		name: string;
		img: string;
		lider: boolean;
		extra: string;
		email: string;
	}
	export interface TeammInfo {
		name: string;
		integrantes: Integrantes[];
	}
}
