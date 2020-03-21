<template>
  <div class="item-box" @click="goPostDetail">
    <div class="item-header">
      <div class="item-img-box" @click.stop="goUserInfo(item.uid)">
        <img class="item-img-img" :src="item.avatar" alt="">
      </div>
      <div class="item-post-info">
        <div class="item-post-name">
          {{ item.nickname }}
        </div>
        <div class="item-post-time">
          {{ item.commentCount > 0 ? "评论于 " : "发表于 " }}{{ showTime(item.createdAt) }}
        </div>
      </div>
      <div class="item-post-is-top">
        <img class="post-is-top-img" src="./../images/top.png" v-show="(item.state&8)" alt="">
      </div>
      <div class="item-support-box">
        <img class="item-support-img" @click="supportGood" v-if="!hasSupport" src="./../images/good1.png" alt="" >
        <img class="item-support-img" @click="noSupportGood" v-else src="./../images/good2.png" alt="">
        <div class="item-support-num">
          {{ item.goodCount }}
        </div>
      </div>
    </div>
    <div class="item-main">
      <div class="item-content">
        {{ item.summary }}
      </div>
      <div class="item-comment-box" v-if="item.commentCount > 0">
        <div class="comment-less-box">
          <div class="comment-less-for-box">
            <div class="comment-item">
              <span class="comment-name">{{ item.comment1.slice(0, item.comment1.indexOf(':')) }}:</span>{{ item.comment1.slice(item.comment1.indexOf(':')+1) }}
            </div>
            <div class="comment-item" v-if="item.comment2">
              <span class="comment-name">{{ item.comment2.slice(0, item.comment2.indexOf(':')) }}:</span>{{ item.comment2.slice(item.comment2.indexOf(':')+1) }}
            </div>
          </div>
          <div v-if="item.commentCount > 2" @click="clickShowMore" class="show-more-comment">{{"查看全部("+item.commentCount+"评论)"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from '@/utils/moment'

export default {
  props: {
    item: {
      type: Object,
      default: {}
    },

  },
  data() {
    return {
      hasSupport: false
    }
  },
  methods: {
    showTime(timestamp) {
      let nowTime = new Date()
      return new moment(timestamp).showTime(nowTime)
    },
    supportGood() {
    },
    noSupportGood() {
    },
    goUserInfo(uid) {
      this.$router.push({path: '/user', query: {uid: uid}})
    },
    goPostDetail() {
      this.$emit("goPostDetail")
    },
    clickShowMore() {
    }
  }
}
</script>

<style lang="less" scoped>
  .item-box {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #c5c5c5;
    margin-bottom: 10px;
    .item-header {
      display: flex;
      padding: 6px;
      align-items: center;
      .item-img-box {
        width: 30px;
        height: 30px;
        .item-img-img {
          width: 100%;
          height: 100%;
        }
      }
      .item-post-info {
        font-size: 14px;
        margin-left: 6px;
        width: 130px;
        .item-post-name {
          font-size: 16px;
        }
        .item-post-time {
          color: #888;
        }
      }
      .item-post-is-top {
        width: 50px;
        margin-left: 90px;
        padding-top: 2px;
        .post-is-top-img {
          width: 100%;
        }
      }
      .item-support-box {
        display: flex;
        margin-left: 10px;
        .item-support-img {
          width: 20px;
          height: 20px;
        }
        .item-support-num {
          margin-left: 5px;
        }
      }
    }
    .item-main {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      padding: 0 20px 16px 42px;
      .item-content {
        margin-bottom: 6px;
        font-size: 16px;
      }
      .item-comment-box {
        .comment-less-box {
          .comment-less-for-box {
            .comment-item {
              .comment-name {
                color: #4299e5;
              }
            }
          }
          .show-more-comment {
            margin-top: 6px;
            float: right;
            color: #4299e5;
          }
        }
      }
    }
  }
</style>
