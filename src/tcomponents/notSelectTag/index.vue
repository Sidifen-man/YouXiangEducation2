<template>
  <div class="no-select">
     <el-dialog :visible.sync="visible" width="4rem" :before-close="handleClose">
       <img src="../../assets/images/advantage/no_select.png" alt="" class="warning-icon">
       <div class="warn-text">
         <div class="text-top">每种应用都至少添加一种标签</div>
         <div class="text-bottom">请关闭弹窗后点击添加按钮完成提交</div>
       </div>
     </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      fileList: []
    }
  },
  watch: {
    state (newVal) {
      this.visible = newVal
      this.$emit('update:state', newVal)
    }
  },
  methods: {
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.no-select {
  text-align: center;
  .warning-icon {
    width: 1.25rem;
    margin: 0.8rem 0 0.4rem 0;
  }

  .warn-text {
    color: #666;
    font-size: 16px;
    line-height: 0.26rem;
    padding-bottom: 0.5rem;
  }
}

.no-select /deep/ .el-dialog__header,
.no-select /deep/ .el-dialog__body {
  padding: 0;
}
</style>
