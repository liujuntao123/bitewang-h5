<template>
  <div class="header" :class="{'has-back':isShowBack}">
    <div @click="handleJumpSearch" v-if="!isOnSearch" class="mask">
      <img class="search_black" src="../images/search_black.png" alt="" srcset=""/>
      输入关键字搜索
    </div>
    <div v-else class="search-bar">
      <img class="search_black" src="../images/search_black.png" alt="" srcset=""/>
      <input :autofocus="true" @keypress.enter="handleSearch" v-model="keyword" placeholder="输入关键字搜索" class="input-box" type="text"/>
      <!-- <div class="cancel-btn" @click="handleBack">取消</div> -->
    </div>
  </div>
</template>
<script>

export default {
  props: {
    isOnSearch: {
      type: Boolean,
      default: false,
    },
    isShowBack:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      keyword: '',
    }
  },

  methods: {
    handleBack() {
      this.$router.back()
    },
    handleJumpSearch() {
      this.$router.push('search')
    },
    handleSearch() {
      this.$emit('handleSearch', this.keyword)
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  background: #e8e8e8;
  padding: 5px 10px;
  color: #fff;
  position: relative;
  padding-top: 10px;
  &.has-back {
    padding-left: 50px;
  }
  .mask {
    height: 40px;
    background: #ffffff;
    font-size: 14px;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
  }
  .search_black {
    width: 20px;
    height: 20px;
  }
  .search-bar {
    background: #fff;
    font-size: 14px;
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 3px;
    position: relative;
    padding-left: 40px;
    .search_black {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 100;
    }
  }
  .icon-box {
    height: 100%;
    display: flex;
    align-items: center;
    &.search {
      position: absolute;
      right: 17px;
      top: 0px;
    }
    &.back {
      position: absolute;
      left: 10px;
      top: 0px;
    }
    .back {
      width: 30px;
      height: 30px;
    }
    .search {
      width: 30px;
      height: 30px;
    }
  }
}
.input-box {
  background: #ffffff;
  height: 30px;
  width: 300px;
  color: #333333;
  border: none;
  &:focus{
    outline: none;
  }
}
.cancel-btn {
  color: #000000;
  padding-left: 15px;
  border-left: 1px solid #ddd;

}

</style>