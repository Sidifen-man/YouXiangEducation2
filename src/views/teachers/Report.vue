<template>
  <div class="report">
    <div class="content top">
      <!-- 面包屑导航 -->
      <div class="top-crumb">
        <Breadcrumb :address="url" />
      </div>

      <!-- 测评结果 -->
      <div class="result">
        <div class="top-title">
          <div class="cover">
            <img src="../../images/professionalRecommendations.png" alt />
          </div>
          <div class="result-title">
            <h3>测评结果</h3>
            <p>Onet职业测评体系通过20年积累的问卷大数据库算法与数据库中1000多个职业进行匹配，你将获得你的霍兰德职业代码分数，并基于此获得与您的职业兴趣最相关的职业推荐列表，你也可以按照学历要求，STEM技能要求等筛选出最适合你的职业。</p>
          </div>
        </div>
        <!-- 教育水平要求 -->
        <div class="teach">
          <h3>教育水平要求</h3>
          <div class="sub-title">我们根据通常不同职业的教育程度需求，将职业类别分为5个种类：</div>
          <div class="list">
            <ul>
              <li>
                <div class="banner">
                  <span class="num">1</span>
                  <img src="../../images/report/icon1.png" alt />
                </div>
                <p class="title">没有教育程度门槛</p>
              </li>
              <li class="level2">
                <div class="banner">
                  <span class="num">2</span>
                  <img src="../../images/report/icon2.png" alt />
                </div>
                <p class="title">需要一定的职业技术培训</p>
              </li>
              <li class="level3">
                <div class="banner">
                  <span class="num">3</span>
                  <img src="../../images/report/icon3.png" alt />
                </div>
                <p class="title">高中学位</p>
              </li>
              <li class="level4">
                <div class="banner">
                  <span class="num">4</span>
                  <img src="../../images/report/icon4.png" alt />
                </div>
                <p class="title">本科学位要求</p>
              </li>
              <li class="level5">
                <div class="banner">
                  <span class="num">5</span>
                  <img src="../../images/report/icon5.png" alt />
                </div>
                <p class="title">硕士学位要求</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 职业匹配度 -->
        <div class="job-perfect">
          <h3>高度匹配职业标准</h3>
          <div class="des">
            <div class="left">
              <p>
                每一个职业都有与六个霍兰德代码的相关系数，基于相关系数的测算，以下职业与你的职业兴趣测评结果高度匹配，点击了解这些职业，了解你可以如何为这份职业做学业规划。
                记住，当你考虑自己的职业价值观与需要来选择你喜欢的行业与职业方向，你的职业幸福感会更高~
              </p>
            </div>
            <div class="right">
              <img src="../../images/report/img1.png" alt />
            </div>
          </div>
        </div>
        <!-- 弗兰德代码 -->
        <div class="common-code">
          <div class="section">
            <h3 class="title">你突出的霍兰德代码</h3>
            <div>
              <ul class="list">
                <li v-for="v in data1">
                  <div class="item">
                    <div class="t">
                      <pie-chart
                        :chart-data="v.data"
                        :shadowColor="v.shadowColor"
                        :labelColor="v.labelColor"
                      />
                    </div>
                    <h3>{{v.title}}</h3>
                    <p>{{v.des}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="section">
            <h3 class="title">你其余的霍兰德代码</h3>
            <div>
              <ul class="list">
                <li v-for="v in data2">
                  <div class="item">
                    <div class="t">
                      <pie-chart
                        :chart-data="v.data"
                        :shadowColor="v.shadowColor"
                        :labelColor="v.labelColor"
                      />
                    </div>
                    <h3>{{v.title}}</h3>
                    <p>{{v.des}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="result">
        <div class="common-code">
          <div class="section">
            <h3 class="title">你突出的价值观维度</h3>
            <div>
              <ul class="list">
                <li v-for="v in data3">
                  <div class="item">
                    <div class="t">
                      <pie-chart
                        :chart-data="v.data"
                        :shadowColor="v.shadowColor"
                        :labelColor="v.labelColor"
                      />
                    </div>
                    <h3>{{v.title}}</h3>
                    <p>{{v.des}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="section">
            <h3 class="title">其他价值观维度</h3>
            <div>
              <ul class="list">
                <li v-for="v in data4">
                  <div class="item">
                    <div class="t">
                      <pie-chart
                        :chart-data="v.data"
                        :shadowColor="v.shadowColor"
                        :labelColor="v.labelColor"
                      />
                    </div>
                    <h3>{{v.title}}</h3>
                    <p>{{v.des}}</p>
                  </div>
                </li>
              </ul>
              <div class="tip">
                <div class="title1">恭喜你,你刚刚完成了职业价值观的探索!</div>
                <div class="sub-title">记住,当你考虑自己的职业价值观与需要来选择你喜欢的行业与职业方向,你的职业幸福感会更高</div>
                <div class="right-img">
                  <img src="../../images/report/img2.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 历史报告 -->
    <div class="history">
      <commonTable :list="dataList"></commonTable>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../../tcomponents/breadcrumb";
import PieChart from "../../tcomponents/pieChart/PieChart";
import commonTable from "../../tcomponents/commonTable";
import surver from "api/http/evaluation.js";
import axios from 'api/http/http';
export default {
  data() {
    return {
      data: [
        {
          shadowColor: "rgba(38,201,255,0.2)",
          labelColor: "#26C9FF",
          data: {
            crude: 36,
            thin: 64
          },
          title: "",
          des:""
        },
        {
          shadowColor: "rgba(255,135,38,0.2)",
          labelColor: "#FF8726",
          data: {
            crude: 33,
            thin: 67
          },
          title: "实际型",
          des:
            "你如果对社会型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德"
        },
        {
          shadowColor: "rgba(61,222,190,0.2)",
          labelColor: "#3DDEBE",
          data: {
            crude: 21,
            thin: 79
          },
          title: "常规型",
          des:
            "你如果对社会型职业感兴趣，这些工作要求你喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德"
        }
      ],
      data1:[],
      data2:[],
      data3:[],
      data4:[],
      dataList:[],
      url: {
        onePath: "/home/oNet/onetView",
        twoPath: {
          path: "/home/reportManagement",
          text: "报告管理"
        },
        text: "职业推荐报告"
      }
    };
  },
  created() {
    this.initData()
  },
  methods: {
    initData(){
      let LocalStorage = this.$cache.localStorage
      let lang = LocalStorage.get('lang');
      let grade =  JSON.parse(LocalStorage.get('loginuser'));
      let id = '';
      if(grade.classInfo.classType === "2")id = 'cip30'
      if(grade.classInfo.classType === "1")id = 'cip60';
      let param = {
        id : id,
        lang : lang
      }
      surver.getCipResult(param).then(res=>{
        if(res.data.code === "success"){
          let list =  res.data.result;
          let data1 = JSON.parse(JSON.stringify(this.data));
          let data2 = JSON.parse(JSON.stringify(this.data));
          list.forEach((item,index)=>{
            let  percent = item.percent.split('.')[0]
            let  thin = 100-percent; 
            if(index<3){
              data1[index].data.crude = item.value;
              data1[index].data.thin = thin;
              data1[index].title = item.name;
              data1[index].des = item.desc;
            }else{
              let inx = index-3;
              data2[inx].data.crude = item.value
              data2[inx].data.thin = thin;
              data2[inx].title = item.name;
              data2[inx].des = item.desc;
            }
          })
          this.data1 = data1;
          this.data2 = data2;
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });   
        }
      })
      let params = {
        id : 'wip20',
        lang : lang
      }
      surver.getWipResult(params).then(res=>{

        if(res.data.code === "success"){
          let list =  res.data.result;
          let data3 = JSON.parse(JSON.stringify(this.data));
          let data4 = JSON.parse(JSON.stringify(this.data));
          list.forEach((item,index)=>{
            let  percent = item.percent.split('.')[0]
            let  thin = 100-percent;
            let type = item.nameEn;
            if(index<3){
              data3[index].data.crude = item.subValue;
              data3[index].data.thin = thin;
              data3[index].title = item.name;
              data3[index].des = item.desc;
            }else{
              let inx = index-3
              data4[inx].data.crude = item.subValue
              data4[inx].data.thin = thin;
              data4[inx].title = item.name;
              data4[inx].des = item.desc;
            }
          })
          this.data3 = data3;
          this.data4 = data4;
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });   
        }
      })
      surver.getCareerRecommendation(param).then(res=>{
        if(res.data.code === "success"){
          let list =  res.data.result;
          if(list && list.length){
            this.dataList = list;
          }
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });   
        }
      })

    },
  },

  components: {
    Breadcrumb,
    PieChart,
    commonTable
  }
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 0 15px;
  margin-bottom: 20px;
  .top-crumb {
    padding-top: 14px;
    padding-left: 26px;
  }

  // 测评结果
  .result {
    padding: 30px;
    .top-title {
      height: 128px;
      .cover {
        float: left;
        padding: 6px;
        border-radius: 5px;
        background: #87cefa;
        img {
          width: 172px;
          height: 106px;
        }
      }
      .result-title {
        margin-left: 215px;
        h3 {
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
        p {
          margin-top: 15px;
          line-height: 20px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }

  // 教育水平
  .teach {
    padding-top: 55px;
    h3 {
      text-align: center;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .sub-title {
      font-size: 12px;
      color: #666;
      margin-top: 28px;
    }
    .list {
      padding-top: 45px;
      ul {
        display: flex;
        justify-content: space-between;
      }
      li {
        width: 145px;
        height: 100px;
        border: 1px solid rgba(255, 135, 38, 1);
        .banner {
          width: 100%;
          height: 66px;
          background-color: #fff3e9;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .num {
            position: absolute;
            top: -15px;
            left: -15px;
            z-index: 2;
            width: 31px;
            height: 31px;
            background: rgba(255, 135, 38, 1);
            border: 2px solid rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 9px 0px rgba(255, 135, 38, 0.5);
            border-radius: 50%;
            font-size: 17px;
            color: #fff;
            text-align: center;
            line-height: 31px;
          }
        }

        &.level2 {
          border-color: #3ddebe;
          .banner {
            background-color: #ebfcf8;
            .num {
              box-shadow: 0px 0px 9px 0px rgba(61, 222, 190, 0.5);
              background: rgba(61, 222, 190, 1);
            }
          }
        }
        &.level3 {
          border-color: #26c9ff;
          .banner {
            background-color: #e9f9ff;
            .num {
              box-shadow: 0px 0px 9px 0px rgba(38, 201, 255, 0.5);
              background: rgba(38, 201, 255, 1);
            }
          }
        }
        &.level4 {
          border-color: #f774e3;
          .banner {
            background-color: #fef1fc;
            .num {
              background: rgba(247, 116, 227, 1);
              box-shadow: 0px 0px 9px 0px rgba(247, 116, 227, 0.5);
            }
          }
        }
        &.level5 {
          border-color: #f85564;
          .banner {
            background-color: #feeeef;
            .num {
              background: rgba(248, 85, 100, 1);
              box-shadow: 0px 0px 9px 0px rgba(248, 85, 100, 0.5);
            }
          }
        }

        .title {
          text-align: center;
          font-size: 10px;
          color: #666;
          line-height: 35px;
        }
      }
    }
  }

  // 职业匹配度
  .job-perfect {
    padding-top: 60px;
    h3 {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      text-align: center;
      margin-bottom: 7px;
    }
    .des {
      display: flex;
      justify-content: space-between;
      .left {
        width: 590px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: 12px;
        color: #666;
        line-height: 20px;
      }
    }
  }

  .common-code {
    .section {
      padding-top: 40px;
    }
    .title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    .list {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      li {
        width: 242px;
        min-height: 273px;
        box-shadow: 0px 0px 9px 0px rgba(177, 79, 0, 0.07);
        border-radius: 5px;
        .item {
          padding: 20px;
          .t {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          h3 {
            font-size: 12px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-top: 20px;
          }
          p {
            font-size: 10px;
            color: #666;
            line-height: 17px;
            margin-top: 10px;
          }
        }
      }
    }
    .tip {
      height: 100px;
      padding: 15px 15px 15px 29px;
      background-color: #fff3e9;
      position: relative;
      .title1 {
        font-size: 16px;
        font-weight: 500;
        color: #ff8726;
        margin-top: 15px;
      }
      .sub-title {
        margin-top: 15px;
        font-size: 14px;
        color: #ff8726;
      }
      .right-img {
        position: absolute;
        right: 0;
        top: -37px;
      }
    }
  }
}
</style>
