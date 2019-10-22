<template>
  <div class="pdetail-view">
    <div class="top-bar">
      <span>霍兰德代码{{list.hldCode}}</span>
      <span>教育水平要求{{list.eduLevel}}</span>
    </div>
    <div class="pro-text">
      <div class="common-item">
        <h3>职业定义</h3>
        <div class="text">
          <p>{{list.define}}</p>
        </div>
      </div>
      <div class="common-item">
        <h3>日常工作</h3>
        <div class="text text2">
          <p v-for="itm in list.daily" >{{itm}}</p>
        </div>
      </div>
    </div>
    <div class="job-text">
      <div class="job-item">
        <h3 class="job-title">工作特点</h3>
        <ul>
          <li v-for="item in list.feature ">
            <h3>{{item.class}}</h3>
            <p>{{item.desc}}</p>
          </li>
         
        </ul>
      </div>
      <div class="job-item">
        <h3 class="job-title">其它相关职业</h3>
        <ul>
          <li>
            <h3>教育行政人员，小学和中学</h3>
          </li>
          <li>
            <h3>营养师和营养学家</h3>
          </li>
          <li>
            <h3>社会和社区服务经理</h3>
          </li>
          <li>
            <h3>教育管理者、教育</h3>
          </li>
          <li>
            <h3>首席执行官</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    list:'',
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.pdetail-view {
  .top-bar {
    margin-top: 32px;
    margin-bottom: 19px;
    font-size: 14px;
    color: #333;
    span {
      margin-right: 10px;
    }
  }
  .pro-text {
    .common-item {
      background: rgba(247, 249, 252, 1);
      border-radius: 8px;
      padding: 15px 0;
      margin-bottom: 20px;
      > h3 {
        font-size: 16px;
        height: 16px;
        color: #333;
        font-weight: bold;
        border-left: 4px solid #fc7927;
        padding-left: 12px;
        font-family: PingFang-SC-Heavy;
      }
      > .text {
        line-height: 23px;
        padding-left: 36px;
        margin-top: 18px;
        color: #9fa6b0;
        &.text2 {
          line-height: 28px;
        }
      }
    }
  }
  .job-text {
    display: flex;
    justify-content: center;
    padding-bottom: 100px;
    padding-top: 16px;
    .job-item {
      width: 300px;
      margin: 0 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 20px 0px rgba(255, 135, 38, 0.1);
      border-radius: 8px;
      padding: 0 14px;
      box-sizing: border-box;
      padding-bottom: 15px;
      .job-title {
        font-size: 18px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(255, 135, 38, 1);
        line-height: 48px;
        text-align: center;
        border-bottom: 1px solid #ffa75c;
      }
      ul {
        padding-left: 25px;
      }
      li {
        margin-top: 18px;
        h3 {
          font-size: 14px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            left: -17px;
            top: 50%;
            transform: translateY(-3px);
            width: 6px;
            height: 6px;
            background: #fc7927;
            border-radius: 50%;
          }
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 28px;
        }
      }
    }
  }
}
</style>
