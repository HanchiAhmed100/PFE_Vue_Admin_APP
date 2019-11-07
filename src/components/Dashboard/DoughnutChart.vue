<template>
    <div class="card card-chart">
        <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>

        <div class="card-header" v-if="!Loading">
            <h4 class="card-category uk-text-large">Total Reservations : <span class="uk-badge">{{length}}</span></h4>

        </div>
        <div class="card-body">
            <div class="chart-area">
                <canvas id="my-doughnut-chart" > </canvas>
            </div>
        </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios'

export default {
    name : 'DoughnutChart',
    data() {
        return {
            Loading :  false,
            Stats : [],
            error : '',
            length : 0
        }
    },
    
    async mounted () {

        this.Loading = true,
        
        await axios.get('http://localhost:3000/Api/Dashboard/ResEtat')
        .then((res)=>{
            this.Stats = res.data.stat
        })
        .catch((err) =>{
            this.error = err
        })

        let labels = []
        let data = []
        
        for (let i = 0; i < this.Stats.length; i++) {
            if(this.Stats[i].etat == 0){
                labels.push("En attente")
            }if(this.Stats[i].etat == 1){
                labels.push("Effecuter")
            }if(this.Stats[i].etat == 2){
            	labels.push("Non effecuter")
            }
            this.length = parseInt(this.length) + parseInt(this.Stats[i].nbr)
            data.push(this.Stats[i].nbr)
        }
        data.push(0)
        

        
        new Chart(document.getElementById('my-doughnut-chart'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservations',
                data: data,
                backgroundColor : ['#FF6384','#36A2EB','#212529']
            }]
        },options : { maintainAspectRatio : false}
        });
        
        this.Loading = false
    }

}
</script>

