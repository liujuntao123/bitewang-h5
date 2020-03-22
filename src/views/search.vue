<template>
  <div class="search-container">
    <!-- <Header 
      :is-show-back="true" 
      :is-show-diy="true"
      class="header-fixed">
      <div class="search-bar">
        <input type="text" placeholder="" class="search-input" v-model="searchWorld">
        <div class="search-btn" @click="handleSearch">搜索</div>
      </div>
    </Header> -->
    <search-bar :isOnSearch="true" @handleSearch="handleSearch"/>
    <div class="content">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="handleAdd(item)">{{item.name}}</div>
      </div>
      <p v-if="isOnSearch&&list.length==0" class="search-tip">没有搜到想要到结果？<span class="search-apply">申请创建新吧</span></p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import { Toast } from 'mint-ui';
import api from '@/api'
import { mapGetters } from 'vuex'
import storage from '@/utils/storage'
import config from '@/config'
import data from '@/utils/onlineconfig'
const { getOnlineConfig, findBlacklist } = data
const { expire_time } = config
import SearchBar from '@/components/searchbar'

export default {
  components: {
    Header,
    SearchBar
  },
  data () {
    return {
      searchWorld: '',
      list: [],
      baListId: [],  //个人已存在的ba列表
      isOnSearch:false
    }
  },
  computed: {
    ...mapGetters(
      {sid:'userInfo/getSid'}
    )
  },
  mounted () {
    getOnlineConfig.call(this).then(onlineConfig => {
      this.expire_time = onlineConfig.ba_refresh_seconds
      this.getBaList()
    })
  },
  methods: {
    // 搜索
    handleSearch (keyword) {
      this.search(keyword)
    },
    // 获取个人币吧
    getBaList() {
      return api.getBaList({sid:this.sid}).then(res=>{
        this.all_list=res.baList
        storage.setToLocalStorage(this.all_list, 'baList', this.expire_time)
      })
    },
    // 添加新吧到主页
    handleAdd (el) {
      if(this.baListId.length <= 0){
        let baList = storage.getFromLocalStorage('baList') || []
        this.baListId = baList.map(item => item.id)
      }
      if(this.baListId.indexOf(el.id) > -1){
        Toast('该币吧已存在！')
      } else {
        this.updateUserInfo(el.id)
      }
      
    },
    search (keyword) {
      api.getBaList({
        sid: this.sid,
        // keyword: this.searchWorld
        keyword
      }).then(res=>{
        this.isOnSearch=true
        this.list = res.baList || []
      })
    },
    updateUserInfo(id) {
      let idList = this.baListId
      idList.push(id)
      api.updateUserInfo({
        sid: this.sid,
        type: 'ba',
        baIdList: idList
      }).then(res=>{
        if(res.result == 0){
          this.baListId = idList
          Toast('添加成功！')
          this.getBaList()
        }else{
          Toast('添加失败！')
        }
      })
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
      // margin-top: 50px;
    }
    .search-bar{
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
    }
    .search-input{
      flex: 1;
      font-size: 14px;
      height: 30px;
      // line-height: 30px;
      box-sizing: border-box;
      border-radius: 2px;
      border: none;
      outline: none;
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