<template>
  <div class="posting-page">
    <!-- <Header
      class="header-fixed"
      :is-show-back="true"
      :title="headTitle"
      :is-show-posting-btn="true"
      @submitPosting="submitPosting"
    /> -->
    <div class="posting-header">
      {{ headTitle + " - 发布主题" }} 
    </div>
    <div class="posting-container">
      <textarea class="textaret-posting" maxlength="500" v-model="textModel" name="" id="" placeholder="发表你的高见..."></textarea>
    </div>
    <div class="posting-btn-container">
      <div class="posting-btn" @click="submitPosting">
        发布
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      textModel: '',
      headTitle: '',
      bid: null
    }
  },
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid'
    })
  },
  components: {
    Header
  },
  created() {
    this.headTitle = this.$route.query.name
    this.bid = this.$route.query.bid
  },
  mounted() {
    document.title = this.headTitle
  },
  methods: {
    submitPosting() {
      let postText = this.textModel.trim()
      if (postText.length === 0) {
        return Toast('发帖内容不能为空')
      }
      let newTopicObj = {
        sid: this.sid,
        bid: this.bid,
        content: postText
      }
      api.newTopic(newTopicObj).then(res => {
        this.textModel = ''
        if(res.result === 0) {
          Toast({
            message: '发布成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({path:'/postslist',query:{
              postRefreshPostList: true,
              bid: this.bid,
              name: this.headTitle
            }})
          },1000)
        } else {
          Toast(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .posting-page {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 14px;
    box-sizing: border-box;
    .header-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
    .posting-header {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 18px;
    }
    .posting-container {
      height: 500px;
      box-sizing: border-box;
      overflow: auto;
      .textaret-posting {
        padding: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        font-size: 14px;
        outline: none;
        resize: none;
      }
      textarea {
        outline: none;
        border-width: 0;
      }
    }
    .posting-btn-container {
      height: calc(100% - 550px);
      box-sizing: border-box;
      border-top: 1px solid #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
      .posting-btn {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 50%;
        color: #fff;
        background-color: #5676FF;
      }
    }
  }
</style>


