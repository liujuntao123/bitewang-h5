<template>
  <div>
    <Header
      :is-show-back="true"
      @handleBack="headHandleBack"
      :title="headName"
    />
    <div class="post-list-page">
      {{ text }}
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'

export default {
  data() {
    return {
      headName: '比特币BTC',
      text: 'jjjjjjjjjjjjj'
    }
  },
  components: {
    Header
  },
  methods: {
    headHandleBack(){
    }
  }
}
</script>

<style lang="less" scoped>
.post-list-page {
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}
</style>

