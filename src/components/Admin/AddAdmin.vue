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
                                    <h5 class="title">Ajouter un administrateur</h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Nom : </label>
                                            <input type="text" class="form-control" placeholder="nom" v-model="nom" >
                                        </div>
                                        </div>
                                      <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Prenom : </label>
                                            <input type="text" class="form-control" placeholder="prenom" v-model="prenom" >
                                        </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>Adresse mail : </label>
                                            <input type="text" class="form-control" placeholder="Adresse mail" v-model="mail" >
                                        </div>
                                        </div>
                                      <div class="col-md-6 pr-md-1">
                                        <div class="form-group">
                                            <label>mot de passe :</label>
                                            <input type="password" class="form-control" placeholder="mot de passe" v-model="password" >
                                        </div>
                                        </div>
                                    </div>
                                    


                                </div>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-fill btn-primary" v-on:click="AddAdmin">Valider</button>
                                </div>

                                    <md-dialog-alert
                                        :md-active.sync="alert"
                                        md-title="Administrateur Ajouter"
                                        :md-content="'L\'administrateur  <strong> '+ nom +' </strong> à été ajouter.'" 

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
    name : 'AddAdmin',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            alert : false,
            error : '',
            nom : '',
            prenom :'',
            mail : '',
            password : ''

        }
    },

    methods: {
        async AddAdmin() {
            this.Loading = true
            await axios.post('http://localhost:3000/Api/Auth/Register',{
                nom : this.nom,
                prenom : this.prenom,
                email : this.mail,
                password : this.password
            })
            .then((res)=>{
                this.alert = true
                this.prenom = this.mail = this.password = ""
            })
            .catch((err) => this.error = err)
            this.Loading = false
        },
    }
}
</script>

<style>

</style>
