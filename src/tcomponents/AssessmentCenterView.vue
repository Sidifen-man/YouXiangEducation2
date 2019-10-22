<template>
  <div class="assessmentCenterView">
    <div class="tab-content">
      <div class="logo">
        <div class="img-logo">
          <img src="../images/erqi/center/headlogo.png" alt />
        </div>
      </div>
      <div class="tip">
        <span class="tip-more">
          VIA优势测评(Values
          inAction)，以前被称为“行动价值量表”，是一种心理评估方法，旨在确定一个人的性格优势。
        </span>
        <span class="tip-more">
          优势个性是指我们最核心的思考、感受、行为的潜质，这些潜能可以帮助我们持续地提升与改善我们的生活。VIA性格优势测评由“积极心理学之父...
        </span>
        <span class="more" @click="readMore">了解更多</span>
      </div>
      <div class="btn">
        <div class="img-btn" @click="evalution">
          <!-- 开始测评 -->
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">
        <div class="title">
          <span>我的优势画像</span>
        </div>
        <div class="help">
          <el-tooltip placement="bottom" effect="light" popper-class="home_help">
            <div slot="content" class="content">
              <p>优势画像是根据你的VIA测评结果的前三位突出优势智能生成的描述，能帮助你快速了解这些优势如何影响你以及你可以怎样更好的使用它们。</p>
            </div>
            <img src="../images/erqi/center/help.png" alt srcset />
          </el-tooltip>
        </div>
      </div>
      <div class="section-content advantage">
        <ul class="advantage-ul">
          <li>
            <div class="theme">
              <img class="ml" src="../images/erqi/center/tuceng50.png" alt srcset />
            </div>
            <div class="theme-des right">
              <p class="des-title">当...我会表现最佳</p>
               <p class="type" v-for="item in strength.bestTime" v-if="strength.bestTime && strength.bestTime.length">{{item.name}}</p>
            </div>
          </li>
          <li>
            <div class="theme-des left">
              <p class="des-title">我最擅长...</p>
              <p class="type" v-for="item in strength.goodAt" v-if="strength.goodAt && strength.goodAt.length">{{item.name}}</p>
            </div>
            <div class="theme">
              <img class="mr" src="../images/erqi/center/tuceng53.png" alt srcset />
            </div>
          </li>
          <li>
            <div class="theme">
              <img class="ml" src="../images/erqi/center/tuceng56.png" alt srcset />
            </div>
            <div class="theme-des right">
              <p class="des-title">我需要注意...</p>
              <p class="type" v-for="item in strength.attention" v-if="strength.attention && strength.attention.length">{{item.name}}</p>
            </div>
          </li>
          <li>
            <div class="theme-des left">
              <p class="des-title">我需要的支持...</p>
              <p class="type" v-for="item in strength.supportRequired" v-if="strength.supportRequired && strength.supportRequired.length">{{item.name}}</p>
            </div>
            <div class="theme">
              <img class="mr" src="../images/erqi/center/tuceng54.png" alt srcset />
            </div>
          </li>
        </ul>
        <div class="center">
          <p>突出</p>
          <!-- <br /> -->
          <p>优势</p>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">
        <div class="title">
          <span>测评结果</span>
        </div>
        <div class="help">
          <el-tooltip placement="bottom" effect="light" popper-class="home_help">
            <div slot="content" class="content">
              <p>你知道吗？你具备所有24项优势，但你的优势的表现又有强弱之分。根据VIA测评结果，系统智能区分出你的突出优势-你最自然而然地行为表现，常用优势-在一些场景下可以被你有效利用的特质，次要优势-你虽然具备但需要有意识地使用和练习提升的性格优势。</p>
            </div>
            <img src="../images/erqi/center/help.png" alt srcset />
          </el-tooltip>
        </div>
      </div>
      <div class="section-content evaluation">
        <ul class="evaluation-ul">
          <li>
            <div class="evaluation-theme">
              <span>突出优势</span>
            </div>
            <div class="noText" v-show="!isIcon">
              <el-tooltip placement="bottom" effect="light" popper-class="home_help">
                <div slot="content" class="content">
                  <p>您尚未完成测评，快去完成测评吧</p>
                </div>
                <img src="../images/erqi/center/wenhao.png" alt />
              </el-tooltip>
            </div>
            <div class="img-list" v-show="isIcon">
              <div class="img-item" v-for="item in evaluationList1"  @click="sign_item(item)">
                <img :src="item.imgs" alt />
                <p>{{item.name}}</p>
              </div>
            </div>
          </li>
          <li class="scroll" ref="scroll">
            <div class="evaluation-theme">
              <span>常用优势</span>
            </div>
            <div class="noText" v-show="!isIcon">
              <el-tooltip placement="bottom" effect="light" popper-class="home_help">
                <div slot="content" class="content">
                  <p>您尚未完成测评，快去完成测评吧</p>
                </div>
                <img src="../images/erqi/center/wenhao.png" alt />
              </el-tooltip>
            </div>
            <div class="scroll-content" ref="content" :style="{'transform':`translateX(${x})`}" v-show="isIcon">
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" v-for="item in evaluationList2"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
                
                <div class="img-item" @click="next(1)">
                  <img src="../images/erqi/center/next.png" alt />
                  <p>下一页</p>
                </div>
              </div>
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" @click="next(4)">
                  <img src="../images/erqi/center/next.png" style="transform: rotate(180deg);" alt />
                  <p>上一页</p>
                </div>
                <div class="img-item" v-for="item in evaluationList3"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
              
                <div class="img-item" @click="next(2)">
                  <img src="../images/erqi/center/next.png" alt />
                  <p>下一页</p>
                </div>
              </div>
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" v-for="item in evaluationList4"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
                <div class="img-item" @click="next(3)">
                  <img src="../images/erqi/center/next.png" style="transform: rotate(180deg);" alt />
                  <p>上一页</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="evaluation-theme">
              <span>次要优势</span>
            </div>
            <div class="noText" v-if="!isIcon">
              <el-tooltip placement="bottom" effect="light" popper-class="home_help">
                <div slot="content" class="content">
                  <p>您尚未完成测评，快去完成测评吧</p>
                </div>
                <img src="../images/erqi/center/wenhao.png" alt />
              </el-tooltip>
            </div>
            <div class="img-list" v-else>
              <div class="img-item" v-for="item in evaluationList5"  @click="sign_item(item)">
                <img :src="item.imgs" alt />
                <p>{{item.name}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 签到组件 -->
    <Sign ref="items" :is_show="is_show" @close="close" />
  </div>
</template>
<script>
import Sign from "./Sign";
import surver from "api/http/evaluation.js";
export default {
  data() {
    return {
      isCeshi:false,
      isIcon: true,
      strength:'',
      x: "0px",
      width: 0,
      is_show: false,
      text: "",
      evaluationList1:[],
      evaluationList2:[],
      evaluationList3:[],
      evaluationList4:[],
      evaluationList5:[],
    };
  },
  created(){
    // this.$loadingMy();
    this.strengthportrait()
  },
  mounted() {
    this.width = this.$refs.scroll.getBoundingClientRect().width;
  },
  components: {
    Sign
  },
  methods: {
    sign_item(des) {
      this.is_show = true;
      this.$refs.items.setCurrent(des);
    },
    close() {
      this.is_show = false;
    },
    readMore() {
      this.$router.push({
        path: "/teacher/assess/readMore",
        query: { type: 1 }
      });
    },
    evalution() {
      this.$router.push({
        path: "/teacher/assess/evaluate"
      });
    },
    next(i) {
      if (i <= 2) {
        this.x = `-${this.width * i}px`;
      } else if (i === 3) {
        this.x = `-${this.width}px`;
      } else {
        this.x = `-${0}px`;
      }
    },
    strengthportrait() {
      let LocalStorage = this.$cache.localStorage;
      const lang = LocalStorage.get("lang");
      let param = {
        id: 'via86',
        lang: lang
      };
      surver.getViaResult(param).then(res => {
        if(res.data.code=="success"){
          if(res.data.result && res.data.result.length){
            this.evaluationList = res.data.result;
            let evaluationList = res.data.result;
              evaluationList.forEach((item, index) => {
                let type = item.type.replace(/[ ]/g,"");  //去除空格
                // import(`../images/erqi/ceping/${type}.png`).then(res => {
                //   item.imgs = res
                // });
               item.imgs = require(`../images/erqi/ceping/${type}.png`)
                if(index<5){
                  this.evaluationList1.push(item)
                }
                if(index>=5 && index<10){
                  let inx = index-5;
                  this.evaluationList2.push(item)
                }
                if(index>=10 && index<14){
                  let inx = index-5;
                  this.evaluationList3.push(item)
                }
                if(index>=14 && index<19){
                  let inx = index-5;
                   this.evaluationList4.push(item)
                }
                if(index>=19 && index<=23){
                  let inx = index-5;
                   this.evaluationList5.push(item)
                }
              });
          }else{
            this.isIcon = false;
            console.log(this.isIcon)
          }  
        }else{
          this.$message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      });
      surver.getStrengthportrait(param).then(res => {
        if(res.data.code=="success"){
          let strengthList = res.data.result
          this.strength = strengthList;
          this.isCeshi = true; 
        }else{
           this.$message.error(res.data.message);
        }
         // this.$loadingMy.close();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.assessmentCenterView {
  .tab-content {
    display: flex;
    background-color: #fff;
    border-radius: 0 0 7px 7px;
    padding-bottom: 30px;
    div {
      overflow: hidden;
    }
    .logo {
      width: 28%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-logo {
        width: 80%;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    .tip {
      background-color: #fff;
      flex: 1;
      position: relative;
      span {
        text-indent: 25px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
        line-height: 20px;
        letter-spacing: 1px;
      }
      .tip-more {
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        position: relative;
        line-height: 23px;

      }
      .more {
        font-size: 11px;
        font-weight: 800;
        color: rgba(255, 135, 38, 1);
        line-height: 17px;
        position: absolute;
        // right: 0;
        bottom: 0;
        cursor: pointer;
        white-space: nowrap;
      }
    }
    .btn {
      width: 23%;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-btn {
        width: 116px;
        height: 116px;
        border-radius: 50%;
        padding: 0;
        cursor: pointer;
        background:url('../images/img/11.png') no-repeat;
        background-size: cover;
        background-position: center;
        line-height:116px;
        text-align:center;
        color:#666;
        font-size:15px;
      }
    }
  }
}
.section {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 7px;
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 40px;
      font-size: 14px;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      padding-top: 15px;
      span {
        padding-left: 25px;
        border-left: 3px solid rgba(255, 135, 38, 1);
      }
    }
    .help {
      display: flex;
      align-content: center;
      margin: 5px 30px 0 0;
      cursor:pointer;
    }
  }
  .advantage {
    padding: 0 4%;
  }
  .evaluation {
    padding: 0 4%;
  }
  .section-content {
    position: relative;
    .advantage-ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20px 0 10px 0;
      li {
        box-sizing: border-box;
        list-style: none;
        width: 48%;
        height: 193px;
        margin-bottom: 20px;
        border: 2px solid rgba(255, 135, 38, 0.31);
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .theme {
          flex: 1;
          border-radius: 50%;
          img {
            width: 100%;
            height: auto;
          }
          .ml {
            margin-left: 20px;
          }
          .mr {
            margin-left: -20px;
          }
        }
        .theme-des {
          line-height: 20px;
          width: 75%;
          padding: 20px 20px 29px 20px;
          .des-title {
            padding-bottom: 17px;
            font-size: 14px;
            font-weight: 800;
            color: rgba(255, 135, 38, 1);
          }
          .type {
            font-size: 12px;
            font-weight: 500;
            color: rgba(136, 136, 136, 1);
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 24px;
          }
        }
        .left {
          text-align: left;
        }
        .right {
          text-align: right;
        }
      }
    }
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 104px;
      height: 104px;
      border-radius: 50%;
      background-image: url("../images/erqi/center/椭圆574.png");
      background-size: contain;
      font-size: 18px;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
    //  line-height: 16px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
    }
    .evaluation-ul {
      display: flex;
      justify-content: space-between;
      padding: 20px 0 23px 0;
      li {
        width: 31%;
        border: 2px solid rgba(255, 135, 38, 0.31);
        border-radius: 7px;
        list-style: none;
        padding-bottom: 35px;
        .evaluation-theme {
          font-size: 13px;
          font-weight: bold;
          color: rgba(252, 163, 48, 1);
          line-height: 30px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          margin: 0 6%;
          border-bottom: 1px solid rgba(255, 135, 38, 0.31);
        }
        .noText {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor:pointer;
          height: 210px;
          img {

         // height: 100%;
        //  img {
         //   margin-top: -40px;

            width: 80px;
            height: 80px;
          }
        }
        .img-list {
          width: 100%;
          .img-item {
            width: 30%;
            display: block;
            float: left;
            margin-top: 30px;
            margin-left: 2%;
            text-align: center;
            cursor: pointer;
            img {
              display: inline-block;
              width: 42px;
              height: 42px;
              border-radius: 50%;
            }
            p {
              font-size: 13px;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 17px;
              white-space: nowrap;
              margin-top: 17px;
            }
          }
        }
      }
      .scroll {
        overflow: hidden;
        .scroll-content {
          min-width: 99999px;
          height: 220px;
          transition: all 1s;
          .img-list {
            float: left;
          }
        }
      }
    }
  }
}
</style>
