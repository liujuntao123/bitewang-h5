<template>
  <div class="post-list-page">
    <!-- <Header 
      class="header-fixed" 
      :is-show-back="true" 
      :title="headName"
    /> -->
    <mt-navbar class="mt-navbar" fixed v-model="selected">
      <mt-tab-item id="1">讨论区</mt-tab-item>
      <mt-tab-item id="2">精华区</mt-tab-item>
    </mt-navbar>

    <mt-tab-container class="mt-tab-container" v-model="selected">
      <mt-tab-container-item class="mt-tab-container-item" id="1">
        <mt-loadmore class="mt-loadmore" ref="loadmore" :top-method="loadTop">
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
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item class="mt-tab-container-item" id="2">
        <mt-loadmore class="mt-loadmore" ref="essenceloadmore" :top-method="loadTop">
          <div class="post-list-container" style="padding-bottom:500px;">
            <div
              class="list-container"
              v-infinite-scroll="essenceloadMore"
              infinite-scroll-disabled="essenceIsLoading"
              infinite-scroll-distance="10"
            >
              <div  
                class="list-item"
                v-for="(item, index) in essenceLists" 
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
              v-if="essenceIsLoading" 
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
              v-if="(!essenceIsLoading && essenceLists.length === 0) || (!essenceIsLoading && !essenceHasNewList)"
            >
              没有更多了~
            </div>
          </div>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import PostsItem from './../components/postsitem'
import dataUtil from '@/utils/data'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import data from '@/utils/onlineconfig'
const { getOnlineConfig } = data
let lastPullRefreshTime = 0
let expireTime = 0
let thisTime = 0


export default {
  data() {
    return {
      isLoading: false,
      essenceIsLoading: false,
      index: 0,
      essenceIndex: 0,
      total: 0,
      forceRefresh: false,
      lists: [],
      essenceLists: [],
      hasNewList: true,
      essenceHasNewList: false,
      headName: '',
      bid: null,
      selected: '1'
    }
  },
  inject: ['reload'],
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid'
    })
  },
  watch: {
    selected: function(val, oldVal) {
      if (val === '2') {
        this.essenceIsLoading = true
        setTimeout(() => {
          this.essenceIsLoading = false
        }, 500)
      }
    }
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
    loadTop() {
      getOnlineConfig.call(this).then(onlineConfig => {
      expireTime = onlineConfig.ba_topic_list_refresh_seconds * 1000
      })
      thisTime = new Date().getTime()
      if (this.selected === '1') {
        if (thisTime - lastPullRefreshTime > expireTime) {
          this.hasNewList = true
          this.index = 0
          this.forceRefresh = false
          this.loadMore()
          this.$refs.loadmore.onTopLoaded()
          lastPullRefreshTime = thisTime
        } else {
          this.$refs.loadmore.onTopLoaded()
        }
      } else if (this.selected === '2') {
        this.$refs.essenceloadmore.onTopLoaded()
      }
    },
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
    essenceloadMore() {
      // this.essenceIsLoading = true
      // setTimeout(() => {
      //   this.essenceIsLoading = false
      // }, 500)
      // if (this.essenceHasNewList) {
      //  // 请求精华区相关主题列表
      // }
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
  .mt-navbar {
    border-bottom: 2px solid #bbb;
  }
  .mt-tab-container {
    height: 100%;
    height: calc(100% - 46px);
    overflow: auto;
    margin-top: 46px;
    .mt-tab-container-item {
      height: 100%;
      .mt-loadmore {
        height: 100%;
        .post-list-container {
          height: 100%;
          padding-bottom: 50px;
          box-sizing: border-box;
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
            margin-top: 10px;
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
        .essence-container {
          text-align:center;
          color:#888;
          margin-top: 60px;
        }
      }
    }
  }
}
</style>

