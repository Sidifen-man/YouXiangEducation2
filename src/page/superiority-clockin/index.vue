<template>
  <div class="g_main">
    <div class="superiority-clockin">
      <div class="superiority-clockin__main">
        <div class="main-header">
          <div class="header-title">
            <img :src="clockInIcon" alt="">
            <span>我的优势打卡</span>
          </div>
        </div>
        <div class="main-content"><router-view></router-view></div>
      </div>
      <div class="superiority-clockin__asider">
        <div class="asider-header">
          <div class="header-title">
            <img class="plain" :src="myPlain" alt="">
          </div>
        </div>
        <div class="asider-main">
          <ul class="activity-list">
            <li :class="{'is-active': active === index}" @click="handleClick(item,index)" class="activity-list-item" v-for="(item,index) in activityList">
              <div class="left"><img :src="item.thumbUrl" alt=""></div>
              <div class="right">
                <p class="title">{{item.title||item.name}}</p>
                <p class="tip">{{item.tip||'选中打卡'}}</p>
              </div>
            </li>
          </ul>
          <div class="asider-action">
            <button @click="customActivity">添加自定义活动</button>
            <button @click="goPlane">去活动库添加计划</button>
          </div>
        </div>
      </div>
    </div>
    <custom-activity-dialog ref="cuttomActivityDialog" @customeActivy="customeActivyList"></custom-activity-dialog>
  </div>
</template>
<script>
  import clockInIcon from 'assets/images/icon/s9.png';
  import activity3 from 'assets/images/superiority/activity-03.png';
  import activity2 from 'assets/images/superiority/activity-02.png';
  import activity1 from 'assets/images/superiority/activity-01.png';
  import activity4 from 'assets/images/superiority/activity-04.png';
  import myPlain from 'assets/images/superiority/my-plain.png'
  import CustomActivityDialog from './src/custom-activity-dialog.vue'
  
  import { getStudentActivityListApi } from 'api/api'
  import axios from 'axios'

  export default {
    components: {
      CustomActivityDialog
    },
    data () {
      return {
        isShowCustom: false,
        clockInIcon,
        myPlain,
        active: '',
        activityList: []
      }
    },
    created() {
      this.getActivityList()
    },
    methods:{
      handleClick(item, index) {
        this.active = index;
        let taskresultId = this.$route.query.taskresultId?this.$route.query.taskresultId:'';
        this.$router.push({
          path: '/superiority-clockin/question',
          query:{
            id: item.id,
            taskresultId: taskresultId
          }
        })
      },
      customActivity() {
        this.$refs.cuttomActivityDialog.show();
      },
      customeActivyList(data){
        this.activityList.unshift(data)
      },
      getActivityList(){
        this.loading = true;

        let params = {
        }

        axios.post(getStudentActivityListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            if(res.data.result){
              this.activityList = res.data.result
            }

          } else {
            this.activityList = []
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);
        })

      },
      goPlane(){
        window.open("http://resource.bestucareer.com:8788/#/activity/allActivity",'_blank')
      }
    }
  };
</script>
<style lang="scss" scoped>
  .g_main {
    width: 13.66rem;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.2rem 0.1rem 0.29rem 0.2rem;
    box-sizing: border-box;
  }
  .superiority-clockin {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .superiority-clockin__main {
    flex: 1;
    height: 100%;
    padding-top: 0.7rem;
    background-color: #fff;
    border:1px solid rgba(228,232,237,1);
    border-radius: 0.06rem;
    position: relative;
    .main-header {
      position: absolute;
      top: 0;
      left: 0;
      height: 0.7rem;
      line-height: 0.7rem;
      width: 100%;
      border-bottom: 1px solid rgba(228,232,237,1);
      padding-left: 0.3rem;
      box-sizing: border-box;
      .header-title {
        font-size:0;
        color:rgba(51,51,51,1);
        img {
          height: 0.2rem;
          width: 0.2rem;
          vertical-align: middle;
        }
        span {
          font-size: 0.18rem;
          font-weight:bold;
          color:rgba(51,51,51,1);
          height: 0.2rem;
          line-height: 0.2rem;
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.12rem;
        }
      }
    }
    .main-content {
      height: 100%;
      width: 100%;
      position: relative;
    }
  }

  .superiority-clockin__asider {
    width: 2.33rem;
    height: 100%;
    margin-left: 0.12rem;
    background-color: #fff;
    border: 1px solid rgba(228,232,237,1);
    display: flex;
    flex-direction: column;
    .asider-header {
      height: 0.71rem;
      line-height: 0.71rem;
      border-bottom: 1px solid rgba(228,232,237,1);
      color:rgba(51,51,51,1);
      font-size: 0.18rem;
      font-weight:bold;
      color:rgba(51,51,51,1);
      text-align: center;
      .header-title {
        border-bottom: 1px solid rgba(228,232,237,1);
      }
      .plain {
        width: 2.31rem;
        height: 0.7rem;
      }
    }
    .asider-main {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 0.16rem;
      flex: 1;
      .activity-list {
        flex: 1;
        overflow: auto;
        &::-webkit-scrollbar-thumb {
          background-color: rgba(247,151,39,0.2);
        }

        &::-webkit-scrollbar-thumb:window-inactive {
          background-color: rgba(247,151,39,0.2);
        }

        .activity-list-item {
          display: flex;
          padding: 0.15rem 0.5rem 0.15rem 0.11rem;
          cursor: pointer;
          .left {
            width: 0.79rem;
            height: 0.58rem;
            display: inline-block;
            img{
              width:100%;
            }
          }
          .right {
            word-break: break-all;
            height: 0.58rem;
            flex: 1;
            margin-left: 0.11rem;
            .title {
              color:rgba(51,51,51,1);
              line-height: 0.15rem;
              font-size: 0.13rem;
            }
            .tip {
              font-size: 0.12rem;
              color:rgba(153,153,153,1);
              margin-top: 0.12rem;
            }
          }
        }
        .activity-list-item.is-active {
          background:rgba(247,151,39,0.1);
        }
      }
      .asider-action {
        height: 1.3rem;
        padding-top: 0.11rem;
        button {
          display: block;
          height: 0.36rem;
          width: 1.41rem;
          border: 1px solid #F79727;
          background-color: #fff;
          cursor: pointer;
          border-radius: 0.18rem;
          font-size: 12px;
          outline: none;
          margin: 0 auto;
          color: #F79727;
          margin-top: 0.11rem;
          line-height: 0.34rem;
        }
        button:last-child {
          color: #999;
          border-color: #bbb;
        }
      }
    }
  }
</style>



