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
                                        <label><input class="uk-radio" type="radio" value="region" v-model="radio" name="radio2" checked> Region</label><span class="uk-margin-right"> ➤</span>
                                        <label><input class="uk-radio" type="radio" value="type" v-model="radio" name="radio2"> Type de reseau</label><span class="uk-margin-right"> ➤</span>
                                        <label><input class="uk-radio" type="radio" value="espace" v-model="radio" name="radio2"> Nom de l'espace</label>
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
                                </div>
                            </div>
                            
                            <div class="col-12">
                                <div>
                                    <md-table  v-model="Tab" md-sort="region" md-card>
                                        <md-table-toolbar>
                                            <h1 class="md-title">Tableau Des Feedback </h1>
                                        </md-table-toolbar>
                                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                                            <md-table-cell md-label="Region"  md-sort-by="region">{{ item.region }}</md-table-cell>
                                            <md-table-cell md-label="Type" md-sort-by="rg">{{ item.rg }}</md-table-cell>
                                            <md-table-cell md-label="Nom de l'espace" md-sort-by="aname">{{ item.aname }}</md-table-cell>
                                            <md-table-cell md-label="Nom du client" md-sort-by="cname">{{ item.cname }} {{item.Prenom}} </md-table-cell>
                                            <md-table-cell md-label="Note" md-sort-by="nbStartRating">{{ item.nbStartRating }}</md-table-cell>
                                            <md-table-cell md-label="Commantaire" md-sort-by="description">{{item.description}} </md-table-cell>
                                            <md-table-cell md-label="Date">{{ item.dateFeedback }}</md-table-cell>
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
    name : 'Feedback',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Tab : [],
            Tabfilter : null,


            a : [],
            radio : '',
            region : '',
            Type : '',
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
            await axios.get('http://localhost:3000/Api/Dashboard/feeds')
            .then((res) => {
                this.Tab = res.data.Feed
                this.Tabfilter = res.data.Feed
            })
            .catch(err => this.error = err)
            for (let i = 0; i < this.Tab.length; i++) {
                this.Tab[i].dateFeedback = moment(this.Tab[i].dateFeedback).format('Do MMMM YYYY')
            }
            this.Loading = false
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
