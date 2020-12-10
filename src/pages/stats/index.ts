import { Vue, Component} from 'vue-property-decorator';
import tableC from 'src/components/tableC';
@Component({
	components: { tableC },
})
export default class statsPage extends Vue {
    isLoading=true
    realData: StatsPage.data[] = []
    async getContribTable(){
        await fetch('https://www.gpi.valdomero.live/contributions.json',{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=> response.json())
        .then((data) => {
            JSON.parse(JSON.stringify(data), (email: string,contribs: number) => {
                if (email!=''){   
                    this.realData.push({
                        email: email,
                        contribuciones: contribs
                    })
                }
                
            })
            this.isLoading=false
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    mounted(){
        void this.getContribTable()
    }
}
export namespace StatsPage{
    export interface data{
        email:string,
        contribuciones: number
    }
}