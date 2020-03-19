<template>
  <div>
    <div class="input-box">
      <i class="input-icon user"></i>
    <input class="text-input" v-model="nickname" placeholder="输入昵称" type="text">
    <span class="code-btn">选择头像</span>

    </div>
    <div class="input-box">
      <i class="input-icon lock"></i>
    <input class="text-input" v-model="pwd" placeholder="输入密码" type="text">
    </div>
    <div class="btn-box">
      <div @click="handleSubmit" class="btn">确定</div>
    </div>
    <!-- <div class="forget-pwd">
      <span class="link">忘记密码?</span>
    </div> -->
  </div>
</template>

<script>
import api from '@/api'
import { Toast } from 'mint-ui';

export default {
  data(){
    return{
      nickname:'',
      pwd:'',
      avatar:'https://static001.geekbang.org/resource/image/15/be/1538be68a5f597ab1baf179a4a724ebe.jpg?x-oss-process=image/resize,m_fill,h_212,w_330',
    }
  },
  mounted(){
    document.title='填写用户信息'
    this.phone=this.$route.params.phone
    console.log('phone',this.phone)
    // 如果是用户自己手动进来的，则跳回到prereg页面
    if(!this.phone){
      this.$router.push('prereg')
    }
  },
  methods:{
    handleSubmit(){
      console.log(this.$store.state.userInfo.userInfo)
      if(this.nickname.trim().length===0){
        return
      }
      if(this.pwd.trim().length===0){
        return
      }
      let obj={
        phone:this.phone.trim(),
        zone:'86',
        pwd:this.pwd.trim(),
        nickname:this.nickname.trim(),
        avatar:this.avatar
      }
      api.reg(obj).then(res=>{
        if(res.result==0){
          console.log('reg success',res)
          this.$store.dispatch('userInfo/setUserInfo',res)
          this.$router.push('balist')
        }else {
          Toast(res.msg)
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
  }
  .input-icon{
    display: inline-block;
    position: absolute;
    // left: 0;
    top: 12px;
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
      &.right{
        right: 10px;
      }
    &.user{
      background-image:url(../images/user.png);
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
