<template>
  <div class="mine-info-container"> 
    <div class="header">
      个人资料
    </div>
    <div class="content">
      <div class="list">
        <div class="item">
          <div class="item-label">头像</div>
          <div class="item-value">
            <img :src="avatar" alt="" class="avatar-pic">
          </div>
        </div>
        <div class="item">
          <div class="item-label">手机号</div>
          <div class="item-value">
            {{mobile}}
          </div>
        </div>
        <div class="item">
          <div class="item-label">昵称</div>
          <div class="item-value">
            {{nickname}}
          </div>
        </div>
        <div class="item">
          <div class="item-label">个人简介</div>
          <div class="item-value">
            {{profile}}
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      nickname:'肯德基',
      mobile:'18888888888',
      avatar:'https://static001.geekbang.org/resource/image/15/be/1538be68a5f597ab1baf179a4a724ebe.jpg?x-oss-process=image/resize,m_fill,h_212,w_330',
      profile:'奋斗啦放假放假了卡就哭了领导看见啊倒计时打发了；进口量大放大了空间啊大家奋斗卡觉得撒娇放大说了空间里的打开链接撒娇',
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    font-size: 16px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    color: #fff;
    background: #de4d53;
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