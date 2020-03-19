<template>
  <div class="search-container">
    <Header 
      :is-show-back="true" 
      :is-show-diy="true"
      class="header-fixed">
      <div class="search-bar">
        <input type="text" placeholder="" class="search-input" v-model="searchWorld">
        <div class="search-btn" @click="handleSearch">搜索</div>
      </div>
    </Header>
    <div class="content">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="handleAdd">{{item.baName}}</div>
      </div>
      <p class="search-tip">没有搜到想要到结果？<span class="search-apply">申请创建新吧</span></p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import { Toast } from 'mint-ui';
import api from '@/api'

export default {
  components: {
    Header
  },
  data () {
    return {
      searchWorld: '',
      list: [{
        tid: 111,
        bid: 1,
        baName: "比特币BTC",
      },{
        tid: 111,
        bid: 2,
        baName: "比特股BTAS",
      },{
        tid: 111,
        bid: 3,
        baName: "注意力币BAT",
      },{
        tid: 111,
        bid: 4,
        baName: "比特币BTCCCXXXXDDDDD比特币BTCCCXXXXDDDDDBTCCCXXXXDDDDDddddddddddddddddddddd",
      }]
    }
  },
  methods: {
    // 搜索
    handleSearch () {
      console.log('搜索：', this.searchWorld)
    },
    // 添加新吧到主页
    handleAdd () {
      Toast('添加成功！')
    }
  }
}
</script>

<style lang="less" scoped>
  .ellipsis{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .header-fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .search-container{
    position: absolute;
    font-size: 14px;
    background: #e8e8e8;
    width: 100%;
    height: 100%;
    .content{
      margin-top: 50px;
    }
    .search-bar{
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
    }
    .search-input{
      flex: 1;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
    }
    .search-btn{
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
    .list{
      padding: 10px 0 10px 20px;
      overflow: hidden;
    }
    .item{
      float: left;
      border: 1px solid #bbb;
      background: #fff; 
      padding: 10px;
      margin: 0 15px 10px 0;
      word-break: break-all;
    }
    .search-tip{
      text-align: center;
      padding: 30px 0;
      .search-apply{
        color: #308fe1;
      }
    }
  }
</style>