<template>
    <div>
        <div class="wrapper">
            <Menu></Menu>
            <div class="main-panel">
                <NavBar></NavBar>
                <div class="content">
                    <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>
                        <div class="row" v-if="!Loading">
                            <div class="col-12">
                                <div class="card uk-padding">
                                    <h4>Recherche Par : </h4>
                                    <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                        <label><input class="uk-radio" type="radio" value="date" v-model="radio" name="radio2"> Date</label><span class="uk-margin-right"> ➤</span> 
                                        <label><input class="uk-radio" type="radio" value="region" v-model="radio" name="radio2" checked> Region</label><span class="uk-margin-right"> ➤</span>
                                        <label><input class="uk-radio" type="radio" value="type" v-model="radio" name="radio2"> Type de reseau</label><span class="uk-margin-right"> ➤</span>
                                        <label><input class="uk-radio" type="radio" value="espace" v-model="radio" name="radio2"> Nom de l'espace</label><span class="uk-margin-right"> ➤</span>
                                        <label><input class="uk-radio" type="radio" value="agent" v-model="radio" name="radio2"> Nom de l'agent </label>
                                    </div>
                                    <div class="row" v-if="radio == 'region'">
                                        <div class="col-6">
                                            <md-field>
                                            <label>Region </label>
                                                <md-input v-model="region"></md-input>
                                            </md-field>
                                            <div class="row">
                                                <div class="col-3">
                                                    <md-button class=" uk-margin md-dense md-raised md-primary" v-on:click="FiltreRegion()">Valider</md-button>
                                                </div>
                                                <div class="col-3">
                                                    <md-button v-if="load" class="md-dense md-raised md-primary uk-modal-close " v-on:click="loads()">                                                
                                                        <i class=" tim-icons icon-refresh-02"></i>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="radio == 'type'">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <md-field>
                                                <label for="movie">Type</label>
                                                    <md-select v-model="Type" name="Type" id="Type">
                                                        <md-option value="Franchise">Franchise</md-option>
                                                        <md-option value="Espace TT">Espace TT</md-option>
                                                    </md-select>
                                                    </md-field>

                                                <div class="row">
                                                    <div class="col-3">
                                                        <md-button class=" uk-margin md-dense md-raised md-primary" v-on:click="FiltreType()">Valider</md-button>
                                                    </div>
                                                    <div class="col-3">
                                                        <md-button v-if="load" class="md-dense md-raised md-primary uk-modal-close " v-on:click="loads()">                                                
                                                            <i class=" tim-icons icon-refresh-02"></i>
                                                        </md-button>
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="radio == 'espace'">
                                        <div class="col-6">
                                            <md-field>
                                            <label>Nom de l'espace </label>
                                                <md-input v-model="espace"></md-input>
                                            </md-field>
                                            <div class="row">
                                                <div class="col-3">
                                                    <md-button class=" uk-margin md-dense md-raised md-primary" v-on:click="FiltreEspace()">Valider</md-button>
                                                </div>
                                                <div class="col-3">
                                                    <md-button v-if="load" class="md-dense md-raised md-primary uk-modal-close " v-on:click="loads()">                                                
                                                        <i class=" tim-icons icon-refresh-02"></i>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="radio == 'agent'">
                                        <div class="col-6">
                                            <md-field>
                                            <label>Nom de l'agent </label>
                                                <md-input v-model="agent"></md-input>
                                            </md-field>
                                            <div class="row">
                                                <div class="col-3">
                                                    <md-button class=" uk-margin md-dense md-raised md-primary" v-on:click="FiltreAgent()">Valider</md-button>
                                                </div>
                                                <div class="col-3">
                                                    <md-button v-if="load" class="md-dense md-raised md-primary uk-modal-close " v-on:click="loads()">                                                
                                                        <i class=" tim-icons icon-refresh-02"></i>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                    <div class="row" v-if="radio == 'date'">
                                        <div class="col-6">
                                            <div class="md-layout">
                                                <div class="md-layout-item">
                                                    <md-datepicker v-model="DateDebut">
                                                        <label>Date du debut</label>
                                                    </md-datepicker>
                                                </div>
                                                <div class="md-layout-item">
                                                    <md-datepicker v-model="DateFin">
                                                        <label>Date de la fin</label>
                                                    </md-datepicker>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <md-button class=" uk-margin md-dense md-raised md-primary" v-on:click="Filtredates()">Valider</md-button>
                                                </div>
                                                <div class="col-3">
                                                    <md-button v-if="load" class="md-dense md-raised md-primary uk-modal-close " v-on:click="loads()">                                                
                                                        <i class=" tim-icons icon-refresh-02"></i>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            
                            <div class="col-12">
                                    <span v-if="Dates" class="uk-margin uk-padding">{{this.Dates}}</span>
                                <div>
                                    <md-table  v-model="Tab" md-sort="region" md-sort-order="asc" md-card>
                                        <md-table-toolbar>
                                            <h1 class="md-title">Tableau des ticket servie local </h1>
                                        </md-table-toolbar>
                                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                                            <md-table-cell md-label="Region"  md-sort-by="region">{{ item.region }}</md-table-cell>
                                            <md-table-cell md-label="Type"  md-sort-by="rg">{{ item.rg }}</md-table-cell>
                                            <md-table-cell md-label="Nom de l'espace" md-sort-by="aname">{{ item.aname }}</md-table-cell>
                                            <md-table-cell md-label="Nom de l'agent" md-sort-by="username">{{ item.username }}</md-table-cell>
                                            <md-table-cell md-label="Date" >{{ item.datereservation }}</md-table-cell>
                                        </md-table-row>
                                    </md-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../Ui/NavBar.vue'
import Menu from '../Ui/Menu.vue'
import moment from 'moment'
import 'moment/locale/fr';

export default {
    name : 'Tabs',
    components : {
        NavBar,
        Menu,
        
    },
    data() {
        return {
            Loading : false,
            error : '',
            Tab : [],
            Tabfilter : null,
            DateDebut :null,
            DateFin: null,
            Dates : '',
            a : [],
            radio : '',
            region : '',
            Type : '',
            agent : '',
            espace : '',
            load : false


        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        
        async loadData(){
            this.Loading = true
            await axios.get('http://localhost:3000/Api/Dashboard/suivie')
            .then((res) => {
                this.Tab = res.data.Tab
                this.Tabfilter = res.data.Tab
            })
            .catch(err => this.error = err)
            for (let i = 0; i < this.Tab.length; i++) {
                this.Tab[i].datereservation = moment(this.Tab[i].datereservation).format('Do MMMM YYYY')
            }
            this.Loading = false
        },
        async Filtredates(){
            if(this.DateDebut == null || this.DateFin == null){
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        type : 'error',
                        text: 'Date debut et fin de recherches sont obligatoires ! ', 
                    });
                    this.msg = true
            }else{
                this.load = true
                await axios.post('http://localhost:3000/Api/Dashboard/fullFilterTab',{
                   dateDebut : this.DateDebut,
                   dateFin : this.DateFin
                })
                .then(res => this.Tab = res.data.Tab)
                .catch(err => this.error = err)
                for (let i = 0; i < this.Tab.length; i++) {
                    this.Tab[i].datereservation = moment(this.Tab[i].datereservation).format('Do MMMM YYYY')
                }
                this.Dates = " De "+moment(this.DateDebut).format('Do MMMM YYYY')+" jusqu'au "+moment(this.DateFin).format('Do MMMM YYYY')+""

                this.Loading = false
            }
        },
        initialTable(){
            this.Tabfilter = null
            this.Dates = ''
        },
        FiltreRegion(){
            this.Loading = true
            this.a = this.Tab
            this.Tab = this.Tab.filter(Tab => {
                return Tab.region.toLowerCase().includes(this.region.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        FiltreType(){
            this.Loading = true
            this.a = this.Tab
            this.Tab = this.Tab.filter(Tab => {
                return Tab.rg.toLowerCase().includes(this.Type.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        FiltreAgent(){
            this.Loading = true
            this.a = this.Tab
            this.Tab = this.Tab.filter(Tab => {
                return Tab.username.toLowerCase().includes(this.agent.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        FiltreEspace(){
            this.Loading = true
            this.a = this.Tab
            this.Tab = this.Tab.filter(Tab => {
                return Tab.aname.toLowerCase().includes(this.espace.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        loads(){
            if(this.a == null){
            }else{  
                this.Tab = this.Tabfilter
                this.load = false
            }
        }
    },
}
</script>

<style>

</style>
