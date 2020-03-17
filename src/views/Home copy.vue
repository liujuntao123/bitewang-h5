<template>
  <div class="container">
    <!-- <Head :title="baInfo.name" :isShowBack="true"></Head> -->
    <div class="content">
      <div class="tab-bar">
        <div
          @click="handleClickPlat('tutorials')"
          class="tab"
          :class="{isActive:currPlat=='tutorials'}"
        >教程</div>
        <div @click="handleClickPlat('weibo')" class="tab" :class="{isActive:currPlat=='weibo'}">微博{{version}}</div>
        <div @click="handleClickPlat('tuite')" class="tab" :class="{isActive:currPlat=='twitter'}">推特</div>
        <div
          @click="handleClickPlat('BtcTalk')"
          class="tab"
          :class="{isActive:currPlat=='BtcTalk'}"
        >BtcTalk</div>
      </div>
      <div v-show="currPlat=='tutorials'" class="content-container">
        <div class="content-box tutorials">
          <div
            class="content-item tutorials"
            v-for="(item, index) in baInfo.tutorials"
            :key="index"
          >
            <a class="tutorials-link" :href="item.url">{{ item.title }}</a>
            <span>{{ timeFormat(item.time) }}</span>
          </div>
        </div>
      </div>
      <div v-show="currPlat=='weibo'" class="content-container">
        <div class="user-list">
          <div :class="{active:curr_wUid==''}" @click="handleClickAll" class="user-item">
            <div>
              <img class="avatar" src="../images/weibo.png" alt="">
            </div>
            <div class="text">综合</div>
          </div>
          <div
            @click="handleClickUser(item)"
            v-for="(item, index) in baInfo.weiboUsers"
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
              <div class="img-container">
                <div class="img-box">
                  <img
                    class="content-img"
                    v-for="(it, index) in item.imageList"
                    :key="index"
                    :src="it"
                    alt=""
                  >
                </div>
              </div>
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
      <div v-show="currPlat=='tuite'" class="content-container">
        <div class="user-list">
          <!-- <div :class="{active:uid==''}" @click="handleClickAll" class="user-item">
            <div>
              <img class="avatar" src="../images/weibo.png" alt="">
            </div>
            <div class="text">综合</div>
          </div>-->
          <div
            @click="handleClickUser(item)"
            v-for="(item, index) in baInfo.twitterUsers"
            :key="index"
            class="user-item"
            :class="{active:curr_tUid==item.tUid}"
          >
            <div>
              <img class="avatar" :src="item.tAvatar" alt="">
            </div>
            <div class="text">{{ item.tNickname }}</div>
          </div>
        </div>
        <!-- <iframe
          class="iframe-box"
          v-if="curr_tUid"
          :src="'https://m.weibo.cn/u/'+curr_tUid"
          frameborder="0"
        >
        </iframe>-->

        <div class="content-box">
          <div class="content-item" v-for="(item, index) in weiboContentList" :key="index">
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
              <div class="img-container">
                <div class="img-box">
                  <img
                    class="content-img"
                    v-for="(it, index) in item.imageList"
                    :key="index"
                    :src="it"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currPlat=='BtcTalk'" class="content-container">
        <div class="user-list">
          <div :class="{active:curr_wUid==''}" @click="handleClickAll" class="user-item">
            <div>
              <img class="avatar" src="../images/weibo.png" alt="">
            </div>
            <div class="text">综合</div>
          </div>
          <div
            @click="handleClickUser(item)"
            v-for="(item, index) in baInfo.weiboUsers"
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
        <!-- <iframe
          class="iframe-box"
          v-if="curr_wUid"
          :src="'https://m.weibo.cn/u/'+curr_wUid"
          frameborder="0"
        />-->

        <div class="content-box">
          <div class="content-item" v-for="(item, index) in weiboContentList" :key="index">
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
              <div class="img-container">
                <div class="img-box">
                  <img
                    class="content-img"
                    v-for="(it, index) in item.imageList"
                    :key="index"
                    :src="it"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import dataUtil from '@/utils/data'
import Head from '@/components/header'
import moment from '@/utils/moment'
import Tutorails from './Tutorials'
import Weibo from './Weibo'
import Twitter from './Twitter'
import Btctalk from './Btctalk'

const version='0.11'

export default {
  components: {
    Head,
    Tutorails,
    Weibo,
    Twitter,
    Btctalk
  },
  data() {
    return {
      id: '',
      baInfo: {},
      argId: -1, // 可以理解为页码
      weiboContentList: [],
      curr_wUid: '',
      curr_tUid: '',
      currPlat: 'weibo',
      busy: true,
      curr_Did: '', // 微博详情id
      version,
    }
  },
  mounted() {
    console.log(this.$route.query)
    this.id = this.$route.query.id
    this.getBaInfo()
  },
  methods: {
    timeFormat(timestamp) {
      return new moment(timestamp).format('YYYY-MM-DD')
    },
    getBaInfo() {
      api.getBaInfo(this.id).then(res => {
        console.log('res', res)
        this.baInfo = res.ba
        this.baInfo.weiboUsers = dataUtil.sortByLevel(
          this.baInfo.weiboUsers,
          'wLevel'
        )
        this.baInfo.twitterUsers = dataUtil.sortByLevel(
          this.baInfo.twitterUsers,
          'tLevel'
        )
        this.getWeiboList()
      })
    },
    handleClickPlat(plat) {
      this.currPlat = plat
    },
    handleClickAll() {
      if (!this.curr_wUid && !this.curr_Did) {
        return
      }
      this.curr_wUid = ''
      this.curr_Did = ''
      this.argId=-1
      this.getWeiboList()
    },
    getWeiboList() {
      let data = {
        argId: this.argId,
        keywords: (this.baInfo.weiboKeywords || []).map(item => item.wKeyword),
      }
      api.getWeiboListAll(data).then(res => {
        this.weiboContentList = this.weiboContentList.concat(res.weiboList)
        this.busy = true
        if (res.resultId > 0) {
          this.argId = res.resultId
          this.busy = false
        }
      })
    },
    handleClickUser(item) {
      console.log(item)
      this.curr_wUid = item.wUid
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
    border-bottom: 5px solid #f00;
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
    color: #f00;
  }
  .text {
    padding-top: 0.3rem;
  }
}
.avatar {
  width: 3.5rem;
  height: 3.5rem;
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
  }
  .text {
    padding: 0.8rem 0;
    padding-left: 0.6rem;
    .nickname {
      font-size: 14px;
      padding: 0.4rem 0;
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
  .img-container {
    padding: 0.8rem 0;
    display: flex;
    .content-img {
      margin-right: 0.8rem;
    }
  }
}
</style>
