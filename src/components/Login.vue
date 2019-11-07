<template>
  <div class=" uk-padding-large uk-height-viewport gradient">
    <div class="uk-position-center" v-if="loading">
      <span uk-spinner="ratio: 6"></span>
    </div>
    <div class="uk-flex uk-flex-center" v-if="!loading">
      <md-card class="uk-card uk-card-default uk-margin uk-padding" md-with-hover>
        <md-ripple>
          <md-card-media md-ratio="4:3">
            <img src="../assets/logo.png" alt="Tunisie Telecome">
          </md-card-media>
          <md-card-header>
           
          </md-card-header>

          <md-card-content>
            <md-field>
              <label>Adresse mail</label>
              <md-input v-model="email"></md-input>
            </md-field>
            <md-field>
              <label>Mot de passe</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>

            <span v-if="error" class="uk-text-danger uk-flex uk-flex-center" >{{error}}</span>
          </md-card-content>
          <div class="uk-flex uk-flex-center">
            <md-button class="md-dense md-raised md-primary" v-on:click="login">Valider</md-button>
          </div>
        </md-ripple>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'Login',
    components : {

    },
    data () {
        return {
          email : '',
          password : '',
          error : '', 
          user : '',
          loading : false
        }
    },
    methods : {
      async login (){
        this.loading = true
        if(this.email == '' || this.password == ''){
          this.error = 'champs obligatoire !'
        }
        else{
          axios.post('http://localhost:3000/Api/Auth/Login',{      
            email : this.email,
            password : this.password
          })
          .then(res => {
            if(res.data.failed){
              this.error = res.data.failed
            }
            if(res.data.Admin){
              localStorage.id =  res.data.Admin.id;
              this.$router.push('dashboard') 
            }
          })
          .catch(err => {
            this.error = 'erreur de reseaux'
          })
        }
        this.email = this.password = ''
        this.loading = false
      }
    }

}
</script>

<style>
  .gradient{
      background-image: linear-gradient(35deg, #02aab0,#00cdac )
  }
</style>
