<template>
  <div class="post-list-page">
    <Header 
      class="header-fixed" 
      :is-show-back="true" 
      :title="headName"
    />
    <div class="post-list-container">
      <div
        class="list-container"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div class="list-item" v-for="(item, index) in lists" :key="index">
          <PostsItem :item="item" @goPostDetail="goPostDetail(item)" />
        </div>
      </div>
      <div class="loading-more" v-if="isLoading">
        <mt-spinner type="fading-circle" :size="22" color="#888" class="loading-more-icon"/>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="loading-all" v-if="total > 0 && lists.length >= total">没有更多了~</div>
    </div>
    <div class="click-post-container" @click="goPostingPage">
      <img class="new-post-img" src="./../images/new_post.png" alt="">
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import PostsItem from './../components/postsitem'
import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      isLoading: false,
      total: 0,
      lists: []
    }
  },
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid',
      headName: 'baInfo/getBaName',
      bid: 'baInfo/getBaId'
    })
  },
  mounted() {
    document.title = this.headName
    this.getPostsList()
  },
  components: {
    Header,
    PostsItem
  },
  methods: {
    getPostsList() {
      let getListsObj = {
        sid: this.sid,
        bid: this.bid,
        index: 0,
        forceRefresh: false
      }
      api.BaTopicList(getListsObj).then(res => {
        if (res.result === 0) {
          this.lists = res.topicList
        }
      })
    },
    loadMore() {
      this.isLoading = true
      this.total = 30
      if (this.lists.length > this.total) {
        this.isLoading = false
        return
      } else {
        setTimeout(() => {
         
          this.loading = false;
        }, 2000)
      }
    },
    goPostingPage() {
      this.$router.push('posting')
    },
    goPostDetail(item) {
      this.$router.push({name:'postdetails',params:{itemDetail: item}})
    }
  }
}
</script>

<style lang="less" scoped>
.post-list-page {
  background-color: #e8e8e8;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 14px;
  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .post-list-container {
    margin-top: 50px;
    height: calc(100% - 110px);
    padding-bottom: 5px;
    box-sizing: border-box;
    overflow: auto;
    .list-container {
      background: #e8e8e8;
      padding-bottom: 10px;
      word-break: break-all;
    }
    .loading-more {
      text-align: center;
      padding: 10px 0;
      .loading-more-icon {
        display: inline-block;
        vertical-align: middle;
      }
      .loading-more-txt {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        color: #888;
      }
    }
    .loading-all {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #888;
      padding: 10px 0;
    }
  }
  .click-post-container {
    position: fixed;
    bottom: 5px;
    left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    .new-post-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

