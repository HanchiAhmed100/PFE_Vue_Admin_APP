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
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="title">Modifier la region TT</h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Region : </label>
                                            <input type="text" class="form-control" placeholder="Nom" v-model="Nom" >
                                        </div>
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address de la direction regional  </label>
                                            <input type="text" class="form-control" placeholder="Address" v-model="Adresse">
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-fill btn-primary" v-on:click="updateService">Valider</button>
                                </div>

                                    <md-dialog-confirm
                                        :md-active.sync="active"
                                        md-title="Modifier la region"
                                        :md-content="'Vous voulez Modifier la region <strong> '+ Nom +'.'"
                                        md-confirm-text="Valider"
                                        md-cancel-text="Annuler"
                                        @md-cancel="onCancel"
                                        @md-confirm="onConfirm"
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
import Menu from '../Ui/Menu.vue'
import NavBar from '../Ui/NavBar.vue'
export default {
    name : 'UpdateService',
    data () {
        return {

            Service : [],
            Service_id : this.$route.params.id,
            Nom : '',
            Region :'',
            Adresse : '',
            Admin_id : '1',
            Loading : false,
            active : false,
            error : '',
        }
    },
    components : {
        Menu,
        NavBar,
    },
    async mounted () {
        this.Loading = true 
        await axios.get('http://localhost:3000/Api/Dashboard/service/'+this.Service_id) 
        .then((res) =>{
            this.Service = res.data.service
            this.Nom = this.Service[0].nom
            this.Region = this.Service[0].region
            this.Adresse = this.Service[0].Adresse
        })
        .catch((err) =>{
            this.error = 'Erreur'
        })
        this.Loading = false   
    },
    methods: {

        updateService (){
            this.active = true
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
        async onConfirm (){
            this.Loading = true
            if( this.nom == '' || this.Adresse == '' || this.region =='' || this.admin_id == ''){
                this.$notify({
                    group: 'foo',
                    title: 'Message',
                    duration : 7000,
                    type : 'error',
                    text: 'Les Champs sont obligatoire ! ', 
                });
            }else{
                await axios.put('http://localhost:3000/Api/Dashboard/service/'+this.Service_id,{
                    id : this.Service_id,
                    nom : this.Nom,
                    Adresse : this.Adresse,
                    region : this.Nom,
                    admin_id : this.Admin_id
                }) 
                .then((res) =>{
                    this.Service = res.data.service
                    this.$notify({
                        group: 'foo',
                        title: 'Message',
                        duration : 7000,
                        text: 'region à été Mise à jour', 
                    });
                    this.$router.push('/Service')
                })
                .catch((err) =>{
                    this.error = 'Erreur'
                })
            }
            this.Loading = false  
        }
    }
}
</script>

<style>

</style>
