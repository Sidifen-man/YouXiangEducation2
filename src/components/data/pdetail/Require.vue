<template>
  <div class="pdetail-view">
    <div class="job-text">
      <div class="job-item">
        <h3 class="job-title">知识要求</h3>
        <ul>
          <li v-for="item in list.knowledge">
            <h3>{{item.class}}</h3>
            <p>
              {{item.desc}}
            </p>
          </li>
        </ul>
      </div>
      <div class="job-item">
        <h3 class="job-title">个性特点</h3>
        <ul>
          <li v-for="item in list.characteristic">
            <h3>{{item}}</h3>
          </li>
        </ul>
      </div>
      <div class="job-item">
        <h3 class="job-title">相关优势优点</h3>
        <ul>
          <li v-for="item in list.strengthTypes">
            <h3>{{item}}</h3>
          </li>
        </ul>
      </div>
      <div class="job-item">
        <h3 class="job-title">国内专业</h3>
        <ul>
          <li v-for="item in list.relatedMajor">
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </div>
      <div class="job-item">
        <h3 class="job-title">国外专业</h3>
        <ul>
          <li v-for="item in list.relatedMajorForeign">
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    list:''
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
  margin-top: 22px;
  .top-bar {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    span {
      margin-right: 10px;
    }
  }
  .job-text {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 100px;
    padding-top: 16px;
    .job-item {
      width: 270px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 20px 0px rgba(255, 135, 38, 0.1);
      border-radius: 8px;
      padding: 0 14px;
      box-sizing: border-box;
      padding-bottom: 15px;
      margin: 0 10px;
      margin-bottom: 30px;
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
          line-height: 20px;
        }
      }
    }
  }
}
</style>
