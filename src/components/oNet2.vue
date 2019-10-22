<template>
  <div>
    <div class="top">
      <img class="left" src="../images/img/10.png" alt />
      <p>
        <span v-html="fitlerdes()"></span>
        <var @click="push">了解更多</var>
      </p>
      <img class="right" src="../images/img/11.png" alt @click="start" v-if="isShowCeshi"/>
      <div class="right2" v-else>开始测试</div>
    </div>
    <div class="footer">
      <div class="help">
        <h6>我的测评</h6>
        <el-tooltip placement="bottom" effect="light" popper-class="home_help">
          <div slot="content" class="content">
            <p>测评结果是基于大数据算法，从成就、独立、认可、关系、支持和工作环境6个价值观维度进行测评打分，从而得出与你的职业价值观结果相匹配的职业。</p>
          </div>
          <img src="../images/erqi/center/help.png" alt srcset />
        </el-tooltip>
      </div>
      <section>
        <div>
          <p class="title">突出价值观代码</p>
          <div class="charts">
            <div
              class="code1"
              v-for="(v,i) in mainData"
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
              <div class="hover" v-if="showTip===i && showTip2" :style="{'backgroundColor':v.bgcol}">
                <img :src="v.img" alt class="tipimg" />
                <p class="subtitle">{{v.title}}</p>
                <div class="desc">{{v.desc}}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="title">其他价值观代码</p>
          <div class="charts">
            <div
              class="code1"
              v-for="(v,i) in otherData"
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
              <div class="hover" v-if="showOtherTip===i && showTip2" :style="{'backgroundColor':v.bgcol}">
                <img :src="v.img" alt class="tipimg" />
                <p class="subtitle">{{v.title}}</p>
                <div class="desc">{{v.desc}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="modal" v-if="mydialog">
      <div class="mydialog">
        <div class="close" @click="mydialog=false">
          <img src="../images/close1.png" alt />
        </div>
        <div class="topimg">
          <img src="../images/dialog.png" alt />
        </div>
        <p class="dialogTitle">这不是一个考试!</p>
        <div class="block">
          <el-carousel
            height="270px"
            :autoplay="false"
            indicator-position="outside"
            :loop="false"
            arrow="never"
            ref="carousel"
            @change="change"
          >
            <el-carousel-item>
              <div class="small">
                <h6>重要提示</h6>
                <p>
                  如果你
                  <i>还没有完成</i>Onet职业价值观测评（WIP），完成此测评后，你将看到的是根据你的突出职业价值观代码以及上千个职业中算出的与你大的职业价值观匹配的推荐职业。
                </p>
                <p>
                  如果你
                  <i>已经完成</i>Onet职业价值观测评（WIP），完成此测评后，你将看到的是根据你的突出职业价值观代码与职业兴趣代码，并且系统结合两套测评结果在上千个职业中算出了你的职业兴趣以及价值观维度最匹配的推荐职业。
                </p>
                <p>记住你最后只有一份报告。而且这份报告没有考虑到你的学术或其他能力因素。</p>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="small small1">
                <p>您即将使用O*NET工作价值观测评工具(WIP)。WIP将帮助你发现在工作中什么对你来说最重要的，那些职业可能是噗呸你的职业价值观。</p>
                <div class="imgs">
                  <div class="imgItem">
                    <div class="opt" @click="handleClick(1)">
                      <p class="score">1分</p>
                    </div>
                    <p>非常不重要</p>
                    <img v-show="index===1" class="radio" src="../images/img/20.png" alt />
                  </div>
                  <div class="imgItem">
                    <div class="opt" @click="handleClick(2)">
                      <p class="score">2分</p>
                    </div>
                    <p>不重要</p>
                    <img v-show="index===2" class="radio" src="../images/img/20.png" alt />
                  </div>
                  <div class="imgItem">
                    <div class="opt" @click="handleClick(3)">
                      <p class="score">3分</p>
                    </div>
                    <p>中立</p>
                    <img v-show="index===3" class="radio" src="../images/img/20.png" alt />
                  </div>
                  <div class="imgItem">
                    <div class="opt" @click="handleClick(4)">
                      <p class="score">4分</p>
                    </div>
                    <p>重要</p>
                    <img v-show="index===4" class="radio" src="../images/img/20.png" alt />
                  </div>
                  <div class="imgItem">
                    <div class="opt" @click="handleClick(5)">
                      <p class="score">5分</p>
                    </div>
                    <p>非常重要</p>
                    <img v-show="index===5" class="radio" src="../images/img/20.png" alt />
                  </div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="answer small">
                <p>在进行测评的任何时刻，您都可以更改对问题的回答。只需用鼠标点击选项描述，点击“撤销”，就可以重新选择你对相关描述的评分。</p>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="last small">
                <p>记住，没有对或错的答案— —你是在试图找出什么对你来说是重要的。</p>
                <p>这个测评没有时间限制。慢慢思考，选出符合你的答案。</p>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="button back" @click="prev" v-if="current!=0">返回</div>
          <div class="button" @click="next" v-if="current != 3">下一步</div>
          <div class="button" @click="confirm" v-if="current == 3">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PieChart from '../components/pieChart/PieChart'
import surver from "api/http/evaluation.js";
export default {
  components: {
    PieChart
  },
  data() {
    return {
      index: 0,
      current: 0,
      dialogVisible: true,
      tabs: ["职业兴趣", "职业价值观", "职业推荐"],
      showTip: false,
      isShowCeshi:true,
      showOtherTip: false,
      showTip2:true,
      mydialog: false,
      mainData: [
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#26C9FF",
          bgcol: "#26C9FF",
          shadowColor: "rgba(38, 201, 255, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc:""
        },
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#FF8726",
          bgcol: "#FF8726",
          shadowColor: "rgba(255, 135, 38, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc: ""
        },
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#3DDEBE",
          bgcol: "#3DDEBE",
          shadowColor: "rgba(61, 222, 190, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc: ""
        }
      ],
      otherData: [
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#26C9FF",
          bgcol: "#26C9FF",
          shadowColor: "rgba(38, 201, 255, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc: ""
        },
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#FF8726",
          bgcol: "#FF8726",
          shadowColor: "rgba(255, 135, 38, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc:""
        },
        {
          data: {
            crude: 0,
            thin: 100,
            text:0,
          },
          labelColor: "#3DDEBE",
          bgcol: "#3DDEBE",
          shadowColor: "rgba(61, 222, 190, 0.2)",
          title: "",
          img: require("../images/img/12.png"),
          desc:""
        }
      ]
    };
  },
  created(){
     // 获取本地缓存数据
    let LocalStorage = this.$cache.localStorage
    this.lang = LocalStorage.get('lang');
    let grade =  JSON.parse(LocalStorage.get('loginuser'));
    if(grade.classInfo.classType === "3")this.isShowCeshi = false;
    this.getoNet('wip20')
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
    fitlerdes(text) {
      let str =
        text ||
        "Onet职业价值观测评是帮助你理解对你来说最重要的工作价值的评估。</br>它们可能会随着你的人生阶段推移而改变，但可以作为一个很好的参考，来评估现在对你来说重要的是什么。测评结果会得出6个维度的值，你可以看到关于你的突出维度和次要维度的相关定义";
      return str.slice(0, 173) + "...";
    },
    start() {
      this.mydialog = true;
    },
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
    handleClick(index) {
      this.index = index;
    },
    change(current) {
      this.current = current;
    },
    confirm() {
      this.$router.push("/students/home/exam");
    },
    push() {
      this.$router.push('/students/home/detail2')
    },
    getoNet(id){
      let param = {
        id : id,
        lang : this.lang
      }
      surver.getWipResult(param).then(res=>{
        if(res.data.code === "success"){
          let list =  res.data.result;
          if(!list || !list.length){
            this.showTip2 = false;
            return;
          }
          list.forEach((item,index)=>{
            let  percent = item.percent.split('.')[0]
            let  thin = 100-percent;
            let type = item.nameEn;
            let dataList = {
              crude:percent,
              thin:thin,
              text:item.subValue,
            }
            if(index<3){
              this.mainData[index].data = dataList
              this.mainData[index].title = item.name;
              this.mainData[index].desc = item.desc;
            }else{
              let inx = index-3
              this.otherData[inx].data = dataList;
              this.otherData[inx].title = item.name;
              this.otherData[inx].desc = item.desc;
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
    cursor: pointer;
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
