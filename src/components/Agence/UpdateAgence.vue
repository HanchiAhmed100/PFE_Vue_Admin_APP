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
                                    <h5 class="title">Modifier l'espace  : {{ Nom }}</h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Nom de l'espace TT : </label>
                                            <input type="text" class="form-control" placeholder="Nom" v-model="Nom" >
                                        </div>
                                        </div>
                                        <div class="col-md-6 pl-md-1">
                                            <div class="form-group">
                                                <label>Type</label>
                                                <select type="text" class="form-control" v-model="Region">
                                                    <option>Espace TT</option>  
                                                    <option>Franchise</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Service TT :</label>

                                            <select type="text" class="form-control" v-model="Service">
                                                <option v-for="s in Services" :key="s.id" :value="s.id">{{ s.nom }}</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address</label>
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
                                        md-title="Modifier L'espace "
                                        :md-content="'Vous voulez Modifier le Service <strong> '+ Nom +'.'"
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
    name : 'UpdateAgence',
    data () {
        return {
            Services : [],
            Service : '',
            Agence : [],
            Agence_id : this.$route.params.id,
            Nom : '',
            Region :'',
            Adresse : '',
            societe_id : '',
            Loading : false,
            active : false,
            error : '',
            active : false
        }
    },
    components : {
        Menu,
        NavBar,
    },
    async mounted () {
        this.Loading = true 
        await axios.get('http://localhost:3000/Api/Dashboard/agences/'+this.Agence_id) 
        .then((res) =>{
            this.Agence = res.data.agence
            this.Nom = this.Agence[0].nom
            this.Region = this.Agence[0].region
            this.Adresse = this.Agence[0].Adresse
            
        })
        .catch((err) =>{
            this.error = 'Erreur'
        })
        await axios.get('http://localhost:3000/Api/Dashboard/service')
        .then((res) => {
            this.Services = res.data.service
        })
        .catch((err) => {
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
            if( this.nom == '' || this.Adresse == '' || this.Region =='' || this.Service == ''){
                this.$notify({
                    group: 'foo',
                    title: 'Message',
                    duration : 7000,
                    type : 'error',
                    text: 'Les Champs sont obligatoire ! ', 
                });
            }else{
                await axios.put('http://localhost:3000/Api/Dashboard/agence/'+this.Agence_id,{
                    nom : this.Nom,
                    Adresse : this.Adresse,
                    region : this.Region,
                    societe_id : this.Service
                }) 
                .then((res) =>{

                    if(res.data.agence == "UPDATED"){
                        this.$notify({
                            group: 'foo',
                            title: 'Message',
                            duration : 7000,
                            text: 'Espace à été Mise à jour', 
                        });
                        this.$router.push('/Agence')
                    }
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
