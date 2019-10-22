<template>
  <div class="university">
    <div class="content">
      <div class="top-crumb">
        <Breadcrumb :address="url" />
      </div>
      <div class="container">
        <div class="left">
          <div class="title">Ranking No.1</div>
          <div class="current_title">
            <img src="../images/university/icon1.png" alt="">
            <span>Princeton University</span>
          </div>
          <div class="s_title">Princeton, NJ</div>
          <div class="basic_info">
             <div class="top">
               <img src="../images/university/icon2.png" alt="">
               <span>Basic Info</span>
             </div>
              <div class="middle">
               <span>Website:</span>
               <el-input v-model="baseInfo.website" placeholder="https://www.princeton.edu/"></el-input>
             </div>
              <div class="middle">
               <span>Institution Type:</span>
               <el-input v-model="baseInfo.type" placeholder="Private"></el-input>
             </div>
             <div class="middle">
               <span>Students:</span>
               <el-input v-model="baseInfo.students" placeholder="5394"></el-input>
             </div>
             <div class="middle">
               <span>Admission rate:</span>
               <el-input v-model="baseInfo.admissionRate" placeholder="6%"></el-input>
             </div>
             <div class="middle">
               <span>Location:</span>
               <el-input v-model="baseInfo.state" placeholder="Princeton, NJ"></el-input>
             </div>
          </div>
          <div class="basic_info second">
             <div class="top">
               <img src="../images/university/icon3.png" alt="">
               <span>Quick Facts</span>
             </div>
              <div class="middle">
               <span>Regular Admission Deadline:</span>
               <el-input v-model="baseInfo.deadline" placeholder="1-Jan"></el-input>
             </div>
              <div class="middle">
               <span class="letter">Average GPA(Enrolled Freshmen):</span>
               <el-input v-model="baseInfo.gpa" placeholder="3.91"></el-input>
             </div>
             <div class="middle">
               <span>Cost of Attendance:</span>
               <el-input v-model="baseInfo.attendFee" placeholder="$66510"></el-input>
             </div>
             <div class="middle">
               <span>International Students:</span>
               <el-input v-model="baseInfo.intelStudents" placeholder="11.7% from 97 countries"></el-input>
             </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <ul>
              <li :class="{'active': showIndex === 0}" @click="listItem(0)">大学介绍及本科专业</li>
              <li :class="{'active': showIndex === 1}" @click="listItem(1)">录取考量因素</li>
              <li :class="{'active': showIndex === 2}" @click="listItem(2)">录取情况</li>
              <li :class="{'active': showIndex === 3}" @click="listItem(3)">高中准备</li>
              <li :class="{'active': showIndex === 4}" @click="listItem(4)">学费及相关</li>
              <li :class="{'active': showIndex === 5}" @click="listItem(5)">学生多样性</li>
            </ul>
          </div>
          <section class="tab_switch">
            <div class="middle">
              <span>Brief Introduction</span>
              <div class="content">
                {{baseInfo.intro}}
              </div>
            </div>
            <div class="bottom">
              <span class="title">Undergraduate Majors</span>
              <ul>
                <li v-for="(content,index) in baseInfo.majorList" :key="index">
                  <span></span>
                  <span>{{content}}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "../components/breadcrumb";
import surver from "api/http/t-gloData.js";
export default {
  data() {
    return {
      url: {
        title: "全球数据库",
        onePath: "/students/profession/university",
        twoPath: {
          path: "/students/profession/university",
          text: "大学库"
        },
        threePath: {
          path: "/students/profession/university",
          text: "海外大学专业库"
        },
        text: "Princeton University"
      },
      input: '',
      showIndex: 0,
      baseInfo: {
        website: 'https://www.princeton.edu/',
        institutionType: 'Private',
        students: '5394',
        admissionRate: '6%',
        location: 'Princeton, NJ'
      },
      contents: [
          'Anthropology',
          'Architecture',
          'Art History, Criticism and Conservation',
          'Astrophysics',
          'Chemical Engineering',
          'Chemistry, General',
          'Civil Engineering, General',
          'Classics and Classical Languages, Literatures, and Linguistics, General',
          'Comparative Literature',
          'Computer Engineering, General',
          'East Asian Studies',
          'Ecology',
          'Economics, General',
          'Electrical and Electronics Engineering',
          'English Language and Literature, General',
          'French Language and Literature',
          'Geological and Earth Sciences/Geosciences, Other',
          'German Language and Literature',
          'History, General',
          'Mathematics, General',
          'Mechanical Engineering',
          'Molecular Biology',
          'Multi-/Interdisciplinary Studies, Other',
          'Music, General',
          'Near and Middle Eastern Studies',
          'Operations Research',
          'Philosophy',
          'Physics, General',
          'Political Science and Government, General',
          'Psychology, General',
          'Public Policy Analysis, General',
          'Religion/Religious Studies',
          'Slavic Languages, Literatures, and Linguistics, General',
          'Sociology',
          'Spanish Language and Literature'
      ]
    };
  },
  created() {
    this.detail()
  },
  methods: {
    listItem (e) {
      this.showIndex = e
    },
    detail(){
      const id = this.$route.params.id;
      console.log(this.$route)
      const param = {
        id : id,
        lang : this.$cache.localStorage.get("lang"),
      }
      surver.fdetail(param).then(res => {
        if(res.data.code=="success"){
          this.baseInfo = res.data.result;
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    }
  },
  components: {
    Breadcrumb
  }
};
</script>

<style lang="less" scoped>
.university {
  .content {
    background-color: #fff;
    padding: 0 19px;
    .top-crumb {
      padding-top: 4px;
      padding-left: 26px;
    }
    .container{
      width: 100%;
      padding-bottom: 54px;
      background-color: #fff;
      margin-top: 23px;
      display: flex;
      justify-content: space-around;
      .left{
        width: 222px;
        height: 865px;
        background:rgba(255,255,255,1);
        box-shadow:0 1px 30px 0 rgba(202,202,202,0.32);
        border-radius:6px;
        margin-right: 14px;
        .title{
          font-size: 14px;
          font-family:PingFang-SC-Heavy;
          font-weight: bold;
          color:rgba(255,135,38,1);
          padding: 16px 0 0 15px;
          box-sizing: border-box;
        }
        .current_title{
          margin-top: 13px;
          padding-left: 16px;
          img{
            width: 16px;
            height: 14px;
            display: inline-block;
            vertical-align: baseline;
            margin-right: 4px;
          }
          span{
            font-size:16px;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
        }
        .s_title{
          padding-left: 39px;
          margin-top: 7px;
          font-size:12px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(102,102,102,1);
          margin-bottom: 16px;
        }
        .basic_info{
          width:196px;
          // height:383px;
          padding-bottom: 24px;
          background:rgba(245,245,245,1);
          border-radius:4px;
          margin: 0 auto;
          .top{
            width:196px;
            height:34px;
            background:rgba(255,135,38,1);
            border-radius: 4px 4px 0 0;
            img{
              width: 14px;
              height: 12px;
              display: inline-block;
              vertical-align: baseline;
              margin: 11px 0 0 13px;
              margin-right: 4px;
            }
            span{
              font-size:16px;
              font-family:PingFang-SC-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
            }
          }
          .middle{
            padding: 20px 0 0 10px;
            span{
              height: 10px;
              font-size:12px;
              font-family:PingFang-SC-Bold;
              font-weight:bold;
              color:rgba(51,51,51,1);
              padding-left: 4px;
            }
            /deep/.el-input{
              width:176px;
              height:26px;
              background:rgba(255,255,255,1);
              border-radius:4px;
              margin-top: 6px;
              .el-input__inner{
                height:26px;
                border: none;
                padding: 0 7px 0 10px;
                font-size: 12px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(153,153,153,1);
              }
            }
            .letter{
              letter-spacing: -.5px;
            }
          }
        }
        .second{
          height: 320px !important;
          margin-top:12px;
          .middle{
            padding: 19px 0 0 10px;
          }
          .top{
            img{
              width: 12px;
              height: 14px;
              vertical-align: bottom;
            }
          }
        }
      }
      .right{
        width: 696px;
        .top,.middle,.bottom{
          height: 47px;
          background:rgba(255,255,255,1);
          box-shadow:3px 5px 30px 0px rgba(0, 0, 0, 0.06);
          border-radius:8px;
          margin-bottom: 10px;
        }
        .top{
          display: flex;
          align-items: center;
          justify-content: center;
          ul{
            display: flex;
            flex-direction: row;
            li{
              height:28px;
              font-size:14px;
              font-family:PingFang-SC-Medium;
              font-weight: 500;
              color:rgba(102,102,102,1);
              line-height:28px;
              margin: 0 17px;
              text-align: center;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              &.active{
                font-weight:800;
                color:rgba(255,135,38,1);
                font-family:PingFang-SC-Heavy;
                transition: all .3s;
              }
              &.active::after{
                content: "";
                display: block;
                position: absolute;
                width:20px;
                height:3px;
                left: 40%;
                border-radius:1px;
                background: rgba(255,135,38,1);
                margin-top: 3px;
              }
            }
            li:hover{
              cursor: pointer;
            }
          }
        }
        .tab_switch{
          .middle{
            height:138px;
            span{
              display: inline-block;
              padding: 22px 0 0 26px;
              font-size:14px;
              font-family:PingFang-SC-Heavy;
              font-weight:800;
              color:rgba(51,51,51,1);
              margin-bottom: 16px;
            }
            .content{
              width:621px;
              font-size:13px;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(102,102,102,1);
              line-height:18px;
              padding-left: 36px;
              padding-right: 0;
              letter-spacing: -.5px;
            }
          }
          .bottom{
            height: 100%;
            padding-bottom: 46px;
            background:rgba(255,255,255,1);
            box-shadow:3px 5px 30px 0px rgba(0, 0, 0, 0.06);
            border-radius:8px;
            .title{
              display: inline-block;
              padding: 22px 0 0 26px;
              font-size:14px;
              font-family:PingFang-SC-Heavy;
              font-weight:800;
              color:rgba(51,51,51,1);
              margin-bottom: 16px;
            }
            ul{
              li{
                margin-left: 38px;
                height: 28px;
                span:nth-child(1){
                  width:5px;
                  height:5px;
                  display: inline-block;
                  background:rgba(255,135,38,1);
                  border-radius:50%;
                  margin-right: 10px;
                  vertical-align: middle;
                }
                span:nth-child(2){
                  font-size:13px;
                  font-family:PingFang-SC-Medium;
                  font-weight:500;
                  color:rgba(102,102,102,1);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
