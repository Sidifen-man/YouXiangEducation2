<template>
  <div class="pdetail">
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="top-crumb">
        <Breadcrumb :address="url" />
      </div>
      <!-- 职业详情 -->
      <div class="pro-container" style="padding: 0 15px;">
        <div class="top-bar">
          <span class="cover">
            <img v-if="list.industry" :src="require('../../../images/global/industry/industry_'+list.industry.id+'.png')" alt />
          </span>
          <span class="leader">{{list.name}}</span>
          <span class="label">
            <em v-if="list.industry">{{list.industry.name}}</em>
            <!-- <em>各行业</em> -->
          </span>
        </div>
        <div class="nav-list">
          <div>
            <ul>
              <li :class="{active: current_index == 1}" @click="current_index=1">
                <span>
                  <i class="icon">
                    <img v-show="current_index == 1" src="../../../images/global/icon2.png" alt />
                    <img v-show="current_index != 1" src="../../../images/global/icon2.png" alt />
                  </i>职业概述
                </span>
              </li>
              <li :class="{active: current_index == 2}" @click="current_index=2">
                <span>
                  <i class="icon">
                    <img v-show="current_index == 2" src="../../../images/global/icon4.png" alt />
                    <img v-show="current_index != 2" src="../../../images/global/icon4.png" alt />
                  </i>相关要求
                </span>
              </li>
              <li :class="{active: current_index == 3}" @click="current_index=3">
                <span>
                  <i class="icon">
                    <img v-show="current_index == 3" src="../../../images/global/icon3.png" alt />
                    <img v-show="current_index != 3" src="../../../images/global/icon3.png" alt />
                  </i>推荐实践活动
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="nav-container">
          <!-- 导航路由部分 -->
          <div class="nav-item" v-show="current_index == 1">
            <Index :list = "list"/>
          </div>
          <div class="nav-item" v-show="current_index == 2">
            <Require :list = "list"/>
          </div>
          <div class="nav-item" v-show="current_index == 3">
            <div class="p-text">
              <p>{{list.highSchool}}。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "../../../components/data/breadcrumb2";
import Index from "../../../components/data/pdetail/View";
import Require from "../../../components/data/pdetail/Require";
import surver from "api/http/t-gloData.js";
export default {
  data() {
    return {
      current_index: 1,
      url: {
        title: "全球数据库",
        onePath: "/teacher/profession/select",
        twoPath: {
          path: "/teacher/profession/select",
          text: "职业库"
        },
        text: "首席执行官"
      },
      list:''
    };
  },
  created() {
    const id = this.$route.params.id;
    this.getDetail(id)
  },
  methods: {
    getDetail(id){
      const param = {
        lang : this.$cache.localStorage.get('lang'),
        id : id
      }
      surver.careerDetail(param).then(res => {
        if(res.data.code=="success"){
           this.list = res.data.result;
           this.url.text = this.list.name;
        }else{
           this.$message.error(res.data.message);
        }
      })
    }
  },

  components: {
    Breadcrumb,
    Index,
    Require
  }
};
</script>

<style lang="less" scoped>
.pdetail {
  .content {
    background-color: #fff;
    padding: 0 15px;
    .top-crumb {
      padding-top: 5px;
      padding-left: 26px;
    }
  }
  .pro-container {
    margin-top: 40px;
    .top-bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > .cover {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed rgba(255, 135, 38, 1);
        border-radius: 50%;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .leader {
        font-size: 18px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        background: url("../../../images/global/leader.png") no-repeat left center;
        padding-left: 25px;
        margin-left: 20px;
      }
      .label {
        margin-left: 34px;
        em {
          font-style: normal;
          font-size: 14px;
          color: #999;
          margin-right: 5px;
        }
      }
    }

    .nav-list {
      padding: 5px;
      background-color: #fff;
      box-shadow: 3px 5px 30px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      margin-top: 35px;
      ul {
        height: 37px;
      }
      li {
        padding: 0 18px;
        height: 37px;
        text-align: center;
        line-height: 37px;
        font-size: 16px;
        color: #666;
        cursor: pointer;
        float: left;
        margin-right: 10px;
        span {
          img {
            vertical-align: -2px;
            margin-right: 5px;
          }
        }
        &.active {
          background-color: #ff8726;
          border-radius: 4px;
          color: #fff;
        }
      }
    }

    .nav-container {
      overflow: hidden;
      .nav-item {
        .p-text {
          box-shadow: 0px 2px 20px 0px rgba(255, 135, 38, 0.1);
          border-radius: 8px;
          padding: 30px 40px;
          font-size: 14px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          margin: 4px;
          margin-bottom: 230px;
          margin-top: 24px;
          position: relative;
          p {
            &:after {
              position: absolute;
              left: 20px;
              top: 40px;
              width: 6px;
              height: 6px;
              content: "";
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
