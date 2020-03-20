<template>
  <div class="post-details-page">
    <Header
      class="header-fixed" 
      :is-show-back="true" 
      :title="headName"
    />
    <div class="post-detail-container">
      <PostsItem :item="item" />
    </div>
    <div class="post-comment-container">
      <input class="comment-input" v-model="commentText" type="text">
      <div class="comment-submit" @click="submitComment">发表</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Header from '@/components/header'
import PostsItem from '@/components/postsitem'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      headName: '帖子详情',
      item: {},
      commentText: ''
    }
  },
  computed: {
    ...mapGetters(
      {sid: 'userInfo/getSid'}
    )
  },
  components: {
    Header,
    PostsItem
  },
  mounted() {
    this.item = this.$route.params.itemDetail
  },
  methods: {
    submitComment() {
      if(this.commentText.trim().length === 0) {
        Toast('评论内容不能为空')
        return
      }
      let commentObj = {
        sid: this.sid,
        tid: 2040,
        content: this.commentText
      }
      this.commentText = ''
      api.NewComment(commentObj).then(res => {
        console.log('comment res:', res)
      })
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
      .comment-submit {
        width: 40px;
        height: 100%;
        text-align: center;
      }
    }
  }
</style>
