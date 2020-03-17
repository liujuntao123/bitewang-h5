<template>
  <div class="setting-dialog-box">
      <div class="setting-content" :class="{translate:!showSort}">
        <div class="sort-box" v-if="showSort">
          <div class="title">排序</div>
          <div class="radio-item">
            <label>
              <input type="radio" name="sort" :value="'asc'" v-model="o_sort">
              按时间正序
            </label>
          </div>
          <div class="radio-item">
            <label>
              <input type="radio" name="sort" :value="'desc'" v-model="o_sort">
              按时间倒序
            </label>
          </div>
        </div>
        <div v-if="showSort" class="cross-line"></div>
        <div class="translate-box">
          <div class="title">翻译</div>
          <div class="radio-item">
            <label>
              <input type="radio" name="translateType" :value="'origin'" v-model="o_translateType">
              只显示原文
            </label>
          </div>
          <div class="radio-item">
            <label>
              <input type="radio" name="translateType" :value="'translate'" v-model="o_translateType">
              只显示翻译
            </label>
          </div>
          <div class="radio-item">
            <label>
              <input type="radio" name="translateType" :value="'all'" v-model="o_translateType">
              两者都显示
            </label>
          </div>
        </div>
        <div class="confirm-btn">
          <span @click="handleComfirmSetting">确定</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    sort:[String],
    translateType:[String],
    showSort:{
      type:[Boolean],
      default: true
    }
  },
  data() {
    return {
      contentList: [],
      curr_tUid: '',
      argId: -1, // 可以理解为页码
      busy: true,
      isShowSetting: false,
      o_sort: 'asc',
      o_translateType:'all'
    }
  },
  mounted(){
    this.o_sort=this.sort
    this.o_translateType=this.translateType
  },
  methods: {
    handleComfirmSetting(){
      this.$emit('handleComfirmSetting',{sort:this.o_sort,translateType:this.o_translateType})
    }
  }
}
</script>

<style lang="less" scoped>
.setting-dialog-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .setting-content {
    color: #616161;
    // padding: 20px;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* 1.要求自身内容相对包含块居中 */
    margin: auto;
    /* 2.给出自身宽高计算方式 */
    width: 300px;
    height:340px;
    &.translate{
      height: 200px;
    }
    .sort-box,.translate-box{
      padding: 10px 20px;
    }
    .cross-line{
      border-top: 1px solid #ddd;
    }
    .title {
      padding: 5px 0;
      font-size: 20px;
    }
    .confirm-btn{
      text-align: right;
      color: #445cfa;
      padding-right: 50px;
    }
  }
}
.radio-item {
  padding: 5px 0;
  label {
    /*flex布局让子元素水平垂直居中*/
    display: flex;
    align-items: center;
    justify-content: left;
  }

  input[type='checkbox'],
  input[type='radio'] {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    width: 22px;
    height: 22px;
    cursor: pointer;
    vertical-align: center;
    background: #fff;
    border: 2px solid #ccc;
    position: relative;
    margin-right: 10px;
  }

  // input[type='checkbox']:checked::after {
  //   content: '\2713';
  //   display: block;
  //   position: absolute;
  //   top: -1px;
  //   left: -1px;
  //   right: 0;
  //   bottom: 0;
  //   width: 10px;
  //   height: 10px;
  //   line-height: 10px;
  //   border: 1px solid #ddd;
  //   color: #445cfa;
  //   font-size: 12px;
  // }
  input[type='checkbox'],
  input[type='radio']:checked {
    border-color: #445cfa;
  }
  input[type='radio']:checked::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    background-color: #445cfa;
  }
  input[type='radio'],
  input[type='radio']:checked::after {
    border-radius: 50%;
  }
}
</style>


