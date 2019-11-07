<template>
    <div class="card card-chart" style="height : 300px">
        <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>

        <div class="card-header" v-if="!Loading">
            <div class="row">
                <div class="col-sm-6 text-left">
                    <h4 class="card-category uk-text-large">Nombre total des reservations par Espace TT  : <span class="uk-badge">{{length}} </span> </h4>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="chart-area">
                <div class="chart-container" style="position: relative; height:100%; width:100%">
                    <canvas id="my-chart" > </canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios'

export default {
    name : 'LandingChat',
    data () {
        return {
            Loading : '',
            error : '',
            Stats : [],
            length : 0
        }
    },

    async mounted () {

        this.Loading = true,
        
        await axios.get('http://localhost:3000/Api/Dashboard/LandingChart')
        .then((res)=>{
            this.Stats = res.data.stat
        })
        .catch((err) =>{
            this.error = err
        })

        let labels = []
        let data = []
        let color = []
        let border = []
        for (let i = 0; i < this.Stats.length; i++) {
            labels.push(this.Stats[i].nom)
            data.push(this.Stats[i].nbr)
            color.push("rgb(54,162,235,0.5)")
            border.push("#4040a1")
            this.length = parseInt(this.length) + parseInt(this.Stats[i].nbr)

        }
        data.push(0)
        

        
        new Chart(document.getElementById('my-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservations',
                data: data,
                backgroundColor : color,
                borderColor : border,
                borderWidth : 1
            }]
        },options : { maintainAspectRatio : false}
        });
        
        this.Loading = false
    }

}

</script>

<style>

</style>
