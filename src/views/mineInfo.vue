<template>
  <div class="mine-info-container"> 
    <Header 
      :is-show-back="true" 
      title="个人资料"
      class="header-fixed"
    />
    <div class="content">
      <div class="list">
        <div class="item">
          <div class="item-label">头像</div>
          <div class="item-value">
            <img :src="userInfo.avatar" alt="" class="avatar-pic">
          </div>
        </div>
        <div class="item">
          <div class="item-label">手机号</div>
          <div class="item-value">
            {{userInfo.mobile}}
          </div>
        </div>
        <div class="item">
          <div class="item-label">昵称</div>
          <div class="item-value">
            {{userInfo.nickname}}
          </div>
        </div>
        <div class="item">
          <div class="item-label">个人简介</div>
          <div class="item-value">
            {{userInfo.profile}}
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/header'
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header
  },
  data(){
    return{
      // nickname:'肯德基',
      // mobile:'18888888888',
      // avatar:'https://static001.geekbang.org/resource/image/15/be/1538be68a5f597ab1baf179a4a724ebe.jpg?x-oss-process=image/resize,m_fill,h_212,w_330',
      // profile:'',
    }
  },
  computed: {
    ...mapGetters(
      {userInfo:'userInfo/getUserInfo'}
    )
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.header-fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .mine-info-container{
    font-size: 14px;
    .content{
      margin-top: 50px;
    }
    .avatar-pic{
      width: 40px;
      height: 40px;
      margin-top: 5px;
    }
    .list{
      .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #000;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        padding: 0 15px;
      }
      .item-value{
        flex:1;
        color: #757575;
        text-align: right;
        padding-left: 80px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
  }
</style>