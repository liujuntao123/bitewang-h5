<template>
  <div class="post-details-page">
    <Header
      class="header-fixed" 
      :is-show-back="true" 
      :title="headName"
    />
    <div class="post-detail-container">
      <div class="item-box">
        <div class="item-header">
          <div 
            class="item-img-box" 
            @click="goUserInfo(item.uid)"
          >
            <img 
              class="item-img-img"
              :src="item.avatar" 
              alt=""
            >
          </div>
          <div class="item-post-info">
            <div class="item-post-name">
              {{ item.nickname }}
            </div>
            <div class="item-post-time">
              {{ showTime(item.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
            </div>
          </div>
          <div class="item-support-box">
            <img
              class="item-support-img" 
              @click="supportGood" 
              v-if="!hasSupport" 
              src="./../images/good1.png" 
              alt="" 
            >
            <img 
              class="item-support-img" 
              @click="noSupportGood" 
              v-else 
              src="./../images/good2.png" 
              alt=""
            >
          </div>
        </div>
        <div class="item-main">
          <div class="item-content">
            {{ item.summary }}
          </div>
          <div
            class="item-comment-box" 
            v-if="item.commentCount > 0"
          >
            <div class="comment-less-box">
              <div 
                class="comment-less-for-box" 
                v-for="(comment, index) in commentList" 
                :key="index"
              >
                <div class="comment-item">
                  <span 
                    class="comment-name" 
                    @click="goUserInfo(comment.uid)"
                  >{{ comment.nickname }}:</span><span class="comment-content">{{ comment.content }}</span><span class="comment-time">{{ showTime(comment.createdAt, 'YYYY-MM-DD') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        v-if="hasMoreComment" 
        @click="clickShowMore" 
        class="show-more-comment"
      >
        查看更多
      </div>
    </div>
    <div class="post-comment-container">
      <input 
        class="comment-input" 
        maxlength="50" 
        v-model="commentText" 
        placeholder="发表你的评论" 
        type="text"
      >
      <div 
        class="comment-submit" 
        @click="submitComment"
      >
        发表
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from '@/components/header'
import moment from '@/utils/moment'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      headName: '帖子详情',
      hasSupport: false,
      item: {},
      commentText: '',
      commentList: [],
      cid: -1,
      hasMoreComment: false
    }
  },
  inject: ['reload'],
  computed: {
    ...mapGetters(
      {sid: 'userInfo/getSid'}
    )
  },
  components: {
    Header
  },
  mounted() {
    this.item = this.$route.params.itemDetail
    this.getCommentList()
  },
  methods: {
    showTime(timestamp, format) {
      return new moment(timestamp).format(format)
    },
    supportGood() {
    },
    noSupportGood() {
    },
    goUserInfo(uid) {
      this.$router.push({path: '/user', query: {uid: uid}})
    },
    getCommentList() {
      if (this.item.commentCount > 0) {
        let getCommentObj = {
          sid: this.sid,
          tid: this.item.tid,
          cid: this.cid
        }
        api.TopicCommentList(getCommentObj).then(res => {
          if (res.result === 0) {
            if (res.commentList.length > 0) {
              this.commentList = this.commentList.concat(res.commentList)
              this.cid = res.commentList[res.commentList.length-1].cid
              if (res.commentList.length < 10) {
                this.hasMoreComment = false
              } else {
                this.hasMoreComment = true
              }
            } else {
              this.hasMoreComment = false
            }
          } else {
            Toast(res.message)
          }
        })
      }
    },
    submitComment() {
      if(this.commentText.trim().length === 0) {
        Toast('评论内容不能为空')
        return
      }
      let commentObj = {
        sid: this.sid,
        tid: this.item.tid,
        content: this.commentText
      }
      this.commentText = ''
      api.NewComment(commentObj).then(res => {
        if(res.result === 0) {
          Toast({
            message: '评论成功',
            duration: 2000
          })
          setTimeout(() => {
            this.reload();
          },2000)
        } else {
          Toast(res.message)
        }
      })
    },
    clickShowMore() {
      this.getCommentList()
    }
  }
}
</script>

<style lang="less" scoped>
  .post-details-page {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: 14px;
    .header-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
    .post-detail-container {
      margin-top: 50px;
      height: calc(100% - 90px);
      box-sizing: border-box;
      overflow: auto;
      .item-box {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .item-header {
          display: flex;
          padding: 6px 20px 6px 6px;
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
            font-size: 16px;
            margin-left: 6px;
            flex: 1;
            .item-post-name {
            }
            .item-post-time {
              color: #888;
            }
          }
          .item-support-box {
            width: 24px;
            height: 24px;
            padding: 6px 14px 0 0;
            .item-support-img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .item-main {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          padding: 0 20px 10px 42px;
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
                  .comment-content {
                    padding: 0 12px 0 6px;
                  }
                  .comment-time {
                    color: #888;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
      .show-more-comment {
        text-align: center;
        color: #4299e5;
        padding-bottom: 10px;
      }
    }
    .post-comment-container {
      position: fixed;
      left: 0;
      border-bottom: 0;
      border-top: 1px solid #888;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      .comment-input {
        flex: 1;
        height: 100%;
        outline: none;
        vertical-align: middle;
      }
      input {
        border-width: 0;
        font-size: 14px;
      }
      .comment-submit {
        font-size: 16px;
        width: 40px;
        height: 100%;
        text-align: center;
      }
    }
  }
</style>
