<template>
  <div class="page-cover-page">
    <div class="logo-container">
      <img class="logo-img" src="./../images/splash_logo.png" alt="" draggable="false">
    </div>
    <div class="login-register-btn-container">
      <div class="register-btn" @click="goRegister">
        注册
      </div>
      <div class="login-btn" @click="goLogin">
        登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goRegister() {
      this.$router.push('/prereg')
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .page-cover-page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo-container {
      width: 204px;
      height: 111px;
      margin-bottom: 55px;
      .logo-img {
        width: 100%;
      }
    }
    .login-register-btn-container {
      width: 346px;
      height: 45px;
      position: absolute;
      bottom: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .register-btn,.login-btn  {
        width: 173px;
        height: 100%;
        line-height: 45px;
        text-align: center;
        border: 1px solid #bbb;
        border-radius: 4px;
        font-size: 16px;
      }
      .register-btn {
        margin-right: 6px;
        background-color: #f9f4f4;
        color: #888;
      }
      .login-btn {
        margin-left: 6px;
        color: #fff;
        background-color: #cd5c5c;
      }
    }
  }
</style>


