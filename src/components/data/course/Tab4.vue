<template>
  <div class="tab1">
    <section>
      <div>
        <img src="@/images/data/course/tip.png" alt />
        <span>勾选并提交你的选课计划，记录到你的成长档案中</span>
      </div>
      <el-tooltip effect="light" placement="bottom" popper-class="courseTab">
        <img class="tip" src="@/images/data/course/6.png" alt />
        <div slot="content">
          "A-level" (General Certificate of Education Advanced Level) 为英国高中课程，是英国全民课程体系、英国普通中等教育证书考试高级水平课程，也是英国学生的大学入学考试课程。
          A-Level课程证书被几乎所有英语授课的大学作为招收新生的入学标准。 在中国开设A-Level课程旨在为中国学生提供进入国外大学的有效途径，具体目标为：培养在国内初高中成绩优秀的学生进入世界顶尖大学；培养在国内初高中成绩中等的学生进入世界一流大学；培养在国内初高中成绩一般的学生考取适合自己的大学。
        </div>
      </el-tooltip>
    </section>
    <div class="ap">
      <div v-for="(item,i) in APList" :key="i" class="box">
        <div class="title">
          <img :src="item.icon" alt />
          <span>{{item.title}}</span>
        </div>
        <div class="list">
          <span
            :class="{active:actived.includes(list)}"
            @click="onSelect(item.id,list)"
            v-for="(list,index) in item.items"
            :key="index"
          >{{list}}</span>
        </div>
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
      APList: [
        {
          icon: require("@/images/data/course/l1.png"),
          title: "创作与专业",
          items: [
            "会计",
            "艺术与设计",
            "商科",
            "电脑科学",
            "设计与技术",
            "设计与材料",
            "数字传媒与设计",
            "食品研究",
            "信息技术",
            "媒体研究",
            "音乐",
            "体育教育学",
            "思考技巧",
            "旅行与观光"
          ],
          id: 1
        },
        {
          icon: require("@/images/data/course/l2.png"),
          title: "英语与文学",
          items: ["英文-语言", "英文-文学"],
          id: 2
        },
        {
          icon: require("@/images/data/course/l3.png"),
          title: "人类及社会科学",
          items: [
            "古典学",
            "神学",
            "经济学",
            "地理学",
            "国际视野与研究",
            "印度教研究",
            "历史学",
            "伊斯兰研究",
            "法学",
            "心理学",
            "社会学"
          ],
          id: 3
        },
        {
          icon: require("@/images/data/course/l4.png"),
          title: "语言学",
          items: [
            "南非荷兰语",
            "阿拉伯语",
            "中文",
            "法语",
            "德语",
            "印地语",
            "马拉地语",
            "葡萄牙语",
            "西班牙语",
            "泰米尔语",
            "乌尔都语",
            "乌尔都语-巴基斯坦专用"
          ],
          id: 4
        },
        {
          icon: require("@/images/data/course/l5.png"),
          title: "数学",
          items: ["数学", "数学-进阶"],
          id: 5
        },
        {
          icon: require("@/images/data/course/l3.png"),
          title: "科学",
          items: ["生物学", "化学 ", "海洋科学", "物理学"],
          id: 6
        }
      ],
      chooseList: [],
      actived: []
    };
  },
  methods: {
    onSelect(id, index) {
      if (this.actived.includes(index)) {
        return;
      }
      if (this.actived.length >= 3) {
        this.$message.warning("注意选课科目不超过3项!");
        return;
      }
      this.actived.push(index);
      let obj = {};
      obj.key = id;
      obj.value = index;
      this.chooseList.push(obj);
      console.log(this.chooseList);
    },
    rest() {
      this.chooseList = [];
      this.actived = [];
    },
    submit() {
      if (this.chooseList.length <= 0) {
        this.$message.warning("请选择!");
        return;
      }
      let nameList = [];
      this.chooseList.forEach(item=>{
         nameList.push(item.value)
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
    }
  }
};
</script>

<style lang="less" scoped>
.tab1 {
  width: 695px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
  border-radius: 6px;
  padding: 20px 19px 0;
  box-sizing: border-box;
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
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
    }
  }
  .ap {
    .box {
      border: 1px solid rgba(255, 135, 38, 0.5);
      border-radius: 4px;
      margin: 16px 0;
    }
    .title {
      background: rgba(255, 135, 38, 0.1);
      height: 30px;
      line-height: 30px;
      display: flex;
      align-items: center;
      img {
        margin: 0 9px 0 15px;
      }
      span {
        font-size: 14px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(255, 135, 38, 1);
      }
    }
    .list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      padding: 18px 12px 4px;
      span {
        display: block;
        width: 140px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 0px rgba(188, 188, 188, 0.3);
        border-radius: 14px;
        font-size: 12px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        margin: 0 8px 14px;
        cursor: pointer;
        user-select: none;
        &.active {
          background: rgba(242, 109, 231, 1);
          box-shadow: 0px 0px 10px 0px rgba(242, 109, 231, 0.36);
          border-radius: 14px;
          font-size: 12px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
  footer {
    text-align: center;
    margin-top: 56px;
    margin-bottom: 38px;
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