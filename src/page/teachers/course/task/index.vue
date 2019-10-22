<template>
  <div class="course">
    <aside :class="{'active':isNavShow}">
      <span @click="changeIsNavShow">
        <img src="../../../../assets/images/icon/icon_open_n.png" v-if="!isNavShow" alt>
        <img src="../../../../assets/images/icon/icon_open.png" v-else alt>
      </span>
      <div>
        <a
          :class="{'active':current==1,'over': over==1}"
          @click="toCurrent(1, '/teacher/task/received')"
          @mouseenter="addover(1)"
          @mouseleave="addover(0)"
        >
          <span>
            <img :src="t10" v-if="current==1">
            <img :src="t9" v-else>
          </span>
          <span>收到的任务</span>
        </a>
        <a
          :class="{'active':current==3,'over': over==3}"
          @click="toCurrent(3, '/teacher/task/sponsor')"
          @mouseenter="addover(3)"
          @mouseleave="addover(0)"
        >
          <span>
            <img :src="t7" v-if="current==3">
            <img :src="t6" v-else>
          </span>
          <span></span>
          <span>发起的任务</span>
        </a>
      </div>
    </aside>
    <section style="width: 1048px;">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import t6 from "@/assets/images/icon/t6.png";
  import t7 from "@/assets/images/icon/t7.png";
  import t9 from "@/assets/images/icon/t9.png";
  import t10 from "@/assets/images/icon/t10.png";
  export default {
    name: "TaskMain",
    data() {
      return {
        current: 1,
        over: 0,
        isNavShow: false,
        t6,
        t7,
        t9,
        t10
      };
    },
    created() {
      console.log(this.$router.currentRoute.fullPath);
      if (this.$router.currentRoute.fullPath.indexOf("sponsor") > 0) {
        this.current = 3;
      } else {
        this.current = 1;
      }
    },
    methods: {
      toCurrent(idx, torouter) {
        this.current = idx;
        this.$router.push(torouter);
      },
      addover(idx) {
        console.log(idx);
        this.over = idx;
      },
      changeIsNavShow() {
        this.isNavShow = !this.isNavShow;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .course {
    // width: 100%;
    height: calc(100% - 0.5rem);
    display: flex;
    aside {
      width: 1.28rem;
      transition: width 0.3s;
      padding-top: 0.3rem;
      margin: 0 0.1rem;
      & > span {
        display: block;
        width: 0.22rem;
        height: 0.14rem;
        margin-left: 0.1rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
      }
      div {
        a {
          display: block;
          width: 100%;
          height: 0.4rem;
          border-radius: 0.04rem;
          cursor: pointer;
          margin-bottom: 0.12rem;
          color: #666;
          overflow: hidden;
          background-color: #fff;
          position: relative;
          z-index: 3000;
          span {
            display: inline-block;
            vertical-align: middle;
            &:nth-child(1) {
              display: inline-block;
              width: 0.2rem;
              height: 0.2rem;
              margin: 0.1rem;
            }
          }
          &.active {
            background: linear-gradient(
                -90deg,
                rgba(255, 183, 38, 1),
                rgba(255, 129, 38, 1)
            );
            color: #fff;
          }
        }
      }
      &.active {
        width: 0.4rem;
        div a {
          // transition: all .1s;
          &.over {
            width: 1.24rem;
            transition: width 0.2s;
            overflow-x: visible;
            position: relative;
          }
        }
      }
    }
    & > section {
      flex: 1;
      height: 100%;
    }
  }
</style>
