<template>
  <div class="breadcrumb">
    <div class="nowaddress"><img class="address" src="../../assets/images/student/breadcrumb_address.png" alt=""><span>当前位置：</span></div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: address.onePath }">任务中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: address.onePath }">我发起的任务</el-breadcrumb-item>
      <el-breadcrumb-item>{{address.text}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: "breadcrumb",
    props:["address"]
  };
</script>

<style lang="scss" scoped>
  .breadcrumb {
    margin-top: 0.1rem;
    font-weight:400;
    color:#666;
    font-size: .12rem;
    span,img{
      display: inline-block;
      vertical-align: middle;
    }
    .address{
      width: .16rem;
      height: .16rem;
      margin: 0 .13rem 0 .21rem;
    }
    .nowaddress {
      float: left;
    }
    .el-breadcrumb__inner, .el-breadcrumb__item, a {
      font-weight:400;
      color:#999;
    }
  }
  .breadcrumb /deep/ .el-breadcrumb__inner a:hover,.breadcrumb /deep/ .el-breadcrumb__inner.is-link:hover{
    color: #999 !important;
  }
  .breadcrumb /deep/ .el-breadcrumb__inner a,.breadcrumb /deep/ .el-breadcrumb__inner.is-link{
    color: #999;
  }
  .breadcrumb /deep/ .el-breadcrumb__inner{
    color: #999 !important;
    font-weight:400;
    font-family:MicrosoftYaHei;
    font-size: .12rem;
  }
</style>
