<template>
  <div class="professionalAssessment">
    <div class="nav">
      <Breadcrumb :address="address"></Breadcrumb>
      <!-- <img src="../images/breadcrumb_address.png" alt />
      <span>当前位置：</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>测评中心</el-breadcrumb-item>
        <el-breadcrumb-item>ONet职业测评</el-breadcrumb-item>
        <el-breadcrumb-item>职业推荐</el-breadcrumb-item>
        <el-breadcrumb-item>了解更多</el-breadcrumb-item>
      </el-breadcrumb>-->
    </div>

    <div class="nav-content">
      <div class="content">
        <div class="logo">
          <img src="../images/erqi/19了解更多/图层55.png" alt srcset />
        </div>
        <div class="tip">
          <h6>测评结果</h6>
          <p>Onet职业测评体系通过20年积累的问卷大数据库算法与数据库中1000多个职业进行匹配，你将获得你的霍兰德职业代码分数，并基于此获得与您的职业兴趣最相关的职业推荐列表，你也可以按照学历要求，STEM技能要求等筛选出最适合你的职业。</p>
        </div>
      </div>
      <div class="section">
        <h6>教育水平要求</h6>
        <p>我们根据通常不同职业的教育程度需求，将职业类别分为5个种类：</p>
        <div class="type">
          <ul>
            <li>
              <img src="../images/erqi/19了解更多/组1.png" alt srcset />
            </li>
            <li>
              <img src="../images/erqi/19了解更多/组2.png" alt srcset />
            </li>
            <li>
              <img src="../images/erqi/19了解更多/组3.png" alt srcset />
            </li>
            <li>
              <img src="../images/erqi/19了解更多/组4.png" alt srcset />
            </li>
            <li>
              <img src="../images/erqi/19了解更多/组5.png" alt srcset />
            </li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h6>高度匹配职业标准</h6>
        <div class="type">
          <div class="type-tip">
            <div class="tip">
              <p>每一个职业都有与六个霍兰德代码的相关系数，基于相关系数的测算，以下职业与你的职业兴趣测评结果高度匹配，点击了解这些职业，了解你可以如何为这份职业做学业规划。</p>
              <p>记住，当你考虑自己的职业价值观与需要来选择你喜欢的行业与职业方向，你的职业幸福感会更高~</p>
            </div>
            <div class="img">
              <img src="../images/erqi/19了解更多/1.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script>
import Breadcrumb from "./breadcrumb";
export default {
  data() {
    return {
      address: {
        onePath: "/students/home/assessmentCenterView",
        twoPath: {
          path: "/students/home/oNet",
          text: "ONet职业测评"
        },
        threePath: {
          path: "/students/home/oNet",
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
.professionalAssessment {
  padding: 15px 20px 83px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  .nav {
    margin-left: 40px;
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__inner {
      font-size: 11px;

      a {
        font-weight: 400;
        color: #666;
      }

      &.is-link {
        font-weight: 400;
        color: #666;
      }
    }
    img {
      margin-right: 10px;
    }
    span {
      font-size: 11px;
      color: #666;
    }
  }
  .nav-content {
    width: 100%;
    .content {
      display: flex;
      align-items: center;
      padding: 30px 20px;
      .logo {
        width: 25%;
        height: 100px;
        display: flex;
        align-items: center;
        border: 3px solid rgba(39, 164, 251, 0.4);
        box-shadow: 0px 4px 18px 0px rgba(39, 164, 251, 0.5);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tip {
        margin: 0 30px 0;
        flex: 1;
        display: flex;
        align-items: flex-start;
        align-self: flex-start;
        flex-wrap: wrap;
        h6 {
          font-size: 14px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          padding-bottom: 8px;
        }
        p {
          font-size: 13px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
        }
      }
    }
    .section {
      h6 {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
        text-align: center;
        padding: 25px 0 25px 0;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        padding: 0 20px 20px 20px;
      }
      .type {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            width: 28%;
            list-style: none;
            flex: 1;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .type-tip {
          display: flex;
          //   align-items: center;
          padding: 0 20px;
          margin-top: -20px;
          .tip {
            flex: 1;
            font-size: 13px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 18px;
            margin-top: 80px;
            p {
              padding: 0;
            }
          }
          .img {
            width: 25%;
            height: auto;
            margin-left: 20px;
            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>


