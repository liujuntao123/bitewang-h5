<template>
  <div class="content-container">
    <div
      class="content-box btctalk"
      v-infinite-scroll="getBtcTalkList"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div class="content-item" v-for="(item, index) in contentList" :key="index">
        <div class="user-info">
          <!-- <div class="avatar-box">
            <img class="avatar" :src="item.userAvatar" alt="">
          </div>-->
          <div class="text user">
            <div class="nickname">{{ item.posterName }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <div class="main-content">
          <div
            v-if="item.translateType!='translate'&&item.quoteBody"
            
            class="quote-text"
          >{{ `Quote: ${item.quoteBody}` }}</div>
          <div
            v-if="item.translateType!='translate'"
            
            class="text"
          >{{ item.body }}</div>
          <div v-if="item.translateType!='origin'&&(item.chBody||item.chQuoteBody)" class="translate-text">已翻译</div>
          <div
            v-if="item.translateType!='origin'&&item.chQuoteBody"
            
            class="quote-text"
          >{{ `引用：${item.chQuoteBody}` }}</div>
          <div
            v-if="item.translateType!='origin'&&item.chBody"
            
            class="text"
          >{{ item.chBody }}</div>
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

    <Setting v-if="isShowSetting" :sort="sort" :translateType="translateType" @handleComfirmSetting="handleComfirmSetting"></Setting>
  </div>
</template>

<script>
import api from '@/api'
import Setting from '@/components/Setting'
export default {
  components: { Setting },
  props: {
    btctalkTid: [Number],
    isShow:[Boolean],
  },
  data() {
    return {
      contentList: [],
      curr_tUid: '',
      floor: -1, // 可以理解为页码
      busy: true,
      isShowSetting: false,
      sort: 'desc',
      translateType: 'all',
    }
  },
  watch: {
    btctalkTid: function(val) {
      // console.log('val>>>>', val)
      if(!this.isShow){
        return
      }
      if(val>0){
        this.getBtcTalkList()
      }
    },
  },
  methods: {
    handleRefresh(){
      this.floor = -1
      this.contentList = []
      this.getBtcTalkList()
    },
    getBtcTalkList() {
      let data = {
        btctalkTid: this.btctalkTid,
        floor: this.floor,
        sort: this.sort,
      }
      api.getBtcTalkList(data).then(res => {
        this.contentList = [...this.contentList, ...res.talkList]
        this.contentList.forEach(item => {
          item.translateType = this.translateType
        })
        // console.log(this.floor, res.talkList[res.talkList.length - 1].floor)
        if (res.talkList[res.talkList.length - 1].floor != this.floor) {
          this.floor = res.talkList[res.talkList.length - 1].floor
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
      this.floor = -1
      this.contentList = []
      this.getBtcTalkList()
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
  &.btctalk {
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
      width: 250px;
      overflow: hidden;
    }
    .time {
      font-size: 12px;
      color: #999;
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
.quote-text{
  background: #e8e8e8;
  padding: .5rem;
  margin: .5rem 0;
  word-break: break-all;
}
</style>

