<template>
  <div class="home">
    <el-container>
      <el-header height="120px">
        <el-row type="flex" justify="center">
          <el-col class="banner">
            <div class="header-content">
              <div class="head-left">
                <img src="../../images/erqi/center/toubu.png" alt />
              </div>
              <div class="head-right">
                <div class="info">
                  <img class="img" src="../../images/erqi/center/tuceng3.png" alt />
                  <div class="select">
                    <span>{{name}}同学欢迎您</span>
                    <img src="../../images/erqi/center/select.png" alt srcset />
                  </div>
                </div>
                <div class="area">
                  <img class="img" src="../../images/erqi/center/tuceng48.png" alt />
                  <div class="select">
                    <span>美国</span>
                    <img src="../../images/erqi/center/select.png" alt srcset />
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center">
          <div class="banner">
            <el-col :span="4">
              <div class="content-aside">
                <div class="user-avatar">
                  <img src="../../images/erqi/center/avatar.png" alt />
                  <p class="user-name">{{name}}</p>
                  <p class="user-class1">{{classInfo}}</p>
                  <p class="user-class">{{school?school:'北京私立汇佳学校-测试'}}</p>
                </div>
                <div class="aside-menus">
                  <ul>
                    <li v-for="(v, i) in menuList" :key="i" @click="onMenu(i,v.path)">
                      <div :class="{'menu-active':menuIndex === i}">
                        <img :src="menuIndex === i ? v.srca:v.src" alt srcset />
                        <span>{{ v.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <router-view></router-view>
            </el-col>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      menuIndex: 6,
      name:'',
      classInfo:'',
      school:'',
      menuList: [
        {
          name: "用户中心",
          src: require("../../images/erqi/center/tab1.png"),
          srca: require("../../images/erqi/center/tab1a.png"),
          path: ""
        },
        {
          name: "测评中心",
          src: require("../../images/erqi/center/tab2.png"),
          srca: require("../../images/erqi/center/tab2a.png"),
          path: "/students/home/assessmentCenterView"
        },
        {
          name: "课程中心",
          src: require("../../images/erqi/center/tab3.png"),
          srca: require("../../images/erqi/center/tab3a.png"),
          path: "/student/course/mycourse"
        },
        {
          name: "任务中心",
          src: require("../../images/erqi/center/tab4.png"),
          srca: require("../../images/erqi/center/tab4a.png"),
          path: "/student/task/received"
        },
        {
          name: "活动中心",
          src: require("../../images/erqi/center/tab7.png"),
          srca: require("../../images/erqi/center/tab7a.png"),
          path: "/students/activity/library"
        },
        {
          name: "成长档案",
          src: require("../../images/erqi/center/tab5.png"),
          srca: require("../../images/erqi/center/tab5a.png"),
          path: ""
        },
        {
          name: "全球数据库",
          src: require("../../images/erqi/center/tab6.png"),
          srca: require("../../images/erqi/center/tab6a.png"),
          path: "/students/profession/select"
        }
      ]
    };
  },
  created() {
    localStorage.setItem('lang','zh')
    let LocalStorage = this.$cache.localStorage
    let user =  JSON.parse(LocalStorage.get('loginuser')); 
    this.name = user.name;
    this.school = user.school.name
    this.classInfo = user.classInfo.name;
    this.getRoutePath();
  },
  watch: {
    $route() {
      this.getRoutePath();
    }
  },
  methods: {
    getRoutePath() {
      let path = this.$route.path;
      if (path.indexOf("/students/home/assessmentCenterView") > -1) {
        this.menuIndex = 1;
      } else if (path.indexOf("/students/activity") > -1) {
        this.menuIndex = 4;
      } else if (path.indexOf("/students/profession/select") > -1) {
        this.menuIndex = 6;
      }
    },
    onMenu(i, path) {
      this.menuIndex = i;
      if (path.includes("/student/")) {
        this.$router.replace(path);
      } else {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .banner {
    width: 1200px;
  }
  /deep/ .el-header {
    background-image: url("../../images/erqi/center/header.png");
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    .header-content {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      .head-left {
        display: flex;
        align-items: center;
      }
      .head-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        .img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .info {
          display: flex;
          align-items: center;
        }
        .area {
          display: flex;
          align-items: center;
          margin-left: 15px;
        }
        .select {
          padding: 0 8px;
          span {
            margin-right: 8px;
          }
          img {
            //  width: 10px;
            //  height: 10px;
          }
        }
      }
    }
  }

  /deep/ .el-main {
    padding: 0;
    overflow: visible;
    // margin: 0 auto;
    margin-top: -60px;
    // width: 903px;
    .content-aside {
      min-width: 133px;
      box-shadow: 0px 0px 6px 0px rgba(177, 79, 0, 0.07);
      border-radius: 6px;
      overflow: hidden;
      // margin-right: 14px;
      .user-avatar {
        text-align: center;
        background-image: url("../../images/erqi/center/avatarbgc.png");
        background-size: cover;
        img {
          display: inline-block;
          width: 60px;
          height: 60px;
          vertical-align: middle;
          background-color: #000;
          border-radius: 50%;
          margin: 22px 0 0 0;
        }
        .user-name {
          font-size: 16px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 11px;
          padding: 17px 0 8px 0;
        }
        .user-class1{
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 29px;
          opacity: 0.72;
        }
        .user-class {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 29px;
          opacity: 0.72;
          padding-bottom: 40px;
        }
      }
      .aside-menus {
        background-color: #fff;
        text-align: center;
        ul {
          padding: 20px 0 80px 0;
          li {
            font-size: 14px;
            font-weight: 400;
            color: #293e59;
            line-height: 23px;
            display: flex;
            justify-content: center;
            align-items: left;
            padding: 7px 0px;
            cursor: pointer;
            user-select: none;
            div {
              padding: 7px 20px;
              border-radius: 6px;
              font-size: 15px;
              font-weight: 400;
              color: rgba(99, 99, 99, 1);
              line-height: 28px;
              display: flex;
              align-items: center;
              white-space: nowrap;
              img {
                width: 15px;
                height: auto;
              }
              span {
                margin-left: 5px;
              }
              // &:hover {
              //   background-color: #ff8726;
              //   color: #fff;
              // }
            }
            .menu-active {
              background-color: #ff8726;
              color: #fff;
            }
            &:last-child div {
              padding-left: 37px;
            }
          }
        }
      }
    }
  }
  .content {
    margin: 0 0 100px 15px;
    // width: 726px;
    .tab-wrapper {
      background-color: #fff;
      box-shadow: 0px 0px 6px 0px rgba(177, 79, 0, 0.07);
      border-radius: 7px 7px 0 0;
      .tab {
        display: flex;
        li {
          cursor: pointer;
          list-style: none;
          position: relative;
          display: flex;
          justify-content: center;
          width: 15%;
          height: 60px;
          .active {
            position: absolute;
            background: #fff;
            top: -6px;
            left: 0;
            border-radius: 7px 7px 0 0;
            overflow: hidden;
            box-shadow: 6px -5px 9px -4px rgba(177, 79, 0, 0.4);
            height: 40px;
            width: 100%;
          }
          p {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            color: #666666;
            font-size: 14px;
            font-weight: bold;
            color: #666666;
            white-space: nowrap;
            height: 80%;
            text-align: center;
            background-color: #fff;
            border-radius: 7px 0 0 0;
          }
          .border {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              display: inline-block;
              width: 100%;
              height: 3px;
              background: rgba(255, 125, 38, 0.8);
              box-shadow: 0px 4px 4px 0px rgba(255, 134, 38, 0.75);
              border-radius: 1px;
            }
          }
        }
      }
    }
  }
}
</style>
