<template>
  <div class="container">
    <!-- <Head :title="baInfo.name" :isShowBack="true"></Head> -->
    <div v-show="loaded&&(hasTutorials||hasWeibo||hasTwitter||hasBtcTalk)" class="content">
      <div class="tab-bar">
        <div
          v-if="hasTutorials"
          @click="handleClickPlat('tutorials')"
          class="tab"
          :class="{isActive:currPlat=='tutorials'}"
        >文章</div>
        <div
          v-if="hasWeibo"
          @click="handleClickPlat('weibo')"
          class="tab"
          :class="{isActive:currPlat=='weibo'}"
        >微博</div>
        <div
          v-if="hasTwitter"
          @click="handleClickPlat('twitter')"
          class="tab"
          :class="{isActive:currPlat=='twitter'}"
        >推特</div>
        <div
          v-if="hasBtcTalk"
          @click="handleClickPlat('BtcTalk')"
          class="tab"
          :class="{isActive:currPlat=='BtcTalk'}"
        >BtcTalk</div>
      </div>
      <Tutorails :isShow="hasTutorials" v-show="currPlat=='tutorials'" :tutorials="baInfo.articles"></Tutorails>
      <Weibo
        :isShow="hasWeibo"
        v-show="currPlat=='weibo'"
        :weiboUsers="baInfo.weiboUsers"
        :weiboKeywords="baInfo.weiboKeywords"
        :weiboKeywordBeginTime="baInfo.weiboKeywordBeginTime"
      ></Weibo>
      <Twitter
        :isShow="hasTwitter"
        v-show="currPlat=='twitter'"
        :twitterUsers="baInfo.twitterUsers"
      ></Twitter>
      <Btctalk :isShow="hasBtcTalk" v-show="currPlat=='BtcTalk'" :btctalkTid="baInfo.btctalkTid"></Btctalk>
    </div>
    <div
      v-show="loaded&&!(hasTutorials||hasWeibo||hasTwitter||hasBtcTalk)"
      class="empty-content"
    >暂无数据</div>
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
import onlineconfig from '@/utils/onlineconfig'

const version = '0.12'

export default {
  components: {
    Head,
    Tutorails,
    Weibo,
    Twitter,
    Btctalk,
  },
  data() {
    return {
      id: '',
      baInfo: {},
      argId: -1, // 可以理解为页码
      weiboContentList: [],
      curr_wUid: '',
      curr_tUid: '',
      currPlat: '',
      busy: true,
      curr_Did: '', // 微博详情id
      version,
      hasTutorials: false,
      hasWeibo: false,
      hasTwitter: false,
      hasBtcTalk: false,
      loaded: false,
    }
  },
  mounted() {
    console.log(this.$route.query)
    this.id = this.$route.query.id
    document.title = this.$route.query.ba_name
    window.d = this.$route.query.d
    console.log('window.d', window.d)
    // this.getBaInfo()
    this.getBlackList()
  },
  methods: {
    getBlackList() {
      onlineconfig.getOnlineConfig().then(config => {
        console.log('config', config)
        this.blacklist = onlineconfig.findBlackColumns(config)
        console.log('blacklist', this.blacklist)
        this.getBaInfo()
      })
    },
    // timeFormat(timestamp) {
    //   return new moment(timestamp).format('YYYY-MM-DD')
    // },
    notIn(item) {
      return this.blacklist.indexOf(item) == -1
    },
    getBaInfo() {
      api
        .getBaInfo(this.id)
        .then(res => {
          this.loaded = true
          this.baInfo = res.ba
          this.baInfo.weiboUsers = dataUtil.sortByLevel(
            this.baInfo.weiboUsers,
            'wLevel'
          )
          this.baInfo.twitterUsers = dataUtil.sortByLevel(
            this.baInfo.twitterUsers,
            'tLevel'
          )
          this.hasTutorials =
            this.notIn('tutorials') &&
            this.baInfo.articles &&
            this.baInfo.articles.length > 0
          this.hasWeibo =
            this.notIn('weibo') &&
            ((this.baInfo.weiboUsers && this.baInfo.weiboUsers.length > 0) ||
              (this.baInfo.weiboKeywords &&
                this.baInfo.weiboKeywords.length > 0))
          this.hasTwitter =
            this.notIn('twitter') &&
            this.baInfo.twitterUsers &&
            this.baInfo.twitterUsers.length > 0
          this.hasBtcTalk =
            this.notIn('btctalk') &&
            this.baInfo.btctalkTid &&
            this.baInfo.btctalkTid > 0
          if (this.hasBtcTalk) {
            this.currPlat = 'BtcTalk'
          }
          if (this.hasTwitter) {
            this.currPlat = 'twitter'
          }
          if (this.hasWeibo) {
            this.currPlat = 'weibo'
          }
          if (this.hasTutorials) {
            this.currPlat = 'tutorials'
          }
        })
        .catch(err => {
          // 如果接口调用失败，则返回原来的页面
          wx.miniProgram.navigateBack()
        })
    },
    handleClickPlat(plat) {
      this.currPlat = plat
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
  padding: 0.5rem 0.8rem;
  &.isActive {
    border-bottom: 5px solid #c0464a;
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
    color: #c0464a;
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
.empty-content {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
