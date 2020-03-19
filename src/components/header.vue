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
    <div class="header-title" v-if="title">{{ title }}</div>
    <div class="header-diy"><slot></slot></div>
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
      isShowDiy:{
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
      },
      posting() {
        this.$emit("submitPosting")
      }
    }
  };
</script>

<style lang="less" scoped>
  .header{
    // background: #EA6F5A;
    // padding: 1rem 1rem;
    display: flex;
    color: #fff;
    position: relative;
    background: #de4d53;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    &.has-back{
      // padding-left: 3rem;
    }
    .icon-box{
      height: 100%;
      display: flex;
      align-items: center;
      &.search{
        // position: absolute;
        // right: 1.5rem;
        // top: 0px;
      }
      &.back{
        // position: absolute;
        // left: 0.5rem;
        // top: 0px;
        margin-right: 10px;
      }
    .back{
      // width: 1.6rem;
      // height: 1.6rem;
      width: 20px;
      height: 20px;

    }
    .search{
      // width: 3rem;
      // height: 3rem;
      width: 26px;
      height: 26px;
    }
    }
    .header-title{
      flex: 1
    }
    .header-diy{
      flex: 1
    }
  }
</style>
