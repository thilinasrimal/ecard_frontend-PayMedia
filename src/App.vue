<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./components/Home";

export default {
  components: {Home},
  name: 'App'
}
</script>

<style>
#app {

}

@media screen and (max-width: 360px) {
 #app{
   width: 71rem;
 }

}

</style>
