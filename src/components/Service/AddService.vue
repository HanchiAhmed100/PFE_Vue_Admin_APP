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
                                    <h5 class="title">Ajouter une Region </h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Region : </label>
                                            <input type="text" class="form-control" placeholder="Nom" v-model="Nom" >
                                        </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address de la direction regional :</label>
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
                                        md-title="Region Ajouter"
                                        :md-content="'La region <strong> '+ Nom +' </strong> à été ajouter.'" 

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
    name : 'Service',
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
            Adresse :  '',
            admin_id : 1,
            alerte : false

        }
    },
    methods: {
        async AddService () {
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
                await axios.post('http://localhost:3000/Api/Dashboard/service',{
                    nom : this.Nom,
                    Adresse : this.Adresse,
                    region : this.Nom,
                    admin_id : this.admin_id 
                })
                .then((res) =>{
                    if(res.data.service == "INSERTED"){
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
