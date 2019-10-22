<template>
  <div class="activity_detail">
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="top-crumb">
        <Breadcrumb :address="url" />
      </div>

      <div class="top-detail">
        <div class="cover">
          <img src=".././../images/data/detail/cover.png" alt />
        </div>
        <div class="des">
          <div class="top-list">
            <div class="left">
              <h3>
                <span class="title">击剑</span>
                <span class="label">体育运动</span>
                <span class="label">社团兴趣课</span>
              </h3>
              <div class="activity-time">
                <div>活动时间：2019.01.02-2019.01.03</div>
                <div class="icon">申请时间：2019.01.02-2019.01.03</div>
                <div class="icon2">年龄要求：K7,K8,K9,K10,K11,K12</div>
              </div>
            </div>
            <div class="right">
              <div class="right-btn">
                <span>
                  <img src="../../images/data/detail/join.png" alt />
                </span>
              </div>
              <div class="right-btn">
                <span>
                  <img src="../../images/data/detail/baoming.png" alt />
                </span>
              </div>
              <div class="right-btn">
                <span>
                  <img src="../../images/data/detail/join2.png" alt />
                </span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="inner">
              <span>收藏:0</span>
              <span>咨询:0</span>
              <span class="active">报名:1</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 活动详情 -->
      <div class="activity">
        <div class="nav">
          <div class="nav-item active">
            <img src="../../images/data/detail/nav1.png" alt />
            <span>活动介绍</span>
          </div>
          <div class="nav-item">
            <img src="../../images/data/detail/nav1.png" alt />
            <span>关于活动方</span>
          </div>
          <div class="nav-item">
            <img src="../../images/data/detail/nav1.png" alt />
            <span>参与须知</span>
          </div>
        </div>
        <div class="content">
          <div class="nav-content">
            <div>
              <div class="item">
                <h3>
                  <img src="../../images/data/detail/jianjie.png" alt />
                </h3>
                <div class="text">
                  <p>
                    枫林艺社IB高中部的美工手工艺术类社团。日常活动以及社员的创作和社团组织参加的校内活动组成，从此还开设
                    Photoshop教学课程让同学们掌握这一必备技能。平时枫林艺社还负责学校的环境创设等一系列跟视觉美沾边的领域。
                  </p>
                </div>
              </div>
              <div class="item">
                <h3>
                  <img src="../../images/data/detail/mubiao.png" alt />
                </h3>
                <div class="text">
                  <p>这是活动目标</p>
                </div>
              </div>
              <div class="item">
                <h3>
                  <img src="../../images/data/detail/get.png" alt />
                </h3>
                <div class="list">
                  <ul>
                    <li>
                      <div>
                        <img src="../../images/data/detail/activity1.png" alt />
                      </div>
                      <div class="title">活动形式</div>
                      <div class="type">
                        <img src="../../images/data/detail/select.png" />线下
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src="../../images/data/detail/activity2.png" alt />
                      </div>
                      <div class="title">团队/个人活动</div>
                      <div class="type">
                        <img src="../../images/data/detail/select.png" />线下
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src="../../images/data/detail/activity1.png" alt />
                      </div>
                      <div class="title">作品/推荐信/证书</div>
                      <div class="type">
                        <img src="../../images/data/detail/select.png" />/
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src="../../images/data/detail/activity2.png" alt />
                      </div>
                      <div class="title">
                        专业相关/职业相关/
                        个人技能相关
                      </div>
                      <div class="type">
                        <img src="../../images/data/detail/select.png" />
                        专业相关/职业相关/
                        个人技能相关
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 重要信息展示 -->
      <div class="data-show">
        <h3 class="title">重要信息概览</h3>
        <div class="common-item">
          <h3>报名时间</h3>
          <div class="text">
            <ul>
              <li>报名时间：2019.01.02-2019.01.03</li>
              <li>活动状态：开放</li>
              <li>活动城市：北京</li>
            </ul>
          </div>
        </div>
        <div class="common-item">
          <h3>所需时间及费用</h3>
          <div class="text">
            <ul>
              <li>活动地点：校内</li>
              <li>所需时间：1小时/周</li>
            </ul>
          </div>
        </div>
        <div class="common-item">
          <h3>活动主要要求</h3>
          <div class="text">
            <ul>
              <li>活动地点：校内</li>
              <li>所需时间：1小时/周</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../../components/data/breadcrumb2";
export default {
  data() {
    return {
      url: {
        title: "全球数据库",
        onePath: `/global_data/profession/select`,
        twoPath: {
          path: `/global_data/activity/library/myActivityPlan`,
          text: "活动库"
        },
        threePath: {
          path: `/global_data/activity/library/myActivityPlan`,
          text: "活动计划"
        },
        text: "枫艺茶社"
      }
    };
  },
  created() {},
  methods: {},
  components: {
    Breadcrumb
  }
};
</script>
<style lang="less" scoped>
.activity_detail {
  .content {
    padding-right: 30px;
    .top-detail {
      margin-top: 15px;
      padding: 10px;
      box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
      border-radius: 6px;
      .cover {
        float: left;
        img {
          width: 207px;
          height: 160px;
        }
      }
      .des {
        margin-left: 230px;
        padding-right: 6px;
        .top-list {
          display: flex;
          justify-content: space-between;
        }
        .left {
          h3 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title {
              font-size: 16px;
              color: #333;
              font-weight: bold;
            }
            .label {
              font-size: 14px;
              color: #ff8726;
              display: inline-block;
              padding: 4px 10px;
              background-color: #fff3e9;
              margin-left: 10px;
              border-radius: 10.5px;
            }
          }
          .activity-time {
            margin-top: 25px;
            div {
              font-size: 13px;
              color: #333;
              margin-bottom: 11px;
              padding-left: 24px;
              background: url("../../images/data/detail/icon1.png") no-repeat
                left center;
              &.icon {
                background-image: url("../../images/data/detail/icon2.png");
              }
              &.icon2 {
                background-image: url("../../images/data/detail/icon3.png");
              }
            }
          }
        }
        .right {
          .right-btn {
            margin-bottom: 14px;
            text-align: right;
          }
        }
        .bottom {
          margin-top: 26px;
          .inner {
            display: flex;
            justify-content: flex-end;
            color: #666;
            font-size: 13px;
            span {
              margin-left: 50px;
              &.active {
                color: #ff8726;
              }
            }
          }
        }
      }
    }

    .activity {
      box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
      border-radius: 6px;
      margin-top: 16px;
      padding-left: 25px;
      padding-right: 21px;
      .nav {
        display: flex;
        justify-content: flex-start;
        padding-top: 29px;
        .nav-item {
          margin-right: 70px;
          font-size: 16px;
          cursor: pointer;
          &.active,
          &:hover {
            color: #ff8726;
            position: relative;
            &:before {
              position: absolute;
              content: "";
              bottom: -12px;
              left: 50%;
              transform: translateX(-28px);
              width: 56px;
              height: 4px;
              background: rgba(255, 135, 38, 1);
              box-shadow: 0px 3px 6px 0px rgba(255, 135, 38, 0.36);
              border-radius: 2px;
            }
          }
          img {
            vertical-align: middle;
          }
        }
      }

      .content {
        margin-top: 16px;
      }
      .nav-content {
        .item {
          border-bottom: 1px dashed #e2e2e2;
          padding-top: 32px;
          padding-bottom: 20px;
          h3 {
            padding-left: 10px;
          }
          .text {
            margin-top: 23px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            line-height: 20px;
            font-size: 13px;
            padding-left: 10px;
          }
          .list {
            margin-top: 50px;
            ul {
              display: flex;
            }
            li {
              flex: 1;
              text-align: center;
              .title {
                margin-top: 10px;
                font-size: 14px;
                color: #333;
                line-height: 20px;
              }
              .type {
                font-size: 13px;
                color: #666;
                margin-top: 12px;
                line-height: 20px;
                img {
                  margin-right: 2px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }

    .data-show {
      box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
      border-radius: 6px;
      margin-top: 20px;
      padding: 16px 25px 26px 0;
      margin-bottom: 50px;
      .title {
        width: 126px;
        height: 36px;
        background: rgba(255, 135, 38, 1);
        border-radius: 0px 18px 18px 0px;
        font-weight: 500;
        font-size: 16px;
        color: #fff;
        line-height: 36px;
        text-align: center;
        margin-bottom: 28px;
      }
      .common-item {
        background: rgba(247, 249, 252, 1);
        border-radius: 8px;
        padding: 15px 0;
        margin-bottom: 16px;
        margin-left: 25px;
        > h3 {
          font-size: 16px;
          height: 16px;
          color: #333;
          font-weight: bold;
          border-left: 4px solid #fc7927;
          padding-left: 12px;
          font-family: PingFang-SC-Heavy;
        }
        > .text {
          margin-top: 20px;
          li {
            line-height: 28px;
            padding-left: 50px;
            color: #9fa6b0;
            position: relative;
            &:before {
              position: absolute;
              content: "";
              left: 30px;
              top: 50%;
              transform: translateY(-50%);
              width: 5px;
              height: 5px;
              background: rgba(255, 135, 38, 1);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>