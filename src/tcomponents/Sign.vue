<template>
  <div class="sign-dialog" v-show="is_show">
    <div class="main">
      <img class="close" @click="close" src="../images/img/close_icon.png" alt />
      <div class="content">
        <img :src="current.url" alt />
        <div class="sign-text">
          <h3>{{current.name}}</h3>
          <div class="desc">
            <p v-for="item in current.des">{{item}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: {},
      temp: {
        id: 1000,
        name: "未知错误",
        url: require("../images/sign/Gratitude.png"),
        des: ["出现未知错误"]
      }
    };
  },
  props: ["is_show"],
  methods: {
    setCurrent(obj) {
      obj.url = require('../images/sign/'+obj.type+'.png');
      obj.des = obj.description.split('。')
      this.current = obj;
      // 未找到
      if (!this.current.name) {
        this.current = this.temp;
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="less">
.sign-dialog {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 600px;
    height: 500px;
    position: relative;
    .close {
      position: absolute;
      right: 65px;
      top: -60px;
      width: 35px;
      cursor: pointer;
    }
    .content {
      width: 600px;
      height: 500px;
      border-radius: 25px;
      position: relative;
      overflow: hidden;
      > img {
        width: 100%;
        margin-top: 115px;
      }
      .sign-text {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        color: #fff;
        padding: 25px;
        background: url("../images/img/bg1.png") no-repeat;
        background-position: -22px -18px;
        h3 {
          font-size: 34px;
          font-weight: 800;
          padding-left: 75px;
        }
        .desc {
          margin-top: 30px;
        }
        p {
          font-size: 13px;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
