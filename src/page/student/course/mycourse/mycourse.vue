<template>
  <div class="mycourse" >
    <hgroup :class="{'active':isHidden}">
      <div>
        <span>我的任务</span>
        <span @click="goTrends">
          <img src="../../../../assets/images/icon/icon_task_close.png" alt="">
        </span>
      </div>
      <ul>
        <li style="cursor: pointer;" v-for="(item,index) in curTasklist"  @click="todo(item)":key="index">
          <h4 v-if="item.completeStatus=='0'" :class="item.taskInfo.acttype + '-task'">{{item.taskInfo.name}}</h4>
          <div  v-if="item.completeStatus=='0'">
            <p>截止时间：{{item.taskInfo.datetoStr}}</p>
            <p>发起人：{{item.taskInfo.sponsor.name}}</p>
          </div>
        </li>
      </ul>
      <var class="taskmore" v-show='!isHidden' @click="goTrends">查看更多</var>
    </hgroup>
    <section :class="{'center':1,'active':isHidden}">
      <div>
        <div>
          <img src="../../../../assets/images/icon/icon_mycourse.png" alt>
          <h2>我的课程</h2>
          <span :class="{active:isTab===0}" @click="changeTab(0)">当前课程</span>
          <span :class="{active:isTab===1}" @click="changeTab(1)">历史课程</span>
        </div>
        <section class='list'>
          <ul v-show='isTab===0'>
            <router-link  v-for="course in curCourseList" v-bind:key="course.id" :to="'mycourse/view/'+course.id" tag="li">
              <div  ><img :src="course.course.thumb" ></div>
              <h4  v-html="course.course.name">{{course.course.name}}</h4>
              <p>开始时间：{{course.dateFromString}}</p>
              <p>结束时间：{{course.dateToString}}</p>
            </router-link>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
          </ul>
          <ul v-show='isTab===1 && hisCourseList.length > 0'>

            <router-link v-for="course in hisCourseList" v-bind:key="course.id" :to="'mycourse/view/'+course.id"  tag="li">
              <div><img :src="course.course.thumb" :alt="course.course.name"></div>
              <h4>{{course.course.name}}</h4>
              <p>开始时间：{{course.dateFromString}}</p>
              <p>结束时间：{{course.dateToString}}</p>
            </router-link>

            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
            <li class="bai"></li>
          </ul>

          <ul v-show='isTab===1 && hisCourseList.length == 0'>

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


    <prediction-task :my-survey-detail="mySurveyDetail"  :edit-able="editAble" :state.sync="isShowTask"  @completeTask="completeTask" v-on:close="handlePredictionClose"></prediction-task>

    <content-task-detail  :state="contentTaskShow"  @completeTask="completeTask" :task-result-id="taskresultId" v-on:close="handleContentTaskClose" ></content-task-detail>

    <upload :state="uploadShow" :taskresult-id="taskresultId" @completeTask="completeTask" v-on:close="handleUploadClose" />

    <LoadingPage :isShowModal="loading"></LoadingPage>
  </div>
</template>

<script>


  import ContentTaskDetail from '../../../student/course/works/contentTaskDetail.vue'

  import EmptyPage from '../../../../components/empty/index.vue'
  import PredictionTask from '../../../teachers/course/prediction'
  import Upload from '../../../student/course/works/upload.vue'
  import LoadingPage from '../../../common/loadingPage.vue'

  import { myTaskResultAnswerDetailApi } from 'api/api'
  import { studentCourseListApi } from 'api/api'
  import { myTaskResultDetailApi } from 'api/api'



  import { myTaskListApi } from 'api/api'


  import axios from 'axios'

  export default {
    name: 'Mycourse',

    components:{

      PredictionTask,
      ContentTaskDetail,
      Upload,
      LoadingPage,
      EmptyPage
    },
    data() {
      return {


        contentTaskShow:false,

        isShowTask: false,
        myTasks:{},
        taskresultId:"",
        mySurveyDetail:{},
        editAble:false,
        uploadShow: false,

        loading: true,
        isHidden: false,
        isTab: 0,
        tasklist:[

        ],
        curCourseList:[],
        hisCourseList:[],
        curTasklist:[]
      }
    },
    created() {

      this.getCourseList()
      this.getHistoryCourseList()
      this.getMyTaskList()

    },
    methods: {


      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },

      completeTask (taskresultId){

        console.log("this.taskresultId === " + taskresultId)

        let curTasks = this.curTasklist


        if(curTasks){
          for (let j = 0; j < curTasks.length; j++) {
            let curTask = curTasks[j]
            if(curTask.id != null && curTask.id == taskresultId){

              curTask.completeStatus = '1'
              break;
            }
          }
        }

      },

      changeContentTaskDetail(taskresultId){

        this.taskresultId = taskresultId
        this.contentTaskShow = !this.contentTaskShow;
      },
      handleContentTaskClose(){

        this.taskresultId = ""
        this.contentTaskShow = !this.contentTaskShow;
      },

      handlePredictionClose(){
          this.mySurveyDetail = {}
        },
      changeUpload(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShow = !this.uploadShow;
      }
      ,

      openNewPage(urlPath){

        let routeData = this.$router.resolve({
          path: urlPath
        });
        window.open(routeData.href, '_blank');

        //window.open(window.location.origin + '/courseware/'+item.id+'?type=studentTask')
      },
    todo(item) {


      if(item.taskInfo.acttype == 'TEST'){
        this.getMyTaskResult(item.id, true)

      } else if(item.taskInfo.acttype == 'QA'){

        this.openNewPage("/questionnaire/true/" + item.id)

      } else if(item.taskInfo.acttype == 'BEST'){

      } else if(item.taskInfo.acttype == 'CONTENT'){

        this.changeContentTaskDetail(item.id)

      } else if(item.taskInfo.acttype == 'WORKSUPLOAD'){
        this.changeUpload(item.id)
      } else if(item.taskInfo.acttype == 'ATTENDEVAL'){

      }

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
            this.curTasklist = res.data.result.datalist


          } else {
            this.curTasklist = []
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);
        })

      },


      getCourseList(){
        let params = {
          type: '1'
        }

        let _this = this
        axios.post(studentCourseListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == 'success'){
            this.curCourseList = res.data.result.dataList
          } else {
            this.curCourseList = []
          }
          setTimeout(() => {
            _this.loading = false
          }, 500)

        })

      },

      getHistoryCourseList(){
        let params = {
          type: '2'
        }

        axios.post(studentCourseListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == 'success'){
            this.hisCourseList = res.data.result.dataList
          } else {
            this.hisCourseList = []
          }

        })

      },

      goTrends(){
        this.$router.push('/student/task')
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
  .mycourse {
    width: 100%;
    height: 100%;
    // overflow: auto;
    overflow: hidden;
    & > section {
      width: calc(100% - 2.22rem);
      height: 100%;
      /*border: 0.01rem solid rgba(228, 232, 237, 1);*/
      transition: width 0.3s;
      // padding-right: 2.22rem;
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
          > h2 {
            flex: 1;
            display: block;
            height: 0.2rem;
            text-indent: 0.4rem;
            position: relative;
            font-size: 0.18rem;
            font-weight: 600;
            // &:after {
            //   content: "";
            //   position: absolute;
            //   width: 0.18rem;
            //   height: 0.2rem;
            //   top: 0.25rem;
            //   left: 0.08rem;
            //   background: url("../../../../assets/images/icon/icon_mycourse.png") no-repeat;
            //   background-size: 100% 100%;
            // }
          }
        }
        & > section {
          padding-bottom: 0.3rem;
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
                // margin: auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              h4 {
                margin: 0.16rem 0.13rem 0.15rem;
                font-size: 0.15rem;
                font-weight: 600;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              p {
                display: block;
                height: 0.12rem;
                margin-left: 0.13rem;
                margin-bottom: 0.09rem;
                font-size: 0.12rem;
                line-height: 0.12rem;
                text-indent: 0.09rem;
                position: relative;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                &:after {
                  content: "";
                  display: block;
                  width: 0.04rem;
                  height: 0.04rem;
                  background-color: #56bf79;
                  position: absolute;
                  left: 0;
                  top: 0.03rem;
                }
                &:last-child:after {
                  background-color: #fa6464;
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


      & > ul > li:hover  .TEST-task{
        background-image: url("../../../../assets/images/icon/task1.png");
      }
      & > ul > li:hover .QA-task{
        background-image: url("../../../../assets/images/icon/task2.png");
      }
      & > ul > li:hover .BEST-task{
        background-image: url("../../../../assets/images/icon/task3.png");
      }
      & > ul > li:hover .CONTENT-task{
        background-image: url("../../../../assets/images/icon/task4.png");
      }
      & > ul > li:hover  .WORKSUPLOAD-task{
        background-image: url("../../../../assets/images/icon/task5.png");
      }

      & > ul > li {
        cursor:pointer;
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

          &.TEST-task {
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
          &.QA-task {
            background-image: url("../../../../assets/images/icon/task2-gray.png");
          }
          &.BEST-task {
            background-size: 0.14rem 0.16rem;
            background-image: url("../../../../assets/images/icon/task3-gray.png");
          }
          &.CONTENT-task {
            background-size: 0.16rem 0.14rem;
            background-position: 0.01rem 0;
            background-image: url("../../../../assets/images/icon/task4-gray.png");
          }
          &.WORKSUPLOAD-task {
            background-image: url("../../../../assets/images/icon/task5-gray.png");
          }

          &.icon-course {
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
          &.icon-test {
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
          &.icon-questionnaire {
            background-size: 0.14rem 0.16rem;
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
          &.icon-works {
            background-size: 0.16rem 0.14rem;
            background-position: 0.01rem 0;
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
          &.icon-clock {
            background-image: url("../../../../assets/images/icon/task1-gray.png");
          }
        }
        div {
          background-color: #f2f5f7;
          padding: 0.15rem 0.12rem 0.03rem;
          p {
            display: block;
            font-size: 0.12rem;
            /*line-height: 0.12rem;*/
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
    .center {
      padding-top: 0.14rem;
      .list {
        max-height: calc(100vh - 1.3rem);
        overflow: auto;
      }
    }
    .list {
      max-height: calc(100vh - 1.8rem);
      overflow: auto;
    }
  }


  .TEST-task{
    background-image: url("../../../../assets/images/icon/task1.png");
  }
  .QA-task{
    background-image: url("../../../../assets/images/icon/task2.png");
  }
  .BEST-task{
    background-image: url("../../../../assets/images/icon/task3.png");
  }
  .CONTENT-task{
    background-image: url("../../../../assets/images/icon/task4.png");
  }
  .WORKSUPLOAD-task{
    background-image: url("../../../../assets/images/icon/task5.png");
  }



</style>
