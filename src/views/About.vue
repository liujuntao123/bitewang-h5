<template>
  <div class="container">
    <!-- <header title="联系方式" :isShowBack="true"></header> -->
    <div class="logo-content">
      <div>
        <img class="logo-img" src="../images/about.png" alt="">
      </div>
      <!-- <div>比特汪 {{'v'+verName}}</div> -->
      <div>{{'v'+verName}}</div>
    </div>
    <div class="footer">
      <div>Email: NEIL.L@qq.com</div>
      <div>QQ: 310335287</div>
      <div>Copyright©2019 DEBUG-TECH</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      verName:'',
    }
  },
  created(){
    document.title='联系方式'
    this.verName = this.$route.query.verName
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
}
.logo-content {
  margin: 50px auto;
  text-align: center;
  .logo-img {
    width: 250px;
    // height: 100px;
  }
}
.footer {
  font-size: 14px;
  margin-bottom: 75px;
}
</style>
