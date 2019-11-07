<template>
    <div class="fixed-plugin">
        <div class="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown">
                <i class="fa fa-cog fa-2x"> </i>
            </a>
            <ul class="dropdown-menu">
                <li class="header-title"> Couleur </li>
                <li class="adjustments-line">
                <a href="javascript:void(0)" class="switch-trigger background-color">
                    <div class="badge-colors text-center">
                    <span class="badge filter badge-primary active" data-color="primary"></span>
                    <span class="badge filter badge-success" data-color="green"></span>
                    </div>
                    <div class="clearfix"></div>
                </a>
                </li>
                <li class="adjustments-line text-center color-change">
                    <span class="color-label"> MODE JOUR</span>
                    <span class="badge light-badge mr-2"></span>
                    <span class="badge dark-badge ml-2"></span>
                    <span class="color-label"> MODE NUIT</span>
                </li>
                <br>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : 'ColorPalet',
    data () {
        return {
            
        }
    }

}
</script>

<style>

</style>
