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
        <h3>职业价值观测评</h3>
        <div class="hoppy-des">
          <div class="cover">
            <div class="inner">
              <img src="../images/erqi/liaojie/500443908.png" alt />
            </div>
          </div>
          <div class="des">
            <p>Onet职业价值观测评是帮助你理解对你来说最重要的工作价值的评估。它们可能会随着你的人生阶段推移而改变，但可以作为一个很好的参考，来评估现在对你来说重要的是什么。测评结果会得出6个维度的值，你可以看到关于你的突出维度和次要维度的相关定义。</p>
          </div>
        </div>
        <!-- 弗兰德代码 -->
        <h3 class="code-title">价值观代码</h3>
        <div class="code">
          <div class="des">
            <p>职业价值观是指人生目标和人生态度在职业选择方面的具体表现，也就是一个人对职业的认识和态度以及他对职业目标的追求和向往。价值观代码具体可分为成就、独立、认可、关系、支持和工作环境六种类型。</p>
          </div>
          <div class="code-type">
            <ul class="clearfix">
              <li :class="{active: current === 0}" @mouseover="change_current(0)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组1.png" alt />
                  </div>
                </div>
              </li>
              <li :class="{active: current === 1}" @mouseenter="change_current(1)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组1.png" alt />
                  </div>
                </div>
              </li>
              <li :class="{active: current === 2}" @mouseenter="change_current(2)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组3.png" alt />
                  </div>
                </div>
              </li>
              <li :class="{active: current === 3}" @mouseenter="change_current(3)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组4.png" alt />
                  </div>
                </div>
              </li>
              <li :class="{active: current === 4}" @mouseenter="change_current(4)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组5.png" alt />
                  </div>
                </div>
              </li>
              <li :class="{active: current === 5}" @mouseenter="change_current(5)" @mouseleave="leave()">
                <div class="type-content">
                  <div>
                    <p class="title">社会型</p>
                    <p class="titel-des">如果你该项取得高分，表明在理想的工作中，发挥主动性和自己做决定对你非常重要。</p>
                  </div>
                </div>
                <div class="type-img">
                  <div class="type-cover">
                    <img src="../images/erqi/17-了解更多/组6.png" alt />
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
            >O*NET测评系统与其配套的数据库每年被数以百万计的个人使用。事实证明，这些数据对于帮助人们找到他们需要的培训和工作。O *Net生涯探索/评估工具被设计用于探索从学校到大学与工作的转变。这些评估工具以“全人”概念为基础，帮助个人确定他们与工作相关的兴趣，他们认为工作中什么是重要的，工具的用户可以链接到O*NET数据库中描述的1000多个职业,并每年更新。这使得个人能够从评估自己的兴趣、工作价值和能力，无缝过渡到实际的职业。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script>
import Breadcrumb from "../components/breadcrumb";
export default {
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
          text: "职业价值观测评"
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
          text: "职业价值观测评"
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
    padding-top: 64px;
    h3 {
      text-align: center;
      font-size: 14px;
      color: #333;
    }
    .code-title {
      padding: 62px 0 30px 0;
    }
  }
  //   职业兴趣测评
  .hoppy-des {
    margin-top: 25px;
    padding: 0 30px;
    height: 118px;
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
  }

  // 弗兰德代码
  .code {
    padding: 0 30px;
    .des {
      color: #666;
      font-size: 12px;
      line-height: 20px;
    }
    .code-type {
      margin-top: 32px;
      ul {
        display: flex;
        height:101px;
        justify-content: space-between;
        align-items: center;
        
      }
      li {
        width: 120px;
        height: 101px;
        list-style-type: none;
        cursor: pointer;
        position:relative;
        .type-content {
          display: none;
          position:absolute;
        }
        &.active { 
          width: 120px;
          height: 114px;
          background: rgba(255, 135, 38, 1);
          box-shadow: 0px 9px 17px 0px rgba(255, 135, 38, 0.5);
          border-radius: 5px;
          .title {
            font-size: 15px;
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
            padding: 0 6px;
          }
          .type-content {
            display: block;
          }
          .type-img {
            display: none;
          }
        }
        .type-cover {
          width: 101px;
          height: 101px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .code-cover {
          img {
            margin: 3px auto;
            width: 111px;
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
    padding: 0 30px;
    padding-bottom: 60px;
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