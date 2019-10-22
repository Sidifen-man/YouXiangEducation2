<template>
  <div class="tab-content assess">
    <!-- 面包屑导航 -->
    <div class="top-crumb">
      <Breadcrumb :address="url" />
    </div>

    <!-- 规则简介 -->
    <div class="rule">
      <img src="../images/erqi/16开始测评/rule_icon.png" alt />
      <p>
        按照以下描述对你来说的重要性，点击描述框进行打分。5分表示非常重要，1分表示非常不重要。将20个选项填入
        20个分值框里，点击提交，获得你的职业价值观测评结果。
      </p>
    </div>

    <!-- 选择投球 -->
    <div class="ball-select">
      <div class="left">
        <ul>
          <li
            v-bind:key="item.id"
            v-for="item in merit"
            :class="{active: item.id===current}"
            @click="change(item.id)"
          >
            <div>
              <img src="../images/erqi/16开始测评/ball.png" alt />
              <p>我可以发挥我的能力</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn">
        <div>
          <img src="../images/erqi/16开始测评/btn.png" alt />
        </div>
      </div>
      <div class="right">
        <div class="card card1">
          <img class="cover" @click="add_ball(1)" src="../images/erqi/16开始测评/five.png" alt />
          <ul>
            <li v-for="item in score.five">
              <p>{{item.text}}</p>
              <img @click="reset(1, item.id)" src="../images/erqi/16开始测评/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card2">
          <img class="cover" @click="add_ball(2)" src="../images/erqi/16开始测评/four.png" alt />
          <ul>
            <li v-for="item in score.four">
              <p>{{item.text}}</p>
              <img @click="reset(2, item.id)" src="../images/erqi/16开始测评/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card3">
          <img class="cover" @click="add_ball(3)" src="../images/erqi/16开始测评/three.png" alt />
          <ul>
            <li v-for="item in score.three">
              <p>{{item.text}}</p>
              <img @click="reset(3, item.id)" src="../images/erqi/16开始测评/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card4">
          <img class="cover" @click="add_ball(4)" src="../images/erqi/16开始测评/two.png" alt />
          <ul>
            <li v-for="item in score.two">
              <p>{{item.text}}</p>
              <img @click="reset(4, item.id)" src="../images/erqi/16开始测评/reset.png" alt />
            </li>
          </ul>
        </div>
        <div class="card card5">
          <img class="cover" @click="add_ball(5)" src="../images/erqi/16开始测评/one.png" alt />
          <ul>
            <li v-for="item in score.one">
              <p>{{item.text}}</p>
              <img @click="reset(5, item.id)" src="../images/erqi/16开始测评/reset.png" alt />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="sumit" style="padding-bottom: 55px;">
      <el-button class="add">提交</el-button>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/breadcrumb";
export default {
  data() {
    return {
      current: 6,
      url: {
        onePath: "/home/oNet/onetView",
        twoPath: {
          path: "/home/oNet/onetView",
          text: "ONet职业测评"
        },
        text: "开始测评"
      },
      merit: [
        {
          id: 7,
          text: "我可以发挥我的能力"
        },
        {
          id: 8,
          text: "我可以发挥我的能力"
        },
        {
          id: 9,
          text: "我可以发挥我的能力"
        },
        {
          id: 10,
          text: "我可以发挥我的能力"
        },
        {
          id: 11,
          text: "我可以发挥我的能力"
        },
        {
          id: 12,
          text: "我可以发挥我的能力"
        },
        {
          id: 13,
          text: "我可以发挥我的能力"
        },
        {
          id: 14,
          text: "我可以发挥我的能力"
        },
        {
          id: 15,
          text: "我可以发挥我的能力"
        },
        {
          id: 16,
          text: "我可以发挥我的能力"
        },
        {
          id: 17,
          text: "我可以发挥我的能力"
        },
        {
          id: 18,
          text: "我可以发挥我的能力"
        }
      ],
      score: {
        five: [
          {
            id: 1,
            text: "我可以发挥我的能力"
          }
        ],
        four: [
          {
            id: 2,
            text: "我可以发挥我的能力"
          }
        ],
        three: [
          {
            id: 3,
            text: "我可以发挥我的能力"
          }
        ],
        two: [
          {
            id: 4,
            text: "我可以发挥我的能力"
          }
        ],
        one: [
          {
            id: 5,
            text: "我可以发挥我的能力"
          }
        ]
      }
    };
  },
  methods: {
    change(id) {
      this.current = id;
    },
    add_ball(type) {
      var temp = {};
      for (var i = 0; i < this.merit.length; i++) {
        // 判断是否存在这个元素，如果不存在直接结束
        if (this.merit[i].id === this.current) {
          temp = this.merit[i];
          this.merit.splice(i, 1);
          i--;
        }
      }
      // 判断是否找到对应的对象
      if (!temp.id) {
        return;
      }
      switch (type) {
        case 1:
          this.score.five.push(temp);
          break;
        case 2:
          this.score.four.push(temp);
          break;
        case 3:
          this.score.three.push(temp);
          break;
        case 4:
          this.score.two.push(temp);
          break;
        case 5:
          this.score.one.push(temp);
          break;
      }
    },
    reset(type, id) {
      var temp = {};
      switch (type) {
        case 1:
          for (var i = 0; i < this.score.five.length; i++) {
            if (this.score.five[i].id === id) {
              temp = this.score.five[i];
              this.score.five.splice(i, 1);
              i--;
            }
          }
          break;
        case 2:
          for (var i = 0; i < this.score.four.length; i++) {
            if (this.score.four[i].id === id) {
              temp = this.score.four[i];
              this.score.four.splice(i, 1);
              i--;
            }
          }
          break;
        case 3:
          for (var i = 0; i < this.score.three.length; i++) {
            if (this.score.three[i].id === id) {
              temp = this.score.three[i];
              this.score.three.splice(i, 1);
              i--;
            }
          }
          break;
        case 4:
          for (var i = 0; i < this.score.two.length; i++) {
            if (this.score.two[i].id === id) {
              temp = this.score.two[i];
              this.score.two.splice(i, 1);
              i--;
            }
          }
          break;
        case 5:
          for (var i = 0; i < this.score.one.length; i++) {
            if (this.score.one[i].id === id) {
              temp = this.score.one[i];
              this.score.one.splice(i, 1);
              i--;
            }
          }
          break;
      }
      this.merit.push(temp);
    }
  },
  components: {
    Breadcrumb
  }
};
</script>

<style lang="less" scoped>
.assess {
  background-color: #fff;
  padding: 0 15px;
  .top-crumb {
    padding-top: 14px;
    padding-left: 26px;
  }
  .rule {
    background-color: #fff3e9;
    position: relative;
    margin-top: 26px;
    img {
      position: absolute;
      left: 0;
      bottom: -15px;
      width: 85px;
      height: 79px;
    }
    p {
      font-size: 12px;
      color: #ff8726;
      line-height: 20px;
      padding: 13px 42px 13px 106px;
    }
  }

  // 选择投球
  .ball-select {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    .left {
      background-color: #fffbf8;
      padding: 20px 20px 0 20px;
      width: 450px;
      box-sizing: border-box;

      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }

      li {
        width: 162px;
        height: 39px;
        margin-left: 33px;
        margin-bottom: 30px;
        border: 1px solid rgba(247, 128, 43, 1);
        border-radius: 0px 20px 20px 0px;
        font-size: 10px;
        position: relative;
        cursor: pointer;

        p {
          height: 39px;
          line-height: 15px;
          padding-left: 25px;
          padding-right: 10px;
          display: flex;
          align-items: center;
        }

        img {
          width: 40px;
          height: 41px;
          position: absolute;
          left: -20px;
        }

        &.active {
          border: 0 solid transparent;
          color: #ff8726;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 3px 17px 0px rgba(242, 112, 45, 0.17);
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        box-shadow: 0px 3px 20px 0px rgba(46, 169, 239, 0.6);
      }
    }
    .right {
      width: 285px;
      padding: 20px;
      .card {
        box-shadow: 0px 3px 17px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        margin-bottom: 12px;
        cursor: pointer;
        ul {
          margin-left: 14px;
        }
        .cover {
          width: 87px;
          height: 82px;
        }
        li {
          font-size: 10px;
          padding: 6px 10px;
          margin-bottom: 3px;
          border-radius: 0 10px 10px 0;
          position: relative;
          &:hover {
            > img {
              display: block;
            }
          }
          > img {
            width: 16px;
            height: 14px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: none;
            right: 5px;
          }
        }
      }
      .card1 {
        li {
          background: #ecf7fe;
          color: #40b2f4;
        }
      }
      .card2 {
        li {
          background: #ecfaf7;
          color: #44d2af;
        }
      }
      .card3 {
        li {
          background: #fff8ea;
          color: #feb935;
        }
      }
      .card4 {
        li {
          background: #fff8ea;
          color: #bf77f1;
        }
      }
      .card5 {
        li {
          background: #feeff2;
          color: #f65e7e;
        }
      }
    }
  }
  .add {
    display: block;
    margin: 48px auto 0;
    width: 89px;
    background: rgba(255, 135, 38, 1);
    box-shadow: 0px 1px 22px 0px rgba(255, 135, 38, 0.32);
    border-radius: 3px;
    font-size: 11px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
