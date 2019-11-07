<template>
    <div>
        <div class="wrapper">
            <Menu></Menu>
            <div class="main-panel">
                <NavBar></NavBar>

                <div class="content">
                    <div class="row">
                        <div class="col-12">
                            <LandingChart></LandingChart>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <DoughnutChart></DoughnutChart>
                            
                        </div>
                        <div class="col-lg-4">
                            <LineChart></LineChart>
                        </div>
                        <div class="col-lg-4">
                            <PieChart></PieChart>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <RadarChart></RadarChart>
                        </div>
                        <div class="col-lg-6">
                            <RepChart></RepChart>
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

import LandingChart from './LandingChart.vue'
import DoughnutChart from './DoughnutChart.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'
import RadarChart from './RadarChart.vue'
import RepChart from './RepChart.vue'

export default {
    name : 'Dashboard',
    components : {
        NavBar,
        Menu,
        LandingChart,
        DoughnutChart,
        PieChart,
        LineChart,
        RadarChart,
        RepChart
    },
    data () {
        return {
            
        }
    },
    mounted(){

    }

}
</script>

<style>

</style>
