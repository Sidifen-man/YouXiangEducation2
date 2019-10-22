<template>
  <div class="dataCourse">
    <el-row :gutter="10">
      <el-col :span="6" style="padding:0;width:200px;">
        <div class="tab-title">
          <img src="../../images/data/course/course.png" alt />
          <span>我的选课计划</span>
        </div>
        <ul class="tab">
          <li
            :class="activeIndex===item.index?'active':''"
            v-for="(item,i) in list"
            :key="i"
            @click="onTabClick(item.index)"
          >{{item.title}}</li>
        </ul>
      </el-col>
      <el-col :span="10" style="padding-left:18px;">
        <template>
          <div v-show="!activeIndex">
            <Tab />
          </div>
          <div v-show="activeIndex===1">
            <Tab1 />
          </div>
          <div v-show="activeIndex===2">
            <Tab2 />
          </div>
          <div v-show="activeIndex===3">
            <Tab3 />
          </div>
          <div v-show="activeIndex===4">
            <Tab4 />
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tab from "@/components/data/course/Tab";
import Tab1 from "@/components/data/course/Tab1";
import Tab2 from "@/components/data/course/Tab2";
import Tab3 from "@/components/data/course/Tab3";
import Tab4 from "@/components/data/course/Tab4";
export default {
  components: {
    Tab,
    Tab1,
    Tab2,
    Tab3,
    Tab4
  },
  data() {
    return {
      activeIndex: 0,
      list: [
        {
          title: "新高考选修科目",
          index: 1
        },
        {
          title: "AP课程科目",
          index: 2
        },
        {
          title: "IB课程科目",
          index: 3
        },
        {
          title: "A-level课程科目",
          index: 4
        }
      ]
    };
  },
  created(){
  },
  methods: {
    onTabClick(i) {
      console.log(i);
      this.activeIndex = i;
    },
  }
};
</script>

<style lang="less" scoped>
.dataCourse {
  background-color: #fff;
  height: 100%;
  padding: 0 28px;
  padding-bottom: 93px;
  .tab-title {
    border-radius: 6px;
    width: 200px;
    height: 36px;
    background: rgba(255, 135, 38, 1);
    border-radius: 6px 6px 0px 0px;
    text-align: center;
    line-height: 36px;
    span,
    img {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
    }
    img {
      width: 18px;
      height: 16px;
      margin-right: 8px;
    }
  }
  .tab {
    width: 200px;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 1;
    padding-bottom: 4px;
    box-sizing: border-box;
    li {
      height: 38px;
      width: 200px;
      line-height: 38px;
      padding-left: 25px;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      &.active {
        background: rgba(248, 248, 248, 1);
        color: #ff8726;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 4px;
          height: 38px;
          background: rgba(255, 135, 38, 1);
          top: 0;
          left: 0;
        }
      }
    }
  }
}
</style>