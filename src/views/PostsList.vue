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
          <PostsItem :item="item" />
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
      headName: '',
      isLoading: false,
      total: 0,
      lists: [
        {
          "tid": 111,
          "createdAt": 1584436510000,
          "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
          "nickname": "人而且",
          "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
          "bid": 1,
          "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
          "summary": "这是我的",
          "goodCount": 10,
          "commentCount": 2,
          "commentList": [
            {
              name: '给分为',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: '胖娃儿',
              comment: '这是我的第shi个评论'
            }
          ],
          "comment1": "jack: 这是我的第一个评论",
          "comment2": "sam: 这是我的第二个评论",
          "isTop": false,
          "state": 0
        },
        {
          "tid": 111,
          "createdAt": 1584436510000,
          "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
          "nickname": "jack",
          "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
          "bid": 1,
          "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
          "summary": "这是我的",
          "goodCount": 20,
          "commentCount": 4,
          "commentList": [
            {
              name: 'jack',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: 'tom',
              comment: '这是我的第shi个评论'
            },
            {
              name: 'jack',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: 'tom',
              comment: '这是我的第shi个评论'
            }
          ],
          "comment1": "jack: 这是我的第一个评论",
          "comment2": "sam: 这是我的第二个评论",
          "isTop": true,
          "state": 0
        },
         {
          "tid": 111,
          "createdAt": 1584436510000,
          "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
          "nickname": "人而且",
          "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
          "bid": 1,
          "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
          "summary": "这是我的",
          "goodCount": 10,
          "commentCount": 2,
          "commentList": [
            {
              name: '给分为',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: '胖娃儿',
              comment: '这是我的第shi个评论'
            }
          ],
          "comment1": "jack: 这是我的第一个评论",
          "comment2": "sam: 这是我的第二个评论",
          "isTop": false,
          "state": 0
        },
        {
          "tid": 111,
          "createdAt": 1584436510000,
          "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
          "nickname": "jack",
          "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
          "bid": 1,
          "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
          "summary": "这是我的",
          "goodCount": 20,
          "commentCount": 4,
          "commentList": [
            {
              name: 'jack',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: 'tom',
              comment: '这是我的第shi个评论'
            },
            {
              name: 'jack',
              comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
            },
            {
              name: 'tom',
              comment: '这是我的第shi个评论'
            }
          ],
          "comment1": "jack: 这是我的第一个评论",
          "comment2": "sam: 这是我的第二个评论",
          "isTop": true,
          "state": 0
        }
      ]
    }
  },
  computed: {
    ...mapGetters(
      {sid: 'userInfo/getSid'}
    )
  },
  mounted() {
    document.title = this.$route.params.item.name
    this.headName = this.$route.params.item.name
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
        bid: this.$route.params.item.id,
        index: 0,
        forceRefresh: false
      }
      api.BaTopicList(getListsObj).then(res => {
        console.log('getBaTopicList res:', res)
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
          for (let i = 1; i <= 10; i++) {
            this.lists.push({
              "tid": 111,
              "createdAt": 1584436510000,
              "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
              "nickname": "人而且",
              "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
              "bid": 1,
              "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
              "summary": "这是我的",
              "goodCount": 10,
              "commentCount": 2,
              "commentList": [
                {
                  name: '给分为',
                  comment: '这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论这是我的第一个评论'
                },
                {
                  name: '胖娃儿',
                  comment: '这是我的第shi个评论'
                }
              ],
              "comment1": "jack: 这是我的第一个评论",
              "comment2": "sam: 这是我的第二个评论",
              "isTop": false,
              "state": 0
            });
          }
          this.loading = false;
        }, 2000)
      }
    },
    goPostingPage() {
      this.$router.push({name:'posting',params:{item: this.$route.params.item}})
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
    padding-bottom: 10px;
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
    bottom: 0;
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

