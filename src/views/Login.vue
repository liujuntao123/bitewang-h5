<template>
  <div>
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

export default {
  data(){
    return{
      phone:'',
      pwd:'',
      isShowPwd:false,
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
      api.login(obj).then(res=>{
        console.log('login success')
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
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
      &.right{
        right: 10px;
      }
    &.mobile{
      background-image:url(../images/mobile.png);
    }
    &.lock{
      background-image: url(../images/lock.png);
    }
    &.eye{
      background-image:url(../images/eye-fill.png);
    }
    &.eye-close{
      background-image:url(../images/eye-close-fill.png);
    }
  }
}
.text-input{
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  padding-left: 40px;
  border: none;
  border-bottom: 3px solid #de4d53;
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
    background: #de4d53;
    border-radius: 5px;
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
