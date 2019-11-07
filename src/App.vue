<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="foo" width="450px" position="bottom right" />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      active : false
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
    width: 5px;
}
/* Track */
 ::-webkit-scrollbar-track {

    background: #ccc;
}
/* Handle */
 ::-webkit-scrollbar-thumb {

    background: #448aff;
}
/* Handle on hover */
 ::-webkit-scrollbar-thumb:hover {

    background: #ccc;
}
.noscroll{
	overflow-y: hidden
}
.deconnect {
  position: fixed;
  color : #fff;
  background-color: #448aff;
  padding: 15px;
  bottom: 20px ;
  right : 20px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 1000;
}
</style>
