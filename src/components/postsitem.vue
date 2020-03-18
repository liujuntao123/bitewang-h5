<template>
  <div class="item-box">
    <div class="item-header">
      <div class="item-img-box">
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
        <img class="post-is-top-img" src="./../images/top.png" v-show="item.isTop" alt="">
      </div>
      <div class="item-support-box">
        <img class="item-support-img" v-if="!hasSupport" src="./../images/good1.png" alt="" >
        <img class="item-support-img" v-else src="./../images/good2.png" alt="">
        <div class="item-support-num">
          {{ item.goodCount }}
        </div>
      </div>
    </div>
    <div class="item-main">
      <div class="item-content">
        {{ item.content }}
      </div>
      <div class="item-comment-box" v-if="item.commentCount > 0">
        <div class="comment-less-box" v-if="item.commentCount <= 2">
          <div class="comment-less-for-box" v-for="(comment, index) in item.commentList" :key="index">
            <div class="comment-item">
              <span class="comment-name">{{ comment.name }}:</span> &nbsp;&nbsp;{{ comment.comment }}
            </div>
          </div>
        </div>
        <div v-else class="comment-more-box">
          <div v-if="!isShowAllComment">
            <div class="comment-less-for-box">
              <div class="comment-item">
                <span class="comment-name">{{ item.commentList[0].name }}:</span> &nbsp;&nbsp;{{ item.commentList[0].comment }}
              </div>
              <div class="comment-item">
                <span class="comment-name">{{ item.commentList[1].name }}:</span> &nbsp;&nbsp;{{ item.commentList[1].comment }}
              </div>
            </div>
            <div @click="clickShowMore" class="show-more-comment">{{"查看全部("+item.commentCount+"评论)"}}</div>
          </div>
          <div v-else>
            <div class="comment-less-for-box" v-for="(comment, index) in item.commentList" :key="index">
              <div class="comment-item">
                <span class="comment-name">{{ comment.name }}:</span> &nbsp;&nbsp;{{ comment.comment }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from '@/utils/moment'

export default {
  props: {

  },
  data() {
    return {
      item: {
        "tid": 111,
        "createdAt": 1584436510000,
        "uid": "0d5a188c-ab7f-4aae-b9e2-823266fa6106",
        "nickname": "jack",
        "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584546736064&di=039f53ac3d12970eca05cb0148035e89&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
        "bid": 1,
        "content": "发生的房间爱发打发斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬斯蒂芬",
        "summary": "这是我的",
        "goodCount": 20,
        "commentCount": 30,
        "commentList": [
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
        "isTop": false,
        "state": 0
      },
      hasSupport: false,
      isShowAllComment: false
    }
  },
  methods: {
    showTime(timestamp) {
      let nowTime = new Date()
      return new moment(timestamp).showTime(nowTime)
    }
  }
}
</script>

<style lang="less" scoped>
  .item-box {
    display: flex;
    flex-direction: column;
    background-color: #fff;
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
        width: 120px;
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
      }
      .item-comment-box {
        .comment-less-box,.comment-more-box {
          .comment-less-for-box {
            .comment-item {
              .comment-name {
                color: #4299e5;
              }
            }
          }
        }
        .comment-more-box {
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
