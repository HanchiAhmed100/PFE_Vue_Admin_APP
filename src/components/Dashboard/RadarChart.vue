<template>
    <div class="card card-chart">
        <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>

        <div class="card-header" v-if="!Loading">
            <h4 class="card-category uk-text-large">La composition du reseau direct : <span class="uk-badge">{{length}}</span></h4>

        </div>
        <div class="card-body">
            <div class="chart-area">
                <canvas id="my-radar-chart" > </canvas>
            </div>
        </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios'

export default {
    name : 'RadarChart',
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
        
        await axios.get('http://localhost:3000/Api/Dashboard/Repartion')
        .then((res)=>{
            this.Stats = res.data.stat
        })
        .catch((err) =>{
            this.error = err
        })

        let labels = []
        let data = []
        for (let i = 0; i < this.Stats.length; i++) {
            labels.push(this.Stats[i].region)
            data.push(this.Stats[i].nbr)
            this.length = parseInt(this.length) + parseInt(this.Stats[i].nbr)
        }
        data.push(0)
        

        
        new Chart(document.getElementById('my-radar-chart'), {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservations',
                data: data,
                backgroundColor : ['rgb(52,70,117,0.4)','rgb(251,99,64,0.4)','rgb(253,93,147,0.4)','rgb(51,53,56,0.4)','rgb(86,3,173,0.5)',]
            }]
        },options : { maintainAspectRatio : false}
        });
        
        this.Loading = false
    }

}
</script>

