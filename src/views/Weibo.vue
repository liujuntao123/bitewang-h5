<template>
  <div class="content-container">
    <div class="user-list">
      <div :class="{active:curr_wUid==''}" @click="handleClickAll" class="user-item">
        <div>
          <img class="avatar" src="../images/weibo.png" alt="">
        </div>
        <div class="text">综合</div>
      </div>
      <div
        @click="handleClickUser(item)"
        v-for="(item, index) in weiboUsers"
        :key="index"
        class="user-item"
        :class="{active:curr_wUid==item.wUid}"
      >
        <div>
          <img class="avatar" :src="item.wAvatar" alt="">
        </div>
        <div class="text">{{ item.wNickname }}</div>
      </div>
    </div>
    <div
      v-if="!curr_wUid&&!curr_Did"
      class="content-box"
      v-infinite-scroll="getWeiboList"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div
        class="content-item"
        @click="curr_Did=item.id"
        v-for="(item, index) in weiboContentList"
        :key="index"
      >
        <div class="user-info">
          <div class="avatar-box">
            <img class="avatar" :src="item.userAvatar" alt="">
          </div>
          <div class="text">
            <div class="nickname">{{ item.userNickname }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <div class="main-content">
          <div v-html="item.content" class="text">{{ item.content }}</div>
          <!-- <div class="img-container" v-if="item.imageList&&item.imageList.length>0">
            <div class="img-box">
              <img
                class="content-img"
                v-for="(it, index) in item.imageList"
                :key="index"
                :src="it"
                alt=""
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <iframe
      class="iframe-box"
      v-if="curr_Did"
      :src="'https://m.weibo.cn/detail/'+curr_Did"
      frameborder="0"
    ></iframe>
    <iframe
      class="iframe-box"
      v-if="curr_wUid"
      :src="'https://m.weibo.cn/u/'+curr_wUid"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import api from '@/api'

export default {
  props: {
    weiboUsers: [Array],
    weiboKeywords: [Array],
    weiboKeywordBeginTime:[Number],
    isShow:[Boolean],
  },
  data() {
    return {
      argId: -1, // 可以理解为页码
      weiboContentList: [],
      curr_wUid: '',
      curr_tUid: '',
      currPlat: 'weibo',
      busy: true,
      curr_Did: '', // 微博详情id
    }
  },
  watch: {
    weiboUsers: function() {},
    weiboKeywords: function(val) {
      if (val && val.length > 0) {
        if(!this.isShow){
          return
        }
        this.getWeiboList()
      }
    }
  },
  methods: {
    getWeiboList() {
      let data = {
        argId: this.argId,
        keywords: (this.weiboKeywords || []).map(item => item.wKeyword),
        weiboKeywordBeginTime: this.weiboKeywordBeginTime
      }
      api.getWeiboListAll(data).then(res => {
        this.weiboContentList = this.weiboContentList.concat(res.weiboList)
        if (res.resultId > 0) {
          this.argId = res.resultId
          this.busy = false
        } else {
          this.busy = true
        }
      })
    },
    handleClickUser(item) {
      console.log(item)
      this.curr_wUid = item.wUid
    },
    handleClickAll() {
      if (!this.curr_wUid && !this.curr_Did) {
        return
      }
      this.curr_wUid = ''
      this.curr_Did = ''
      this.argId = -1
      this.getWeiboList()
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background: #dddddd;
}
.iframe-box {
  width: 100%;
  height: calc(100vh - 144px);
}
.content-container {
  // height: 80rpx;
}
.tab {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  &.isActive {
    border-bottom: 5px solid #C0464A;
  }
}
::-webkit-scrollbar.user-list {
  width: 0;
  height: 0;
  color: transparent;
}
.user-list {
  padding: 0.6rem;
  background: #dddddd;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.user-item {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  padding: 0 0.6rem;
  &.active {
    color: #C0464A;
  }
  .text {
    // padding-top: 0.3rem;
  }
}
.avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
}
.content-box {
  height: calc(100vh - 144px);
  overflow: auto;
  &.tutorials {
    height: calc(100vh - 42px);
  }
}
.content-item {
  background: #ffffff;
  margin-bottom: 0.6rem;
  &.tutorials {
    padding: 0.8rem;
    margin-bottom: 0.1rem;
    .tutorials-link {
      display: inline-block;
      width: 15rem;
      overflow: hidden;
      vertical-align: middle;
    }
  }
}
.user-info {
  display: flex;
  .avatar-box {
    text-align: center;
    padding: 0.6rem;
    padding-bottom: 0;
    padding-top: .8rem;
  }
  .text {
    // padding: 0.4rem 0;
    // padding-left: 0.6rem;
    .nickname {
      font-size: 14px;
      padding: 0.2rem 0;
      width: 250px;
      padding-top: .8rem;
      overflow: hidden;
    }
    .time {
      font-size: 12px;
      color: #999;
      padding: 5rpx 0;
    }
  }
}
.content-img {
  width: 7rem;
  vertical-align: top;
  // height: 10rem;
}
.main-content {
  padding: 0 1rem;
  font-size: 16px;
  .text{
    padding-bottom: .8rem;
    word-break: break-all;
  }
  .img-container {
    padding: 0.8rem 0;
    padding-top: 0;
    display: flex;
    .content-img {
      margin-right: 0.8rem;
    }
  }
}
</style>


