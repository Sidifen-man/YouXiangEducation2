<template>
  <div class="readMore">
    <Breadcrumb :address="address"></Breadcrumb>
    <div class="intro">
      <h6 class="title">VIA测评</h6>
      <p class="VIAP">
        VIA性格优势测评（Values in Action)，又被称为“行动价值量表”，是一种基于积极心理学的性格优势评估方法。VIA作为一个测评工具，可以帮助人们发现自己的积极优势，并学习如何利用它们。这个测评工具目前已经被全球200国家，超过800万人验证。该测评分为青少年与成人两个版本。
        <br />
      </p>
      <p class="VIAP">
        优势个性是指我们最核心的思考、感受、行为的潜质，这些潜能可以帮助我们持续地提升与改善我们的生活。VIA性格优势测评由“积极心理学之父”Christopher Peterson和Martin Seligman研发创建，他们是积极心理学领域的著名研究人员，目的是帮助人们将自己的性格优势和美德（基于CSV)付诸实施。CSV是与传统心理学中使用的精神疾病诊断与统计方式(DSM)相对应的积极心理学。与DSM专注于精神病理问题不同，CSV对积极的人类优势进行分类。此外，CSV的核心是帮助人们认识并建立他们的优势。这与积极心理学演进的总体目标是一致的，积极心理学的目标是让人们的生活更加充实，而不仅仅是治疗精神疾病。
      </p>
      <img class="img1" src="../images/img/1.png" alt />
      <p class="text_color">遍布世界200多个国家</p>
      <h6 class="title">优势分类</h6>
      <p class="VIAP">VIA测评分类的六大核心美德象限与六个象限包含的24个优势主题是耗时三年的项目研发结果。这项工作是在VIA研究所主持下进行的, 包括塞利格曼教授及其他55 位主要科学家，由克里斯. 彼得森教授指导，跨越人类2500年的时间，在全世界范围内的宗教、文化、国家和信仰体系中,提炼出 24 个优势主题，被认为是普遍存在于每个人身上的, 被视为实现幸福生活的 "基本基石"。这个研究的学术文本，参见2004年发表的《优势品格与美德》一书。</p>
      <img class="img2" src="../images/img/2.png" alt />
      <div class="swipper">
        <el-carousel height="188px">
          <el-carousel-item v-for="(item, index) in swipper" :key="index">
            <h3 class="small">{{ item.title }}</h3>
            <ul class="img_box">
              <li v-for="(list, i) in item.img" :key="i">
                <img :src="list.imgPath" alt />
                <p>{{ list.imgName }}</p>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
      <h6 class="title">VIA研究所</h6>
      <p class="text_center">
       成立于2000年的非营利组织，总部位于美国俄亥俄州辛辛那提市。 由尼尔 Mayerson 博士与Martin Seligman博士联合创建致力于对积极心理学以及性格优势测评工具以及配套干预手段的持续研发与实证研究。在过去的近20年里，VIA测评已经被广泛用于全球近200个国家，积累了超过800万人的大数据，持续帮助人们发现自己的突出优势特质，实现学习与工作效率的提升，实现幸福生活。
      </p>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "./breadcrumb";
import img1 from "../images/img/3.png";
import img2 from "../images/img/4.png";
import img3 from "../images/img/5.png";
import img4 from "../images/img/6.png";
import img5 from "../images/img/7.png";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      address: {
        // onePath: "/home/assessmentCenter/assessmentCenterView",
        // twoPath: {
        //   path: "/home/assessmentCenter/assessmentCenterView",
        //   text: "VIA优势测评"
        // },
        // text: "了解更多"
      },
      swipper: [
        {
          title: "思维类优势",
          img: [
            {
              imgPath: img1,
              imgName: "创意"
            },
            {
              imgPath: img2,
              imgName: "好奇心"
            },
            {
              imgPath: img3,
              imgName: "判断力"
            },
            {
              imgPath: img4,
              imgName: "喜爱学习"
            },
            {
              imgPath: img5,
              imgName: "洞察力"
            }
          ]
        },
        {
          title: "创造类优势",
          img: [
            {
              imgPath: img1,
              imgName: "创意"
            },
            {
              imgPath: img2,
              imgName: "好奇心"
            },
            {
              imgPath: img3,
              imgName: "判断力"
            },
            {
              imgPath: img4,
              imgName: "喜爱学习"
            },
            {
              imgPath: img5,
              imgName: "洞察力"
            }
          ]
        }
      ]
    };
  },
  created() {
    const path = this.$route.fullPath;
    let paths = "home";
    let url = {
      onePath: `/students/${paths}/assessmentCenterView`,
      twoPath: {
        path: `/students/${paths}/assessmentCenterView`,
        text: "VIA优势测评"
      },
      text: "了解更多"
    };
    if (path.indexOf("teacher") > -1) {
      paths = "teacher";
      url = {
        onePath: `/${paths}/assess/assessmentCenter`,
        twoPath: {
          path: `/${paths}/assess/assessmentCenter`,
          text: "VIA优势测评"
        },
        text: "了解更多"
      };
    }
    this.address = url;
  }
};
</script>

<style lang="less" scoped>
.readMore {
  background-color: #fff;
  overflow: hidden;
  /deep/ .el-carousel__button {
    width: 8px;
    height: 8px;
    border: 2px solid rgba(255, 151, 76, 1);
    border-radius: 50%;
  }
  /deep/ .el-carousel__indicator.is-active button {
    width: 8px;
    height: 8px;
    background: rgba(255, 151, 76, 1);
    border-radius: 50%;
  }
  font-size: 14px;
  line-height: 18px;
  padding: 0 46px;
  box-sizing: border-box;
  width: 100%;
  color: #666;

  .intro {
    text-align: center;
   
    .title {
      font-weight: bold;
      color: #333;
      margin: 40px 0 26px;
    }
    img {
      display: block;
      margin: 0 auto;
    }

    p {
      text-align: justify;
      text-indent: 2em;
      
    }
    .VIAP{
      line-height:0.23rem 
    }
    .img1 {
      margin-top: 38px;
      margin-bottom: 9px;
    }

    .text_color {
      color: #fd8929;
      font-weight: bold;
      text-align: center;
      margin-bottom: 63px;
    }

    .img2 {
      margin: 38px auto 49px;
    }

    .swipper {
      width: 532px;
      height: 188px;
      border: 1px solid rgba(255, 135, 38, 0.16);
      border-radius: 7px;
      margin: 0 auto 86px;
      padding: 0 33px;
      .small {
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(252, 163, 48, 1);
        line-height: 40px;
        border-bottom: 1px solid #ffa75c;
      }
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 22px;
        li {
          list-style: none;
          width: 20%;
          img {
            margin: 0 auto;
            display: block;
            width: 45px;
            height: 45px;
          }
          p {
            text-align: center;
            text-indent: 0;
            margin-top: 11px;
          }
        }
      }
    }

    .text_center {
     // text-align: center;
      margin-bottom: 183px;
    }
  }
}
</style>
