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
                                            Tableau des Agents des guichets TT 

                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="Add()">
                                            Ajouter un agent
                                        </md-button>
                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="reload()" uk-toggle="target: #Recherche">
                                            <i class="tim-icons icon-zoom-split"></i>
                                        </md-button>

                                        <md-button  v-if="load" class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="loads()">                                                
                                            <i class=" tim-icons icon-refresh-02"></i>
                                        </md-button>

                                    </h4>      
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table tablesorter">
                                            <thead class=" text-primary">
                                                <tr>
                                                    <th>Nom du agent</th>
                                                    <th>Nom de l'agence</th>
                                                    <th>Type</th>
                                                    <th>Numero du guichet </th>
                                                    <th class="text-center">Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="a in Agents" :key="a.id">
                                                    <td>{{a.username}}</td>
                                                    <td>{{a.nom}}</td>
                                                    <td>{{a.region}}</td>
                                                    <td>{{a.num}}</td> 
                                                    <td class="text-center"><router-link :to="'/UpdateGuichet/'+a.id"><i class="tim-icons icon-pencil"></i></router-link>  <a><i class="tim-icons icon-simple-remove uk-margin-left" v-on:click="Remove(a.id,a.username,a.nom)"></i></a></td>
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


        <div id="Recherche" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <h5> <i class="tim-icons icon-zoom-split"></i> Recherche Agent</h5>
                <md-field>
                <label>Nom de l'agent TT</label>
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
    name : 'Guichet',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Agents : [],
            a: null,
            load : false,
            Selected_id : '',
            Selected_name : '',
            Selected_agence : '',
            active : false,
            msg : false,
            nom : ''
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData(){
            this.Loading = true
            await axios.get('http://localhost:3000/Api/Dashboard/Agents')
            .then(res => this.Agents = res.data.agents)
            .catch(err => this.error = 'Erreur de reseau')
            this.Loading = false
        },
        Remove (id , name , agence){
            this.Selected_id = id
            this.Selected_name = name
            this.Selected_agence = agence
            this.active = true
        },
        async onConfirm () {
            this.Loading = true
            await axios.delete('http://localhost:3000/Api/Dashboard/guichet/'+this.Selected_id)
            .then((res) =>{
                if(res.data.guichet == "DELETED"){
                    this.loadData()
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        text: 'Agent Supprimer', 
                    });
                }
                if(res.data.guichet.code && res.data.guichet.errno){
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
        search(){
            this.Loading = true
            this.a = this.Agents
            this.Agents = this.Agents.filter(Agents => {
                return Agents.username.toLowerCase().includes(this.nom.toLowerCase())
            })
            this.nom = ''
            this.load = true
            this.Loading = false
        },
        reload(){
            if(this.a == null){
            }else{  
                this.Agents = this.a
            }
        },
        Add(){
            this.$router.push('/AddGuichet')
        },
        loads(){
            this.Agents = this.a
        }
    },
}
</script>
<style>

</style>
