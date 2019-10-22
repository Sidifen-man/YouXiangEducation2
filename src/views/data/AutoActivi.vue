<template>
  <div class="autoActivi">
    <!-- <div class="auto-left"></div> -->
    <!-- <div class="auto-right"> -->
    <div class="form">
      <div class="form-item">
        <label for>活动名称：</label>
        <div class="inp">
          <input type="text" placeholder="请填写活动名称" />
        </div>
        <div class="img">
          <img src="../../images/tanhao.png" alt srcset />
        </div>
      </div>
      <div class="form-item">
        <label for>活动方：</label>
        <div class="inp">
          <input type="text" placeholder="请填写活动方名称" />
        </div>
        <div class="img">
          <img src="../../images/tanhao.png" alt srcset />
        </div>
      </div>
      <div class="form-item">
        <label for>活动地点：</label>
        <div class="inp">
          <dropdown
            :options="arrayOfObjects"
            :selected="object"
            v-on:updateOption="methodToRunOnSelect"
            placeholder="请选择活动地点"
          ></dropdown>
        </div>
        <div class="img">
          <img src="../../images/tanhao.png" alt srcset />
        </div>
      </div>
      <div class="form-item">
        <label for>活动城市：</label>
        <div class="inp">
          <input type="text" placeholder="请填写活动城市" />
        </div>
      </div>
      <div class="form-item">
        <label for>专业大类：</label>
        <div class="inp">
          <dropdown
            :options="arrayOfObjects"
            :selected="object1"
            v-on:updateOption="methodToRunOnSelect"
            placeholder="选择学科/专业类型"
          ></dropdown>
        </div>
        <div class="img">
          <img src="../../images/tanhao.png" alt srcset />
        </div>
      </div>
      <div class="form-item">
        <label for>活动类型：</label>
        <div class="inp">
          <dropdown
            :options="arrayOfObjects"
            :selected="object2"
            v-on:updateOption="methodToRunOnSelect"
            placeholder="请选择活动类型"
          ></dropdown>
        </div>
        <div class="img">
          <img src="../../images/tanhao.png" alt srcset />
        </div>
      </div>
      <div class="form-item">
        <div class="flex">
          <label for>活动形式：</label>
          <div class="select">
            <div class="select-btn">
              <span>线上</span>
              <span>线下</span>
              <span>混合</span>
            </div>
          </div>
        </div>
        <div class="flex ml90">
          <label for>活动形式：</label>
          <div class="select">
            <div class="select-btn">
              <span>个人</span>
              <span>团队</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item">
        <div class="flex">
          <label for>活动形式：</label>
          <div class="select">
            <div class="select-btn">
              <span>作品</span>
              <span>证书</span>
              <span>奖状</span>
              <span>其他</span>
            </div>
          </div>
        </div>
        <div class="flex ml15">
          <label for>活动形式：</label>
          <div class="picker">
            <div class="picker-item">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="line"></div>
            <div class="picker-item">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <div class="img">
            <img src="../../images/tanhao.png" alt srcset />
          </div>
        </div>
      </div>
      <div class="form-item">
        <label for>活动介绍：</label>
        <div class="textarea">
          <textarea v-model="textarea" placeholder="用140字以内的描述来介绍你的作品"></textarea>
          <div class="count">
            <span>{{count}}</span>/140
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="btn-contain">
          <div class="btn-item one">确认添加</div>
          <div class="btn-item two">重置</div>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="list-item" v-for="i in 10" :key="i">
        <div class="item-left">
          <img src="../../images/haitan.png" alt srcset />
        </div>
        <div class="item-right">
          <div class="right-header">
            <span class="title">暑期创业营</span>
            <span class="type">商业</span>
            <span class="type">社团活动</span>
            <span class="act-btn">
              <img src="../../images/closeact.png" alt /> 关闭活动
            </span>
          </div>
          <div class="right-tip">
            <div class="tip-wrapper mt10">
              <div class="tip-item">
                <label for>
                  <img src="../../images/afang.png" alt srcset />
                  <span>活动方：</span>
                </label>
                <span class="clib">手动阀手动阀都是</span>
              </div>
              <div class="tip-item pa">
                <label for>
                  <img src="../../images/axing.png" alt srcset />
                  <span>活动形式：</span>
                </label>
                <span>线下</span>
              </div>
            </div>
            <div class="tip-wrapper">
              <div class="tip-item">
                <label for>
                  <img src="../../images/adian.png" alt srcset />
                  <span>活动地点：</span>
                </label>
                <span class="clib">校内</span>
              </div>
              <div class="tip-item pa">
                <label for>
                  <img src="../../images/ashi.png" alt srcset />
                  <span>活动方式：</span>
                </label>
                <span>团队</span>
              </div>
            </div>
            <div class="tip-wrapper">
              <div class="tip-item">
                <label for>
                  <img src="../../images/acheng.png" alt srcset />
                  <span>活动城市：</span>
                </label>
                <span class="clib">北京</span>
              </div>
              <div class="tip-item pa">
                <label for>
                  <img src="../../images/azhou.png" alt srcset />
                  <span>活动周期：</span>
                </label>
                <span>2019.02.23-2019.02.23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import dropdown from "vue-dropdowns";

export default {
  data() {
    return {
      textarea: "",
      value1: "",
      arrayOfObjects: [
        {
          name: "校内/校外"
        },
        {
          name: "校内/校外"
        }
      ],
      object: {
        name: "校内/校外"
      },
      object1: {
        name: "选择学科/专业类型"
      },
      object2: {
        name: "请选择活动类型"
      }
    };
  },

  components: {
    dropdown: dropdown
  },
  computed: {
    count() {
      if (!this.textarea) {
        return 0;
      } else {
        let length = this.textarea.length;
        return length;
      }
    }
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
    }
  }
};
</script>
<style lang="less" scoped>
.autoActivi {
  display: flex;
  background-color: #fff;
  margin-right: 29px;
  padding-bottom: 71px;
  flex-direction: column;
  //   .auto-left {
  //     width: 204px;
  //     height: 444px;
  //   }
  //   .auto-right {
  //     flex: 1;
  // margin-right: 29px;
  // padding-bottom: 71px;
  .form {
    padding: 16px 0 28px 19px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
    border-radius: 6px;
    .form-item {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 14px;
      label {
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        position: absolute;
      }
      .inp {
        width: 300px;
        height: 26px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
        border-radius: 13px;
        padding-left: 13px;
        margin-left: 78px;
        cursor: pointer;
        input {
          height: 100%;
          width: 80%;
          outline: none;
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          &::placeholder {
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
        }
        /deep/ .btn-group {
          min-width: 0;
          height: 100%;
          width: 100%;
          position: relative;
          margin: 0;
          .dropdown-toggle {
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            background-image: none;
            color: rgba(51, 51, 51, 1);
            min-width: 0;
            padding: 0px;
            text-transform: none;
            font-weight: 500;
            margin-bottom: 0px;
            height: 100%;
            display: flex;
            align-items: center;
            .caret {
              position: absolute;
              top: 50%;
              right: 15px;
              color: #c2c2c2;
              border-width: 5px;
            }
          }
          .dropdown-menu {
            min-width: 0;
            width: 100%;
            a {
              padding: 2px 30px;
            }
          }
        }
      }
      .select {
        margin-left: 78px;
        .select-btn {
          span {
            display: inline-block;
            width: 60px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            background: rgba(249, 249, 249, 1);
            border-radius: 13px;
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-right: 12px;
          }
        }
      }
      .textarea {
        height: 150px;
        padding: 15px 14px 9px 16px;
        margin-left: 78px;
        margin-right: 18px;
        background: rgba(247, 249, 252, 1);
        border-radius: 6px;
        flex: 1;
        textarea {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: transparent;
          resize: none;
          font-size: 14px;
          line-height: 23px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          &::placeholder {
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(203, 203, 203, 1);
            line-height: 23px;
          }
        }
        .count {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(203, 203, 203, 1);
          line-height: 23px;
          position: absolute;
          bottom: 9px;
          right: 32px;
          span {
            color: rgba(255, 135, 38, 1);
          }
        }
      }
      .img {
        margin-left: 12px;
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .flex {
        display: flex;
        align-items: center;
      }
      .ml90 {
        margin-left: 90px;
      }
      .ml15 {
        margin-left: 15px;
      }
      .picker {
        display: flex;
        align-items: center;
        flex: 1;
        margin-left: 78px;
        .line {
          width: 13px;
          height: 2px;
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          background-color: rgba(51, 51, 51, 0.3);
          margin: 0 6px;
        }
        /deep/ .el-date-editor {
          width: 90px;
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          .el-input__inner {
            height: 26px;
            line-height: 26px;
            padding-right: 0;
            padding-left: 25px;
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
            border-radius: 13px;
            &::placeholder {
              font-size: 12px;
              font-family: PingFang-SC-Medium;
              color: rgba(51, 51, 51, 1);
            }
          }
          .el-input__icon {
            color: #ff8726;
            line-height: 26px;
          }
        }
      }
    }
  }
  .bottom-btn {
    margin: 20px 0 0px 78px;
    .btn-contain {
      display: flex;
      .btn-item {
        width: 110px;
        height: 36px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .one {
        background: rgba(255, 135, 38, 1);
        margin-right: 26px;
      }
      .two {
        background: rgba(233, 233, 233, 1);
      }
    }
  }
  .list {
    margin-top: 18px;
    padding: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
    border-radius: 12px;
    .list-item {
      display: flex;
      height: 164px;
      background: rgba(73, 199, 241, 0.1);
      border-radius: 6px;
      padding: 12px 0;
      margin-bottom: 16px;
      .item-left {
        width: 141px;
        height: 141px;
        margin-left: 13px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        margin: 0 12px 0 13px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .right-header {
          line-height: 42px;
          border-bottom: 1px dashed #49c7f1;
          position: relative;
          .title {
            font-size: 16px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 40px;
            padding-left: 10px;
          }
          .type {
            border-radius: 10px;
            margin-left: 13px;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(73, 199, 241, 1);
            line-height: 40px;
            padding: 4px 10px;
            background-color: #fff;
          }
          .act-btn {
            width: 100px;
            height: 26px;
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            line-height: 26px;
            border: 1px solid rgba(73, 199, 241, 1);
            border-radius: 13px;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(73, 199, 241, 1);
          }
        }
        .right-tip {
          flex: 1;
          display: flex;
          flex-direction: column;
          .tip-wrapper {
            display: flex;
            position: relative;
            .tip-item {
              display: flex;
              align-items: center;
              label {
                img {
                  width: 12px;
                  height: 14px;
                  margin-right: 7px;
                }
              }
              span {
                font-size: 14px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 28px;
              }
              .clib {
                display: inline-block;
                width: 150px;
                overflow: hidden; /*超出部分隐藏*/
                text-overflow: ellipsis; /* 超出部分显示省略号 */
                white-space: nowrap; /*规定段落中的文本不进行换行 */
              }
            }
            .pa {
              position: absolute;
              left: 250px;
            }
          }
          .mt10 {
            margin-top: 10px;
          }
        }
      }
    }
  }
  //   }
}
</style>

