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
  name: "activity",
  data() {
    return {
      tabList: ["活动库", "优势打卡"],
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
      if (path.indexOf("library") > -1) {
        this.tabIndex = 0;
      } else if (path.indexOf("advantage") > -1) {
        this.tabIndex = 1;
      }else {
        this.tabIndex = 0;
      }
    },
    onTab(i) {
      this.tabIndex = i;
      if (i === 0) {
        this.$router.push("/students/activity/library");
      } else if (i === 1) {
        this.$router.push("/students/activity/advantage");
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
