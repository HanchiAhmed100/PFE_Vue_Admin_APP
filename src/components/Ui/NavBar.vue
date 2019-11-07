<template>
    <div>
            <md-dialog-confirm
                :md-active.sync="show"
                md-title="Deconnexion"
                md-content="Etes vous sur de vouloir quitter cette page"
                md-confirm-text="Valider"
                md-cancel-text="Annuler"
                @md-cancel="onCancel"
                @md-confirm="onConfirm"
            />
        <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <div class="navbar-toggle d-inline">
                        <button type="button" class="navbar-toggler">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <span class="navbar-brand">Tableau de bord   ➤   {{this.$route.name}}   </span>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                </button>
                <div class="collapse navbar-collapse" id="navigation">
                    <ul class="navbar-nav ml-auto">
                        <li class="search-bar input-group">

                        </li>
                    </ul>
                </div>
            </div>

        </nav>
      <div class="deconnect" v-on:click="dexs()" >
        <md-tooltip md-direction="top">Deconnexion</md-tooltip> 
        <i class="tim-icons icon-button-power" ></i>
      </div>
    </div>
</template>

<script>

export default {
    name : 'NavBar',
    data() {
        return {
            show : false,
        }

    },mounted () {
        if(localStorage.id){
            this.LoginId =  localStorage.id
        }else{
            this.$router.push('/')
        }
    },
    methods : {
        dexs(){
            this.show = true
        },
        onConfirm (){
            localStorage.clear()
            this.$router.push('/')
        },
        onCancel(){
            this.show = false
        }  
    }
}
    
</script>

<style>

</style>
