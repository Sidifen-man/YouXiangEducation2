<template>
  <div class="evaluate">
    <Breadcrumb :address="address"></Breadcrumb>
    <div class="progress">
      <span>优势测评</span>
      <div class="all">
        <div class="visivle-all">
          <div class="precent" :style="percentageNumbW"></div>
          <img src="../images/img/8.png" alt class="animate_img" :style="postion" />
          <span :style="spanPostion" >{{width.width}}</span>

        </div>
      </div>
    </div>
    <div class="bg">
      <div class="topic">
        <ul>
          <li
            v-for="(item,index) in topic"
            :key="index"
            v-if="index<limitIndex && index>=limitIndex-limitPage"
          >
            <p>
              <i>{{index+1}}</i>
              {{item.name}}
            </p>
            <div>
              <span
                @click="change(index,key)"
                :class="list.result?'active':''"
                v-for="(list,key) in item.choices"
                :key="key"
              >{{list.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="button">
        <el-button class="pageBtn" v-if="isShow==1 || isShow==4" @click="prePage">上一页</el-button>
        <el-button class="pageBtn" v-if="isShow==2 || isShow ==1" @click="nextPage">下一页</el-button>
        <el-button class="pageBtn" v-if="isShow==3 || isShow==4" @click="submit">提交</el-button>
        <el-button class="pageBtn" v-if="isShow==5" @click="goTo">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./breadcrumb";
import surver from "api/http/evaluation.js";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      isActive: false,
      isShow: 2,
      spanIsShow:true,
      address: {
        onePath: "/students/home/assessmentCenterView",
        twoPath: {
          path: "/students/home/assessmentCenterView",
          text: "VIA优势测评"
        },
        text: "开始测评"
      },
      percentageNumbW:{
        width:"0%"
      },
      width: {
        width: "0%"
      },
      postion: {
        left: "-2%"
      },
      spanPostion: {
        left: "0.4%"
      },
      sessionKey:'',
      pageSize: 1,
      limitIndex: 6, // 当前页面最后一道题的页码
      limitPage: 6, //默认每页6道题
      division: 0, //每道题所占的长度
      percentage: 0, //进度条百分比
      selectid: "", //当前选中id
      topic: [], // 问卷列表
      answer: [],
      id:'cip30',  //问卷id类型
      lang: 'zh', //默认语言
    };
  },
  created() {
    this.$loadingMy()
    // 获取本地缓存数据
    let LocalStorage = this.$cache.localStorage
    this.lang = LocalStorage.get('lang');
    let grade =  JSON.parse(LocalStorage.get('loginuser'));
    if(grade.classInfo.classType === "1")this.id = 'via86'
    if(grade.classInfo.classType === "2")this.id = 'via85';
    this.initdata();
  },
  watch: {
    limitIndex(val) {
      // 按钮显示隐藏判断
      let length = this.topic.length;
      if (val == length && val <= this.limitPage) {
        this.isShow = 3;
      }
      if (val == length && val > this.limitPage) {
        this.isShow = 4;
      }
      if (val <= this.limitPage && length > this.limitPage) {
        this.isShow = 2;
      }
      if (val > this.limitPage && val < length) {
        this.isShow = 1;
      }
    }
  },
  methods: {
    change(index, key) {
      const obj = {};
      if (this["topic"][index]["choices"][key]["result"] === 1) {
        this.$set(this["topic"][index]["choices"][key], "result", 0);
        this["topic"][index].result = "";
        this.answer = this.answer.filter(e => {
          return e.key !== index;
        });
        // 进度条
        this.selectid = "";
        this.percentage = this.percentage - this.division<0?0:this.percentage - this.division;
        this.percentageNumbW.width = parseInt(this.percentage)+2+"%";

        this.width.width = parseInt(this.percentage) + "%";
        this.postion.left = (this.percentage-2) + "%";
        this.spanPostion.left = this.percentage - 0.4 + "%";
      } else {
        let isAdd = false;
        let choices = this["topic"][index]["choices"];
        let id = "";
        choices.forEach((e, inx) => {
          if (this.selectid == index + "." + e.id) isAdd = true;
          if (key == inx) id = e.id;
          this.$set(this["topic"][index]["choices"][inx], "result", 0);
          this.$set(this["topic"][index]["choices"][key], "result", 1);
        });
        this["topic"][index].result = id;
        this.answer = this.answer.filter(e => {
          return e.key !== index;
        });
        obj.key = index;
        obj.value = key;
        this.answer.push(obj);
        // 进度条
        this.selectid = index + "." + id;
        if (!isAdd) {
          this.percentage = this.percentage + this.division;

          this.percentageNumbW.width = parseInt(this.percentage)+1 + "%";

          this.width.width = parseInt(this.percentage) + "%";
          this.postion.left = (this.percentage-2) + "%";

          if(parseInt(this.percentage)==100){
            this.spanIsShow = false;
          }
          this.spanPostion.left = this.percentage + 0.4 + "%";

        }
      }
    },
    prePage() {
      if (this.limitIndex - this.limitPage > 0) {
        this.pageSize -= 1;
        this.limitIndex = this.pageSize * this.limitPage;
      }
    },
    nextPage() {
      if (this.answer.length < this.limitIndex) {
        this.$message({
          message: "当前页面可能有漏答题目，请作答",
          type: "error"
        });
        return;
      }
      if (this.topic.length > this.limitIndex + this.limitPage) {
        this.limitIndex = this.limitIndex + this.limitPage;
        this.pageSize += 1;
      } else {
        this.limitIndex = this.topic.length;
        this.pageSize = Math.ceil(this.topic.length / this.limitPage);
      }
    },
    initdata() {
      let param = {
        id: this.id,
        lang: this.lang
      };
      
      surver.startSurvey(param).then(res => {
        if (res.data.code === "success") {
          this.sessionKey = res.data.result.sessionKey;
          
        } else {
          const message = res.data.message;
          this.$message({
            message: message,
            type: "error"
          });
        }
      });
      surver.questionsList(param).then(res => {
        this.$loadingMy.close()
        if (res.data.code === "success") {
          this.topic = res.data.result.questions;
          const length = res.data.result.questions.length;
          if (length <= this.limitPage) {
            this.isShow == 3;
            this.limitIndex == length;
          }
          this.division = 100 / length;
        } else {
          const message = res.data.message;
          this.$message({
            message: message,
            type: "error"
          });
        }

      });
    },
    submit() {
      this.$loadingMy()
      const list = JSON.parse(JSON.stringify(this.topic));
      let newList =  list.map(item=>{
        delete item.choices;
        return item
      })
      let param = {
        id: this.id,
        sessionKey:this.sessionKey,
        questions: newList,
        lang: this.lang
      };
      surver.submitVia(param).then(res => {
        this.$loadingMy.close()
        const message = res.data.message;
        this.$message({
          message: message,
          type: "error"
        });
        if(res.data.code === "success"){
          this.isShow = 5;
          setTimeout(()=>{
            this.goTo()
          },500)
        }
      });
    },
    goTo() {
      this.$router.push({
        path: "/students/home/assessmentCenterView",
        query: { scroll: true }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.evaluate {
  padding: 0 40px 63px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  .progress {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 22px 0 15px;
    span {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 60px;
      margin-right: 20px;
    }
    .all {
      flex: 1;   
      height: 18px;
      .visivle-all {
        width: calc(~"100% - 50px");
        border-radius: 9px;
        background: rgba(230, 230, 230, 1);
        height: 100%;
        position: relative;
        .precent {
          height: 18px;
          background: rgba(255, 119, 51, 0.8);
          border-radius: 9px;
        }
        .animate_img {
          position: absolute;
          width: 66px;
          height: 76px;
          left: -3px;
          top: -33px;
        }
        span {
          position: absolute;
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 135, 38, 1);
          top: -22px;
        }
      }
    }
  }
  .bg {
    width: 886px;
    height: 980px;
    background: url("../images/img/9.png") no-repeat;
    background-size: contain;
  }
  .topic {
    padding: 26px 87px 0 0px;
    width: 100%;
    box-sizing: border-box;
    ul,
    li {
      list-style: none;
    }
    ul {
      li {
        height: 125px;
        border-bottom: 1px dashed #fc8b31;
        color: #fc8a30;
        font-size: 16px;
        overflow: hidden;
        margin-left: 21px;
        &:last-child {
          border-bottom: none;
        }
        p {
          color: #666;
          line-height: 1;
          margin: 20px 0;
          i {
            display: inline-block;
            text-align: center;
            font-style: normal;
            width: 0.28rem;
            height: 0.28rem;
            line-height: 0.28rem;
            font-size: 0.15rem;
            background: rgba(253, 141, 50, 1);
            border: 1px solid rgba(252, 136, 47, 1);
            border-radius: 50%;
            color: #fff;
            margin: 0 30px 0 14px;
          }
        }
        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 64px;
          padding-right: 39px;
          cursor: pointer;
          span {
            display: block;
            width: 130px;
            height: 40px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(253, 143, 51, 1);
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            margin: 0 8px;
            &.active {
              color: rgba(247, 151, 39, 1);
              background-color: #ffe7cd;
              box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14);
            }
          }
        }
      }
    }
  }
  .button {
    margin: 48px auto 0;
    display: flex;
    justify-content: center;
    .pageBtn {
      display: inline-block;
      width: 89px;
      background: rgba(255, 135, 38, 1);
      box-shadow: 0px 1px 22px 0px rgba(255, 135, 38, 0.32);
      border-radius: 3px;
      font-size: 11px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  /* .next {
    display: block;
    margin: 64px auto 0;
    width: 119px;
    height: 35px;
    background: rgba(255, 135, 38, 1);
    box-shadow: 0px 1px 22px 0px rgba(255, 135, 38, 0.32);
    border-radius: 4px;
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }*/
}
</style>
