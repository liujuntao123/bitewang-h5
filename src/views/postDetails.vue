<template>
  <div class="post-details-page">
    <!-- <Header
      class="header-fixed" 
      :is-show-back="true" 
      :title="headName"
    /> -->
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
              draggable="false"
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
            <div class="item-support-num">
              {{ item.goodCount }}
            </div>
            <img class="item-support-img" @click="supportGood" v-if="!hasSupport" src="./../images/good1.png" alt="" draggable="false">
            <img class="item-support-img" @click="noSupportGood" v-else src="./../images/good2.png" alt="" draggable="false">
          </div>          
        </div>
        <div class="item-main">
          <div class="item-content">
            {{ item.content }}
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
                  >{{ comment.nickname }}:</span><span class="comment-content">{{ comment.content }}</span>
                </div>
                <div class="comment-time">{{ showTime(comment.createdAt, 'YYYY-MM-DD') }}</div>
              </div>
            </div>
          </div>
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
        v-if="hasMoreComment" 
        @click="clickShowMore" 
        class="show-more-comment"
      >
        查看更多
      </div>
    </div>
    <div 
      class="post-comment-container" 
      v-if="!textareaOpening" 
      @click="openTextareaBox"
    >
      <input 
        class="comment-input" 
        maxlength="50" 
        draggable="false"
        v-model="commentText" 
        placeholder="发表你的评论..." 
        type="text"
      >
      <div 
        class="comment-submit" 
        @click="submitComment"
      >
        发表
      </div>
    </div>
    <div 
      class="post-comment-textarea-container" 
      v-if="textareaOpening"
    >
      <textarea class="post-textarea" maxlength="150" v-model="textareaText" placeholder="发表你的评论..." name="" id=""></textarea>
      <div 
        class="textarea-comment-submit" 
        @click="textareaSubmitComment"
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
      textareaOpening: false,
      commentText: '',
      textareaText: '',
      commentList: [],
      cid: -1,
      hasMoreComment: false,
      item: {},
      tid: null,
      isLoading: false
    }
  },
  inject: ['reload'],
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid'
    })
  },
  components: {
    Header
  },
  created() {
    this.tid = this.$route.query.tid
    document.title=this.headName
  },
  async mounted() {
    this.isLoading = true
    await this.getTopicInfo()
    await this.getCommentList()
    this.isLoading = false
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
    async getTopicInfo() {
      if (this.tid && this.sid) {
        await api.Topic({
          sid: this.sid,
          tid: this.tid
        }).then(res => {
          if (res.result === 0) {
            this.item = res.topic
          } else {
            Toast(res.message)
          }
        }).catch(err => {
          Toast(JSON.stringify(err))
        })
      } else {
        Toast('参数错误')
      }
    },
    async getCommentList() {
      if (this.item.commentCount > 0) {
        let getCommentObj = {
          sid: this.sid,
          tid: this.item.tid,
          cid: this.cid
        }
        await api.TopicCommentList(getCommentObj).then(res => {
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
    openTextareaBox () {
      this.textareaOpening = true
    },
    submitComment() {
      if(this.commentText.trim().length === 0) {
        Toast('评论内容不能为空')
        return
      }
    },
    textareaSubmitComment () {
      if(this.textareaText.trim().length === 0) {
        Toast('评论内容不能为空')
        return
      }
      let commentObj = {
        sid: this.sid,
        tid: this.item.tid,
        content: this.textareaText
      }
      this.textareaText = ''
      api.NewComment(commentObj).then(res => {
        if(res.result === 0) {
          Toast({
            message: '评论成功',
            duration: 1000
          })
          setTimeout(() => {
            this.reload();
          },1000)
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
      // margin-top: 50px;
      height: calc(100% - 40px);
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
            width: 245px;
            .item-post-name {
              font-size: 14px;
            }
            .item-post-time {
              color: #888;
              font-size: 12px;
            }
          }
          .item-support-box {
            display: flex;
            justify-content: flex-end;
            width: 63px;
            .item-support-img {
              width: 20px;
              height: 20px;
            }
            .item-support-num {
              margin-left: 5px;
              margin-right: 3px;
              margin-top: 3px;
              color: #888;
            }
          }
        }
        .item-main {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          padding: 0 20px 10px 42px;
          .item-content {
            margin-bottom: 3px;
            font-size: 16px;
          }
          .item-comment-box {
            .comment-less-box {
              .comment-less-for-box {
                padding: 3px 0;
                .comment-item {
                  .comment-name {
                    color: #4299e5;
                  }
                  .comment-content {
                    padding: 0 12px 0 6px;
                  }
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
          padding-bottom: 50px;
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
      bottom: 1px;
      border-top: 1px solid #bbb;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left:10px;
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
        width: 50px;
        height: 102%;
        border-radius: 2px;
        text-align: center;
        background-color: #5676FF;
        color: #fff;
      }
    }
    .post-comment-textarea-container {
      position: fixed;
      left: 0;
      bottom: 0;
      border-top: 1px solid #bbb;
      width: 100%;
      height: 200px;
      padding: 0 10px;
      box-sizing: border-box;
      textarea {
        outline: none;
        border-width: 0;
      }
      .post-textarea {
        padding: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 60px);
        font-size: 14px;
        outline: none;
        resize: none;
      }
      .textarea-comment-submit {
        float: right;
        font-size: 16px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        text-align: center;
        background-color: #5676FF;
        color: #fff;
      }
    }
  }
</style>
