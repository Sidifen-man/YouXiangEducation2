<template>
  <div class="tab1">
    <section>
      <div>
        <img src="@/images/data/course/tip.png" alt />
        <span>勾选并提交你的选课计划，记录到你的成长档案中</span>
        <p>注意选课科目不超过3项</p>
      </div>
      <!-- <el-tooltip effect="light" placement="bottom" popper-class="courseTab">
        <img class="tip" src="@/images/data/course/6.png" alt />
        <div
          slot="content"
        >国务院新高考政策改革下设计的“3+3”新高考选科模式，取消文理科，实行“3+3” 成绩由语文、数学、外语统一高考成绩和自主选考的3门普通高中学业水平考试等级性考试科目成绩构成。</div>
      </el-tooltip>-->
    </section>
    <div class="btns">
      <div
        v-for="(item,i) in btnList"
        :key="i"
        @click="onBtnClick(item.id,item)"
        :class="{active:chooseList.includes(item.id)}"
      >
        <img :src="chooseList.includes(item.id)?item.icona:item.icon" alt />
        <span>{{item.text}}</span>
      </div>
    </div>
    <footer>
      <!-- <img class="empty" src="@/images/data/course/empty.png" alt />
      <p>尚未选课</p>-->
      <button @click="submit">提交</button>
      <button @click="rest">重置</button>
    </footer>
  </div>
</template>

<script>
import surver from "api/http/t-gloData.js";
export default {
  data() {
    return {
      btnList: [
        {
          icon: require("@/images/data/course/q.png"),
          icona: require("@/images/data/course/q_a.png"),
          text: "政治",
          id: 1
        },
        {
          icon: require("@/images/data/course/w.png"),
          icona: require("@/images/data/course/w_a.png"),
          text: "历史",
          id: 2
        },
        {
          icon: require("@/images/data/course/e.png"),
          icona: require("@/images/data/course/e_a.png"),
          text: "地理",
          id: 3
        },
        {
          icon: require("@/images/data/course/t.png"),
          icona: require("@/images/data/course/t_a.png"),
          text: "物理",
          id: 4
        },
        {
          icon: require("@/images/data/course/p.png"),
          icona: require("@/images/data/course/p_a.png"),
          text: "化学",
          id: 5
        },
        {
          icon: require("@/images/data/course/u.png"),
          icona: require("@/images/data/course/u_a.png"),
          text: "生物",
          id: 6
        },
        {
          icon: require("@/images/data/course/i.png"),
          icona: require("@/images/data/course/i_a.png"),
          text: "信息技术",
          id: 7
        }
      ],
      chooseList: [],
      actived: ""
    };
  },
  created(){
    this.init()
  },
  methods: {
    onBtnClick(i,item) {
      if (this.chooseList.length >= 3) {
        this.$message.warning("选课科目不超过3项！");
        return;
      }
      if (this.chooseList.includes(i)) {
        return;
      }
      this.actived = i;
      this.chooseList.push(i);
    },
    rest() {
      this.chooseList = [];
    },
    init(){
      // const param = {
      //   objType : 31,
      // }
      // surver.courseAdd(param).then(res => {
      //   if(res.data.code=="success"){
      //    this.$message.success("提交成功！！");
      //   }else{
      //      this.$message.error(res.data.message);
      //   }
         
      // });
    },
    submit() {
      // if (this.chooseList.length <= 0) {
      //   this.$message.warning("请选择科目！");
      //   return;
      // }
      let nameList = [];
      this.chooseList.forEach(item=>{
         nameList.push(this.btnList[item-1].text)
      })
      let name = nameList.join(',');
      const param = {
        objType : 31,
        objTypeName : '新高考选修科目',
        name :name,
        id:'100'
      }
      surver.courseAdd(param).then(res => {
        if(res.data.code=="success"){
         this.$message.success("提交成功！！");
        }else{
           this.$message.error(res.data.message);
        }
         
      });

    },
  }
};
</script>

<style lang="less" scoped>
.tab1 {
  width: 695px;
  height: 522px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
  border-radius: 6px;
  padding: 20px 13px 0 23px;
  box-sizing: border-box;
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      span {
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 135, 38, 1);
        line-height: 18px;
      }
    }
    img.tip {
      width: 23px;
      height: 23px;
      margin-top: -10px;
    }
    p {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin-left: 24px;
      line-height: 1;
      margin-top: 10px;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 25px 0 133px 0;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 35px;
      background-color: #fff;
      margin: 0 0 26px 20px;
      box-shadow: 0px 0px 10px 0px rgba(188, 188, 188, 0.36);
      border-radius: 18px;
      font-size: 14px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
      user-select: none;
      cursor: pointer;
      &.active {
        background-color: #ffa626;
        color: #fff;
        border: none;
      }
      img {
        margin-right: 7px;
      }
    }
  }
  footer {
    text-align: center;
    margin-top: 246px;
    button {
      width: 110px;
      height: 36px;
      background: rgba(255, 135, 38, 1);
      border-radius: 6px;
      margin-right: 26px;
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      &:nth-of-type(2) {
        background-color: #e9e9e9;
      }
    }
  }
}
</style>