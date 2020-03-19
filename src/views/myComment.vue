<template>
  <div class="my-comment-container">
    <Header 
      :is-show-back="true" 
      title="我的评论"
      class="header-fixed"
    />
    <div class="content">
      <div 
        class="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="item-head">
            <div class="item-title">
              <p class="title">{{item.summary}}</p>
              <p class="created-at">{{item.createdAt}}</p>
            </div>
            <div class="item-delete" @click="handleDelete"></div>
          </div>
          <div class="item-content">
            {{item.content}}
          </div>
          <div class="item-foot">
            {{item.content}}
          </div>
        </div>
      </div>
      <div class="loading-more" v-if="loading">
        <mt-spinner type="fading-circle" :size="22" color="#888" class="loading-more-icon"/>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="loading-all" v-if="total>0 && list.length >= total">没有更多了~</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import { MessageBox, Toast } from 'mint-ui';
import api from '@/api'

export default {
  components: {
    Header
  },
  data(){
    return{
      loading: false,
      total: '',
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
    loadMore() {
      this.loading = true;
      this.total = 22
      if(this.list.length >= 22) {
        this.loading = false;
        return
      }else{
        setTimeout(() => {
          let last = this.list.length - 1;
          for (let i = 1; i <= 10; i++) {
            this.list.push({
              summary: 'BTC吧'+ (last + i),
              createdAt: 234234234324,
              content: '这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖这是我的第二帖',
              goodCount: 20,
              commentCount: 30,
            });
          }
          this.loading = false;
        }, 2000);
      } 
    },
    handleDelete () {
      MessageBox.confirm('确认删除?').then(action => {
        Toast('删除成功！');
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消');
        } 
      });
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
  .my-comment-container{
    position: absolute;
    font-size: 14px;
    background: #e8e8e8;
    width: 100%;
    height: 100%;
    .content{
      margin-top: 50px;
      height: calc(100% - 50px);
      padding-bottom: 10px;
      box-sizing: border-box;
      overflow: auto;
    }
    .list{
      background: #e8e8e8;
      padding-bottom: 10px;
      word-break: break-all;
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
      .item-delete{
        width: 22px;
        height: 26px;
        background: url('~@/assets/image/delete.png') no-repeat;
        background-size: 100% auto;
      }
    }
    .item-content{
      padding: 5px 0;
      
    }
    .item-foot{
      color: #7d7d7d;
      background: #e8e8e8;
      border: 1px solid #bdbdbd;
      height: 26px;
      line-height: 26px;
      padding: 0 4px;
      .ellipsis();
    }
    .loading-more{
      text-align: center;
      padding: 10px 0;
      .loading-more-icon{
        display: inline-block;
        vertical-align: middle;
      }
      .loading-more-txt{
        display: inline-block;
        vertical-align: middle;
        color: #888;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
      }
    }
    .loading-all{
      color: #888;
      padding: 10px 0;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
</style>