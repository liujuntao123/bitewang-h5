<template>
  <div>
    <!-- <Header 
      class="header-fixed" 
      :is-show-back="true" 
      :title="'用户登录'"
    /> -->
    <div class="input-box">
      <i class="input-icon mobile"></i>
    <input class="text-input" v-model="phone" placeholder="输入手机号" type="text">

    </div>
    <div class="input-box">
      <i class="input-icon lock"></i>
    <input class="text-input" v-model="pwd" placeholder="输入密码" :type="!isShowPwd?'password':'text'">
    <i class="input-icon right" @click="handleSwitchShowPwd" :class="{eye:!isShowPwd,'eye-close':isShowPwd}"></i>
    </div>
    <div class="btn-box">
      <div @click="handleSubmit" class="btn">登录</div>
    </div>
    <div class="forget-pwd">
      <span class="link">忘记密码?</span>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { Toast } from 'mint-ui';
import Header from '@/components/header'

export default {
  components:{
    Header,
  },
  data(){
    return{
      phone:'',
      pwd:'',
      isShowPwd:false,
      isSubmit:false
    }
  },
  mounted(){
    document.title='登录'
  },
  methods:{
    handleSwitchShowPwd(){
      this.isShowPwd=!this.isShowPwd
    },
    handleSubmit(){
      if(this.isSubmit){
        return
      }
      if(this.phone.trim().length===0){
        return
      }
      if(this.pwd.trim().length===0){
        return
      }
      let obj={
        phone:this.phone.trim(),
        zone:'86',
        pwd:this.pwd
      }
      this.isSubmit=true
      api.login(obj).then(res=>{
        this.isSubmit=false
        if(res.result==0){
          console.log('login success',res)
          this.$store.dispatch('userInfo/setUserInfo',res)
          this.$router.push('balist')
          // window.location.reload()
        }else {
          Toast('登录失败，账号或者密码错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.input-box{
  padding: 10px;
  position: relative;
  .input-icon{
    display: inline-block;
    position: absolute;
    // left: 0;
    top: 15px;
    width: 20px;
    height: 25px;
    background-size: 20px 25px;
      &.right{
        right: 10px;
      }
    &.mobile{
      background-image:url(../images/mobile.png);
    }
    &.lock{
      background-image: url(../images/pwd.png);
    }
    &.eye{
      background-image:url(../images/eye_close.png);
    }
    &.eye-close{
      background-image:url(../images/eye_open.png);
    }
  }
}
.text-input{
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  padding-left: 30px;
  border: none;
  border-bottom: 3px solid #cd5c5c;
  font-size: 16px;
  &:focus{
    outline: none;
  }
}
.btn-box{
  padding: 10px;
  .btn{
    @height:50px;
    height: @height;
    line-height: @height;
    text-align: center;
    color: #fff;
    background: #cd5c5c;
    border-radius: 5px;
    font-size: 16px;
  }

}
.forget-pwd{
  text-align: center;
  padding-top: 20px;
  .link{
    color:#0084e4;
  }
}
</style>
