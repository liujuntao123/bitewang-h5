<template>
  <div id="app">
    <!-- <header/> -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import Header from './components/header'
export default {
  component:{Header},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
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