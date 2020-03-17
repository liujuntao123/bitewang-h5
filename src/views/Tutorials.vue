<template>
  <div class="content-container">
        <div class="content-box tutorials">
          <div
            class="content-item tutorials"
            v-for="(item, index) in tutorials"
            :key="index"
          >
            <a class="tutorials-link" :href="item.url">{{ `[${articleCategoryList[item.category]}] ${item.title}`}}</a>
            <!-- <span>{{ timeFormat(item.time) }}</span> -->
          </div>
        </div>
      </div>
</template>

<script>
import moment from '@/utils/moment'

const articleCategoryList={
  analysis:'分析',
  course:'教程',
  summary:'简介',
  other:'其他',
  news:'新闻'
}

export default {
  props:{
    tutorials: [Array]
  },
  data(){
    return {
      articleCategoryList
    }
  },
  methods: {
    timeFormat(timestamp) {
      return new moment(timestamp).format('YYYY-MM-DD')
    },
  }
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
  .text{
    padding-bottom: .8rem;
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

