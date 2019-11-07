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
                                            Tableau des Espaces  TT 

                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="Add()">
                                            Ajouter un Espace
                                        </md-button>
                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="reload()" uk-toggle="target: #RechercheEsp">
                                            <i class="tim-icons icon-zoom-split"></i>
                                        </md-button>

                                        <md-button  v-if="load" class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="loads()">                                                
                                            <i class=" tim-icons icon-refresh-02"></i>
                                        </md-button>

                                    </h4> 
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive noscroll">
                                        <table class="table tablesorter " id="">
                                            <thead class=" text-primary">
                                                <tr>
                                                    <th>Nom de l'espace</th>
                                                    <th>Type</th>
                                                    <th class="text-center">Adresse</th>
                                                    <th class="text-center">Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="s in Espace" :key="s.id">
                                                    <td>{{s.nom}}</td>
                                                    <td>{{s.region}}</td> 
                                                    <td class="text-center">{{s.Adresse}}</td>
                                                    <td class="text-center"><router-link :to="'/UpdateAgence/'+s.id"><i class="tim-icons icon-pencil"></i></router-link>  <a><i class="tim-icons icon-simple-remove uk-margin-left" v-on:click="Remove(s.id,s.nom)"></i></a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <md-dialog-confirm
                                    :md-active.sync="active"
                                    md-title="Supprimer"
                                    :md-content="'Etes vous sur de vouloir supprimer le Espace : '+Selected_name+' .'"
                                    md-confirm-text="Confirmer"
                                    md-cancel-text="Annuler"
                                    @md-cancel="onCancel"
                                    @md-confirm="onConfirm" 
                                />

                                <md-dialog-alert
                                    :md-active.sync="msg"
                                    md-title="Suppression impossible "
                                    :md-content="'Imposible de supprimer l\'espace <strong> '+ Selected_name +' </strong> <br> cela peut engendrer des probleme dans les satistiques.'" 

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
        <div id="RechercheEsp" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <h5> <i class="tim-icons icon-zoom-split"></i> Recherche Espace</h5>
                <md-field>
                <label>Nom de l'espace TT</label>
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
    name : 'Agence',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Espace : [],
            Selected_id : '',
            Selected_name : '',
            active : false,
            msg : false,
            nom :'',
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
            await axios.delete('http://localhost:3000/Api/Dashboard/agence/'+this.Selected_id)
            .then((res) =>{
                if(res.data.agence == "DELETED"){
                    this.loadData()
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        text: 'Espace Supprimer', 
                    });
                }
                if(res.data.agence.code && res.data.agence.errno){
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        type : 'error',
                        text: 'suppression impossible ', 
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
            await axios.get('http://localhost:3000/Api/Dashboard/agence')
            .then(res => this.Espace = res.data.agence)
            .catch(err => this.error = 'Erreur de reseau')
            this.Loading = false
        },
        search(){
            this.Loading = true
            this.a = this.Espace
            this.Espace = this.Espace.filter(Espace => {
                return Espace.nom.toLowerCase().includes(this.nom.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        reload(){
            if(this.a == null){
            }else{  
                this.Espace = this.a
            }
        },
        Add(){
            this.$router.push('/AddAgence')
        },
        loads(){
            this.Espace = this.a
        }
    },
}
</script>

<style>

</style>
