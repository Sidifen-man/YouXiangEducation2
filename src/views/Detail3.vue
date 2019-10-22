<template>
  <div class="tab-content test-detail">
    <!-- 测评详情 -->
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="top-crumb">
        <Breadcrumb :address="url" />
      </div>
      <div class="result">
        <img src="../images/img/23.png" alt />
        <div>
          <h3>测评结果</h3>
          <p>Onet职业测评体系通过20年积累的问卷大数据库算法与数据库中1000多个职业进行匹配，你将获得你的霍兰德职业代码分数，并基于此获得与您的职业兴趣最相关的职业推荐列表，你也可以按照学历要求，STEM技能要求等筛选出最适合你的职业。</p>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script>
import Breadcrumb from "../components/breadcrumb";
export default {
  // 当前位置：  测评中心  >  ONet职业测评  >  职业推荐  >  了解更多

  data() {
    return {
      current: 0,
      url: {
        onePath: "/home/oNet/onetView",
        twoPath: {
          path: "/home/oNet/onetView",
          text: "ONet职业测评"
        },
        threePath: {
          path: "/home/oNet/onetView",
          text: "职业推荐"
        },
        text: "了解更多"
      }
    };
  },
  components: {
    Breadcrumb
  }
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 0 15px;
  .top-crumb {
    padding-top: 14px;
    padding-left: 26px;
  }
  .result {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 40px 66px 82px 49px;
    background-color: #fff;
    img {
      width: 210px;
      height: auto;
      margin-right: 35px;
      div {
        h3 {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 60px;
        }
      }
    }
  }
}
</style>