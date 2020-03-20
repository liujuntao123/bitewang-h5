<template>
  <div class="mine-container">
    <Header title="我" class="header-fixed" />
    <div class="mine-content">
      <div class="avatar" @click="handleMineInfo">
        <img
          :src="userInfo.avatar"
          alt=""
        >
      </div>
      <div class="name" @click="handleMineInfo">
        {{ userInfo.nickname }}
      </div>
      <div class="brief">
        {{ userInfo.profile }}
      </div>
      <div class="info">
        <div class="info-item" @click="handleTheme">
          <p class="info-value">{{ userInfo.topicCount || '0' }}</p>
          <p class="info-title">主题</p>
        </div>
        <div class="info-item" @click="handleComment">
          <p class="info-value">{{ userInfo.commentCount || '0' }}</p>
          <p class="info-title">评论</p>
        </div>
        <div class="info-item">
          <p class="info-value">{{ userInfo.score || '0' }}</p>
          <p class="info-title">积分</p>
        </div>
      </div>
      <div class="list">
        <div class="item">检测更新</div>
        <div class="item">联系我们</div>
        <div class="item">关于</div>
      </div>
      <div class="footer">
        <a href="javascript:;" class="logout" @click="handleLogout">退出登录</a>
      </div>
    </div>
   
    <TabBar title="我" class="" />
  </div>
</template>

<script>
import Header from '@/components/header'
import TabBar from '@/components/tabBar'
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    TabBar
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters(
      {userInfo:'userInfo/getUserInfo'}
    )
  },
  mounted () {
    this.getUserInfo()
  },
  methods:{
    getUserInfo () {
      api.userInfo({
        sid: this.userInfo.sid,
        uid: this.userInfo.uid
      }).then(res=>{
        let info = this.userInfo
        info.nickname = res.nickname
        info.avatar = res.avatar
        info.profile = res.profile
        info.topicCount = res.topicCount
        info.commentCount = res.commentCount
        info.score = res.score
        info.state = res.state
        this.$store.dispatch('userInfo/setUserInfo',info)
      })
    },
    handleMineInfo () {
      this.$router.push({path: '/mineInfo'})
    },
    handleTheme () {
      this.$router.push({path: '/myTheme', query: {uid: this.userInfo.uid}})
    },
    handleComment () {
      this.$router.push({path: '/myComment', query: {uid: this.userInfo.uid}})
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
      margin: 50px 0;
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