<template>
  <div id="app">
    <!-- <header/> -->
    <router-view />
  </div>
</template>

<script>
import Header from './components/header'
export default {
  component:{Header}
}
</script>


<style lang="css">
  body{
    margin: 0;
  }
  a{
    text-decoration:none;
  }
  p{
    margin: 0;
  }
</style>