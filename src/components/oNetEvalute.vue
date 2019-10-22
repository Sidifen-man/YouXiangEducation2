<template>
  <div class="start">
    <Breadcrumb :address="address"></Breadcrumb>
    <div class="progress">
      <span>优势测评</span>
      <div class="all">
        <div class="visivle-all">
          <div class="precent" :style="width"></div>
          <img src="../images/img/8_new.png" alt class="animate_img" :style="postion" />
          <span :style="spanPostion">{{width.width}}</span>
        </div>
      </div>
    </div>
    <div class="box">
      <ul>
        <li v-for="(item,index) in lis" :key="index">
          <div>
            <img :src="item.img" alt />
            <p>{{item.des}}</p>
          </div>
        </li>
      </ul>
      <div class="select">
        <ul>
          
          <li v-for="(item,index) in select" :key="index" v-if="index<limitIndex && index>=(pageSize-1)*limitPage">
            <div class="sort">
              <span>{{index+1}}</span>
            </div>
            <div class="question">
              <p>{{item.name}} </p>
            </div>
            <div v-for="(list,key) in item.imgs" :key="key" @click="change(index,key)" >
              <img :src="list.result?list.img:item.imga" alt />
            </div>
          </li>
        </ul>
        <p class="pagesize">
          第
          <i>{{pageSize}}</i>
          /{{totalPage}} 页面
        </p>
        <div class="btnBox">
          <div class="button prePage" v-if="isShow==1 || isShow==4" @click="pre">上一页</div>
          <div class="button"  v-if="isShow==2 || isShow ==1" @click="next">下一页</div>
          <div class="button"  v-if="isShow==3 || isShow==4" @click="submit">提交</div>
          <div class="button"  v-if="isShow==5" @click="goTo">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./breadcrumb";
import surver from 'api/http/evaluation.js'
// import {getoNetList ,submitoNet} from 'api/api';
// import axios from 'axios'
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      address: {
        onePath: "/global_data/home/assessmentCenterView",
        twoPath: {
          path: "/global_data/home/oNet",
          text: "职业兴趣测评"
        },
        text: "开始测评"
      },
      width: {
        width: '0%'
      },
      postion: {
        left: '-2px',
        right:''
      },
      spanPostion: {
        left: "12%"
      },
      lis: [
        {
          img: require("../images/img/13.png"),
          des: "非常不喜欢"
        },
        {
          img: require("../images/img/14.png"),
          des: "不喜欢"
        },
        {
          img: require("../images/img/15.png"),
          des: "中立"
        },
        {
          img: require("../images/img/16.png"),
          des: "喜欢"
        },
        {
          img: require("../images/img/17.png"),
          des: "非常喜欢"
        }
      ],
      emojiLis:{
        imga: require("../images/img/18.png"),
        imgs: [
          { img: require("../images/img/13.png"), result: 0 },
          { img: require("../images/img/14.png"), result: 0 },
          { img: require("../images/img/15.png"), result: 0 },
          { img: require("../images/img/16.png"), result: 0 },
          { img: require("../images/img/17.png"), result: 0 }
        ]
      },
      select: [],
      answer: [],
      isShow:2,
      pageSize: 1,
      totalPage: 0,
      limitIndex: 10,  // 当前个数
      limitPage: 10,  //默认每页6道题
      division: 0, //每道题所占的长度 
      percentage: 0, //进度条百分比
      id:'cip30',  //问卷id类型
      lang: 'zh', //默认语言
    };
  },
  created(){
     // 获取本地缓存数据
    let LocalStorage = this.$cache.localStorage
    this.lang = LocalStorage.get('lang');
    let grade =  JSON.parse(LocalStorage.get('loginuser'));
    if(grade.classInfo.classType === "2")this.id = 'cip30'
    if(grade.classInfo.classType === "1")this.id = 'cip60';
    this.getoNet()
  },
  watch:{
    limitIndex(val){   // 按钮显示隐藏判断
      let length = this.select.length;
      if(val==length && val <=this.limitPage){this.isShow = 3}
      if(val==length && val >this.limitPage){this.isShow = 4}
      if(val<=this.limitPage && length>this.limitPage ){this.isShow = 2}
      if(val>this.limitPage && val<length){ this.isShow = 1}
    }
  },
  methods: {
    change(index, key) {
      const obj = {};
      if (this["select"][index]["imgs"][key]["result"] === 1) {
        this["select"][index]["imgs"][key]["result"] = 0;
        this.select[index].result = '';
        this.answer = this.answer.filter(e => {
          return e.key !== index;
        });
      } else {
        this["select"][index]["imgs"].forEach((e,inx) => {
          this["select"][index]["imgs"][inx].result = 0;
          if(inx==key){
            let result = JSON.parse(JSON.stringify(this.select[index])); //解决同一内存地址问题
            result.imgs[key].result = 1;
            this.$set(this['select'],index,result)
            // this["select"][index]["imgs"][key]["result"] = 1;
          }
        });
        this.select[index].result = key ;  //选中分值
        this.answer = this.answer.filter(e => {
          return e.key !== index;
        });
        obj.key = index;
        obj.value = key;
        this.answer.push(obj);
      }
    },
    next() {
      if (this.answer.length < this.limitIndex) {
        this.$message.error("题目漏答，请检查");
        return;
      }
      if(this.select.length>this.limitIndex + this.limitPage){
        this.limitIndex = this.limitIndex + this.limitPage ;
        this.pageSize += 1;
      }else{
        this.pageSize = this.totalPage;
        this.limitIndex = this.select.length ;
      }
      this.width.width =  Math.ceil(this.division*(this.pageSize-1))+'%';
      this.postion.left = Math.ceil(this.division*(this.pageSize-1))+'%';
      this.spanPostion.left = Math.ceil(this.division*(this.pageSize-1)) + 10 + "%";

      this.$message.success("本页作答完毕，请进入下一页");
    },
    pre(){
      this.pageSize -= 1;
      this.limitIndex =  Math.ceil(this.pageSize*this.limitPage)
      this.width.width = Math.ceil(this.division*(this.pageSize-1))+'%';
      this.postion.left = Math.ceil(this.division*(this.pageSize-1))+'%';
    },
    submit(){
      this.width.width = '100%';
      this.postion.left = '100%';
      const list = JSON.parse(JSON.stringify(this.select));
      let newList =  list.map(item=>{
        delete item.imgs;
        delete item.imga;
        return item
      })
      let param = {
        id : this.id,
        questions : newList,
        lang : this.lang
      }
      surver.submitoNet(param).then(res=>{
        const message = res.data.message
        this.$message.success(message);
        if(res.data.code === "success"){
           this.isShow = 5;
           setTimeout(()=>{
            this.goTo()
           },500)
        }

         
      })
    },
    getoNet(){
      let param = {
        id : this.id,
        lang : this.lang
      }
      surver.getoNetList(param).then(res=>{
        if(res.data.code === "success"){
        let questions = res.data.result.questions;
        for(let i=0;i<questions.length;i++){
          questions[i].imga = this.emojiLis.imga;
          questions[i].imgs = this.emojiLis.imgs
        }
        this.select = questions
        const length = res.data.result.questions.length;
        this.totalPage = Math.ceil(length/this.limitPage);
        if(length<= this.limitPage){
          this.isShow == 3;
          this.limitIndex == length;
        }
        this.division = 100/this.totalPage;
        }else{
          const message = res.data.message
          this.$message({
            message: message,
            type: "error"
          });   
        }
      })
    },
    goTo(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.start {
  background-color: #fff;
  padding: 0 33px;
  overflow: hidden;
  box-sizing: border-box;
}
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
      width: calc(~"100% - 66px");
      flex: 1;
      height: 18px;
      background: rgba(230, 230, 230, 1);
      border-radius: 9px;
      .visivle-all {
        width: calc(~"100% - 66px");
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
          left: 231px;
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
.box {
  height: 791px;
  width: 886px;
  background: url("../images/img/9.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 35px;
  padding-right: 60px;
  box-sizing: border-box;
  > ul {
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 20%;
      font-size: 11px;
      color: #333;
      text-align: center;
      div {
        margin: 0 auto;
      }
      img {
        width:50px;
        height: 50px;
        display: block;
        margin: 36px auto 13px;
      }
      p{
        font-size: 13px;
        color: #333;
        line-height: 1;
      }
    }
  }
  .select {
    margin-top: 37px;
    margin-left: 11px;
    ul {
      padding: 0;
      margin: 0 34px;
      background-color: #fff;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      > div {
        height: 47px;
        width: 47px;
        border-left: 1px solid #e6e6e6;
        &:nth-of-type(1) {
          width: 66px;
          border-left: none;
        }
        &:nth-of-type(2) {
          width: 471px;
        }
        &.sort {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            display: block;
            width: 20px;
            height: 20px;
            background: rgba(253, 141, 50, 1);
            border: 1px solid rgba(252, 136, 47, 1);
            border-radius: 50%;
            margin: 0 auto;
            line-height: 20px;
            color: #fff;
            text-align: center;
            font-size: 16px;
          }
        }
        &.question {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 47px;
          text-align: left;
          padding-left: 20px;
        }
        img {
          width: 30px;
          height: 30px;
          display: block;
          margin: 8px auto;
        }
      }
    }
    .pagesize {
      font-size: 13px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 60px;
      margin-left: 32px;
      i {
        font-style: normal;
        color: #ff8726;
      }
    }
    .btnBox{
      margin: 0 auto;
      display:flex;
      justify-content:center;
      align-items:center;
      .button {
        width: 89px;
        height: 27px;
        background: rgba(255, 135, 38, 1);
        box-shadow: 0px 1px 22px 0px rgba(255, 135, 38, 0.32);
        border-radius: 3px;
        text-align: center;
        line-height: 27px;
        color: #fff;
        font-size: 11px;
      }
      .prePage{
        margin-right:0.5rem;
      }
    }
  }
}
</style>