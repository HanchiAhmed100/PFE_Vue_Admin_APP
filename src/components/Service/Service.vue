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
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        Tableau des region TT 

                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="Add()">
                                            Ajouter une region
                                        </md-button>
                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="reload()" uk-toggle="target: #RechercheSer">
                                            <i class="tim-icons icon-zoom-split"></i>
                                        </md-button>

                                        <md-button  v-if="load" class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="loads()">                                                
                                            <i class=" tim-icons icon-refresh-02"></i>
                                        </md-button>

                                    </h4> 
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table tablesorter " id="">
                                            <thead class=" text-primary">
                                                <tr>
                                                    <th>Region : </th>
                                                    <th class="text-center">Adresse</th>
                                                    <th class="text-center">Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="s in Service" :key="s.id">
                                                    <td>{{s.nom}}</td>
                                                    <td class="text-center">{{s.Adresse}}</td>
                                                    <td class="text-center"><router-link :to="'/UpdateService/'+s.id"><i class="tim-icons icon-pencil"></i></router-link>  <a><i class="tim-icons icon-simple-remove uk-margin-left" v-on:click="Remove(s.id,s.nom)"></i></a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <md-dialog-confirm
                                    :md-active.sync="active"
                                    md-title="Supprimer"
                                    :md-content="'Etes vous sur de vouloir supprimer la region : '+Selected_name+' .'"
                                    md-confirm-text="Confirmer"
                                    md-cancel-text="Annuler"
                                    @md-cancel="onCancel"
                                    @md-confirm="onConfirm" />



                                <md-dialog-alert
                                    :md-active.sync="msg"
                                    md-title="Suppression impossible "
                                    :md-content="'Imposible de supprimer l\'agence <strong> '+ Selected_name +' </strong> <br> cela peut engendrer des probleme dans les satistiques.'" 
                                />


                            </div>

                        </div>
                    </div>
                </div>
            </div>        
        </div>
        <div id="RechercheSer" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <h5> <i class="tim-icons icon-zoom-split"></i> Recherche region</h5>
                <md-field>
                <label>Nom du region TT</label>
                    <md-input v-model="nom"></md-input>
                </md-field>
                <div class="uk-flex uk-flex-left">
                    <md-button class="md-dense md-raised md-primary uk-modal-close" v-on:click="search()">Valider</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../Ui/NavBar.vue'
import Menu from '../Ui/Menu.vue'
export default {
    name : 'Service',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Service : [],
            Selected_id : '',
            Selected_name : '',
            active : false,
            msg : false ,
            nom : '',
            a: null,
            load : false,
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        Remove (id , name){
            this.Selected_id = id
            this.Selected_name = name 
            this.active = true
        },
        async onConfirm () {
            this.Loading = true
            await axios.delete('http://localhost:3000/Api/Dashboard/service/'+this.Selected_id)
            .then((res) =>{
                if(res.data.service == "DELETED"){
                    this.loadData()
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        text: 'Service Supprimer', 
                    });
                }
                if(res.data.service.code && res.data.service.errno){
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        type : 'error',
                        text: 'Suppression impossible ', 
                    });
                    this.msg = true
                }
            })
            .catch(err => {
                this.error = 'Erreur'
            })
            this.Loading = false
        },
        onCancel () {
            this.$notify({
                group: 'foo',
                title: 'Message',
                duration : 7000,
                type: 'warn',
                text: 'Modification Annuler', 
            });
        },
        async loadData(){
            this.Loading = true
            await axios.get('http://localhost:3000/Api/Dashboard/service')
            .then(res => this.Service = res.data.service)
            .catch(err => this.error = 'Erreur de reseau')
            this.Loading = false
        },
        search(){
            this.Loading = true
            this.a = this.Service
            this.Service = this.Service.filter(Service => {
                return Service.nom.toLowerCase().includes(this.nom.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        reload(){
            if(this.a == null){
            }else{  
                this.Service = this.a
            }
        },
        Add(){
            this.$router.push('/AddService')
        },
        loads(){
            this.Service = this.a
        }
    },
}
</script>

<style>

</style>
