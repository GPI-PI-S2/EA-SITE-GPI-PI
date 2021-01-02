import arquiTabla from 'assets/about/arqui-tabla.png';
import alisteR from 'assets/members/alisteR.jpg';
import andrewsN from 'assets/members/andrewsN.png';
import avendanoJ from 'assets/members/avendanoJ.jpeg';
import barcazaG from 'assets/members/barcazaG.jpg';
import caceresM from 'assets/members/caceresM.jpg';
import cajasD from 'assets/members/cajasD.jpg';
import carmonaL from 'assets/members/carmonaL.jpeg';
import carmonaR from 'assets/members/carmonaR.jpg';
import carterH from 'assets/members/carterH.jpg';
import carvalloJ from 'assets/members/carvalloJ.jpg';
import diazB from 'assets/members/diazB.jpg';
import floresC from 'assets/members/floresC.jpeg';
import floresF from 'assets/members/floresF.jpg';
import fonceaY from 'assets/members/fonceaY.jpeg';
import fredesD from 'assets/members/fredesD.png';
import gallardoM from 'assets/members/gallardoM.png';
import galvesJ from 'assets/members/galvesJ.jpg';
import garridoS from 'assets/members/garridoS.jpg';
import gorayebM from 'assets/members/gorayebM.jpg';
import janaL from 'assets/members/janaL.png';
import martinezB from 'assets/members/martinezB.jpg';
import moralesA from 'assets/members/moralesA.jpg';
import perezI from 'assets/members/perezI.jpg';
import perezS from 'assets/members/perezS.jpg';
import ramirezI from 'assets/members/ramirezI.jpg';
import romanH from 'assets/members/romanH.jpg';
import sepulvedaD from 'assets/members/sepulvedaD.png';
import sisinniD from 'assets/members/sisinniD.jpg';
import vasquezL from 'assets/members/vasquezL.jpg';
import wongS from 'assets/members/wongS.jpg';
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
					img: sepulvedaD,
					lider: true,
					extra: 'Jefe de proyecto',
					email: 'diego.sepulvedas@utem.cl',
				},
				{
					name: 'Daniel Fredes Lizama',
					img: fredesD,
					lider: true,
					extra: 'Líder de desarrollo',
					email: 'daniel.fredesl@utem.cl',
				},
				{
					name: 'Mathias Cáceres',
					img: caceresM,
					lider: true,
					extra: 'Líder de investigación',
					email: 'mathias.caceresb@utem.cl',
				},
				{
					name: 'Israel Ramirez',
					img: ramirezI,
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
					img: andrewsN,
					lider: false,
					extra: '',
					email: 'nicolas.andrewss@utem.cl',
				},
				{
					name: 'Daniel Cajas',
					img: cajasD,
					lider: false,
					extra: '',
					email: 'daniel0cajas@gmail.com',
				},
				{
					name: 'Rodrigo Carmona',
					img: carmonaR,
					lider: false,
					extra: '',
					email: 'rodrigo.carmonar@utem.cl',
				},
				{
					name: 'Hector Carter',
					img: carterH,
					lider: false,
					extra: '',
					email: 'hector.carterc@utem.cl',
				},
				{
					name: 'Byron Diaz',
					img: diazB,
					lider: false,
					extra: '',
					email: 'byron.diazj@utem.cl',
				},
				{
					name: 'Miguel Gallardo',
					img: gallardoM,
					lider: false,
					extra: '',
					email: 'Miguel.and.gallardo@gmail.com',
				},
				{
					name: 'Allan Morales',
					img: moralesA,
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
					img: romanH,
					lider: false,
					extra: '',
					email: 'humberto.romanm@utem.cl',
				},
				{
					name: 'Lester Vásquez',
					img: vasquezL,
					lider: false,
					extra: '',
					email: 'lester.vasquezr@utem.cl',
				},
				{
					name: 'Shu-yi Wong',
					img: wongS,
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
					img: perezS,
					lider: false,
					extra: 'El pixula',
					email: 'sebastian.perezb@utem.cl',
				},
				{
					name: 'Luis Felipe Jaña',
					img: janaL,
					lider: false,
					extra: '',
					email: 'luis.janag@utem.cl',
				},
				{
					name: 'Juan Avendaño',
					img: avendanoJ,
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
					img: alisteR,
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
					img: barcazaG,
					lider: false,
					extra: '',
					email: 'gonzalo.barcazat@utem.cl',
				},
				{
					name: 'Lucas Carmona',
					img: carmonaL,
					lider: false,
					extra: '',
					email: 'lucas.carmonam@utem.cl',
				},
				{
					name: 'José Carvallo',
					img: carvalloJ,
					lider: false,
					extra: '',
					email: 'JoseCarvalloxc@outlook.cl',
				},
				{
					name: 'Cristian Flores',
					img: floresC,
					lider: false,
					extra: '',
					email: 'cristian.floresa@utem.cl',
				},
				{
					name: 'Felipe Flores',
					img: floresF,
					lider: false,
					extra: '',
					email: 'fuerte.felipe@gmail.com',
				},
				{
					name: 'Yerko Foncea',
					img: fonceaY,
					lider: false,
					extra: 'https://i.imgur.com/iwsOCDp.jpg',
					email: 'yerko.fonceac@utem.cl',
				},
				{
					name: 'Javier Gálves',
					img: galvesJ,
					lider: false,
					extra: '',
					email: 'javier.galvezg@utem.cl',
				},
				{
					name: 'Sebastian Garrido',
					img: garridoS,
					lider: false,
					extra: '',
					email: 'sebastian.garridov@utem.cl',
				},
				{
					name: 'Mohamed Gorayeb',
					img: gorayebM,
					lider: false,
					extra: '',
					email: 'mohamed.gorayebm@utem.cl',
				},
				{
					name: 'Benjamín Martinez',
					img: martinezB,
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
					img: perezI,
					lider: false,
					extra: '',
					email: 'ivan.perez.alarcon@utem.cl',
				},
				{
					name: 'Daniel Sisinni',
					img: sisinniD,
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
