<template>
  <div class="modal" v-if="mydialog">
    <div class="mydialog">
      <div class="close" @click="mydialog=false">
        <img src="../images/close1.png" alt />
      </div>
      <div class="topimg">
        <img src="../images/dialog.png" alt />
      </div>
      <p class="dialogTitle" v-if="current===0||current===1">Here' s how it works...</p>
      <p class="dialogTitle" v-if="current===2">As you answer the questions</p>
      <p class="dialogTitle" v-if="current===3">This is not a test</p>

      <div class="block">
        <el-carousel
          height="270px"
          :autoplay="false"
          indicator-position="outside"
          :loop="false"
          arrow="never"
          ref="carousel"
          @change="change"
        >
          <el-carousel-item>
            <div class="small">
              <h6>重要提示</h6>
              <p>
                如果你
                <i>还没有完成</i>
                Onet职业价值观测评（WIP），完成此测评后，你将看到的是根据你的突出职业价值观代码以及上千个职业中算出的与你大的职业价值观最匹配的推荐职业。
              </p>
              <p>
                如果你
                <i>已经完成</i>Onet职业价值观测评（WIP），完成此测评后，你将看到的是根据你的突出职业价值观代码与职业兴趣代码，并且系统结合两套测评结果在上千个职业中算出了你的职业兴趣以及价值观维度最匹配的推荐职业。
              </p>
              <p>记住你最后只有一份报告。而且这份报告没有考虑到你的学术或其他能力因素。</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="small small1">
              <p class="ttt">
                <i>欢迎你！</i>
                你已经迈出了了解自己的职业倾向和兴趣的重要一步。
              </p>
              <p>Onet职业兴趣测评已经有近20年的历史，在全球被数万所学校用于职业兴趣测试。标准版一共有60个问题，这些问题描述了不同的职业人士在工作中需要完成的活动和任务。</p>
              <p>认真阅读每一个描述，然后决定如果你需要完成这些活动的话，你的感受是什么，一共有以下5个选项：</p>
              <div class="imgs">
                <div class="imgItem">
                  <div class="opt" @click="handleClick(1)">
                    <img src="../images/img/13.png" alt />
                  </div>
                  <p>非常不喜欢</p>
                  <img v-show="index===1" class="radio" src="../images/img/20.png" alt />
                </div>
                <div class="imgItem">
                  <div class="opt" @click="handleClick(2)">
                    <img src="../images/img/14.png" alt />
                  </div>
                  <p>不喜欢</p>
                  <img v-show="index===2" class="radio" src="../images/img/20.png" alt />
                </div>
                <div class="imgItem">
                  <div class="opt" @click="handleClick(3)">
                    <!-- <p class="score">3分</p> -->
                    <img src="../images/img/15.png" alt />
                  </div>
                  <p>中立</p>
                  <img v-show="index===3" class="radio" src="../images/img/20.png" alt />
                </div>
                <div class="imgItem">
                  <div class="opt" @click="handleClick(4)">
                    <img src="../images/img/16.png" alt />
                  </div>
                  <p>喜欢</p>
                  <img v-show="index===4" class="radio" src="../images/img/20.png" alt />
                </div>
                <div class="imgItem">
                  <div class="opt" @click="handleClick(5)">
                    <img src="../images/img/17.png" alt />
                  </div>
                  <p>非常喜欢</p>
                  <img v-show="index===5" class="radio" src="../images/img/20.png" alt />
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="answer small">
              <h6>在你回答问题的过程中不要过多考虑：</h6>
              <p>你是不是已经有一些培训或者教育经历去做好这个任务/活动</p>
              <p>这份职业能不能有优厚的酬劳</p>
              <p>只需要考虑你是否会喜欢尝试做这样的活动</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="last small">
              <h6>这不是一个“考试”，所以没有所谓正确或者错误答案。</h6>
              <p>这个测评没有时间限制，所以你可以慢慢思考。</p>
              <p>这个过程你在探索你的职业兴趣，所以你可以索你可能会感兴趣和感到满足感的职业。</p>
              <p>在下一页开始答题，在进行下一题之前，务必先完成上一题</p>
              <p>每一页有10题，一共有6页。你可以点击上一页去修改你的答案。</p>
              <p>完成后，点击提交</p>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="button back" @click="prev" v-if="current!=0">返回</div>
        <div class="button" @click="next" v-if="current != 3">下一步</div>
        <div class="button" @click="confirm" v-if="current == 3">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      current: 0,
      centerDialogVisible: false,
      mydialog: false
    };
  },
  methods: {
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
    handleClick(index) {
      this.index = index;
    },
    change(current) {
      console.log(current)
      this.current = current;
    },
    confirm() {
      this.$router.push("/teacher/oNet/onetEvalute");
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  .mydialog {
    margin-top: 10%;
    width: 800px;
    height: 606px;
    background-color: #fff;
    position: relative;
    border-radius: 20px;
    .close {
      width: 24px;
      height: 40px;
      position: absolute;
      right: 25px;
      top: -40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .topimg {
      width: 216px;
      height: 216px;
      background-color: #fff;
      border: 3px solid #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -108px;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 213px;
        height: 213px;
      }
    }
    .dialogTitle {
      height: 34px;
      font-size: 36px;
      font-family: HYo1gj;
      font-weight: 400;
      color: rgba(255, 135, 38, 1);
      line-height: 23px;
      margin-top: 128px;
      text-align: center;
    }
    .block {
      margin-top: 38px;
      .el-carousel__item.is-animating {
        display: flex;
        justify-content: center;
      }

      .opt {
        width: 38px;
        height: 38px;
        background-color: #ff8726;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 13px auto;
        .score {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 23px;
        }
      }
      .small {
        width: 685px;
        height: 260px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        margin-top: 5px;
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          // margin: 0 20px 15px 20px;
          margin: 15px 20px;
          text-align: justify;
          i {
            color: #ff8726;
            font-style: normal;
          }
        }
        .ttt {
          font-size: 20px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: #333;
          line-height: 1;
          margin-left: 28px 0 28px 38px;
          i {
            color: #ff8726;
          }
        }
        h6 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          position: relative;
          padding: 20px 0 20px 14px;
          &:before {
            position: absolute;
            content: "";
            width: 3px;
            height: 17px;
            background: rgba(252, 121, 39, 1);
            border-radius: 1px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .button {
        width: 133px;
        height: 44px;
        background: rgba(255, 135, 38, 1);
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom-right-radius: 15px;
      }
      .back {
        width: 134px;
        height: 44px;
        background: rgba(233, 233, 233, 1);
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
        position: absolute;
        bottom: 0;
        right: 133px;
        border-bottom-right-radius: 0px;
      }
      .small1 {
        .imgs {
          margin-top: 34px;
        }
        h5 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          line-height: 36px;
          color: #333;
          margin-left: 20px;
          padding-top: 10px;
          i {
            color: rgba(255, 135, 38, 1);
            font-style: normal;
          }
        }
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 60px 0 50px;
          > div {
            height: 73px;
            p {
              text-align: center;
              font-size: 14px;
              color: #333;
              margin: 3px 0;
            }
            .smile {
              width: 29px;
              height: 29px;
              margin: 0 auto;
              display: block;
            }
            .radio {
              width: 17px;
              height: 17px;
              margin: 0 auto;
              display: block;
            }
          }
        }
      }
      .answer {
        // width: 514px;
        height: 245px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        padding: 21px 29px 0 29px;
        box-sizing: border-box;
        h6 {
          font-size: 20px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 20px;
          &:before {
            width: 0;
          }
        }
        p {
          width: 456px;
          height: 22px;
          background: rgba(247, 128, 43, 0.1);
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          // color: rgba(247, 128, 43, 1);
          padding-left: 8px;
          line-height: 22px;
          margin-bottom: 10px;
          &:nth-of-type(3) {
            background: none;
            color: #666;
            margin-top: 18px;
          }
        }
      }
      .last {
        // width: 514px;
        height: 245px;
        background: rgba(247, 249, 252, 1);
        border-radius: 9px;
        padding: 20px;
        box-sizing: border-box;
        h6 {
          font-size: 15px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
        }
        p {
          font-size: 14px;
          color: #666;
          line-height: 1;
          &:nth-of-type(1) {
            margin-bottom: 10px;
          }
          &:nth-of-type(3) {
            color: #ff8726;
          }
          &:nth-of-type(5) {
            margin-top: 5px;
            font-family: PingFang-SC-Medium;
            font-weight: 700;
            color: #ff8726;
          }
        }
        .center {
          font-size: 11px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 135, 38, 1);
          margin: 19px 0;
        }
      }
    }
  }
}
</style>