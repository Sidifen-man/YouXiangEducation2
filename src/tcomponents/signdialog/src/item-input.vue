<template>
  <div class="clockin-input">
    <el-input
      v-model="inputVal"
      ref="input"
      type="textarea"
      @focus="foucsing=true"
      @blur="foucsing=false"
      :disabled="true"
      @change="handlechange">
    </el-input>
    <span @click="handleFocus" v-show="showPlaceholder" class="place-holder" v-html="placeholder"></span>
  </div>
</template>
<script>
  import inputImg from 'assets/images/icon/input.png'
  export default {
    props:{
      itemValue: '',
      prop: String,
      placeholder: String
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
    mounted() {
      console.log(this.itemValue)
      this.inputVal = this.itemValue;
    },
    methods:{
      handleFocus() {
        this.$refs.input.focus()
      },
      handlechange(val) {
        this.$emit('change', {
          prop: this.prop,
          val: val
        })
        this.currentLenght = val ? val.length : 0
      }
    },
    watch: {
      itemValue(val) {
        console.log(111)
        this.inputVal = val;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .clockin-input {
    position: relative;
    width: 100%;
    .el-textarea {
      height: 1rem;
      border-radius: 0.06px;
    }

    .place-holder {
      position: absolute;
      left: 0.2rem;
      top: 0.18rem;
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: #aaa;
    }
  }
</style>
<style lang="scss">
  .clockin-input {
    .el-textarea__inner {
      height: 100%;
      background:rgba(242,245,247,1);
      border-color: rgba(242,245,247,1);
      border-radius: 0.06rem;
      line-height: 0.22rem;
      resize:none;
      padding: 0.16rem 0.2rem;
    }
    .el-textarea__inner:hover {
      border-color: #C0C4CC;
    }
    .el-textarea__inner:focus {
      border-color: #C0C4CC;
    }
  }
</style>


