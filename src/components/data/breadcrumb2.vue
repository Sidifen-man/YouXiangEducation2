<template>
  <div class="breadcrumb">
    <div>
      <img class="address" src="../../images/breadcrumb_address.png" alt />
      <span class="location">当前位置：</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: address.onePath }">{{address.title}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: address.twoPath.path }">
          {{
          address.twoPath.text
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="address.threePath && address.threePath.path"
          :to="{ path: address.threePath.path }"
        >
          {{
          address.threePath.text
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ address.text }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="goBack" @click="back">
      <img src="../../images/img/back.png" alt class="back" />
      <p>&nbsp;&nbsp;返回</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: {
        title: "测评中心",
        onePath: "/assessmentCenter/assessmentCenterView",
        twoPath: {
          path: "/assessmentCenter/assessmentCenterView",
          text: "VIA优势测评"
        },
        threePath: {
          path: "",
          text: ""
        },
        text: "了解更多"
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  /deep/ .el-breadcrumb__inner {
    font-size: 13px;

    a {
      font-weight: 400;
      color: #666;
    }

    &.is-link {
      font-weight: 400;
      color: #666;
    }
  }

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .address {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .location {
    margin-right: 13px;
  }
  span {
    font-size: 13px;
    color: #666;
  }
  .goBack {
    cursor: pointer;
    // margin-top: -103px;
  }
}
</style>
