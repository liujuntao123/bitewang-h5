<template>
  <div class="my-comment-container">
    <!-- <Header 
      :is-show-back="true" 
      :title="name+'的评论'"
      class="header-fixed"
    /> -->
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
              <p class="title">{{item.baName}}</p>
              <p class="created-at">{{timeFormat(item.createdAt)}}</p>
            </div>
            <div class="item-delete" @click="handleDelete(item, index)"  v-if="isOwner"></div>
          </div>
          <div class="item-content" @click="handleTheme(item)">
            {{item.summary}}
          </div>
          <div class="item-foot" @click="handleTheme(item)">
            主题：{{item.tSummary}}
          </div>
        </div>
      </div>
      <div class="loading-more" v-if="loading">
        <mt-spinner type="fading-circle" :size="22" color="#888" class="loading-more-icon"/>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="loading-all" v-if="!loading && beginCid === 0">没有更多了~</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import { MessageBox, Toast } from 'mint-ui';
import api from '@/api'
import { mapGetters } from 'vuex'
import moment from '@/utils/moment'

export default {
  components: {
    Header
  },
  data(){
    return{
      loading: false,
      beginCid: -1,
      list: [],
      uid: '',
      name: '我',
      isOwner: false, //是否是用户本身
    }
  },
  computed: {
    ...mapGetters(
      {userInfo:'userInfo/getUserInfo'}
    )
  },
  created () {
    this.uid = this.$route.query.uid || this.userInfo.uid
    this.name = this.$route.query.name || '我'
    if(this.uid == this.userInfo.uid){
      this.isOwner = true
    }
    document.title=(this.name||'我')+'的评论'
  },
  mounted () {
    //手动发评论
    // api.NewComment({
    //   sid: this.userInfo.sid,
    //   tid: 2213, 
    //   content: "皮卡发的2056评论4..."
    // }).then(res=>{
      
    // })
  },
  methods:{
    loadMore() {
      if(this.beginCid !== 0){
        this.loading = true;
        api.userCommentList({
          sid: this.userInfo.sid,
          uid: this.uid,
          beginCid: this.beginCid
        }).then(res=>{
          // let newList = res.commentList.filter(item => item.state == 0)
          let newList = res.commentList.filter(item => !((item.state&1)||(item.state&2)||(item.state&4)))
          this.list = this.list.concat(newList)
          this.beginCid = res.preBeginCid
          this.loading = false;
        }).catch(res => {
          this.loading = false;
        })
      }
    },
    handleDelete (item, index) {
      MessageBox.confirm('确认删除?').then(action => {
        api.handlePost({
          sid: this.userInfo.sid,
          handleType: "deleteComment",
          from: "user",
          postId: item.cid
        }).then(res=>{
          if(res.result == 0){
            this.list.splice(index,1);
            Toast('删除成功！');
          }else{
            Toast(res.msg || '删除失败！');
          }
        })
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消');
        } 
      });
    },
    handleTheme (item) {
      this.$router.push({path: '/postdetails', query: {tid: item.tid}})
    },
    timeFormat(timestamp) {
      return new moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
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
      // margin-top: 50px;
      // height: calc(100% - 50px);
      height: calc(100%);
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
      margin-bottom: 7px;
    }
    .item-head{
      display: flex;
      .item-title{
        flex: 1;
      }
      .created-at{
        color: #888;
        font-size: 12px;
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