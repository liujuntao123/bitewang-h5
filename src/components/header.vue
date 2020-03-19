<style lang="less" scoped>
  .header{
    background: #EA6F5A;
    padding: 1rem 1rem;
    color: #fff;
    position: relative;
    &.has-back{
      padding-left: 3rem;
    }
    .icon-box{
      height: 100%;
      display: flex;
      align-items: center;
      &.search{
        position: absolute;
        right: 1.5rem;
        top: 0px;
      }
      &.back{
        position: absolute;
        left: 0.5rem;
        top: 0px;
      }
    .back{
      width: 1.6rem;
      height: 1.6rem;

    }
    .search{
      width: 3rem;
      height: 3rem;
    }
    .posting-btn {
    }
    }
  }
</style>

<template>
  <div
    class="header"
    :class="{'has-back':isShowBack}"
  >
    <div
      class="icon-box back"
      @click="handleBack"
      v-if="isShowBack"
    >
      <img
        class="back"
        src="../images/backward.png"
        alt=""
      >
    </div>
    <div>{{ title }}</div>
    <div
      class="icon-box search"
      @click="handleSearch"
      v-if="isShowSearch"
    >
      <img
        class="search"
        src="../images/search.png"
        alt=""
      >
    </div>
    <div
      class="posting-btn"
      v-if="isShowPostingBtn"
      @click="posting"
    >
      发布
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      title:String,
      isShowBack:{
        type:Boolean,
        default:false
      },
      isShowSearch:{
        type:Boolean,
        default:false
      },
      isShowPostingBtn:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return {}
    },

    methods: {
      handleBack(){
        this.$router.go(-1);
      },
      handleSearch(){

      }
    }
  };
</script>
