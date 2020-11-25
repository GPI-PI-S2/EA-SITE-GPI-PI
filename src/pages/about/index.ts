import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AboutPage extends Vue {
    infoExpansion = [
        {title: '¿Quienes somos?', icon:'mdi-information-outline', caption: '', cardContent: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        {title: 'Integrantes', icon:'mdi-account-group', caption: 'Estudiantes', cardContent: ''},
        {title: 'Sobre la aplicación', icon:'mdi-application', caption: '', cardContent: ''}
    ]

    // emol y reddit lim comments
    toggle=false;
}
