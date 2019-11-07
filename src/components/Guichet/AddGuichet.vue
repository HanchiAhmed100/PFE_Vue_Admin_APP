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
                                    <h5 class="title">Ajouter un Agent </h5>
                                </div>
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6 pr-md-1">
                                            <div class="form-group">
                                                <label>Nom :  </label>
                                                <input type="text" class="form-control" placeholder="Nom" v-model="Nom" >
                                            </div>
                                        </div>
                                        <div class="col-md-6 pr-md-1">
                                            <div class="form-group">
                                                <label>Prenom : </label>
                                                <input type="text" class="form-control" placeholder="Nom" v-model="Prenom" >
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Service TT :</label>
                                            <select type="text" class="form-control" v-model="Service" v-on:change="changed">
                                                <option v-for="s in Services" :key="s.id" :value="s.id">{{ s.nom }}</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Agence TT :</label>
                                            <select type="text" class="form-control" v-model="agence">
                                                <option v-for="a in agences" :key="a.id" :value="a.id">{{ a.nom }}</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Numero du guichet :</label>
                                            <select type="text" class="form-control" v-model="num">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Mot de passe de l'agent : </label>
                                            <input type="password" class="form-control" placeholder="Mot de passe" v-model="password">
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-fill btn-primary" v-on:click="AddGuichet">Valider</button>
                                </div>

                                    <md-dialog-alert
                                        :md-active.sync="alerte"
                                        md-title="Agent TT Ajouter"
                                        :md-content="'L\'agent  <strong> '+ Nom +' </strong> à été ajouter.'" 

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
    name : 'AddGuichet',
    components : {
        NavBar,
        Menu
    },
    data() {
        return {
            Loading : false,
            error : '',
            Nom : '',
            Prenom : '',
            Region : '',
            alerte : false,
            Service : '',
            Services : [],
            agences : [],
            agence : '',
            num : '',
            password : ''

        }
    },
    async mounted () {
        this.Loading = true,
        await axios.get('http://localhost:3000/Api/Dashboard/service')
        .then((res)=>{
            this.Services = res.data.service
        })
        .catch((err) =>{
            this.error = err
        })
        this.Loading = false
    },
    methods: {
        async AddGuichet () {
            this.Loading = true
            let fullname = this.Nom+this.Prenom+""
            let username = this.Nom+" "+this.Prenom+""
            if( this.username == '' || this.agence_id == '' || this.num =='' || this.password == ''){
                this.$notify({
                    group: 'foo',
                    title: 'Message',
                    duration : 7000,
                    type : 'error',
                    text: 'Les Champs sont obligatoire ! ', 
                });
            }else{                
                await axios.post('http://localhost:3000/Api/Dashboard/guichet',{
                    username : username,
                    fullname : fullname,
                    agence_id : this.agence,
                    num : this.num,
                    password : this.password 
                })
                .then((res) =>{
                    if(res.data.guichet == "INSERTED"){
                        this.alerte = true
                        this.Nom = ''
                        this.Prenom = ''
                        this.password = ''
                        this.num = ''
                    }   
                })
                .catch((err) =>{

                })
            }

            this.Loading = false
        },
        async changed(){
            this.Loading = true
            await axios.get('http://localhost:3000/Api/Dashboard/agence/'+this.Service)
            .then(res =>{
                if(res.data.agence){
                  this.agences = res.data.agence  
                }
            })
            this.Loading = false
        }
    }
}
</script>

<style>

</style>
