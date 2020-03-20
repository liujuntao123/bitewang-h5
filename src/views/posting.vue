<template>
  <div class="posting-page">
    <Header
      class="header-fixed"
      :is-show-back="true"
      :title="headTitle"
      :isShowPostingBtn="true"
      @submitPosting="submitPosting"
    />
    <div class="posting-container">
      <textarea class="textaret-posting" v-model="textModel" name="" id="" placeholder="发表你的高见..."></textarea>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from './../components/header'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      textModel: ''
    }
  },
  computed: {
    ...mapGetters({
      sid: 'userInfo/getSid',
      headTitle: 'baInfo/getBaName',
      bid: 'baInfo/getBaId'
    })
  },
  components: {
    Header
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
          Toast('发布成功')
          setTimeout(() => {
            this.$router.replace({name:'postslist',params:{postRefreshPostList: true}})
          },1500)
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
    .posting-container {
      margin-top: 50px;
      height: calc(100% - 50px);
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
    }
  }
</style>


