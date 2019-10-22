<template>
  <div class="mycourse" >
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <hgroup :class="{'active':isHidden}">

      <div>
        <span>我的任务</span>
        <!-- <span @click="changeIsHidden"><img src="../../../../assets/images/icon/icon_task_close.png" alt=""></span> -->
        <span @click="goTrends"><img src="../../../../assets/images/icon/icon_task_close.png" alt=""></span>
      </div>

      <ul>
        <li  style="cursor: pointer;" v-for="(item,index) in curTasklist"  v-if="item.completeStatus =='0'"  @click="todo(item)" :key="index">
          <h4 :class="item.taskInfo.acttype + '-task'">{{item.taskInfo.name}}</h4>
          <div>
            <p>截止时间：{{item.taskInfo.datefromStr}}</p>
            <p>发起人：{{item.taskInfo.sponsor.name}}</p>
          </div>
        </li>
        <li  style="cursor: pointer;" v-for="(item,index) in curTasklist"  v-if="item.completeStatus =='1'" :key="index">
          <h4 :class="item.taskInfo.acttype + '-task'">{{item.taskInfo.name}}</h4>
          <div>
            <p>截止时间：{{item.taskInfo.datefromStr}}</p>
            <p>发起人：{{item.taskInfo.sponsor.name}}</p>
          </div>
        </li>
      </ul>

      <var class="taskmore" v-show='!isHidden' @click="goTrends">查看更多</var>

    </hgroup>

    <section :class="{'active':isHidden}">

      <div>

        <div>
          <h2>我的课程</h2>
          <span :class="{active:isTab===0}" @click="changeTab(0)">当前课程</span>
          <span :class="{active:isTab===1}" @click="changeTab(1)">历史课程</span>
        </div>

        <section class='list'>

          <ul v-show='isTab===0'>
            <router-link  v-for="course in curCourseList" v-bind:key="course.id" :to="'mycourse/view/'+course.id" tag="li">
              <div><img :src="course.course.thumb" ></div>
              <h4 v-html="course.course.name">{{course.course.name}}</h4>
              <p>开始时间：{{course.dateFromString}}</p>
              <p>结束时间：{{course.dateToString}}</p>
              <p>班级名称：{{course.classInfo.name}}</p>
            </router-link>

            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
          </ul>

          <ul v-show='isTab===1 && hisCourseList.length > 0'>

            <router-link  v-for="course in hisCourseList" v-bind:key="course.id" :to="'mycourse/view/'+course.id" tag="li">
              <div><img :src="course.course.thumb"  ></div>
              <h4 v-html="course.course.name">{{course.course.name}}</h4>
              <p>开始时间：{{course.dateFromString}}</p>
              <p>结束时间：{{course.dateToString}}</p>
              <p>结束时间：{{course.classInfo.name}}</p>
            </router-link>

            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
          </ul>
          <ul v-show="isTab===1 && hisCourseList.length == 0">

            <li>

              <empty-page  ></empty-page>
            </li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
          </ul>
        </section>
      </div>
    </section>
    <prediction-task :my-survey-detail="mySurveyDetail"  :edit-able="editAble" :state.sync="isShowTask" v-on:close="handlePredictionClose"></prediction-task>

    <upload v-if="uploadShow" :state="uploadShow" :taskresult-id="taskresultId" v-on:close="changeUpload" />
  </div>
</template>

<script>


  import EmptyPage from '../../../../components/empty/index.vue'

  import PredictionTask from '../prediction'
  import Upload from '../../../student/course/works/upload.vue'
  import LoadingPage from '../../../common/loadingPage.vue'
  import { teacherCourseListApi } from 'api/api'
  import { myTaskListApi } from 'api/api'


  import { myTaskResultDetailApi } from 'api/api'



  import axios from 'axios'

  export default {
    name: 'Mycourse',

    components:{
      PredictionTask,
    LoadingPage,
      EmptyPage,
      Upload
    },
    data() {
      return {

        mySurveyDetail:{},
        editAble:false,

        uploadShow:false,

        taskresultId:"",
        isShowTask: false,

        curCourseList:[],
        hisCourseList:[],
        curTasklist:[],

        loading: true,
        isHidden: false,
        isTab: 0,

        tasklist:[

        ]

      }

    },
    created() {

      this.getCourseList()
      this.getHistoryCourseList()
      this.getMyTaskList()


    },
    methods: {
      splitStringData (inputString, limitLength){//changeData是函数名
        return inputString;
        // if(inputString.length >　limitLength){
        //   return inputString.slice(0, limitLength) + '..'
        // } else {
        //   return inputString;
        // }
      },
      handlePredictionClose(){
        this.mySurveyDetail = {}
      },

      getMyTaskResult(taskResultId, editAble){
        this.loading = true;
        this.editAble = editAble

        let params = {

          taskResultId:taskResultId

        }
        // myTaskResultAnswerDetailApi

        if(editAble){

          axios.post(myTaskResultDetailApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.success
            if(code){
              console.log("==========================")
              // let myTasks = res.data.result.datalist
              this.mySurveyDetail = res.data.result

            } else {
              this.mySurveyDetail = {}
            }

            this.isShowTask = true

            setTimeout(() => {
              this.loading = false;
            }, 100);

          })
        } else {

          axios.post(myTaskResultAnswerDetailApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code
            if(code == "success"){
              console.log("==========================")
              // let myTasks = res.data.result.datalist
              this.mySurveyDetail = res.data.result

            } else {
              this.mySurveyDetail = {}
            }

            this.isShowTask = true

            setTimeout(() => {
              this.loading = false;
            }, 100);

          })
        }


      },
    todo(item) {


      if(item.taskInfo.acttype == 'TEST'){
          this.getMyTaskResult(item.id, true)

        } else if(item.taskInfo.acttype == 'QA'){
          this.$router.push({
            path: "/questionnaire/true/" + item.taskInfo.id
          });
        } else if(item.taskInfo.acttype == 'BEST'){

        } else if(item.taskInfo.acttype == 'CONTENT'){

        } else if(item.taskInfo.acttype == 'WORKSUPLOAD'){
          this.changeUpload(item.id)
        } else if(item.taskInfo.acttype == 'ATTENDEVAL'){

        }

      },
      changeUpload(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShow = !this.uploadShow;
      } ,

      getMyTaskList(){
        // myStartTaskApi
        this.loading = true

        let params = {
          acttype:"",
          completeStatus:"0",
          pageSize:10,
          pageNo:1,
          orderField:"",
          orderType:""

        }

        axios.post(myTaskListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == 'success'){
            console.log(res)
            this.curTasklist = res.data.result.datalist


          } else {
            this.curTasklist = []
          }

          setTimeout(() => {
            this.loading = false;
          }, 500);
        })

      },



      getCourseList(){
        let _this = this
        let params = {
          type: '1'
        }

        axios.post(teacherCourseListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == 'success'){
            if(res.data.result)this.curCourseList = res.data.result.datalist
            else this.curCourseList =[]
          } else {
            this.curCourseList = []
          }

          setTimeout(() => {
            _this.loading = false
          }, 100)
        })

      },

      getHistoryCourseList(){
        let params = {
          type: '2'
        }

        axios.post(teacherCourseListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == 'success'){
            if(res.data.result)this.hisCourseList = res.data.result.datalist
            else this.hisCourseList = []
          } else {
            this.hisCourseList = []
          }

        })

      },


      // goTrends(){
      //   this.$router.push('/teacher/task')
      // },

      goTrends(){
        this.$router.push('/teacher/task')
      },
      changeIsHidden() {
        this.isHidden = !this.isHidden
      },
      changeTab(num) {
        this.isTab = num
      },
      loadMore(){
      }
    }
  }
</script>

<style lang="scss" scoped>


  .TEST-task:after {
    background-image: url("../../../../assets/images/icon/task1.png");
  }
  .QA-task:after {
    background-image: url("../../../../assets/images/icon/task2.png");
  }
  .BEST-task:after {
    background-image: url("../../../../assets/images/icon/task3.png");
  }
  .CONTENT-task:after {
    background-image: url("../../../../assets/images/icon/task4.png");
  }
  .WORKSUPLOAD-task:after {
    background-image: url("../../../../assets/images/icon/task5.png");
  }



  .mycourse {
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > section {
      padding-top: 0.1rem;
      width: calc(100% - 2.22rem);
      height: 100%;
      /*border: 0.01rem solid rgba(228, 232, 237, 1);*/
      transition: width 0.3s;
      & > div {
        height: 100%;
        padding: 0 0.2rem;
        border-radius: 0.06rem;
        background-color: #fff;
        & > div {
          height: 0.7rem;
          line-height: 0.7rem;
          display: flex;
          position: relative;
          img {
            position: absolute;
            width: 0.18rem;
            height: 0.2rem;
            top: 50%;
            left: 0.05rem;
            transform: translateY(-50%);
          }
          h2 {
            flex: 1;
            display: block;
            height: 0.2rem;
            text-indent: 0.4rem;
            position: relative;
            font-size: 0.18rem;
            font-weight: 600;
            /*&:after {*/
            /*  content: "";*/
            /*  position: absolute;*/
            /*  width: 0.18rem;*/
            /*  height: 0.2rem;*/
            /*  top: 0.25rem;*/
            /*  left: 0.08rem;*/
            /*  background-image: url("../../../../assets/images/icon/icon_mycourse.png");*/
            /*}*/
          }
          span {
            display: block;
            width: 1rem;
            height: 0.32rem;
            font-weight: bold;
            line-height: 0.32rem;
            text-align: center;
            border-radius: 0.16rem;
            margin-top: 0.19rem;
            color: #666;
            cursor: pointer;
            position: relative;
            &:hover {
              color: #333;
            }
            &.active {
              color: #333;
              &:before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0.2rem;
                height: 0.04rem;
                margin-left: -0.1rem;
                background: linear-gradient(
                    -90deg,
                    rgba(255, 183, 38, 1),
                    rgba(255, 129, 38, 1)
                );
                border-radius: 0.02rem;
              }
            }
          }
        }
        & > section {
          // padding-bottom: 0.3rem;
          ul {
            display: flex;
            display: -webkit-flex;
            justify-content: space-around;
            flex-direction: row;
            flex-wrap: wrap;
            li {
              box-sizing: border-box;
              width: 2.6rem;
              height: 3.1rem;
              border-radius: 0.04rem;
              overflow: hidden;
              border: 0.01rem solid rgba(228, 232, 237, 1);
              margin-bottom: 0.15rem;
              padding-bottom: 0.03rem;
              cursor: pointer;
              > div {
                height: 2rem;
                width: 1.9rem;
                margin: 0 auto;
                position: relative;
              }
              img {
                max-width: 1.9rem;
                max-height: 2rem;
                height: auto;
                width: auto;
                // display: block;
                // margin: 0 auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

              }
              h4 {
                margin: 0.08rem 0.19rem 0.15rem;
                font-size: 0.15rem;
                font-weight: 600;
              }
              p {
                display: block;
                height: 0.12rem;
                margin-left: 0.19rem;
                margin-bottom: 0.09rem;
                font-size: 0.12rem;
                line-height: 0.12rem;
                text-indent: 0.09rem;
                position: relative;
                &:after {
                  content: "";
                  display: block;
                  width: 0.04rem;
                  height: 0.04rem;
                  background-color: #fa6464;
                  position: absolute;
                  left: 0;
                  top: 0.03rem;
                }
                &:nth-last-child(3):after {
                  background-color: #56bf79;
                }
              }
              &.bai {
                visibility: hidden;
                height: 0;
                margin: 0;
              }
            }
          }
        }
      }
      &.active {
        width: calc(100% - 0.14rem);
      }
    }
    hgroup {
      width: 2.1rem;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-bottom: 0.5rem;
      float: right;
      border-left: 0.01rem solid rgba(228, 232, 237, 1);
      transition: width 0.3s;
      background-color: #fff;
      & > div {
        padding: 0 0.2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background-image: url("../../../../assets/images/task_bg.png");
        display: flex;
        font-size: 0.18rem;
        color: #fff;
        font-weight: 600;
        & > span:first-child {
          flex: 1;
        }
        & > span:nth-child(2) {
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          margin-top: 0.23rem;
          cursor: pointer;
        }
      }
      & > ul > li {
        padding: 0.15rem 0.14rem 0 0.16rem;
        h4 {
          height: 0.16rem;
          line-height: 0.16rem;
          font-weight: 600;
          text-indent: 0.26rem;
          background-size: 0.16rem 0.16rem;
          margin-bottom: 0.15rem;
          background-position: 0 0;
          background-repeat: no-repeat;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &.icon-course {
            background-image: url("../../../../assets/images/icon/s8.png");
          }
          &.icon-test {
            background-image: url("../../../../assets/images/icon/s5.png");
          }
          &.icon-questionnaire {
            background-size: 0.14rem 0.16rem;
            background-image: url("../../../../assets/images/icon/s6.png");
          }
          &.icon-works {
            background-size: 0.16rem 0.14rem;
            background-position: 0.01rem 0;
            background-image: url("../../../../assets/images/icon/s7.png");
          }
          &.icon-clock {
            background-image: url("../../../../assets/images/icon/s9.png");
          }
        }
        div {
          background-color: #f2f5f7;
          padding: 0.15rem 0.12rem 0.03rem;
          p {
            display: block;
            font-size: 0.12rem;
            // line-height: 0.12rem;
            text-indent: 0.14rem;
            position: relative;
            color: #888;
            margin-bottom: 0.11rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:after {
              content: "";
              display: block;
              position: absolute;
              width: 0.04rem;
              height: 0.04rem;
              background-color: #c2c8cc;
              top: 0.03rem;
              left: 0;
            }
          }
        }
      }
      &.active {
        width: 0.44rem;
        height: 0.44rem;
        min-height: 0.44rem;
        padding-bottom: 0;
        margin-top: 0.28rem;
        background-color: transparent;
        border: none;
        & > div {
          width: 0.44rem;
          height: 0.44rem;
          padding: 0.1rem;
          text-align: center;
          border-radius: 50% 0 0 50%;
          span:nth-child(1) {
            display: none;
          }
          span:nth-child(2) {
            margin-top: 0;
            transform: rotate(180deg);
          }
        }
        ul {
          display: none;
        }
      }
      .taskmore {
        border: 0.01rem solid rgba(187, 187, 187, 1);
        border-radius: 0.16rem;
        font-size: 0.12rem;
        color: #999;
        width: 1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        display: block;
        margin: 0.3rem auto 0;
        cursor: pointer;
      }
    }
    .list {
      max-height: calc(100vh - 1.8rem);
      overflow: auto;
    }
  }
</style>
