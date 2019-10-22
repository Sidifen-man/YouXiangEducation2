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
        >国务院新高考政策改革下设计的“3+3”新高考选科模式，取消文理科，实行“3+3” 成绩由语文、数学、外语统一高考成绩和自主选考的3门普通高中学业水平考试等级性考试科目成绩构成。</div>
      </el-tooltip>
    </section>
    <div class="btns">
      <div v-for="(item,i) in btnList" :key="i" :style="{'background-color':item.color}">
        <img :src="item.icon" alt />
        <span>{{item.text}}</span>
      </div>
    </div>
    <footer>
      <img class="empty" src="@/images/data/course/empty.png" alt />
      <p>尚未选课</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnList: [
        {
          icon: require("@/images/data/course/0.png"),
          text: "政治",
          color: "#FF8400"
        },
        {
          icon: require("@/images/data/course/1.png"),
          text: "历史",
          color: "#FD6B16"
        },
        {
          icon: require("@/images/data/course/2.png"),
          text: "地理",
          color: "#31BFFA"
        },
        {
          icon: require("@/images/data/course/3.png"),
          text: "AP艺术史",
          color: "#25D9AC"
        },
        {
          icon: require("@/images/data/course/4.png"),
          text: "语言A：语...",
          color: "#F26DE7"
        }
      ]
    };
  },
  
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
      }
    }
    img.tip {
      width: 23px;
      height: 23px;
    }
  }
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px 0 30px;
    margin: 31px 0 133px 0;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 35px;
      box-shadow: 0px 0px 10px 0px rgba(255, 132, 0, 0.36);
      border-radius: 18px;
      color: #fff;
      img {
        margin-right: 7px;
      }
    }
  }
  footer {
    .empty {
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      font-size: 18px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 1;
      margin-top: 8px;
    }
  }
}
</style>