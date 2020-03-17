<template>
  <div class="item-container" @click="tapAll">
    <div class="item" v-for="(item, index) in all_list" 
    :key="index" 
    :draggable="draggable" 
    @touchstart="gtouchstart"
    @touchend="gtouchend"
    @dragenter="dragEnter(index,$event)" 
    @dragstart="dragStart(index,$event)"
    @dragend="dragEnd(index,$event)"
     >
     <span
            @click.stop="handleDelete"
            class="delete-btn"
            v-if="canDelete"
          >×</span>
          <div class="image-box">
            <img :draggable="false"  class="image" :src="item.iconUrl" alt="">
          </div>
          <p class="text-box">{{item.name}}</p>
     </div>
  <div class="blank-box" v-for="n in blankList" :key="n+'b'"></div>
  </div>
</template>

<script>
import dragpolyfill from '../lib/draggable-polyfill';
import api from '@/api'
import config from '@/config'
import data from '@/utils/onlineconfig'
const { getOnlineConfig, findBlacklist } = data
const { expire_time } = config

export default {
  data(){
    return {
      all_list:[],
      currentIndex:0,
      startIndex:0,
      draggable:false,
      canDelete: false,
      blankList:0
    }
  },
  mounted() {
    // this.draggable = true;
    this.getMarginWith()

    getOnlineConfig.call(this).then(onlineConfig => {
      console.log('onlineConfig', onlineConfig)
      this.blacklist = findBlacklist(onlineConfig)
      console.log('blacklist', this.blacklist)
      this.expire_time = onlineConfig.ba_list_refresh_seconds
      this.getBaList().then(()=>{
        this.blankList=this.all_list.length%4
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
    getBaList() {
      // 从storage里面取，如果过期了，则重新拉
      var timestamp = Date.parse(new Date())
      var data_expiration = localStorage.getItem('data_expiration')
      
      if (data_expiration && data_expiration > timestamp) {
        //如果有缓存，且缓存没有过期
        let all_list = localStorage.getItem('baList')
        // all_list = this.filterBlackList(all_list)
        all_list=JSON.parse(all_list)
        this.all_list = all_list
        return Promise.resolve(all_list)
      } else {
        return api.getBaList().then(res => {console.log('res',res)
          // let all_list = res.baList.sort((a, b) => b.level - a.level)
          let all_list = localStorage.getItem('baList')
          all_list=JSON.parse(all_list)
          console.log('all_list>>>>>',all_list)
          let hasStorage = !!all_list
          all_list = all_list || []
          // console.log('all_list',all_list)
          let new_list = res.baList
          // 等级为10且原先没有的吧，则加到最前面
          if (hasStorage) {
            new_list = new_list.filter(
              item => item.level >= 10 && !all_list.some(it => it.id == item.id)
            )
          }
          all_list = [...new_list, ...all_list]
          console.log('all_list', all_list)
          console.log('blacklist', this.blacklist)
          this.all_list = all_list
          this.setBaList()
          // this.all_list = this.filterBlackList(this.all_list)
          return this.all_list
        })
      }
    },
    filterBlackList(list) {
      return list.filter(
        item => this.blacklist.indexOf(item.category) == -1 || item.from_search
      )
    },
    setBaList() {
      var timestamp = Date.parse(new Date())
      var expiration = timestamp + this.expire_time * 1000
      localStorage.setItem('baList', JSON.stringify(this.all_list))
      localStorage.setItem('data_expiration', expiration)
    },
    tapAll(e) {
      console.log('>>>>>>>')
        this.draggable = false
        this.canDelete = false
    },
    handleTapItem(item) {
      // if (this.currentDelete != -1) {
      //   return
      // }
      if (this.canDelete) {
        return
      }
      wx.navigateTo({ url: 'info?id=' + item.id + '&ba_name=' + item.name })
    },
    handleDelete(e) {
      console.log('handle delete.....', e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index
      this.all_list.splice(index, 1)
      if (this.all_list.length == 1) {
        this.canDelete = false
      }
      this.pending()
      this.setBaList()
      // this.currentDelete = -1
    },
    gtouchstart (e) {
      // 开始触摸
      this.timeOutEvent = setTimeout(() => {
        // 长按3秒
        this.timeOutEvent = 0
        this.longTap()
      }, 1000)
      // e.preventDefault();
      
    },
    gtouchmove () {
      // 看具体需求
      // clearTimeout(this.timeOutEvent)
      // this.timeOutEvent = 0
    },
    gtouchend () {
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
    },
    reset(){
      // 每次单元进到一个新的区域，要重置之前的状态
      if(this.currentTarget){
        this.startTarget.classList.remove('on-over')
      this.currentTarget.classList.remove('on-enter')
      }
    },
    longTap(){
      console.log('long tap')
      this.draggable=true
      this.canDelete=true
      this.$nextTick(()=>{
        console.log('>>>>')
        dragpolyfill()
      })
    },
    touchStart(){
      console.log('touch start')
    },
    dragStart(index,e){
      console.log('start',e)
      // if(e.target.className =='image'){
      //   return
      // }
      // e.stopPropagation()
      this.currentIndex=this.startIndex=index
      this.startTarget=e.target
      e.target.classList.add('on-drag')
      // e.preventDefault();

    },
    onDrag(index,e){
      // console.log('>>>>>>',index)
    },
    dragEnter(index,e) {
      console.log('enter',index,this.currentIndex,e,e.target.className)
      if(e.target.className!='item'){
        return
      }
      this.reset()
        e.target.classList.add('on-enter')
        this.currentTarget=e.target
        // 如果不是在起始位置，则隐藏当前位置的元素
      if(index!= this.startIndex){
        this.startTarget.classList.add('on-over')
      }
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
      this.startTarget.classList.remove('on-drag')
      this.reset()
      console.log(this.list)
      e.preventDefault();
    },
    getMarginWith(){
      let width=document.documentElement.clientWidth
      let marginWidth=(width-4*80)/5
      console.log('marginWidth',marginWidth)
    },
    dragOver(){console.log('over>>>>>>')

    },
    dragLeave() {
      console.log('dragleave>>>>>>>>')
    }
  }
}
</script>

<style lang="less" scoped>

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
  width: 80px;
  height: 80px;
  margin-top: 10px;
}



.item {
  // position: absolute;
  // border: 1px solid #888888;
  position: relative;
  // margin-right: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 2px #888888;
  font-size: 12px;
  width: 80px;
  height: 80px;
  text-align: center;
  box-sizing: border-box;
  background: #ffffff;
  /* border-radius:90px; */
  &.on-drag{
  visibility: hidden;
  // background: red;
  &[dragging]{
    visibility: visible;
  // opacity: 1;
  // background: green;
  }
  &.on-over{
    visibility: visible;
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
