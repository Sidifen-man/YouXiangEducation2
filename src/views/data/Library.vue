<!-- 活动库 -->
<template>
  <div class="library">
    <div class="auto-left">
      <div class="libNav">
        <comNav :navList="navList"></comNav>
      </div>
    </div>
    <div class="auto-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import comNav from "../../components/nav";
export default {
  data() {
    return {
      navList: [
        {
          name: "我的活动计划",
          path: "myActivityPlan",
          actImg: require("../../images/tabimg/oneact.png"),
          disImg: require("../../images/tabimg/onedis.png")
        },
        {
          name: "本校库活动",
          path: "school_detail",
          actImg: require("../../images/tabimg/twoact.png"),
          disImg: require("../../images/tabimg/twodis.png")
        },
        {
          name: "BestU活动",
          path: "Bestur",
          actImg: require("../../images/tabimg/threeact.png"),
          disImg: require("../../images/tabimg/threedis.png")
        },
        {
          name: "自定义活动",
          path: "AutoActivi",
          actImg: require("../../images/tabimg/fouract.png"),
          disImg: require("../../images/tabimg/fourdis.png")
        },
        {
          name: "收藏夹",
          path: "Favorites",
          actImg: require("../../images/tabimg/fiveact.png"),
          disImg: require("../../images/tabimg/fivedis.png")
        }
      ]
    };
  },

  components: {
    comNav
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.library {
  display: flex;
  background-color: #fff;
  .auto-left {
    width: 204px;
    display: flex;
    justify-content: center;
    .libNav {
      width: 160px;
      background: rgba(255, 255, 255, 1);
    }
  }
  .auto-right {
    flex: 1;
  }
}
</style>