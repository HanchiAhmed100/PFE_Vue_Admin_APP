<template>
    <div class="sidebar" data-color="blue" >
        <div class="sidebar-wrapper">
            <div class="logo">
                <span class="simple-text logo-normal text-center">
                    ADMIN TT
                </span>
            </div>
            <ul class="nav">
                <li>
                    <router-link to="/Dashboard" class="uk-margin-right">
                        <i class="tim-icons icon-chart-pie-36"></i>
                        <p>Statistique </p>  
                    </router-link>
                </li>


                <li>
                    <router-link to="/Reservation" class="uk-margin-right">
                        <i class="tim-icons icon-watch-time"></i>
                        <p>Passage a distance</p>  
                    </router-link>
                </li>
                <li>
                    <router-link to="/Direct" class="uk-margin-right">
                        <i class="tim-icons icon-notes "></i>
                        <p>Pasage a local</p>  
                    </router-link>
                </li>

                <li>
                    <router-link to="/Feedback" class="uk-margin-right">
                        <i class="tim-icons icon-shape-star"></i>
                        <p>Les Feedback </p>
                    </router-link>
                </li>

                <li>
                    <br>
                    <hr class="uk-divider-small uk-text-center"  />
                </li>
                <li>
                    <router-link to="/Service" class="uk-margin-right">
                        <i class="tim-icons icon-bank"></i>
                        <p>region </p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/Agence" class="uk-margin-right">
                        <i class="tim-icons icon-laptop"></i>
                        <p>Reseau direct </p>
                    </router-link>
                </li>
                
                <li>
                    <router-link to="/Guichet" class="uk-margin-right">
                        <i class="tim-icons icon-badge"></i>
                        <p>Les guichets </p>
                    </router-link>
                </li>
                <li>
                    <br>
                    <hr class="uk-divider-small uk-text-center"  />
                </li>
                <li>
                    <router-link to="/Admin" class="uk-margin-right">
                        <i class="tim-icons icon-lock-circle"></i>
                        <p>Administrateurs
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
        

    </div>
</template>
<script>

export default {
    name : 'Menu',
    data() {
        return {
            active : false,
            loginId : ''
        }

    },mounted () {
        if(localStorage.id){
            this.LoginId =  localStorage.id
        }else{
            this.$router.push('/')
        }
    }
    
}
</script>
<style>

</style>
