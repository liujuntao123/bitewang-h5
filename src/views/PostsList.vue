<template>
  <div class="post-list-page">
    <Header 
      class="header-style" 
      :is-show-back="true" 
      :title="headName"
    />
    <div class="post-list-container">
      <PostsItem />
    </div>
    <div class="click-post-container">
      <img class="new-post-img" src="./../images/new_post.png" alt="">
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import PostsItem from './../components/postsitem'

export default {
  data() {
    return {
      headName: '比特币BTC',
    }
  },
  components: {
    Header,
    PostsItem
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.post-list-page {
  background-color: #e8e8e8;
  height: 100vh;
  position: relative;
  .post-list-container {
    height: 100vh;
  }
  .click-post-container {
    position: fixed;
    bottom: 0;
    left: calc(50vw - 25px);
    width: 50px;
    height: 50px;
    .new-post-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

