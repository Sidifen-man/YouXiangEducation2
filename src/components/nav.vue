<template>
  <div class="nav">
    <ul class="nav-wrapper">
      <li
        class="nav-item cursor"
        :class="{act:navIndex === index}"
        v-for="(item,index) in navList"
        :key="index"
        @click="onRoute(index,item.path)"
      >
        <img v-if="navIndex === index" :src="item.actImg" alt srcset />
        <img v-else :src="item.disImg" alt srcset />
        <span :class="{actTitle:navIndex === index}">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    navList: {
      type: Array,
      require: true,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      navIndex: 3
    };
  },
  methods: {
    onRoute(i, path) {
      this.navIndex = i;
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
  border-radius: 6px;
  .nav-wrapper {
    .nav-item {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      img {
        width: 14px;
        height: 15px;
        margin-left: 18px;
        margin-right: 10px;
      }
      span {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .actTitle {
        color: #fff;
      }
    }
    .act {
      background: rgba(255, 135, 38, 1);
      border-radius: 6px;
    }
  }
}
</style>

