<template>
    <div class="card card-chart">
        <div class="uk-position-center" v-if="Loading"> <span uk-spinner="ratio: 6"></span> </div>

        <div class="card-header" v-if="!Loading">
            <h4 class="card-category uk-text-large"> Traitement Total des clients : <span class="uk-badge">{{length}} </span></h4>

        </div>
        <div class="card-body">
            <div class="chart-area">
                <canvas id="my-pie-chart" > </canvas>
            </div>
        </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios'

export default {
    name : 'PieChart',
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
        
        await axios.get('http://localhost:3000/Api/Dashboard/ResEff')
        .then((res)=>{
            this.Stats = res.data.stat
        })
        .catch((err) =>{
            this.error = err
        })

        let labels = []
        let data = []
        for (let i = 0; i < this.Stats.length; i++) {
            let str = this.Stats[i].username 
            labels.push(str)
            data.push(this.Stats[i].nbr)
            this.length = parseInt(this.length) + parseInt(this.Stats[i].nbr)

        }
        data.push(0)
        

        
        new Chart(document.getElementById('my-pie-chart'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservations',
                data: data,
                backgroundColor : ['rgb(54,162,235)','rgb(51,53,56)','rgb(255,99,132)'],
                borderColor : ['#FFF','#FFF','#FFF'],
                borderWidth : 2
            }]
        },options : { maintainAspectRatio : false}
        });
        
        this.Loading = false
    }

}
</script>

