<template>
  <div class="content">
    <div class="tab-wrapper">
      <ul class="tab">
        <li v-for="(v, i) in tabList" :key="i" @click="onTab(i)">
          <span class="active" v-show="tabIndex === i"></span>
          <p :class="{ border: tabIndex === i }">{{ v }}</p>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tabList: ["班级动态","VIA优势测评", "ONet职业测评", "报告管理"],
      menuIndex: 1,
      tabIndex: 0
    };
  },
  created() {
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
      if (path.indexOf("assessmentCenter") > -1) {
        this.tabIndex = 1;
      } else if (path.indexOf("oNet") > -1) {
        this.tabIndex = 2;
      } else if (path.indexOf("reportManagement") > -1) {
        this.tabIndex = 3;
      } else if (path.indexOf("report") > -1) {
        this.tabIndex = 3;
      } else if (path.indexOf('classDynamic') > -1){
        this.tabIndex = 0;
      }
    },
    onTab(i) {
      this.tabIndex = i;
      if (i === 1) {
        this.$router.push("/teacher/assess/assessmentCenter");
      } else if (i === 2) {
        this.$router.push("/teacher/assess/oNet");
      } else if (i === 3) {
        this.$router.push("/teacher/assess/reportManagement");
      } else if(i === 0) {
        this.$router.push("/teacher/assess/classDynamic");
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
        list-style: none;
        position: relative;
        display: flex;
        justify-content: center;
        width: 15%;
        height: 60px;
        cursor: pointer;
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
            bottom: 5px;
            display: inline-block;
            width: 58px;
            height: 3px;
            right: 0;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 125, 38, 0.8);
            box-shadow: 3px 2px 3px 0px rgba(255, 134, 38, 0.75);
            border-radius: 1px;
          }
        }
      }
    }
  }
}
</style>
