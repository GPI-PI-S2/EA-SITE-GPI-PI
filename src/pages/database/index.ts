import { StateInterface } from 'src/store';
import { Component, Vue, Watch } from 'vue-property-decorator';
import tableC from 'src/components/tableC';
@Component({
	components: { tableC },
})
export default class DatabasePage extends Vue {
	isLoading = false;
	realData = []
	
}
