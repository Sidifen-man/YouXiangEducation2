<template>
  <div class="sign-dialog" v-show="is_show">
    <div class="main" :class="{width800: !isShowList}">
      <img class="close" @click="close" src="../../images/img/close_icon.png" alt />
      <div class="content" :class="{width800: !isShowList}">
        <div class="header" v-if="isShowList">{{title}}:</div>
        <template v-if="isShowList">
          <div class="text-list">
            <ul>
              <li
                :class="{active: item.is_selected}"
                v-for="item in list"
                :key="item.id"
                @click="change_active(item.id)"
              >
                <p>
                  <span class="icon"></span>
                  {{item.title}}
                </p>
              </li>

              <li class="text-input">
                <el-input  type="textarea" v-model="tip" :placeholder="pls"></el-input>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <slot></slot>
        </template>
        <div class="txt-button">
          <span>
            <button class="cancel" @click="close">取消</button>
            <button class="confirm" @click="confirm">确认</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: {
    isShowList: {
      type: Boolean,
      default: true
    },
    is_show: {
      type: Boolean,
      default: false
    },
    pls: {
      type: String,
      default: '请输入您选择其它的理由'
    },
    title: {
      type: String,
      default: '选择标记梦想的理由'
    },
    showPlace:{
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default:  () =>{
       return []
      }
    }
  },
  data() {
    return {
      current_id: 1,
      tip: "",
      selectIndex:1,
      // list: [
      //   {
      //     id: 1,
      //     title: "这个职业发展前景很好",
      //     is_selected: true
      //   },
      //   {
      //     id: 2,
      //     title: "这个职业发展前景很好",
      //     is_selected: false
      //   },
      //   {
      //     id: 3,
      //     title: "这个职业发展前景很好",
      //     is_selected: false
      //   },
      //   {
      //     id: 4,
      //     title: "这个职业发展前景很好",
      //     is_selected: false
      //   },
      //   {
      //     id: 5,
      //     title: "这个职业发展前景很好",
      //     is_selected: false
      //   },
      //   {
      //     id: 6,
      //     title: "其它",
      //     is_selected: false
      //   }
      // ]
    };
  },
  // props: ["is_show"],
  methods: {
    change_active(id) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].is_selected = false;
        if (this.list[i].id === id) {
          this.list[i].is_selected = true;
          this.selectIndex = id; 
        }
      }
    },
    set_current_id(id) {
      this.current_id = id;
    },
    confirm() {
      console.log(this.list)
      console.log(this.selectIndex)
      let str = '';
      if(!this.selectIndex ){
        this.$message.error('请选择标记梦想的理由');
        return
      }
      if(this.selectIndex == this.list.length){
        if(this.tip){
          str = this.tip
        }else{
          this.$message.error('请填写其他理由信息');
          return 
        }
      }else{
        str = this.list[this.selectIndex-1].title
      }
      const dream ={
        id : this.current_id,
        str : str
      }
      this.$emit("confirm_ok", dream);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="less">
.sign-dialog {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  overflow: scroll;
  .main {
    width: 500px;
    margin: 0 auto 50px;
    margin-top: 15vh;
    position: relative;
    .close {
      position: absolute;
      right: 65px;
      top: -60px;
      width: 35px;
      cursor: pointer;
    }
    .content {
      width: 500px;
      //   border-radius: 25px;
      position: relative;
      overflow: hidden;
      .header {
        height: 60px;
        padding-left: 26px;
        line-height: 60px;
        font-size: 22px;
        color: #fff;
        background: url("../../images/global/stamp_head.png") no-repeat;
      }
      .text-list {
        background-color: #fff;
        padding: 20px 48px;
        ul {
          padding: 0 18px;
          padding-top: 27px;
          background-color: #f7f9fc;
          border-radius: 12px;
          overflow: hidden;
        }
        li {
          margin-bottom: 27px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          .icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-right: 14px;
            background: url("../../images/global/select.png") no-repeat left top;
          }
          &.active {
            color: #ff8726;
            .icon {
              background-image: url("../../images/global/selected.png");
            }
          }
        }
        .text-input {
          /deep/ textarea {
            resize: none;
            height: 130px;
            box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.1);
            border-radius: 6px;
          }
          /deep/ .el-textarea__inner:focus {
            border-color: #ff8726;
          }
        }
      }
      .txt-button {
        background-color: #fff;
        padding-bottom: 27px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        text-align: center;
        button {
          width: 130px;
          height: 41px;
          background: rgba(233, 233, 233, 1);
          border-radius: 6px;
          font-size: 18px;
          color: #fff;
          &:active {
            opacity: 0.7;
          }
          &.cancel {
            margin-right: 15px;
          }
          &.confirm {
            background-color: #ff8726;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
.width800{
  width: 801px !important;
  border-radius: 16px;
}
</style>
