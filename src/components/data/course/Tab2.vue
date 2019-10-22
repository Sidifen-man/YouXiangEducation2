<template>
  <div class="tab1">
    <section>
      <div>
        <img src="@/images/data/course/tip.png" alt />
        <span>勾选并提交你的选课计划，记录到你的成长档案中</span>
        <p>注意选课科目不超过3项</p>
      </div>
      <el-tooltip effect="light" placement="bottom" popper-class="courseTab">
        <img class="tip" src="@/images/data/course/6.png" alt />
        <div
          slot="content"
        >AP是Advanced Placement的缩写，为美国大学先修（预修）课程，指由美国大学理事会（The College Board）提供的在高中授课的大学课程。高中生可以选修这些课程，在完成课业后参加AP考试，得到一定的成绩后可以获得大学学分。</div>
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
          icon: require("@/images/data/course/ap1.png"),
          title: "艺术类",
          items: [
            "AP艺术史",
            "AP音乐理论",
            "AP工作室艺术：2D设计",
            "AP工作室艺术：3D设计",
            "AP工作室艺术：绘画"
          ],
          id: 1
        },
        {
          icon: require("@/images/data/course/ap2.png"),
          title: "英语类",
          items: ["AP英语语言与写作", "AP英语文学与写作"],
          id: 2
        },
        {
          icon: require("@/images/data/course/ap3.png"),
          title: "历史&社会科学类",
          items: [
            "AP比较政府和政治",
            "AP欧洲史",
            "AP人文地理学",
            "AP宏观经济学",
            "AP微观经济学",
            "AP心理学",
            "AP美国政府和政治",
            "AP美国历史",
            "AP世界历史"
          ],
          id: 3
        },
        {
          icon: require("@/images/data/course/ap4.png"),
          title: "数学&计算机科学类",
          items: [
            "AP微积分AB",
            "AP微积分BC",
            "AP计算机科学A",
            "AP计算机科学原理",
            "AP统计学"
          ],
          id: 4
        },
        {
          icon: require("@/images/data/course/ap5.png"),
          title: "科学类",
          items: [
            "AP生物",
            "AP化学",
            "AP环境科学",
            "AP物理C：电磁学",
            "AP物理C：力学",
            "AP物理1：基于代数",
            "AP物理2：基于代数"
          ],
          id: 5
        },
        {
          icon: require("@/images/data/course/ap6.png"),
          title: "世界语言&文化类",
          items: [
            "AP汉语语言及文化",
            "AP法语语言及文化",
            "AP德语语言及文化",
            "AP意大利语语言及文化",
            "AP日语语言及文化",
            "AP拉丁语语言及文化",
            "AP西班牙语语言及文化"
          ],
          id: 6
        }
      ],
      chooseList: [],
      actived: []
    };
  },
  methods: {
    onSelect(id, index) {
      if(this.actived.includes(index)){
        return
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
    div {
      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
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
          background: rgba(49, 191, 250, 1);
          box-shadow: 0px 0px 10px 0px rgba(10, 177, 232, 0.36);
          border-radius: 14px;
          color: #fff;
          font-size: 12px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
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