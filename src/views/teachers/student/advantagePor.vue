<template>
  <div class="portrait">
    <div class="contain">
        <img class="close" src="../../../images/close1.png" alt="" @click="closeDialog">
      <p class="title"> <span>{{stuName}}</span> 的优势画像</p>
      <div class="outstand">

        <div class="mid">
          <div class="item item1">
            <div class="leftImg">
              <img
                src="../../../images/t50.png"
                alt=""
              >
            </div>
            <div class="rightInfo">
              <p class="infotitle">当...我会表现最佳</p>
              <p class="infos" v-for="(item, i) in comments.bestTime" :key="i">{{item.name}}</p>
            </div>
          </div>
          <div class="item item2">

            <div class="rightInfo">
              <p class="infotitle">我最擅长...</p>
               <p class="infos" v-for="(item, i) in comments.goodAt" :key="i">{{item.name}}</p>
            </div>
            <div class="leftImg">
              <img
                src="../../../images/t53.png"
                alt=""
              >
            </div>
          </div>
          <div class="inner">
            <div>
              <p>突出</p>
              <p>优势</p>
            </div>
          </div>

          <div class="item item3">
            <div class="leftImg">
              <img
                src="../../../images/t56.png"
                alt=""
              >
            </div>
            <div class="rightInfo">
              <p class="infotitle">我需要注意...</p>
             <p class="infos" v-for="(item, i) in comments.attention" :key="i">{{item.name}}</p>
            </div>
          </div>
          <div class="item item4">
            <div class="rightInfo">
              <p class="infotitle">我需要的支持...</p>
              <p class="infos" v-for="(item, i) in comments.supportRequired" :key="i">{{item.name}}</p>
            </div>
            <div class="leftImg">
              <img
                src="../../../images/t54.png"
                alt=""
              >
            </div>
          </div>
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
                <img src="../../../images/erqi/center/wenhao.png" alt />
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
                <img src="../../../images/erqi/center/wenhao.png" alt />
              </el-tooltip>
            </div>
            <div class="scroll-content" ref="content" :style="{'transform':`translateX(${x})`}" v-show="isIcon">
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" v-for="item in evaluationList2"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
                <div class="img-item" @click="next(1)">
                  <img src="../../../images/erqi/center/next.png" alt />
                  <p>下一页</p>
                </div>
              </div>
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" @click="next(4)">
                  <img src="../../../images/erqi/center/next.png" style="transform: rotate(180deg);" alt />
                  <p>上一页</p>
                </div>
                <div class="img-item" v-for="item in evaluationList3"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
              
                <div class="img-item" @click="next(2)">
                  <img src="../../../images/erqi/center/next.png" alt />
                  <p>下一页</p>
                </div>
              </div>
              <div class="img-list" :style="{width:`${width}px`}">
                <div class="img-item" v-for="item in evaluationList4"  @click="sign_item(item)">
                  <img :src="item.imgs" alt />
                  <p>{{item.name}}</p>
                </div>
                <div class="img-item" @click="next(3)">
                  <img src="../../../images/erqi/center/next.png" style="transform: rotate(180deg);" alt />
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
                <img src="../../../images/erqi/center/wenhao.png" alt />
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
     <!--  <div class="sort">
        <div class="advantage">
          <p class="adtitle">突出优势</p>
          <div class="imglist">
            <img v-for="(imgurl,idx) in evaluationList1" :key="idx" :src="imgurl.imgs" alt="">
          </div>
        </div>
        <div class="advantage">
          <p class="adtitle">常用优势</p>
          <div class="imglist">
            <img v-for="(imgurl,idx) in evaluationList2" :key="idx" :src="imgurl.imgs" alt="">
          </div>
        </div>
        <div class="advantage">
          <p class="adtitle">次要优势</p>
          <div class="imglist">
            <div class="imglist">
              <img v-for="(imgurl,idx) in evaluationList3" :key="idx" :src="imgurl.imgs" alt="">
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- 签到组件 -->
    <Sign ref="items" :is_show="is_show" @close="close" />
  </div>
</template>
<script>
import Sign from "../../../tcomponents/Sign";
import surver from "api/http/t-evaluation.js";
export default {
  props: {
    stuName: {
      type: String,
      default: ''
    },
    userId:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      comments:[],
      isIcon:'',
      x: "0px",
      width: 0,
      is_show: false,
      evaluationList1:[],
      evaluationList2:[],
      evaluationList3:[],
      evaluationList4:[],
      evaluationList5:[],
    }
  },
  mounted() {
    this.width = this.$refs.scroll.getBoundingClientRect().width;
  },
  watch:{
    userId:{
      deep: true,
      immediate:true,
      handler(val) {
        this.getData(val)
      }  
    },
  },
  methods: {
    sign_item(des) {
      this.is_show = true;
      console.log(des)
      this.$refs.items.setCurrent(des);
    },
    close() {
      this.is_show = false;
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
    closeDialog () {
      this.$emit('closeModal', false)
    },
    getData(userId){
      let LocalStorage = this.$cache.localStorage;
      const lang = LocalStorage.get("lang");
      const param = {
        id: 'via86',
        lang: lang,
        userId: userId
      };
      surver.getStrengthPortrait(param).then(res=>{
        if(res.data.code=="success"){
          let strengthList = res.data.result;
            this.comments = strengthList;
        }else{
           this.$message.error(res.data.message);
        }
      })
      surver.getViaResult(param).then(res=>{
        if(res.data.code=="success"){
          if(res.data.result && res.data.result.length){
            this.isIcon = true;
            this.evaluationList = res.data.result;
            let evaluationList = res.data.result;
              evaluationList.forEach((item, index) => {
               let type = item.type.replace(/[ ]/g,"");  //去除空格
               item.imgs = require(`../../../images/erqi/ceping/${type}.png`)
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
      })
    }
  },
  components: {
    Sign
  },
}
</script>
<style lang="less" scoped>
.portrait {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.4);
  display: flex;
  justify-content: center;
  overflow: auto;
  .contain {
    width: 968px;
    height: 950px;
    margin-top: 100px;
    padding: 0 64px 40px 64px;
    box-sizing: border-box;
    // background: rgba(255, 255, 255, 1);
    background-color: #fff;;
    box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
    border-radius: 12px;
    position: relative;
    .close {
      height: 40px;
      width: 24px;
      position: absolute;
      right: 20px;
      top: -38px;
    }
    .title {
      font-size: 20px;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      line-height: 48px;
    }
    .outstand {
      width: 90%;
      height: 450px;
      margin: 0 auto;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .mid {
        width: 104px;
        height: 104px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        position: relative;
        .inner {
          width: 85px;
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        //  background: rgba(255, 167, 92, 1);
         // border: 13px solid rgba(255, 135, 38, 0.31);
           background: rgba(255, 167, 92, 0.7);
          border: 13px solid rgba(255, 135, 38, 0.31);
          box-shadow: 0px 5px 9px 0px rgba(255, 135, 38, 0.22);
          border-radius: 50%;
          position: absolute;
          z-index: 999;
          p {
            font-size: 18px;
            font-family: PingFang-SC-Heavy;
            font-weight: 800;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .item {
        width: 406px;
        height: 193px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 135, 38, 0.27);
        box-shadow: 0px 2px 28px 0px rgba(255, 135, 38, 0.16);
        // opacity: 0.27;
        border-radius: 12px;
        padding: 12px;
        box-sizing: border-box;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .infotitle {
          font-size: 14px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(255, 135, 38, 1);
          margin-bottom: 23px;
          // text-align: right;
        }
        .infos {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(136, 136, 136, 1);
          line-height: 23px;
        }
        .leftImg {
          width: 123px;
          height: 126px;
          margin-right: 32px;
        }
        .rightInfo {
          height: 126px;
        }
        // z-index: ;
      }
      .item1 {
        top: -166px;
        left: -380px;
        p {
          text-align: right;
        }
      }
      .item2 {
        top: -166px;
        left: 54px;
      }
      .item3 {
        top: 55px;
        left: -383px;
        p {
          text-align: right;
        }
      }
      .item4 {
        top: 55px;
        left: 55px;
      }
    }
    .sort {
      margin: 40px auto 0 auto;
      width: 100%;
      height: 500px;
      display: flex;
      justify-content: space-between;
      .advantage {
        width: 272px;
        height: 365px;
        padding: 0 10px;
        margin: 0 auto;
        border:2px solid rgba(255,135,38,.2);
        border-radius: 9px;
        .imglist {
          width: 198px;
           margin: 0 auto;
          justify-content: space-around;
        }
        img {
          width: 56;
          height: 56px;
          margin:10px 2px;
        }
      }
      .adtitle {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        margin: 0 19px;
        font-weight: bold;
        color: rgba(252, 163, 48, 1);
        line-height: 40px;
        border-bottom: 1px solid #FFA75C;
        text-align: center;
      }
    }
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
      background-image: url("../../../images/erqi/center/椭圆574.png");
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


