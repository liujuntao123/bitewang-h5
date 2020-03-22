<template>
<div>
  <Header 
      :is-show-back="false" 
      :is-show-diy="false"
      :isShowSearch="true"
      :title="'比特汪'"
      class="header-fixed">
    </Header>
  <div class="item-container" @click="tapAll" >
    <div class="item dropzone" v-for="(item, index) in all_list" 
    :key="index" 
    :draggable="draggable" 
    @touchstart="gtouchstart"
    @touchmove="gtouchmove"
    @touchend="gtouchend(item)"
    @dragenter="dragEnter(index,$event)" 
    @dragstart="dragStart(index,$event)"
    @dragover="dragOver(index,$event)"
    @dragleave="dragLeave(index,$event)"
    @dragend="dragEnd(index,$event)"
    @click="goBaPostList(item)">
     <span
            @touchstart="handleDelete(index)"
            class="delete-btn"
            v-if="canDelete"
          >×
          </span>
          <div :draggable="false"  class="image-box">
            <img :draggable="false"  class="image" :src="item.iconUrl" alt="">
          </div>
          <p :draggable="false" class="text-box">{{item.name}}</p>
     </div>
  <div class="blank-box" v-for="n in blankListLength" :key="n+'b'"></div>
  </div>

  <TabBar/>
</div>
</template>

<script>
import Header from '@/components/header'
import dragpolyfill from '../lib/draggable-polyfill';
import api from '@/api'
import config from '@/config'
import data from '@/utils/onlineconfig'
const { getOnlineConfig, findBlacklist } = data
const { expire_time } = config
import { mapGetters } from 'vuex'
import storage from '@/utils/storage'
import TabBar from '@/components/tabBar'

export default {
  components: {
    TabBar,
    Header
  },
  data(){
    return {
      all_list:[],
      currentIndex:0,
      startIndex:0,
      draggable:false,
      canDelete: false,
      blankListLength:0,
      hasMoved:false
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(
      {sid:'userInfo/getSid'}
    )
  },
  mounted() {
    // this.draggable = true;
    this.getMarginWith()
    document.title = '比特汪'

    getOnlineConfig.call(this).then(onlineConfig => {
      console.log('onlineConfig', onlineConfig)
      // this.blacklist = findBlacklist(onlineConfig)
      // console.log('blacklist', this.blacklist)
      this.expire_time = onlineConfig.ba_refresh_seconds
      this.getBaList().then(()=>{
        this.originBaList=[...this.all_list]
        this.setBlankList()
      })
      // this.getSystemInfo()
      //   .then(() => {
      //     return this.getBaList()
      //   })
      //   .then(res => {
      //     // this.all_list = res
      //     // this.setBaList()
      //     this.pending()
      //   })
    })
  },
  methods:{
    setBlankList(){
      this.blankListLength=4-this.all_list.length%4
    },
    getBaList() {console.log('sid',this.sid)
      // 从storage里面取，如果过期了，则重新拉
      let list=storage.getFromLocalStorage('baList')
      if(list){
        this.all_list=list
        return Promise.resolve()
      }
      return api.getBaList({sid:this.sid}).then(res=>{
        if(res.result==0){
          this.all_list=res.baList
          storage.setToLocalStorage(this.all_list, 'baList', this.expire_time)
        }
      })
      
    },
    tapAll(e) {
      // console.log('>>>>>>>')
      // alert('>>>>>>')
        this.draggable = false
        this.canDelete = false
        e.preventDefault()
    },
    handleTapItem(item) {
      // if (this.currentDelete != -1) {
        //   return
      // }
      // alert('>>>>>>>')
      if (this.canDelete) {
        return
      }
      this.goBaPostList(item)
      // wx.navigateTo({ url: 'info?id=' + item.id + '&ba_name=' + item.name })
    },
    handleDelete(index) {
      console.log('handle delete.....', index)
      this.all_list.splice(index, 1)
      this.setBlankList()
      if (this.all_list.length == 1) {
        this.canDelete = false
      }
      this.setBaList()
    },
    setBaList(){
      storage.setToLocalStorage(this.all_list, 'baList', this.expire_time)
      api.updateUserInfo({
        sid: this.sid,
        type: 'ba',
        baIdList: this.all_list.map(item=>item.id)
      }).then(res=>{
        if(res.result == 0){
          console.log('存入后台成功')
          // this.baListId = idList
          // Toast('添加成功！')
          // this.getBaList()
        }else{
          // Toast('添加失败！')
        }
      })
    },
    gtouchstart (e) {
      // alert('touch start')
      console.log('on tap')
      // 开始触摸
      this.timeOutEvent = setTimeout(() => {
        // 长按1秒
        this.timeOutEvent = 0
        this.longTap()
      }, 1000)
      // e.preventDefault();
      
    },
    gtouchmove (e) {
      // console.log('moved>>>>>>>')
      // alert('touch move')
      // 看具体需求
      // clearTimeout(this.timeOutEvent)
      // this.timeOutEvent = 0
      // this.hasMoved=true
      e.preventDefault();
    },
    gtouchend (item) {
      // alert('touch end')
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
      if(!this.draggable&&!this.hasMoved){
        this.hasMoved=false
        // wx.miniProgram.navigateTo({ url: 'info?id=' + item.id + '&ba_name=' + item.name })
        this.goBaPostList(item)
      }
      
    },
    reset(){
      // 每次单元进到一个新的区域，要重置之前的状态
      if(this.currentTarget){
        this.startTarget.classList.remove('on-over')
      this.currentTarget.classList.remove('on-enter')
      }
    },
    longTap(){
      // alert('long tap')
      console.log('long tap')
      this.draggable=true
      this.canDelete=true
    },
    dragStart(index,e){
      console.log('start',e)
      // if(e.target.className =='image'){
        //   return
      // }
      this.currentIndex=this.startIndex=index
      // e.target.style.visibility ='hidden'
      // e.target.style.opacity = 0.1;
      this.startTarget=e.target
      e.target.classList.add('on-drag')
      e.stopPropagation()
      // e.preventDefault();

    },
      // 调接口远程存一份数据
    onDrag(index,e){
      // console.log('>>>>>>',index)
    },
    dragEnter(index,e) {
      // console.log('enter>>>>>',e.target)
      if(index==this.currentIndex){
        return
      }
      if(e.target==this.currentTarget){
        return
      }
      let _target
      if(['image-box','text-box'].indexOf(e.target.className)>-1){
        _target = e.target.parentNode
      }
      if(['image'].indexOf(e.target.className)>-1){
        _target=e.target.parentNode.parentNode
      }
      console.log('classNames:   ',e.target.className)
      if(e.target.className.indexOf('item')>-1){
        _target=e.target
      }
      // console.log('enter',index,this.currentIndex,e.target,_target)
      console.log('enter',index,this.currentIndex,_target)
      this.reset()
        _target.classList.add('on-enter')
        this.currentTarget=_target
        // 如果不是在起始位置，则隐藏当前位置的元素
      if(index!= this.startIndex){
        this.startTarget.classList.add('on-over')
      }
      e.stopPropagation()
      // 互换位置
      // if(index!=this.currentIndex){
        let _index=index
        let _list=[...this.all_list]
        let _item=_list[index]
        _list[index]=_list[this.currentIndex]
        _list[this.currentIndex]=_item
        this.all_list = [..._list]
        this.currentIndex = _index
      // }
      // e.preventDefault();
    },
    dragEnd(index,e){
      console.log('dragend')
      // 如果操作前后两个数组发生变化
      if(this.all_list.map(item=>item.id).toString()!==this.originBaList.map(item=>item.id)){
        this.setBaList()
      }
      this.startTarget.classList.remove('on-drag')
      this.reset()
      console.log(this.all_list)
      e.preventDefault();
    },
    getMarginWith(){
      let width=document.documentElement.clientWidth
      let marginWidth=(width-4*80)/5
      console.log('marginWidth',marginWidth)
    },
    // dragOver(e){console.log('over>>>>>>')
    //   e.preventDefault();
    // },
    // dragLeave() {
    //   e.preventDefault();
    //   console.log('dragleave>>>>>>>>')
    // }
    goBaPostList(item) {
      if (this.canDelete) {
        return
      }
      this.$router.push({path: '/postslist', query: {bid: item.id, name: item.name}})
    }
  }
}
</script>

<style lang="less" scoped>
// .header-fixed{
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//   }

.item-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  height: 100vh;
  position: relative;
  background: #dddddd;
}
.on-enter{
  opacity: 0;
}

.tip {
  color: #aaa;
  font-size: 12px;
}
.normal_title {
  font-size: 16px;
  margin: 5px 10px;
  font-weight: bold;
}

.blank-box{
  @box-size:floor((100vw-10)/4);
  // width: 80px;
  // height: 80px;
  width: @box-size;
  height: @box-size;
  margin-top: 10px;
}
.dnd-poly-drag-image{
 .item{
  //  visibility: visible;
  //  background: red;
 }
}
.dnd-poly-drag-image {
    opacity: 1 !important;
}


.item {
  @box-size:floor((100vw-10)/4);
  // position: absolute;
  // border: 1px solid #888888;
  position: relative;
  // margin-right: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 2px #888888;
  font-size: 12px;
  // width: 80px;
  // height: 80px;
  width: @box-size;
  height: @box-size;
  text-align: center;
  box-sizing: border-box;
  background: #ffffff;
  /* border-radius:90px; */
  &.on-drag{
  opacity: 0;
  &.on-over{
    opacity: 1;
  }
}
  .image-box {
    padding: 10px;
    padding-bottom: 2.5px;
    .image {
      width: 40px;
      height: 40px;
    }
  }
  .text-box {
  }
}

.delete-btn {
  position: absolute;
  display: block;
  right: -10px;
  top: -10px;
  background: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
