<template>
    <div class="card card-chart">
        <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>

        <div class="card-header" v-if="!Loading">
            <h4 class="card-category uk-text-large">Reservation mobile et locale  : <span class="uk-badge">{{length}} </span></h4>

        </div>
        <div class="card-body">
            <div class="chart-area">
                <canvas id="my-line-chart" > </canvas>
            </div>
        </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios'

export default {
    name : 'LineChart',
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
        
        await axios.get('http://localhost:3000/Api/Dashboard/ResPri')
        .then((res)=>{
            this.Stats = res.data.stat
        })
        .catch((err) =>{
            this.error = err
        })

        let labels = []
        let data = []
        for (let i = 0; i < this.Stats.length; i++) {
            if(this.Stats[i].priorite == 0){
                labels.push("Local")
            }else{
                labels.push("Mobile")
            }
            data.push(this.Stats[i].nbr)
            this.length = parseInt(this.length) + parseInt(this.Stats[i].nbr)

        }
        data.push(0)
        

        
        new Chart(document.getElementById('my-line-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservations',
                data: data,
                backgroundColor : ['rgb(253,93,147,0.5)','rgb(255,153,51,0.5)'],
                borderColor : ['#fd5d93','#ff9933'],
                borderWidth : 1
            }]
        },options : { maintainAspectRatio : false}
        });
        
        this.Loading = false
    }

}
</script>

