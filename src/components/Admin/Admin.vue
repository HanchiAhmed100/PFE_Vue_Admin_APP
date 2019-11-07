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
                                            Tableau des Adminstrateur
                                        <md-button class="md-dense md-raised md-primary uk-modal-close pull-right" v-on:click="Add()">
                                            Ajouter un Adminstrateur
                                        </md-button>
                                    </h4> 
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive noscroll">
                                        <table class="table tablesorter " id="">
                                            <thead class=" text-primary">
                                                <tr>
                                                    <th>Nom de l'administrateur</th>
                                                    <th>Prenom</th>
                                                    <th class="text-center">email</th>
                                                    <th class="text-center">Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="s in Admins" :key="s.id">
                                                    <td>{{s.nom}}</td>
                                                    <td>{{s.prenom}}</td> 
                                                    <td class="text-center">{{s.email}}</td>
                                                    <td class="text-center"><a><i class="tim-icons icon-simple-remove uk-margin-left" v-on:click="Remove(s.id,s.nom)"></i></a></td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <md-dialog-confirm
                                    :md-active.sync="active"
                                    md-title="Supprimer"
                                    :md-content="'Etes vous sur de vouloir supprimer l\'adminstrateur : '+Selected_name+' .'"
                                    md-confirm-text="Confirmer"
                                    md-cancel-text="Annuler"
                                    @md-cancel="onCancel"
                                    @md-confirm="onConfirm" 
                                />

                                <md-dialog-alert
                                    :md-active.sync="msg"
                                    md-title="Suppression impossible "
                                    :md-content="'Imposible de supprimer l\'Administrateur <strong> '+ Selected_name +' </strong> <br> cela peut engendrer des probleme dans les satistiques.'" 

                                />
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
export default {
    name : 'Admin',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Admins : [],
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
            await axios.delete('http://localhost:3000/Api/Auth/AdminInfo/'+this.Selected_id)
            .then((res) =>{
                if(res.data.AdminInfo == "DELETED"){
                    this.loadData()
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        text: 'Admin Supprimer', 
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
            await axios.get('http://localhost:3000/Api/Auth/AdminInfo')
            .then(res => this.Admins = res.data.AdminInfo)
            .catch(err => this.error = 'Erreur de reseau')
            this.Loading = false
        },
        Add(){
            this.$router.push('/AddAdmin')
        },
    },
}
</script>

<style>

</style>
