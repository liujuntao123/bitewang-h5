<template>
  <div class="tab-bar">
    <div class="bar-list">
      <div v-for="(item, index) in list" :key="index" class="bar-item" @click="handleTo(item)">
        <img draggable="false" :src="path == item.url ? item.activeIcon: item.icon" alt="" class="bar-icon">
        <div class="bar-name" :class="{'active': path == item.url}">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import biba1 from '@/assets/image/tab_ba1.png'
import biba2 from '@/assets/image/tab_ba2.png'
import me1 from '@/assets/image/tab_me1.png'
import me2 from '@/assets/image/tab_me2.png'
export default {
  data () {
    return {
      path: '',
      list: [
        {name: '留言板', url: '/balist',  icon: biba1, activeIcon: biba2},
        {name: '我', url: '/user',  icon: me1, activeIcon: me2},
      ]
    }
  },
  created () {
    this.path = this.$route.path
  },
  methods: {
    handleTo (data) {
      this.$router.push(data.url)
    }
  }
}
</script>

<style lang="less" scoped>
  .tab-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #f8f8f8;
    .bar-list{
      display: flex;
    }
    .bar-item{
      flex: 1;
      text-align: center;
      padding: 6px 0;
    }
    .bar-icon{
      width: 20px;
      height: 20px;
      margin-bottom: 4;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .bar-name{
      font-size: 12px;
      color: #272727;
      height: 14px;
      line-height: 14px;
      &.active{
        color: #cd5c5c
      }
    }
  }
</style>