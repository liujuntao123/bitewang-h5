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
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="10"
      >
        <div  
          class="list-item"
          v-for="(item, index) in lists" 
          :key="index"
        >
          <PostsItem 
            :item="item" 
            @goPostDetail="goPostDetail(item)"
          />
        </div>
      </div>
      <div 
        class="loading-more" 
        v-if="isLoading" 
      >
        <mt-spinner 
          type="fading-circle" 
          :size="22" 
          color="#888" 
          class="loading-more-icon"
        />
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div 
        class="loading-all" 
        v-if="(!isLoading && lists.length === 0) || (!isLoading && !hasNewList)"
      >
        没有更多了~
      </div>
    </div>
    <div 
      class="click-post-container" 
      @click="goPostingPage"
    >
      <img 
        class="new-post-img" 
        src="./../images/new_post.png" 
        draggable="false"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import PostsItem from './../components/postsitem'
import dataUtil from '@/utils/data'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'


export default {
  data() {
    return {
      isLoading: false,
      index: 0,
      total: 0,
      forceRefresh: false,
      lists: [],
      hasNewList: true,
      headName: '',
      bid: null
    }
  },
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid'
    })
  },
  created () {
    this.headName = this.$route.query.name
    this.bid = this.$route.query.bid
  },
  mounted() {
    document.title = this.headName
    this.$route.query.postRefreshPostList ? this.forceRefresh = true : this.forceRefresh = false
  },
  components: {
    Header,
    PostsItem
  },
  methods: {
    loadMore() {
      if (this.hasNewList) {
        this.isLoading = true
        let getListsObj = {
          sid: this.sid,
          bid: this.bid,
          index: this.index,
          forceRefresh: this.forceRefresh
        }
        api.BaTopicList(getListsObj).then(res => {
          this.forceRefresh = false
          if (res.result === 0) {
            if (res.topicList.length > 0) {
              if (this.lists.length > 0) {
                this.lists = dataUtil.jsonDuplicateRemoval(this.lists, res.topicList)
                this.index += 1
                this.isLoading = false
              } else {
                res.topicList.forEach(e => {
                  this.lists.push(e)
                })
                this.index += 1
                this.isLoading = false
              }
            } else {
              this.isLoading = false
              this.hasNewList = false
            }
          } else {
            this.isLoading = false
            Toast(res.message)
          }
        })
      }
    },
    goPostingPage() {
      this.$router.push({path: '/posting', query: {bid: this.bid, name: this.headName}})
    },
    goPostDetail(item) {
      this.$router.push({path: '/postdetails', query: {tid: item.tid}})
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
    height: calc(100% - 50px);
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow: auto;
    .list-container {
      background: #e8e8e8;
      word-break: break-all;
    }
    .loading-more {
      text-align: center;
      padding: 10px;
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
      padding-bottom: 10px;
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

