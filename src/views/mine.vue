<template>
  <div class="mine-container">
    <Header title="我" class="header-fixed" />
    <div class="mine-content">
      <div class="avatar" @click="handleMineInfo">
        <img
          :src="avatar"
          alt=""
        >
      </div>
      <div class="name" @click="handleMineInfo">
        {{ nickname }}
      </div>
      <div class="brief">
        {{ profile }}
      </div>
      <div class="info">
        <div class="info-item" @click="handleTheme">
          <p class="info-value">{{ topic_count }}</p>
          <p class="info-title">主题</p>
        </div>
        <div class="info-item" @click="handleComment">
          <p class="info-value">{{ comment_count }}</p>
          <p class="info-title">评论</p>
        </div>
        <div class="info-item">
          <p class="info-value">{{ score }}</p>
          <p class="info-title">积分</p>
        </div>
      </div>
      <div class="list">
        <div class="item">检测更新</div>
        <div class="item">联系我们</div>
        <div class="item">关于</div>
      </div>
    </div>
    <div class="footer">
      <a href="javascript:;" class="logout" @click="handleLogout">退出登录</a>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import api from '@/api'

export default {
  components: {
    Header
  },
  data(){
    return{
      nickname:'肯德基',
      avatar:'https://static001.geekbang.org/resource/image/15/be/1538be68a5f597ab1baf179a4a724ebe.jpg?x-oss-process=image/resize,m_fill,h_212,w_330',
      profile:'奋斗啦放假放假了卡就哭了领导看见啊倒计时打发了；进口量大放大了空间啊大家奋斗卡觉得撒娇放大说了空间里的打开链接撒娇',
      topic_count: 999999999993333333333333399444,
      comment_count: 10,
      score: 790,
    }
  },
  methods:{
    handleMineInfo () {
      this.$router.push({path: '/mineInfo'})
    },
    handleTheme () {
      this.$router.push({path: '/myTheme'})
    },
    handleComment () {
      this.$router.push({path: '/myComment'})
    },
    handleLogout () {
      console.log('退出登录')
    }
  }
}
</script>

<style lang="less" scoped>
  .header-fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .mine-container{
    font-size: 14px;
    .mine-content{
      margin-top: 50px;
      padding: 10px 0;
      word-break: break-all;
    }
    .avatar{
      width: 60px;
      height: 60px;
      margin: 10px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .name{
      padding: 0 10px;
      text-align: center;
    }
    .brief{
      font-size: 13px;
      color: #757575;
      padding: 10px 45px 20px 45px;
    }
    .info{
      overflow: hidden;
      .info-item{
        float: left;
        width: 33.33%;
        text-align: center;
      }
      .info-value{
        padding: 0 10px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .info-title{
        color: #757575;
      }
    }
    .list{
      border-top: 1px solid #ddd;
      margin-top: 20px;
      .item{
        display: block;
        color: #000;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        padding: 0 15px;
        &:active{
          background: #f5f5f5;
        }
      }
    }
    .footer{
      padding: 30px 10px 10px 10px;
    }
    .logout{
      display: block;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background: #de4d53;
      border-radius: 5px;
    }
  }
</style>