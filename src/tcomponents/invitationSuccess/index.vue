<template>
  <div class="invitation">
    <el-dialog :visible.sync="visible" width="4.52rem" :before-close="handleClose">
       <div class="adt-title-wrap">
        <div class="adt-title">邀请成功</div>
      </div>

      <div class="content">
        <div class="icon-wrap">
          <img src="../../assets/images/advantage/aciton.png" alt="" class="action-icon">
          <span class="action-score">+15</span>
        </div>
        <div class="action-prompt">
          恭喜你，邀请他人与你共同分享你的优势应用帮你赢得
          <span class="score">+15</span> 优势行动力积分
        </div>
      </div>

      <div class="btn-wrap">
        <div class="btn-left" @click="handleClose">知道了</div>
        <div class="btn-right" @click="handleJump">查看打卡记录</div>
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
    },
    activeId:''
  },
  data () {
    return {
      visible: false,
      newId :''
    }
  },
  watch: {
    state (newVal) {
      this.visible = newVal
      this.$emit('update:state', newVal)
    },
    activeId(newVal){
      this.newId = newVal
    }
  },
  methods: {
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
      this.$router.push('/student/task/sponsor')
    },
    handleJump () {
      this.visible = false
      this.$emit('update:state', false)
      console.log(this.newId)
      this.$router.push({
        path: '/student/task',
        query: {
          type: 'showPunchCard',
          activeId:this.newId,
          taskresultId :this.$route.query.taskresultId,
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.invitation {
  text-align: center;
  border-radius: 0.06rem;
}
.adt-title-wrap {
  height: 0.6rem;
  line-height: 0.6rem;
  padding-left: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #E4E8ED;
  border-radius: 0.06rem 0.06rem 0 0;
  font-size: 0;
  position: relative;
  text-align: left;
  font-weight: bold;

 .adt-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }

}

.icon-wrap {
  padding: 0.35rem 0 .28rem 0;

  .action-icon {
    width: 0.55rem;
  }

  .action-score {
    color: #F79727;
    font-size: 30px;
  }
}

.action-prompt {
  color: #666;
  font-size: 16px;
  line-height: 0.26rem;
  padding: 0 0.65rem;
  margin-bottom: 0.36rem;

  .score {
    color: #F79727;
  }
}

.btn-wrap {
  padding-bottom: 0.3rem;

  .btn-left,
  .btn-right {
    width: 1.2rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    border-radius: 0.04rem;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
    color: #fff;
  }

  .btn-left {
    border: 0.01rem solid rgba(204,204,204,1);
    margin-right: 0.2rem;
    color: #999;
  }

  .btn-right {
    background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
  }
}

.invitation /deep/ .el-dialog__header,
.invitation /deep/ .el-dialog__body {
  padding: 0
}
</style>
