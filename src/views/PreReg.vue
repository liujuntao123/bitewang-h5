<template>
  <div>
    <!-- <Header 
      class="header-fixed" 
      :is-show-back="true" 
      :title="'注册新用户'"
    /> -->
    <div class="input-box">
      <i class="input-icon mobile"></i>
    <input class="text-input" v-model="phone" placeholder="输入手机号" type="text">
    <span class="code-btn">
      <span v-if="!isSendCode" @click="handleGetCode" class="link">
        获取验证码
      </span>
      <span v-else>
        {{time}}
      </span>
      </span>

    </div>
    <div class="input-box">
      <i class="input-icon info"></i>
    <input class="text-input" v-model="code" placeholder="输入验证码" type="text">
    </div>
    <div class="btn-box">
      <div class="btn" @click="handleSubmit">确定</div>
    </div>
    <!-- <div class="forget-pwd">
      <span class="link">收不到验证码?</span>
    </div> -->
  </div>
</template>

<script>
import api from '@/api'
import utils from '@/utils/data'
import { Toast } from 'mint-ui';
import validate from '@/utils/validate'
import Header from '@/components/header'

export default {
  components:{
    // Toast
    Header,
  },
  data(){
    return{
      phone:'',
      code:'',
      isSendCode:false,
      time:60,
      isSubmit:false,
    }
  },
  mounted(){
    document.title='注册'
  },
  methods:{
    // 验证手机号是否被注册过
    checkMobile(obj){
      return api.checkMobile(obj)
    },
    async handleGetCode(){
      if(this.phone.trim().length ==0){
        return Toast('请输入手机号')
      }
      if(!validate.checkPhone(this.phone.trim())){
        return Toast('请输入正确格式手机号')
      }
      if(this.isSendCode){
        return
      }
      let result= await this.checkMobile({phone:this.phone.trim(),zone:'86'})
      if(result.reged){
        console.log('the mobile has been reged')
        return Toast('该手机号已被注册')
      }
      this.isSendCode=true
      this.time=60
      const timeCounter=()=>{
        if(this.time>1){
          this.time--
        }else {
          this.isSendCode=false
        }
        setTimeout(() => {
          timeCounter()
        }, 1000);
      }
      timeCounter()
      let deviceId=localStorage.getItem('deviceId')
      if(!deviceId){
        deviceId=utils.randomWord(false,32)
        localStorage.setItem('deviceId',deviceId)
      }
      let obj={
        phone:this.phone.trim(),
        zone:'86',
        deviceId
      }
      api.mobileSms(obj).then(res=>{
        if(res.result==0){
          Toast('发送验证码成功')
        }
      })
    },
    handleSubmit(){
      if(this.isSubmit){
        return
      }
      if(this.phone.trim().length ==0){
        return Toast('请输入手机号')
      }
      if(!validate.checkPhone(this.phone.trim())){
        return Toast('请输入正确格式手机号')
      }
      if(this.code.trim().length ==0){
        return Toast('请输入验证码')
      }
      let obj={
        phone:this.phone.trim(),
        zone:'86',
        code:this.code.trim()
      }
      this.isSubmit=true
      api.preReg(obj).then(res=>{
        this.isSubmit = false
        if(res.result==0){
          // Toast('注册成功')
          this.$router.push({name:'reg',params:{phone:this.phone.trim()}})
          }else {
            Toast('验证码错误')
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
  .code-btn{
    position: absolute;
    right: 0;
    top: 18px;
    width: 100px;
    color: #0084e4;
    padding-right: 20px;
    text-align: right;
  }
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
    &.info{
      background-image: url(../images/vcode.png);
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
}
    .link{
      color:#0084e4;
    }
</style>
