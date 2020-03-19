<template>
  <div class="my-theme-container">
    <div class="header">
      我的主题
    </div>
    <div class="content">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="item-head">
            <div class="item-title">
              <p class="title">{{item.summary}}</p>
              <p class="created-at">{{item.createdAt}}</p>
            </div>
            <div class="item-top" v-if="item.isTop"></div>
            <div class="item-delete"></div>
          </div>
          <div class="item-content">
            {{item.content}}
          </div>
          <div class="item-foot">
            <div class="item-foot-part">{{item.goodCount}}赞</div>
            <div class="item-foot-part">{{item.commentCount}}评论</div>
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
      list: [
        {
          summary: 'BTC吧',
          createdAt: 234234234324,
          content: '这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖',
          goodCount: 20,
          commentCount: 30,
          isTop: true,
        },
        {
          summary: 'LTC吧',
          createdAt: 234234234324,
          content: '这是我的第一帖…',
          goodCount: 0,
          commentCount: 0,
          isTop: false,
        }
      ]
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
  body{
    
  }
  .ellipsis{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
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
  .my-theme-container{
    position: absolute;
    font-size: 14px;
    background: #e8e8e8;
    width: 100%;
    height: 100%;
    .content{
      margin-top: 50px;
    }
    .item{
      flex: 1;
      border: 1px solid #c5c5c5;
      background: #fff;
      padding: 10px 15px;
      margin-bottom: 10px;
    }
    .item-head{
      display: flex;
      .item-title{
        flex: 1;
      }
      .created-at{
        color: #888;
      }
      .item-top{
        width: 50px;
        background: url('~@/assets/image/top.png') no-repeat;
        background-size: 100% auto;
        margin-right: 10px;
      }
      .item-delete{
        width: 22px;
        height: 26px;
        background: url('~@/assets/image/delete.png') no-repeat;
        background-size: 100% auto;
      }
    }
    .item-content{
      padding: 5px 0;
      .ellipsis();
    }
    .item-foot{
      color:#4299e5;
      overflow: hidden;
      .item-foot-part{
        float: left;
        width: 50%;
      }
    }
  }
</style>