<template>
  <div class="content-container">
    <div class="user-list">
      <div
        @click="handleClickUser(item)"
        v-for="(item, index) in twitterUsers"
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
    <div
      class="content-box"
      v-infinite-scroll="getTwitterList"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div class="content-item" v-for="(item, index) in contentList" :key="index">
        <div class="user-info">
          <!-- <div class="avatar-box">
            <img class="avatar" :src="item.userAvatar" alt="">
          </div>-->
          <div class="text user">
            <div class="nickname">{{ item.userNickname }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <div class="main-content">
          <div
            v-if="item.translateType!='translate'"
            v-html="item.content"
            class="text"
          >{{ item.content }}</div>
          <div v-if="item.translateType!='origin'&&item.chContent" class="translate-text">已翻译</div>
          <div
            v-if="item.translateType!='origin'&&item.chContent"
            v-html="item.chContent"
            class="text"
          >{{ item.chContent }}</div>
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
    <div class="refresh-btn" @click="handleRefresh">
      <img src="../images/refresh.png" alt="" srcset="">
    </div>
    <div class="setting-btn" @click="handleSetting">
      <img src="../images/setting.png" alt="" srcset="">
    </div>
    <Setting v-if="isShowSetting" :showSort="false" :sort="sort" :translateType="translateType" @handleComfirmSetting="handleComfirmSetting"></Setting>
  </div>
</template>

<script>
import api from '@/api'
import Setting from '@/components/Setting'
export default {
  components: { Setting },
  props: {
    twitterUsers: [Array],
    isShow:[Boolean],
  },
  data() {
    return {
      contentList: [],
      curr_tUid: '',
      argId: -1, // 可以理解为页码
      busy: true,
      isShowSetting: false,
      sort: 'asc',
      translateType: 'all',
    }
  },
  watch: {
    twitterUsers: function(val) {
      // console.log('val>>>>', val)
      if(!this.isShow){
        return
      }
      if(val.length>0){
        this.handleClickUser(val[0])
      }
    },
  },
  methods: {
    handleRefresh(){
      this.argId = -1
      this.contentList = []
      this.getTwitterList()
    },
    handleClickUser(row) {
      this.curr_tUid = row.tUid
      this.getTwitterList()
    },
    getTwitterList() {
      let data = {
        argId: this.argId,
        uid: this.curr_tUid,
      }
      api.getTwitterList(data).then(res => {
        this.contentList = this.contentList.concat(res.twitterList)
        this.contentList.forEach(item => {
          item.translateType = this.translateType
        })
        if (res.resultId > 0) {
          this.argId = res.resultId
          this.busy = false
        } else {
          this.busy = true
        }
      })
    },
    handleSetting() {
      this.isShowSetting = true
    },
    handleComfirmSetting({ sort, translateType }) {
      this.sort = sort
      this.translateType = translateType
      this.isShowSetting = false
      this.argId = -1
      this.contentList = []
      this.getTwitterList()
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background: #dddddd;
  position: relative;
}
.setting-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  img {
    width: 50px;
    height: 50px;
  }
}
.refresh-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  img {
    width: 50px;
    height: 50px;
  }
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
  }
  .text {
    padding-top: 0.8rem;
    padding-bottom: .2rem;
    padding-left: 1rem;
    &.user {
      display: flex;
      height: 1rem;
      line-height: 1rem;
    }
    .nickname {
      font-size: 14px;
      font-weight: bold;
      margin-right: 1rem;
      overflow: hidden;
      width: 250px;
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
.translate-text {
  color: #999;
  padding: .6rem 0;
  padding-top: 0;
  font-size: 14px;
}
</style>

