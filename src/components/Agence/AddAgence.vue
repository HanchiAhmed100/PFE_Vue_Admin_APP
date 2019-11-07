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
                                    <h5 class="title">Ajouter un Espace TT</h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Nom de l'espace : </label>
                                            <input type="text" class="form-control" placeholder="Nom" v-model="Nom" >
                                        </div>
                                        </div>
                                        <div class="col-md-6 pl-md-1">
                                            <div class="form-group">
                                                <label>Type : </label>
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
                                            <label>Region :</label>

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
                                    <button type="submit" class="btn btn-fill btn-primary" v-on:click="AddService">Valider</button>
                                </div>

                                    <md-dialog-alert
                                        :md-active.sync="alerte"
                                        md-title="Espace TT Ajouter"
                                        :md-content="'L\'espace  <strong> '+ Nom +' </strong> à été ajouter.'" 

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
    name : 'AddAgence',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Nom : '',
            Region : '',
            Service : '',
            Adresse :  '',
            admin_id : 1,
            alerte : false,
            Services : []

        }
    },
    async mounted () {
        this.loading = true,
        await axios.get('http://localhost:3000/Api/Dashboard/service')
        .then((res)=>{
            this.Services = res.data.service
        })
        .catch((err) =>{
            this.error = err
        })
        this.loading = false
    },
    methods: {
        async AddService () {
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
                await axios.post('http://localhost:3000/Api/Dashboard/agence',{
                    nom : this.Nom,
                    Adresse : this.Adresse,
                    region : this.Region,
                    societe_id : this.Service 
                })
                .then((res) =>{
                    if(res.data.agence == "INSERTED"){
                        this.alerte = true
                        this.Adresse = ''
                        this.region = ''
                    }   
                })
                .catch((err) =>{

                })
            }
            this.Loading = false
        },
    }
}
</script>

<style>

</style>
