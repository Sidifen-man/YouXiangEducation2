<template>
  <div class="tab1">
    <section>
      <div>
        <img src="@/images/data/course/tip.png" alt />
        <span>勾选并提交你的选课计划，记录到你的成长档案中</span>
      </div>
      <el-tooltip effect="light" placement="bottom" popper-class="courseTab">
        <img class="tip" src="@/images/data/course/6.png" alt />
        <div
          slot="content"
        >IB课程为国际文凭组织IBO（International Baccalaureate Organization)为全球学生开设从幼儿园到大学预科的课程，旨在为3-19岁的学生提供智力，情感，个人发展，社会技能等方面的教育，使其获得学习，工作以及生存于世的各项能力。</div>
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
          icon: require("@/images/data/course/IB1.png"),
          title: "语言与文化学习组",
          items: ["语言A：语言与文学", "文学与表演"],
          id: 1
        },
        {
          icon: require("@/images/data/course/IB2.png"),
          title: "人文和社会学组",
          items: [
            "经济学",
            "地理",
            "全球政治学",
            "历史",
            "全球社会中的信息技术",
            "哲学",
            "心理学",
            "社会与文化人类学",
            "社会与文化人类学"
          ],
          id: 2
        },
        {
          icon: require("@/images/data/course/IB3.png"),
          title: "科学组",
          items: [
            "计算机科学",
            "化学",
            "设计技术",
            "物理",
            "体育、锻炼和健康科学"
          ],
          id: 3
        },
        {
          icon: require("@/images/data/course/IB4.png"),
          title: "数学组",
          items: ["数学SL", "数学HL", "进阶数学HL"],
          id: 4
        },
        {
          icon: require("@/images/data/course/IB5.png"),
          title: "艺术组",
          items: ["音乐", "电影", "戏剧", "视觉艺术"],
          id: 5
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
        objType : 33,
        objTypeName : 'IB课程科目',
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
      this.$message.success("提交成功！！");
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
          background: rgba(82, 222, 184, 1);
          box-shadow: 0px 0px 10px 0px rgba(82, 222, 184, 0.36);
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