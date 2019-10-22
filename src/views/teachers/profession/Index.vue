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
    <router-view style="margin-top:-10px;"></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tabList: ["职业库", "专业库", "大学库"],
      menuIndex: 5,
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
      if (path.indexOf("select") > -1) {
        this.tabIndex = 0;
      } else if (path.indexOf("discipline") > -1) {
        this.tabIndex = 1;
      } else if (path.indexOf("university") > -1) {
        this.tabIndex = 2;
      } else if (path.indexOf("dataCourse") > -1) {
        this.tabIndex = 3;
      }
    },
    onTab(i) {
      this.tabIndex = i;
      if (i === 0) {
        this.$router.push("/teacher/profession/select");
      } else if (i === 1) {
        this.$router.push("/teacher/profession/discipline");
      } else if (i === 2) {
        this.$router.push("/teacher/profession/universityLibrary");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 0 100px 15px;
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
        width: 142px;
        height: 72px;
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
          height: 60%;
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
            left: -8px;
            width: 58px;
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
</style>
