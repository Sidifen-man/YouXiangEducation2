<template>
  <div class="tab-content test-detail">
    <!-- 测评详情 -->
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="top-crumb" v-if="isShow">
        <Breadcrumb :address="url" />
      </div>
      <!-- 内容部分 -->
      <div class="hoppy">
        <h3>职业兴趣测评</h3>
        <div class="hoppy-des">
          <div class="cover">
            <div class="inner">
              <img src="../images/erqi/liaojie/500443908.png" alt />
            </div>
          </div>
          <div class="des">
            <p>Onet职业兴趣测评是美国劳工部与教育部联合研发，通过20年积累的成熟问卷。问卷结果基于大数据库算法，与数据库中1000多个职业进行匹配。Onet测评结果首先与霍兰德职业兴趣代码相匹配，获得6个维度的得分。基于你的得分，Onet系统进一步基于算法得出与你的职业兴趣结果相匹配的职业，并按照教育水平要求由高到低展示。</p>
            <div class="merit">
              <span class="one">
                <em>20</em>年积累
              </span>
              <span class="two">
                <em>1000</em>多个职业匹配进行匹配
              </span>
              <span class="three">
                <em>6</em>个维度的得分
              </span>
            </div>
          </div>
        </div>
        <!-- 弗兰德代码 -->
        <h3 class="code-title">霍兰德代码</h3>
        <div class="code">
          <div class="des">
            <p>由美国约翰·霍普金斯大学心理学教授、美国著名的职业指导专家约翰·霍兰德（John Holland）于1959年提出，是具有广泛社会影响的职业兴趣理论。他认为人的人格类型、兴趣与职业密切相关，兴趣是人们活动的巨大动力，凡是具有职业兴趣的职业，都可以提高人们的积极性，促使人们积极地、愉快地从事该职业，且职业兴趣与人格之间存在很高的相关性。Holland认为职业兴趣的方向可分为现实型、研究型、艺术型、社会型、企业型和常规型六种类型。</p>
          </div>
          <div class="code-type">
            <ul class="clearfix">
              <li
                :class="{active: current === 0}"
                @mouseenter="change_current(0)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">社会型</p>
                    <p
                      class="titel-des"
                    >你如果对社会型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/13了解更多/C.png" alt />
                  </div>
                </div>
              </li>
              <li
                :class="{active: current === 1}"
                @mouseenter="change_current(1)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">艺术型</p>
                    <p
                      class="titel-des"
                    >你如果对艺术型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/13了解更多/C.png" alt />
                  </div>
                </div>
              </li>
              <li
                :class="{active: current === 2}"
                @mouseenter="change_current(2)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">常规型</p>
                    <p
                      class="titel-des"
                    >你如果对常规型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/13了解更多/S.png" alt />
                  </div>
                </div>
              </li>
              <li
                :class="{active: current === 3}"
                @mouseenter="change_current(3)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">调研型</p>
                    <p
                      class="titel-des"
                    >你如果对调研型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/13了解更多/A.png" alt />
                  </div>
                </div>
              </li>
              <li
                :class="{active: current === 4}"
                @mouseenter="change_current(4)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">实际型</p>
                    <p
                      class="titel-des"
                    >你如果对实际型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/13了解更多/I.png" alt />
                  </div>
                </div>
              </li>
              <li
                :class="{active: current === 5}"
                @mouseenter="change_current(5)"
                @mouseleave="leave()"
              >
                <div class="type-content">
                  <div class="code-cover">
                    <img src="../images/erqi/liaojie/500505877.png" alt />
                  </div>
                  <div>
                    <p class="title">社会型</p>
                    <p
                      class="titel-des"
                    >你如果对社会型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/liaojie/E.png" alt />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 职业适配系统 -->
        <h3 class="system-title">职业测试系统</h3>
        <div class="system">
          <div class="left">
            <img src="../images/erqi/liaojie/sexiang.png" alt />
          </div>
          <div class="right">
            <p
              class="des"
            >O*NET测评系统与其配套的数据库每年被数以百万计的个人使用。它根据霍兰德六大象限匹配了上千个职业并通过针对这些职业的从业人士定期的调研问卷来不断跟新其职业大数据库。事实证明，这些数据对于帮助人们找到他们需要的培训和工作是否有用。O *Net生涯探索/评估工具被设计用于探索从学校到大学与工作的转变。这些评估工具以“全人”概念为基础，帮助个人确定他们与工作相关的兴趣，他们认为工作中什么是重要的，工具的用户可以链接到O*NET数据库中描述的1000多个职业, 这使得个人能够从评估自己的兴趣、工作价值和能力，无缝过渡到实际的职业。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script>
import Breadcrumb from "../components/breadcrumb";
export default {
  // 测评中心  >  ONet职业测评  >  职业兴趣测评  >  了解更多

  data() {
    return {
      current: false,
      isShow: true,
      url: {
        onePath: `/students/home/assessmentCenterView`,
        twoPath: {
          path: `/students/home/oNet`,
          text: "ONet职业测评"
        },
        threePath: {
          path: `/students/home/oNet`,
          text: "职业兴趣测评"
        },
        text: "了解更多"
      }
    };
  },
  created() {
    let paths = "home";
    const path = this.$route.fullPath;
    if (path.indexOf("teacher") > -1) {
      paths = "teacher";
      let url = {
        onePath: `/${paths}/assess/oNet`,
        twoPath: {
          path: `/${paths}/assess/oNet`,
          text: "ONet职业测评"
        },
        threePath: {
          path: `/${paths}/assess/oNet`,
          text: "职业兴趣测评"
        },
        text: "了解更多"
      };
      this.url = url;
    }
  },
  methods: {
    change_current(index) {
      this.current = index;
    },
    leave() {
     this.current = false;
    }
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
  .hoppy {
    padding: 64px 30px;
    h3 {
      text-align: center;
      font-size: 16px;
      color: #333;
    }
    .code-title {
      padding: 62px 0 30px 0;
    }
  }
  //   职业兴趣测评
  .hoppy-des {
    // display: flex;
    margin-top: 25px;
    .cover {
      float: left;
    }
    .cover .inner {
      padding: 6px;
      border-radius: 5px;
      background: #87cefa;
      img {
        width: 172px;
        height: 106px;
        display: block;
      }
    }
    .des {
      margin-left: 210px;
    }
    .des p {
      font-size: 12px;
      color: #666;
      line-height: 20px;
    }
    .merit {
      display: flex;
      margin-top: 24px;
      justify-content: space-between;
      span {
        font-size: 14px;
        color: #333;
        font-style: italic;
        em {
          font-size: 34px;
          margin-right: 10px;
          font-weight: bold;
        }
        &.one em {
          color: #ff8726;
        }
        &.two em {
          color: #21b1f4;
        }
        &.three em {
          color: #2cc650;
        }
      }
    }
  }

  // 弗兰德代码
  .code {
    .des {
      color: #666;
      font-size: 12px;
      line-height: 20px;
    }
    .code-type {
      margin-top: 32px;
      ul {
        display: flex;
        justify-content: space-between;
        height:111px;
      }
      li {
        width: 140px;
       // width: 120px;
        height: 111px;
        list-style-type: none;
        cursor: pointer;
        position:relative;
        .type-content {
          display: none;
          position: absolute;
        }
        &.active {
          background: rgba(38, 201, 255, 1);
          box-shadow: 0px 9px 17px 0px rgba(38, 201, 255, 0.5);
          border-radius: 5px;
          height: 247px;
          width: 140px;
         
          .title {
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .titel-des {
            font-size: 10px;
            color: #fff;
            line-height: 15px;
            padding: 0 3px;
          }
          .type-content {
            display: block;
          }
          .type-img {
            display: none;
          }
        }
        .type-cover {
          width:124px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .code-cover {
          img {
            margin: 3px auto;
            width: 130px;
            height: 68px;
            border-radius: 0;
            display: block;
          }
        }
      }
    }
  }

  // 职业适配系统
  .system-title {
    margin-top: 47px;
  }
  .system {
    .left {
      float: left;
      img {
        width: 203px;
        height: 163px;
      }
    }
    .right {
      margin-left: 233px;
      .des {
        padding-top: 30px;
        padding-bottom: 48px;
        font-size: 12px;
        color: #666;
        line-height: 20px;
      }
    }
  }
}
</style>