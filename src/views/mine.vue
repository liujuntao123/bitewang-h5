<template>
  <div class="mine-container">
    <Header title="我" class="header-fixed" v-if="isMine"/>
    <Header :title="currentInfo.nickname" :is-show-back="true"  class="header-fixed" v-else/>
    <div class="mine-content">
      <div class="avatar" @click="handleUserInfo">
        <img
          :src="currentInfo.avatar"
          alt=""
        >
      </div>
      <div class="name" @click="handleUserInfo">
        {{ currentInfo.nickname }}
      </div>
      <div class="brief">
        {{ currentInfo.profile }}
      </div>
      <div class="info">
        <div class="info-item" @click="handleTheme">
          <p class="info-value">{{ currentInfo.topicCount || '0' }}</p>
          <p class="info-title">主题</p>
        </div>
        <div class="info-item" @click="handleComment">
          <p class="info-value">{{ currentInfo.commentCount || '0' }}</p>
          <p class="info-title">评论</p>
        </div>
        <div class="info-item">
          <p class="info-value">{{ currentInfo.score || '0' }}</p>
          <p class="info-title">积分</p>
        </div>
      </div>
      <div class="list" v-if="isMine">
        <div class="item">检测更新</div>
        <div class="item">联系我们</div>
        <div class="item">关于</div>
      </div>
      <div class="footer" v-if="isMine">
        <a href="javascript:;" class="logout" @click="handleLogout">退出登录</a>
      </div>
    </div>
   
    <TabBar v-if="isMine"/>
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
      uid: '',
      isMine: false, //是否是'我的'
      currentInfo: {
        uid: '',
        nickname: '',
        avatar: '',
        profile: '',
        topicCount: '',
        commentCount: '',
        score: '',
        state: ''
      }
    }
  },
  computed: {
    ...mapGetters(
      {userInfo:'userInfo/getUserInfo'}
    )
  },
  created () {
    this.uid = this.$route.query.uid || this.userInfo.uid
    // 通过判断query的id来区分是不是“我的”)
    if(!this.$route.query.uid){
      this.isMine = true
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods:{
    getUserInfo () {
      api.userInfo({
        sid: this.userInfo.sid,
        uid: this.uid
      }).then(res=>{
        if(this.isMine){
          let info = {...this.userInfo, res}
          this.$store.dispatch('userInfo/setUserInfo', info)
        }
        this.currentInfo.nickname = res.nickname
        this.currentInfo.avatar = res.avatar
        this.currentInfo.profile = res.profile
        this.currentInfo.topicCount = res.topicCount
        this.currentInfo.commentCount = res.commentCount
        this.currentInfo.score = res.score
        this.currentInfo.state = res.state
        
      })
    },
    handleUserInfo () {
      this.$router.push({path: '/userInfo', query: {uid: this.uid, name: this.currentInfo.nickname}})
    },
    handleTheme () {
      this.$router.push({path: '/userTheme', query: {uid: this.uid, name: this.currentInfo.nickname}})
    },
    handleComment () {
      this.$router.push({path: '/userComment', query: {uid: this.uid, name: this.currentInfo.nickname}})
    },
    handleLogout () {
      console.log('退出登录')
      // 移除所有
      localStorage.clear();
      window.location.reload();
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