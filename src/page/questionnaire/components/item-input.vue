<template>
  <div class="questionnaire-input">
    <el-input
      v-model="inputVal"
      :type="type"
      :class="type === 'textarea' ?  'limit-textarea' : ''"
      :maxlength="type === 'textarea' ?  140: 100000"
      ref="input"
      @focus="foucsing=true"
      @blur="foucsing=false"
      @change="handlechange">
    </el-input>
    <span @click="handleFocus" v-show="showPlaceholder" class="place-holder"><img :src="inputImg"><span class="text">请输入</span></span>
    <div v-if="type === 'textarea'" class="page text-page">
      <span class="page-left">{{ inputVal ? inputVal.length : 0 }}</span>
      <span class="page-mid">/</span>
      <span class="page-right">140</span>
    </div>
  </div>
</template>
<script>
import inputImg from 'assets/images/icon/input.png'
export default {
  props:{
    type: String,
    itemValue: '',
    prop: String
  },
  data() {
    return {
      inputVal: '',
      foucsing: '',
      inputImg,
      currentLenght: 0
    }
  },
  computed: {
    showPlaceholder() {
      return !this.inputVal && !this.foucsing;
    }
  },
  methods:{
    handleFocus() {
      this.$refs.input.focus()
    },
    handlechange(val) {
      console.log(val)
      this.$emit('change', {
        prop: this.prop,
        val: val
      })
      this.currentLenght = val ? val.length : 0
    }
  }
}
</script>
<style lang="scss" scoped>
.questionnaire-input {
  position: relative;
  width: 100%;
  
  .limit-textarea {
    height: 1rem;
  }
  .el-input {
    height: 0.4rem;
  }
    
  .place-holder {
    position: absolute;
    left: 0.18rem;
    top: 0.14rem;
    font-size: 0.12rem;
    color: #ccc;
    img {
      display: inline-block;
      width: 0.13rem;
      height: 0.12rem;
      margin-right: 0.07rem;
      vertical-align: top;
    }
    text {
      display: inline-block;
      height: 0.12rem;
      line-height: 0.12rem;
      vertical-align: middle;
    }
  }
  .text-page {
    position: absolute;
    bottom: 0.12rem;
    right: 0.2rem;
    text-align: right;
    .page-left,
    .page-mid,
    .page-right {
      font-size: 12px;
      color: #ccc;
    }

    .page-left {
      color: #f79727;
    }
  }
} 
</style>
<style lang="scss">
.questionnaire-input {
  .el-textarea__inner,
  .el-input__inner {
    height: 100%;
    min-height: 0.4rem;
    border-radius: 0.06rem;
    width: 100%;
    border-color: #eee;
  }
  .el-textarea__inner:hover,
  .el-input__inner:hover {
    border-color: #C0C4CC;
  }
  .el-textarea__inner:focus,
  .el-input__inner:focus {
    border-color: #F79727;
  }
}
</style>


