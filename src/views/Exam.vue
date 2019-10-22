<template>
  <div class="tab-content assess">
    <!-- 面包屑导航 -->
    <div class="top-crumb">
      <Breadcrumb :address="url" />
    </div>

    <!-- 规则简介 -->
    <div class="rule">
      <img src="../images/erqi/exam/man.png" alt />
      <p>
        <em>
          <img src="../images/erqi/exam/arrow.png" alt />
        </em>
        按照以下描述对你来说的重要性，点击描述框进行打分。5分表示非常重要，1分表示非常不重要。将20个选项填入
        20个分值框里，点击提交，获得你的职业价值观测评结果。
      </p>
    </div>

    <!-- 选择投球 -->
    <div class="ball-select">
      <div class="left">
        <ul>
          <draggable
            handle=".handle"
            :list="merit"
            :group="{ name: 'ball', put: false,pull:'clone' }"
            :sort="false"
            @change="log"
            @add="end"
          >
            <li
              v-for="item in merit"
              :class="{active: item.is_select, handle: !item.is_select}"
              @click="change(item.id)"
            >
              <div>
                <div class="ball-cover">
                  <img v-show="!item.is_select" src="../images/erqi/exam/2.png" alt />
                  <img v-show="item.is_select" src="../images/erqi/exam/1.png" alt />
                </div>
                <p>{{item.name}}</p>
              </div>
            </li>
          </draggable>
        </ul>
      </div>
      <div class="right">
        <div class="card card1">
          <div class="cover">
            <span class="fen">5分</span>
            <draggable @add="end(1)" :list="score.five" group="ball" @change="log">
              <img v-for="item in score.five" src="../images/erqi/exam/4.png" alt />
            </draggable>
          </div>
          <ul>
            <li class="tip-text" v-for="item in score.five">
              <p>{{item.name}}</p>
              <img @click="reset(1, item.id)" src="../images/erqi/exam/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card2 ">
          <div class="cover">
            <span class="fen">4分</span>
            <draggable @add="end(2)" :list="score.four" group="ball" @change="log">
              <img v-for="item in score.four" src="../images/erqi/exam/4.png" alt />
            </draggable>
          </div>
          <ul>
            <li class="tip-text" v-for="item in score.four">
              <p>{{item.name}}</p>
              <img @click="reset(2, item.id)" src="../images/erqi/exam/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card3">
          <div class="cover">
            <span class="fen">3分</span>
            <draggable @add="end(3)" :list="score.three" group="ball" @change="log">
              <img v-for="item in score.three" src="../images/erqi/exam/4.png" alt />
            </draggable>
          </div>
          <ul>
            <li class="tip-text" v-for="item in score.three">
              <p>{{item.name}}</p>
              <img @click="reset(3, item.id)" src="../images/erqi/exam/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card4">
          <div class="cover">
            <span class="fen">2分</span>
            <draggable @add="end(4)" :list="score.two" group="ball" @change="log">
              <img v-for="item in score.two" src="../images/erqi/exam/4.png" alt />
            </draggable>
          </div>
          <ul>
            <li class="tip-text" v-for="item in score.two">
              <p>{{item.name}}</p>
              <img @click="reset(4, item.id)" src="../images/erqi/exam/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card5">
          <div class="cover">
            <span class="fen">1分</span>
            <draggable @add="end(5)" :list="score.one" group="ball" @change="log">
              <img v-for="item in score.one" src="../images/erqi/exam/4.png" alt />
            </draggable>
          </div>
          <ul>
            <li class="tip-text" v-for="item in score.one">
              <p>{{item.name}}</p>
              <img @click="reset(5, item.id)" src="../images/erqi/exam/reset.png" alt />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="sumit" style="padding-bottom: 55px;">
      <el-button class="add" v-if="isShow" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/breadcrumb";
import draggable from "vuedraggable";
import surver from "api/http/evaluation.js";
export default {
  data() {
    return {
      current_flag: 1,
      url: {
        onePath: "/students/home/assessmentCenterView",
        twoPath: {
          path: "/students/home/oNet",
          text: "职业价值观测评"
        },
        text: "开始测评"
      },
      merit: [
        // {
        //   id: 1,
        //   text: "我可以发挥我的能力1",
        //   is_select: false
        // },
      ],
      score: {
        five: [],
        four: [],
        three: [],
        two: [],
        one: []
      },
      lang:'zh',
      isShow:false,
    };
  },
  created(){
     // 获取本地缓存数据
    let LocalStorage = this.$cache.localStorage
    this.lang = LocalStorage.get('lang');
    this.getoNet()
  },
  watch:{
    
    merit:{
      handler: function (val) {
        let selectList =  val.filter(item=>item.is_select==true);
        console.log(selectList)
        if(selectList.length == val.length){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },    
      deep: true    //深度监听
      }
  },
  methods: {
    change(id) {
      this.current = id;
    },
    reset(type, id) {
      switch (type) {
        case 1:
          for (var i = 0; i < this.score.five.length; i++) {
            if (this.score.five[i].id === id) {
              this.score.five.splice(i, 1);
              break;
            }
          }
          break;
        case 2:
          for (var i = 0; i < this.score.four.length; i++) {
            if (this.score.four[i].id === id) {
              this.score.four.splice(i, 1);
              break;
            }
          }
          break;
        case 3:
          for (var i = 0; i < this.score.three.length; i++) {
            if (this.score.three[i].id === id) {
              this.score.three.splice(i, 1);
              break;
            }
          }
          break;
        case 4:
          for (var i = 0; i < this.score.two.length; i++) {
            if (this.score.two[i].id === id) {
              this.score.two.splice(i, 1);
              break;
            }
          }
          break;
        case 5:
          for (var i = 0; i < this.score.one.length; i++) {
            if (this.score.one[i].id === id) {
              this.score.one.splice(i, 1);
              break;
            }
          }
          break;
      }

      for (var i = 0; i < this.merit.length; i++) {
        if (this.merit[i].id == id) {
          this.merit[i].is_select = false;
        }
      }
    },

    end(type) {
      console.log(1);
      switch (type) {
        case 1:
          if (this.score.five.length > 4) {
            this.$message({
              message: "最多只能投四个球哦!",
              type: "warning"
            });
            for (var i = 0; i < this.merit.length; i++) {
              if (this.merit[i].id == this.current_flag) {
                this.merit[i].is_select = false;
                break;
              }
            }
            for (var j = 0; j < this.score.five.length; j++) {
              if (this.score.five[j].id == this.current_flag) {
                this.score.five.splice(j, 1);
                break;
              }
            }
          }
          break;
        case 2:
          if (this.score.four.length > 4) {
            this.$message({
              message: "最多只能投四个球哦!",
              type: "warning"
            });
            for (var i = 0; i < this.merit.length; i++) {
              if (this.merit[i].id == this.current_flag) {
                this.merit[i].is_select = false;
                break;
              }
            }
            for (var j = 0; j < this.score.four.length; j++) {
              if (this.score.four[j].id == this.current_flag) {
                this.score.four.splice(j, 1);
                break;
              }
            }
          }
          break;
        case 3:
          if (this.score.three.length > 4) {
            this.$message({
              message: "最多只能投四个球哦!",
              type: "warning"
            });
            for (var i = 0; i < this.merit.length; i++) {
              if (this.merit[i].id == this.current_flag) {
                this.merit[i].is_select = false;
                break;
              }
            }
            for (var j = 0; j < this.score.three.length; j++) {
              if (this.score.three[j].id == this.current_flag) {
                this.score.three.splice(j, 1);
                break;
              }
            }
          }
          break;
        case 4:
          if (this.score.two.length > 4) {
            this.$message({
              message: "最多只能投四个球哦!",
              type: "warning"
            });
            for (var i = 0; i < this.merit.length; i++) {
              if (this.merit[i].id == this.current_flag) {
                this.merit[i].is_select = false;
                break;
              }
            }
            for (var j = 0; j < this.score.two.length; j++) {
              if (this.score.two[j].id == this.current_flag) {
                this.score.two.splice(j, 1);
                break;
              }
            }
          }
          break;
        case 5:
          if (this.score.one.length > 4) {
            this.$message({
              message: "最多只能投四个球哦!",
              type: "warning"
            });
            for (var i = 0; i < this.merit.length; i++) {
              if (this.merit[i].id == this.current_flag) {
                this.merit[i].is_select = false;
                break;
              }
            }
            for (var j = 0; j < this.score.one.length; j++) {
              if (this.score.one[j].id == this.current_flag) {
                this.score.one.splice(j, 1);
                break;
              }
            }
          }
          break;
      }
    },

    log(evt) {
      console.log(2);
      // 判断添加成功后
      if (evt.added) {
        this.current_flag = evt.added.element.id;
        for (var i = 0; i < this.merit.length; i++) {
          if (this.merit[i].id == evt.added.element.id) {
            this.merit[i].is_select = true;
            break;
          }
        }
      }
    },
    getoNet(){
      let param = {
        id : 'wip20',
        lang : this.lang
      }
      surver.getoNetList(param).then(res=>{
        if(res.data.code === "success"){
          let list = res.data.result.questions
          let newList = list.map(item=>{
            item.is_select = false;
            return item
          });
          this.merit = newList;
        }else{
          const message = res.data.message
          this.$message({
            message: message,
            type: "error"
          });   
        }
      })
    },
    submit(){
      let questions = [];
      this.score.five.forEach(item=>{
        item.result = 5;
        questions.push(item)
      })
      this.score.four.forEach(item=>{
        item.result = 4;
        questions.push(item)
      })
      this.score.three.forEach(item=>{
        item.result = 3;
        questions.push(item)
      })
      this.score.two.forEach(item=>{
        item.result = 2;
        questions.push(item)
      })
      this.score.one.forEach(item=>{
        item.result = 1;
        questions.push(item)
      })
      let param = {
        id : 'wip20',
        questions : questions,
        lang : this.lang
      }
      surver.submitoNet(param).then(res=>{
        

        if(res.data.code=="success"){
           const message = res.data.message;
           this.$message.success(message);
           setTimeout(()=>{
            this.$router.go(-1)
           },500)
        }
       
      })
    },
  },
  components: {
    Breadcrumb,
    draggable
  }
};
</script>

<style lang="less" scoped>
.assess {
  background-color: #fff;
  padding: 0 15px;
  .top-crumb {
    padding-top: 14px;
    padding-left: 26px;
  }
  .rule {
    position: relative;
    margin-top: 35px;
    padding: 0 30px;
    > img {
      position: absolute;
      left: 65px;
      bottom: -15px;
      width: 90px;
    }
    p {
      width: 560px;
      height: 88px;
      margin-left: 200px;
      border: 1px solid rgba(255, 144, 0, 1);
      border-radius: 10px;
      font-size: 12px;
      color: #ff8726;
      line-height: 20px;
      padding: 20px 18px;
      box-sizing: border-box;
      position: relative;
      > em {
        position: absolute;
        left: -17px;
        top: 20px;
      }
    }
  }

  // 选择投球
  .ball-select {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    .left {
      box-sizing: border-box;

      ul {
        width: 545px;
        > div {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
      }

      li {
        width: 118px;
        height: 156px;
        box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: 10px;
        position: relative;
        cursor: pointer;
        margin-left: 12px;
        margin-bottom: 12px;
        overflow: hidden;

        .ball-cover {
          width: 76px;
          height: 76px;
          margin: 0 auto;
          margin-top: 12px;
          background: url("../images/erqi/exam/3.png") no-repeat left top;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        p {
          margin-top: 10px;
          height: 40px;
          line-height: 15px;
          padding-left: 10px;
          padding-right: 10px;
        }

        &.active {
          color: #f57a2b;
        }
      }
    }
    .right {
      width: 384px;
      padding: 20px;
      padding-top: 0;
      .card {
        box-shadow: 0px 3px 17px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: flex-start;
        padding: 12px 15px;
        margin-bottom: 12px;
        cursor: pointer;
        p{
          width:92%;
          height:18px;
          line-height:18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        ul {
          margin-left: 14px;
          width: 176px;
        }
        .cover {
          width: 144px;
          height: 132px;
          background: url("../images/erqi/exam/5.png") no-repeat center top;
          background-size: cover;
          position: relative;
          span.fen {
            position: absolute;
            color: #fff;
            font-size: 12px;
            left: 50%;
            transform: translateX(-50%);
            top: 12px;
          }
          > div {
            height: 132px;
            width: 144px;
            position: relative;
            img {
              position: absolute;
              left: 49px;
              top: 53px;
              &:first-child {
                top: 34px;
                z-index: 2;
              }
              &:nth-child(2) {
                top: 54px;
                z-index: 3;
                left: 27px;
              }
              &:nth-child(3) {
                top: 54px;
                z-index: 1;
                left: 73px;
              }
              &:nth-child(4) {
                top: 76px;
                z-index: 2;
              }
            }
          }
          li {
            background: ;
            p {
              display: none;
            }
          }
        }
        li {
          font-size: 10px;
          padding: 6px 10px;
          position: relative;
          &:hover {
            > img {
              display: block;
            }
          }
          > img {
            width: 14px;
            height: 14px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: none;
            right: 5px;
          }
        }
      }
      .card1 {
        li.tip-text {
          background: #ecf7fe;
          color: #40b2f4;
          p{
            width:92%;
            height:18px;
            line-height:18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .card2 {
        li {
          background: #ecfaf7;
          color: #44d2af;
        }
      }
      .card3 {
        li {
          background: #fff8ea;
          color: #feb935;
        }
      }
      .card4 {
        li {
          background: #fff8ea;
          color: #bf77f1;
        }
      }
      .card5 {
        li {
          background: #feeff2;
          color: #f65e7e;
        }
      }
    }
  }
  .add {
    display: block;
    margin: 48px auto 0;
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
</style>
