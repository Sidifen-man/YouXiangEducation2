<template>
  <div>
    <div class="top">
      <img class="left" src="../images/img/10.png" alt />
      <p>
        <span v-html="fitlerdes('',180)"></span>
        <var @click="readMore">了解更多</var>
      </p>
      <div class="right">开始测试</div>
      <!-- <img class="right" src="../images/img/11.png" alt @click="start" /> -->
    </div>
    <div class="footer">
      <div class="help">
        <h6>我的测评</h6>
        <el-tooltip placement="bottom" effect="light" popper-class="home_help">
          <div slot="content" class="content">
            <p>测评结果是基于大数据算法，根据美国著名心理学教授、职业指导专家约翰·霍兰德（John Holland）的职业兴趣理论，从现实型、研究型、艺术型、社会型、企业型和常规型6个维度进行测评打分，从而得出与你的职业兴趣结果相匹配的职业。</p>
          </div>
          <img src="../images/erqi/center/help.png" alt srcset />
        </el-tooltip>
      </div>
       <section>
        <div>
          <p class="title">突出霍兰德代码</p>
          <div class="charts">
            <div
              class="code1"
              v-for="(v,i) in data"
              :key="i"
              @mouseenter="enter(i)"
              @mouseleave="leave()"
            >
              <pie-chart
                :chart-data="v.data"
                :shadowColor="v.shadowColor"
                :labelColor="v.labelColor"
              />
              <p>{{v.title}}</p>
              <div class="hover" v-if="showTip===i && showTip2" :style="{'backgroundColor':v.labelColor}">
                <img :src="v.img" alt class="tipimg" />
                <p class="subtitle">{{v.title}}</p>
                <div class="desc">{{v.des}}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="title">其他霍兰德代码</p>
          <div class="charts">
            <div
              class="code1"
              v-for="(v,i) in data1"
              :key="i"
              @mouseenter="enterOther(i)"
              @mouseleave="leaveOther(i)"
            >
              <pie-chart
                :chart-data="v.data"
                :shadowColor="v.shadowColor"
                :labelColor="v.labelColor"
              />
              <p>{{v.title}}</p>
              <div class="hover" v-if="showOtherTip===i && showTip2" :style="{'backgroundColor':v.labelColor}">
                <img :src="v.img" alt class="tipimg" />
                <p class="subtitle">{{v.title}}</p>
                <div class="desc">{{v.des}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <section>
        <div>
          <p class="title">突出霍兰德代码</p>
          <div class="box">
            <el-tooltip
              class="item"
              effect="light"
              placement="right"
              :visible-arrow="false"
              popper-class="oNet"
              v-for="(item,index) in data"
              :key="index"
            >
              <div slot="content" class="hover" :style="{'background-color':item.labelColor}">
                <img :src="item.img" alt />
                <p class="t">{{item.title}}</p>
                <p>{{fitlerdes(item.des)}}</p>
              </div>
              <div class="circle">
                <pie-chart
                  :chart-data="item.data"
                  :shadowColor="item.shadowColor"
                  :labelColor="item.labelColor"
                />
                <p>{{item.title}}</p>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div>
          <p class="title">其他霍兰德代码</p>
          <div class="box">
            <el-tooltip
              class="item"
              effect="light"
              placement="right"
              :visible-arrow="false"
              popper-class="oNet"
              v-for="(item,index) in data1"
              :key="index"
            >
              <div slot="content" class="hover" :style="{'background-color':item.labelColor}">
                <img :src="item.img" alt />
                <p class="t">{{item.title}}</p>
                <p>{{fitlerdes(item.des)}}</p>
              </div>
              <div class="circle">
                <pie-chart
                  :chart-data="item.data"
                  :shadowColor="item.shadowColor"
                  :labelColor="item.labelColor"
                />
                <p>{{item.title}}</p>
              </div>
            </el-tooltip>
          </div>
        </div>
      </section> -->
    </div>
    <evalute-dialog ref="evaluteDialog"></evalute-dialog>
  </div>
</template>

<script>
import EvaluteDialog from "./evaluteDialog";
import PieChart from "./pieChart/PieChart";
import surver from "api/http/evaluation.js";
export default {
  components: {
    EvaluteDialog,
    PieChart
  },
  data() {
    return {
      tabs: ["职业兴趣", "职业价值观", "职业推荐"],
      showTip: false,
      showOtherTip: false,
      showTip2:true,
      data: [
        {
          shadowColor: "rgba(38,201,255,0.2)",
          labelColor: "#26C9FF",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des:""
        },
        {
          shadowColor: "rgba(255,135,38,0.2)",
          labelColor: "#FF8726",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des: ""
        },
        {
          shadowColor: "rgba(61,222,190,0.2)",
          labelColor: "#3DDEBE",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des:""
        }
      ],
      data1: [
        {
          shadowColor: "rgba(38,201,255,0.2)",
          labelColor: "#26C9FF",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des:""
        },
        {
          shadowColor: "rgba(255,135,38,0.2)",
          labelColor: "#FF8726",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des: ""
        },
        {
          shadowColor: "rgba(61,222,190,0.2)",
          labelColor: "#3DDEBE",
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          img: require("../images/img/12.png"),
          title: "",
          des:""
        }
      ],
      fitlerdes(text, leng) {
        let str =
          text ||
         "Onet职业兴趣测评是美国劳工部与教育部联合研发，通过20年积累的成熟职业测评体系。问卷结果基于大数据库算法，与数据库中1000多个职业进行匹配。</br>Onet测评结果首先与霍兰德职业兴趣代码相匹配，获得6个维度的得分。基于你的得分，系统进一步基于算法得出与你的职业兴趣结果相匹配的职业，并按照教育水平要求由高到低展示，下面开始你的职业兴趣探索吧。";
        return str.slice(0, leng || 70) + "...";
      }
    };
  },
  created(){
   
     // 获取本地缓存数据
    let LocalStorage = this.$cache.localStorage
    this.lang = LocalStorage.get('lang');
    let grade =  JSON.parse(LocalStorage.get('loginuser'));
    this.$loadingMy()
    this.getoNet('cip30')
  },
  methods: {
     enter(idx) {
      this.showTip = idx;
    },
    leave(idx) {
      this.showTip = false;
    },
    enterOther(idx) {
      this.showOtherTip = idx;
    },
    leaveOther(idx) {
      this.showOtherTip = false;
    },
    handleClick(index) {
      this.activeName = index;
    },
    start() {
      this.$refs.evaluteDialog.mydialog = true;
    },
    readMore() {
      this.$router.push("/teacher/assess/detail");
    },
    getoNet(id){
      let param = {
        id : id,
        lang : this.lang
      }
      surver.getCipResult(param).then(res=>{
        this.$loadingMy.close()
        if(res.data.code === "success"){
          let list =  res.data.result;
          if(!list || !list.length){
            this.showTip2 = false;
            return;
          }
          list.forEach((item,index)=>{
            let  percent = item.percent.split('.')[0]
            let  thin = 100-percent;
            let dataList = {
              crude:percent,
              thin:thin,
              text:item.value,
            }
            if(index<3){
              this.data[index].data = dataList
              this.data[index].title = item.name;
              this.data[index].des = item.desc;
            }else{
              let inx = index-3;
              this.data1[inx].data = dataList
              this.data1[inx].title = item.name;
              this.data1[inx].des = item.desc;
            }
          })

        }else{
          const message = res.data.message
          this.$message({
            message: message,
            type: "error"
          });   
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  .mydialog {
    margin-top: 10%;
    width: 800px;
    height: 606px;
    background-color: #fff;
    position: relative;
    border-radius: 20px;
    .close {
      width: 24px;
      height: 40px;
      position: absolute;
      right: 25px;
      top: -40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .topimg {
      width: 216px;
      height: 216px;
      background-color: #fff;
      border: 3px solid #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -108px;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 213px;
        height: 213px;
      }
    }
    .dialogTitle {
      height: 34px;
      font-size: 36px;
      font-family: HYo1gj;
      font-weight: 400;
      color: rgba(255, 135, 38, 1);
      line-height: 23px;
      margin-top: 128px;
      text-align: center;
    }
    .block {
      margin-top: 38px;
      .el-carousel__item.is-animating {
        display: flex;
        justify-content: center;
      }

      .opt {
        width: 38px;
        height: 38px;
        background-color: #ff8726;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 13px auto;
        .score {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 23px;
        }
      }
      .small {
        width: 685px;
        height: 260px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        margin-top: 5px;
        p {
          font-size: 11px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          // margin: 0 20px 15px 20px;
          margin: 15px 20px;
          text-align: justify;
          i {
            color: #ff8726;
            font-style: normal;
          }
        }
        h6 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          position: relative;
          padding: 20px 0 20px 14px;
          &:before {
            position: absolute;
            content: "";
            width: 3px;
            height: 17px;
            background: rgba(252, 121, 39, 1);
            border-radius: 1px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .button {
        width: 133px;
        height: 44px;
        background: rgba(255, 135, 38, 1);
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom-right-radius: 15px;
      }
      .back {
        width: 134px;
        height: 44px;
        background: rgba(233, 233, 233, 1);
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
        position: absolute;
        bottom: 0;
        right: 133px;
        border-bottom-right-radius: 0px;
      }
      .small1 {
        .imgs {
          margin-top: 50px;
        }
        h5 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          line-height: 36px;
          color: #333;
          margin-left: 20px;
          padding-top: 10px;
          i {
            color: rgba(255, 135, 38, 1);
            font-style: normal;
          }
        }
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 60px 0 50px;
          > div {
            height: 73px;
            p {
              text-align: center;
              font-size: 10px;
              color: #333;
              margin: 3px 0;
            }
            .smile {
              width: 29px;
              height: 29px;
              margin: 0 auto;
              display: block;
            }
            .radio {
              width: 17px;
              height: 17px;
              margin: 0 auto;
              display: block;
            }
          }
        }
      }
      .answer {
        // width: 514px;
        height: 245px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        padding: 21px 29px 0 29px;
        box-sizing: border-box;
        h6 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 20px;
        }
        p {
          width: 456px;
          height: 22px;
          // background: rgba(247, 128, 43, 0.1);
          font-size: 11px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          // color: rgba(247, 128, 43, 1);
          padding-left: 8px;
          line-height: 22px;
          margin-bottom: 10px;
          &:nth-of-type(3) {
            background: none;
            color: #666;
            margin-top: 18px;
          }
        }
      }
      .last {
        // width: 514px;
        height: 245px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        padding: 20px;
        box-sizing: border-box;
        h6 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 20px;
        }
        p {
          font-size: 11px;
          color: #666;
          &:nth-of-type(1) {
            margin-bottom: 10px;
          }
          &:nth-of-type(4) {
            font-size: 12px;
          }
          &:nth-of-type(5) {
            margin-top: 5px;
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 700;
            color: #ff8726;
          }
        }
        .center {
          font-size: 11px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 135, 38, 1);
          margin: 19px 0;
        }
      }
    }
  }
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 168px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 33px 38px 29px;
  margin-bottom: 15px;
  p {
    font-weight: 500;
    color: rgba(136, 136, 136, 1);
    line-height: 23px;
    font-size: 14px;
    flex: 1;
    margin: 0 45px 0 22px;
    text-indent: 2em;
    text-align: justify;
    var {
      color: rgba(252, 163, 48, 1);
      font-style: normal;
      cursor: pointer;
    }
  }
  img {
    display: block;
  }
  .left {
   width: 100px;
    height: 89px;
  }
  .right {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    background:url('../images/7-071.png')no-repeat;
    background-size: cover;
    background-position: center;
    line-height:110px;
    text-align:center;
    color:#666;
    font-size:15px;
  }
}
.footer {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(177, 79, 0, 0.07);
  border-radius: 9px;
  overflow: hidden;
  padding: 0 40px 50px;
  box-sizing: border-box;
  .help {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      margin-right: -20px;
    }
  }
  h6 {
    position: relative;
    font-size: 14px;
    font-family: PingFang-SC-Heavy;
    font-weight: 800;
    color: rgba(51, 51, 51, 1);
    color: #333;
    margin: 15px 0 46px;
    &:after {
      position: absolute;
      content: "";
      width: 2px;
      height: 11px;
      background: rgba(252, 121, 39, 1);
      border-radius: 1px;
      top: 50%;
      transform: translateY(-50%);
      left: -33px;
    }
  }
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 318px;
    > div {
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 135, 38, 0.27);
      box-shadow: 0px 2px 21px 0px rgba(255, 135, 38, 0.16);
      border-radius: 9px;
      height: 100%;
      width: 430px;
      margin-right: 28px;
      &:nth-of-type(2) {
        margin-right: 0;
      }
      .tipimg {
        width: 99%;
        height: 80px;
      }
      .desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
        overflow: hidden;
        font-size:12px;
        line-height:16px;
        text-align:left;
        // height: 61px;
      }
      .title {
        text-align: center;
        border-bottom: 1px solid #ffa75c;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(252, 163, 48, 1);
        line-height: 1;
        padding: 35px 0 14px;
        box-sizing: border-box;
        margin: 0 30px 48px;
      }
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        text-align: center;
         margin-top: 23px;
      }

      .charts {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        margin-top: 37px;
      }
      .chart {
        margin: 0 auto;
      }
      .code1 {
        height: 163px;
        width: 118px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
        border-radius: 10px;
        position: relative;
        cursor:pointer;
      }
      .subtitle {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      .hover {
        padding: 6px;
        box-sizing: border-box;
        text-align: center;
        position: absolute;
        top: -32%;
        left: 0;
        width: 140px;
        height: 247px;
        z-index: 999;
        // overflow: hidden;
        // background: rgba(255, 255, 255, 1);
        // box-shadow: 20px 20px 20px 20px rgba(177, 79, 0, 0.07);
        box-shadow: 0px 0px 20px 0px rgba(45, 200, 211, 0.07);
        border-radius: 10px;
        color: #fff;
        p{
          margin-top:0;
        }
      }
      .circle {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        padding: 13px 13px 22px;
        margin: 0 auto;
      }
    }
  }
}
.dialog {
  height: 700px;
  .close {
    width: 100px;
    height: 100px;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
  }
  .el-dialog.myDialog {
    height: 600px;
  }
  .demonstration {
    text-align: center;
    height: 34px;
    font-size: 36px;
    font-family: HYo1gj;
    font-weight: bold;
    color: rgba(255, 135, 38, 1);
    line-height: 23px;
    margin-top: 146px;
  }
}
</style>
