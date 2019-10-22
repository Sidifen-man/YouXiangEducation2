<template>
  <div class="container">
    <div class="topAct">
      <div class="sort">
        <div class="kind">
          <div class="detail" v-for="(item, idx) in sorts" :key="idx">
            <div class="squa" :style="{'background-color': item.bgc}"></div>
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="add" @click="$router.push('/students/activity/library/school_detail')">
          <img src="../../images/data/myactivity/add.png" alt />
          <p>添加更多活动</p>
        </div>
      </div>
      <!-- 雷达图 -->
      <div class="radar">
        <div class="leftRadar">
          <p>
            参加活动总数:
            <span>{{all}}</span>
          </p>
          <radar :chart-data="data1" :radius="60" :width="'368px'" :height="'238px'"></radar>
        </div>
        <div class="rightRadar">
          <p>
            每个活动平均每周花费时间：
            <span>{{average}}</span>h
          </p>
          <radar :chart-data="data2" :radius="60" :width="'368px'" :height="'238px'"></radar>
        </div>
      </div>
    </div>
    <!-- 底部tab -->
    <div class="bottomAct">
      <div class="tabs">
        <div
          v-for="(item, idx) in tabList"
          :key="idx"
          :class="{'active': tabIndex == idx}"
          @click="tabChang(idx)"
        >{{item}}</div>
      </div>
      <div class="list">
        <div
          :class="{'list-item': true, 'diffColor': v.showDetailBtn}"
          v-for="(v, i) in lists"
          :key="i"
        >
          <!-- 查看,关闭 -->
          <div class="viewAndClose">
            <div class="view" v-if="!v.showDetailBtn">
              <img src="../../images/data/myactivity/view.png" alt />
              <p @click="redirect">查看详情</p>
            </div>
            <div :class="{'close': true, 'diffclose': v.showDetailBtn}" @click="closeActivity">
              <img v-if="v.showDetailBtn" src="../../images/data/myactivity/clo1.png" alt />
              <img v-else src="../../images/data/myactivity/clo.png" alt />
              <p>关闭活动</p>
            </div>
          </div>
          <div class="item-left">
            <img src="../../images/haitan.png" alt srcset />
          </div>
          <div class="item-right">
            <div :class="{'right-header': true, 'diffbord': v.showDetailBtn}">
              <span class="title">{{v.title}}</span>
              <span
                v-for="(tip, idx) in v.label"
                :key="idx"
                :class="{'type': true,'diffcor':v.showDetailBtn}"
              >{{tip}}</span>
              <!-- <span class="type">商业</span>
              <span class="type">社团活动</span>-->
              <div class="act-btn">
                <div v-if="v.showDetailBtn">
                  <img src="../../images/data/myactivity/star1.png" alt />
                  <img class="midimg" src="../../images/data/myactivity/comment1.png" alt />
                  <img src="../../images/data/myactivity/data1.png" alt />
                </div>
                <div v-else>
                  <img src="../../images/data/myactivity/star.png" alt />
                  <img class="midimg" src="../../images/data/myactivity/com.png" alt />
                  <img src="../../images/data/myactivity/data.png" alt />
                </div>
              </div>
            </div>
            <div class="right-tip">
              <!-- 去打开 -->
              <div :class="{'card': true,'diffcard':v.showDetailBtn}">去打卡</div>

              <div class="tip-wrapper mt10">
                <div class="tip-item">
                  <label for>
                    <img
                      v-if="v.showDetailBtn"
                      src="../../images/data/myactivity/cake1.png"
                      alt
                      srcset
                    />
                    <img v-else src="../../images/data/myactivity/cake.png" alt srcset />
                    <span>年龄要求：</span>
                  </label>
                  <span class="clib">{{v.age}}</span>
                </div>
                <div class="tip-item pa" v-if="v.showDetailBtn">
                  <label for>
                    <img src="../../images/data/myactivity/type1.png" alt srcset />
                    <span>活动形式：</span>
                  </label>
                  <span>{{v.type}}</span>
                </div>
              </div>
              <div class="tip-wrapper">
                <div class="tip-item">
                  <label for>
                    <img
                      v-if="v.showDetailBtn"
                      src="../../images/data/myactivity/loca1.png"
                      alt
                      srcset
                    />
                    <img v-else src="../../images/data/myactivity/loca.png" alt srcset />
                    <span>活动地点：</span>
                  </label>
                  <span class="clib">{{v.location}}</span>
                </div>
                <div class="tip-item pa" v-if="v.showDetailBtn">
                  <label for>
                    <img src="../../images/ashi.png" alt srcset />
                    <span>活动方式：</span>
                  </label>
                  <span>{{v.action}}</span>
                </div>
              </div>
              <div class="tip-wrapper">
                <div class="tip-item">
                  <label for>
                    <img
                      v-if="v.showDetailBtn"
                      src="../../images/data/myactivity/city1.png"
                      alt
                      srcset
                    />
                    <img v-else src="../../images/data/myactivity/city.png" alt srcset />
                    <span>活动城市：</span>
                  </label>
                  <span class="clib">{{v.city}}</span>
                </div>
                <div class="tip-item pa" v-if="v.showDetailBtn">
                  <label for>
                    <img src="../../images/azhou.png" alt srcset />
                    <span>活动周期：</span>
                  </label>
                  <span>{{v.time}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <StampDialog @close="close_stamp" :is_show="dialog_show" :isShowList="false">
      <p class="warnText">关闭活动后，此活动将从我的活动计划中删除，不可再进行优势打卡。打卡需重新添加，确认是否关闭此活动？</p>
    </StampDialog>
  </div>
</template>
<script>
import radar from "../../components/pieChart/radar";
import StampDialog from "../../components/data/StampDialog";
export default {
  components: {
    radar,
    StampDialog
  },
  data() {
    return {
      dialog_show: false,
      all: 1,
      average: 60,
      tabIndex: 0,
      sorts: [
        { name: "个人", bgc: "#FF8726" },
        { name: "班级", bgc: "#47D497" },
        { name: "年级", bgc: "#6BA2E0" }
      ],
      data1: [
        { text: "艺术与人文", max: 100, value: "70" },
        { text: "专业技能", max: 100, value: "75" },
        { text: "科学、数字和技术", max: 100, value: "85" },
        { text: "社会科学和社会服务", max: 100, value: "80" },
        { text: "体育运动", max: 100, value: "70" },
        { text: "商业", max: 100, value: "60" }
      ],
      data2: [
        { text: "艺术与人文", max: 100, value: "70" },
        { text: "专业技能", max: 100, value: "75" },
        { text: "科学、数字和技术", max: 100, value: "85" },
        { text: "社会科学和社会服务", max: 100, value: "80" },
        { text: "体育运动", max: 100, value: "70" },
        { text: "商业", max: 100, value: "60" }
      ],
      tabList: [
        "全部",
        "艺术与人文",
        "商业",
        "体育运动",
        "社会科学和社会服务",
        "科学、数字和技术",
        "专业技能"
      ],
      lists: [
        {
          imgUrl: require("../../images/haitan.png"),
          title: "击剑",
          age: "K7,K8,K9",
          location: "校内",
          city: "北京",
          label: ["体育运动", "社团兴趣课"],
          showDetailBtn: false
        },
        {
          imgUrl: require("../../images/haitan.png"),
          age: "K7,K8,K9",
          location: "校内",
          city: "北京",
          title: "击剑",
          label: ["体育运动", "社团兴趣课"],
          showDetailBtn: false
        },
        {
          imgUrl: require("../../images/haitan.png"),
          title: "暑期创业营",
          label: ["体育运动", "社团兴趣课"],
          age: "K7,K8,K9",
          location: "校内",
          city: "北京",
          type: "线下",
          action: "团队",
          time: "2019.7.1-2019.7.15",
          showDetailBtn: true
        }
      ]
    };
  },
  methods: {
    redirect() {
      this.$router.push("/students/activity/library/detail");
    },
    close_stamp() {
      this.dialog_show = false;
    },
    closeActivity() {
      this.dialog_show = true;
      // this.$confirm(
      //   '关闭活动后，此活动将从我的活动计划中删除，不可再进行优势打卡。打卡需重新添加，确认是否关闭此活动？',
      //   '提示',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //     center: true
      //   }
      // )
      //   .then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    },
    tabChang(idx) {
      this.tabIndex = idx;
      if (this.tabIndex > 1) {
        this.lists = [
          {
            imgUrl: require("../../images/haitan.png"),
            age: "K7,K8,K9",
            location: "校内",
            city: "北京",
            title: "击剑",
            label: ["体育运动", "社团兴趣课"],
            showDetailBtn: false
          }
        ];
      } else {
        this.lists = [
          {
            imgUrl: require("../../images/haitan.png"),
            age: "K7,K8,K9",
            location: "校内",
            city: "北京",
            title: "击剑",
            label: ["体育运动", "社团兴趣课"],
            showDetailBtn: false
          },
          {
            imgUrl: require("../../images/haitan.png"),
            title: "暑期创业营",
            label: ["体育运动", "社团兴趣课"],
            age: "K7,K8,K9",
            location: "校内",
            city: "北京",
            type: "线下",
            action: "团队",
            time: "2019.7.1-2019.7.15",
            showDetailBtn: true
          }
        ];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding-bottom: 47px;
  box-sizing: border-box;
  .active {
    height: 36px;
    // padding: 11px 21px;
    box-sizing: border-box;
    background: rgba(255, 135, 38, 1);
    border-radius: 6px;
    color: #fff !important;
  }
  .diffColor {
    background: rgba(73, 199, 241, 0.1) !important;
  }
  .diffcor {
    color: #49c7f1 !important;
    //  background:rgba(73, 199, 241, 1) !important;
  }
  .diffclose {
    border: 1px solid rgba(73, 199, 241, 1) !important;
    color: rgba(73, 199, 241, 1) !important;
    border-radius: 13px !important;
  }
  .diffcard {
    background: rgba(73, 199, 241, 1) !important;
    color: #fff;
  }
  .diffbord {
    border-bottom: 1px dashed rgba(73, 199, 241, 1) !important;
  }
  .topAct {
    width: 736px;
    // height: 289px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
    border-radius: 6px;
    .sort {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      box-sizing: border-box;
      .kind {
        display: flex;
        .detail {
          display: flex;
          margin-right: 21px;
          .squa {
            width: 12px;
            height: 12px;
            margin-right: 6px;
          }
          p {
            font-size: 13px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
      .add {
        // width: 128px;
        height: 26px;
        border: 1px solid rgba(255, 135, 38, 1);
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 6px 12px;
        box-sizing: border-box;
        p {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 135, 38, 1);
        }
        img {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
      }
    }
    .radar {
      display: flex;
      overflow: hidden;

      margin-top: 20px;
      .chart {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
      }
      p {
        text-align: center;
        font-size: 13px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 135, 38, 1);
        span {
          font-size: 20px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          margin: 0 5px;
          color: rgba(255, 135, 38, 1);
        }
      }
      .leftRadar {
        width: 50%;
      }
      .rightRadar {
        width: 50%;
      }
    }
  }
  .bottomAct {
    margin-top: 18px;
    width: 736px;
    height: 626px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
    border-radius: 12px;
    padding: 21px;
    box-sizing: border-box;
    .tabs {
      width: 692px;
      height: 36px;
      background: rgba(245, 245, 245, 1);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        box-sizing: border-box;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .list {
      margin-top: 18px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
      border-radius: 12px;
      .list-item {
        display: flex;
        height: 164px;
        // background: rgba(73, 199, 241, 0.1);
        // background:rgba(255,135,38,1);
        background: rgba(255, 135, 38, 0.1);
        border-radius: 6px;
        padding: 12px 0;
        margin-bottom: 16px;
        position: relative;
        .viewAndClose {
          position: absolute;
          z-index: 999;
          display: flex;
          // background-color: red;
          right: 18px;
          bottom: 10px;
          display: flex;
          div {
            width: 100px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border: 1px solid rgba(255, 135, 38, 1);
            color: #ff8726;
            border-radius: 13px;
          }
          .view {
            margin-right: 12px;
            p {
              font-size: 14px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              // color: rgba(255, 135, 38, 1);
              margin-left: 2px;
            }
          }
          .close {
            p {
              font-size: 14px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              margin-left: 2px;
              // color: rgba(255, 135, 38, 1);
            }
          }
        }
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
            border-bottom: 1px dashed rgb(255, 135, 38);
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
              // color: rgba(73, 199, 241, 1);
              color: #ff8726;
              line-height: 40px;
              padding: 4px 10px;
              background-color: #fff;
            }
            .act-btn {
              // width: 100px;
              height: 26px;
              display: block;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              text-align: center;
              line-height: 26px;
              font-size: 14px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(73, 199, 241, 1);
              display: flex;
              align-items: center;
              justify-content: space-between;
              .midimg {
                margin: 0 17px;
              }
            }
          }
          .right-tip {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            .card {
              width: 105px;
              height: 36px;
              line-height: 36px;
              background: rgba(255, 135, 38, 1);
              border-radius: 6px;
              text-align: center;
              color: #fff;
              position: absolute;
              top: 14%;
              right: 18px;
              // transform: translateY(-50%);
            }

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
                left: 180px;
              }
            }
            .mt10 {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
.warnText {
  background-color: #fff;
  font-size: 22px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
  padding: 63px 59px 46px;
  text-align: center;
}
</style>


