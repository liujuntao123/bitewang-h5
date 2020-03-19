<template>
  <div class="posting-page">
    <Header
      :is-show-back="true"
      :title="headTitle"
      :isShowPostingBtn="true"
    />
    <div class="posting-container">
      <textarea class="textaret-posting" name="" id="" cols="30" rows="10" placeholder="发表你的高见..."></textarea>
    </div>
  </div>
</template>

<script>
import Header from './../components/header'

export default {
  data() {
    return {
      headTitle: '比特币BTC'
    }
  },
  components: {
    Header
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .posting-page {
    height: 100vh;
    .posting-container {
      height: 100%;
      .textaret-posting {
        padding: 10px;
        font-size: 14px;
      }
    }
  }
</style>


