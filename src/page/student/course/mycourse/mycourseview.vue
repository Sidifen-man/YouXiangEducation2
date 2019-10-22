<template>
  <div class="mycourseview">
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <breadcrumb :address='address' />

    <div class="view">
      <div class="des">
        <el-row>
          <el-col :span="24">
            <el-row :gutter="30">
              <el-col :span="6">
                <div class="workimg">
                  <img width="188" height="198" :src="courseDetail.imgPath" />
                </div>
              </el-col>
              <el-col :span="18">
                <div class="workdes">
                  <h3 v-html="courseDetail.classCourseName"></h3>
                  <p v-if="!desState" >
                    {{fitlerdes()}}
                    <var v-if="(courseDetail.classCourseDesc+'').length >　135"  @click="()=>{this.desState = true}">查看详情</var>
                  </p>
                  <p v-if="desState">
                    {{courseDetail.classCourseDesc }}
                    <var v-if="(courseDetail.classCourseDesc+'').length >　135"  @click="()=>{this.desState = false}">收起详情</var>
                  </p>
                  <div>
                    <span>开始时间： {{courseDetail.startTime}}</span>
                    <span>结束时间： {{courseDetail.endTime}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="workList">
        <el-row :gutter="10" v-for="(item, index) in courseDetail.classChapters" :key="item.id">
          <el-col :span="12">
            <div class="li nowork" v-if="item.blockStatus == '0'">
              <h4>第{{index + 1}}课时：{{item.name}}</h4>
              <div class="icon_no" >
                <div>
                  <i></i>
                  <span>已禁用课件</span>
                </div>
              </div>
            </div>

            <div class="li liLeft" v-if="item.blockStatus == '1'">
              <h4>第{{index + 1}}课时：{{item.name}}</h4>
              <div class="workdes">
                <span v-if="item.coursewareStatus != '1'"  ><b></b>{{item.attachname | filterWord}}<i ></i></span>
                <span v-else style="cursor: pointer;" @click="openNewPage('/courseware/'+item.id+'?type=studentTask')"><b></b>{{item.attachname | filterWord}}</span>

                <var v-if="item.coursewareStatus=='1'" @click="openNewPage('/courseware/'+item.id+'?type=studentTask')">查看课件 ></var>
                <var v-else>&nbsp;</var>
              </div>
              <div class="myteam" @click="changeTeam(item.id)">
                <span class="i">我的小组</span>
                <span >查看 ></span>
              </div>
            </div>

          </el-col>
          <el-col :span="12">
            <div class="li">
              <h4>相关任务</h4>

              <div class="tasks">
                <ul>
                  <li v-for='(task, taskIndex) in item.taskShowList' :key='taskIndex'>
                    <el-row>
                      <el-col :span="11">
                        <h5 :class="task.acttype + '-task'">{{splitStringData(task.name,11)}}</h5>
                      </el-col>
                      <el-col :span="7">
                        <small v-if="task.datetoStr!=null">截止时间：{{task.datetoStr}}</small>
                        <small v-if="task.datetoStr==null">&nbsp;</small>
                      </el-col>
                      <el-col :span="6">
                        <span v-if="task.completeStatus == null || task.completeStatus==''">未开始</span>
                        <span @click="showDetail(task)" v-if="task.completeStatus =='1'">查看结果</span>
                        <span @click="todo(task)" v-if="task.completeStatus=='0'">去完成 ></span>
                      </el-col>
                    </el-row>
                  </li>
                </ul>

                <div v-if="item.isShowMore" @click="showMoreTask(item)" class="tasksall">查看全部<i >》</i></div>
                <div v-if="item.isShowUnMore"  @click="unShowMoreTask(item)"class="tasksall icon">收取全部<i >》</i></div>

              </div>
            </div>
          </el-col>
        </el-row>

      </div>

    </div>

    <prediction-task :my-survey-detail="mySurveyDetail"    :edit-able="editAble" :state.sync="isShowTask" @completeTask="completeTask" v-on:close="handlePredictionClose"></prediction-task>
    <upload-result v-if="uploadShowHistory" :state="uploadShowHistory" :taskresult-id="taskresultId"  @completeTask="completeTask" v-on:close="handleUploadHistoryClose" />

    <upload v-if="uploadShow" :state="uploadShow" :taskresult-id="taskresultId" @completeTask="completeTask" v-on:close="handleUploadClose" />

    <content-task-detail   :state="contentTaskShow"  @completeTask="completeTask" :task-result-id="taskresultId" v-on:close="handleContentTaskClose" :contentTask.sync="contentTask"></content-task-detail>

    <team :state="teamShow" v-on:close="changeTeam" :class-chapter-id="classChapterId" />
     <!-- 优势打卡评价，已完成状态 弹框 -->
    <punch-card :state="isShowPanchCard"  :status="punchStatus" @close="parentClose"  :taskresultId="taskresultId"  :ATTENDEVAL="ATTENDEVAL"></punch-card>
  </div>
</template>

<script>
  import PredictionTask from '../../../teachers/course/prediction'
  import Upload from '../../../student/course/works/upload.vue'
  import PunchCard from "@/components/advantagePunchCard";
  import UploadResult from '../../../student/course/works/uploadResult.vue'
  import ContentTaskDetail from '../../../student/course/works/contentTaskDetail.vue'

  import LoadingPage from '../../../common/loadingPage.vue'



  import { myTaskResultDetailApi } from 'api/api'
  import { studentCourseDetailApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'




  import axios from 'axios'


  import breadcrumb from '@/components/common/breadcrumb.vue'
  import team from './team.vue'
  import breadcrumb_address from 'assets/images/student/breadcrumb_address.png'
  import workimg from 'assets/images/student/workimg.png'

  export default {
    name: "MyCourseView",
    components: {
      PredictionTask,
      Upload,
      UploadResult,
      breadcrumb,
      team,
      LoadingPage,
      ContentTaskDetail,
      PunchCard
    },
    data() {
      return {
        classChapterId:"",
        contentTaskShow:false,
        contentTask:false,
        curItem:{},
        isShowTask: false,
        myTasks:{},
        taskresultId:"",
        mySurveyDetail:{},
        editAble:false,
        uploadShow: false,

        uploadShowHistory:false,

        classCourseId:"",
        courseDetail:{},
        loading: true,
        workimg: "",
        teamShow: false,
        // data: [1, 2, 3, 4, 5, 6, 7],
        data: [],
        computedData:[],
        desState: false,
        isShowPanchCard:false,
        ATTENDEVAL:false,
        punchStatus:'3',
        address:{
        }
      };
    },
    created() {
      this.getCourseDetail()
    },
    filters:{
      filterWord(val){
        if(val && val.length>28){
          return val.substring(0,28)+'...'
        }else{
          return val
        }
        
      }
    },
    methods: {
      completeTask (taskresultId){
        let curChapters = this.courseDetail.classChapters
        for (let i = 0; i < curChapters.length; i++) {
          let curTasks = curChapters[i].taskShowList
          let innerBreak = false;
          if(curTasks){
            for (let j = 0; j < curTasks.length; j++) {
              let curTask = curTasks[j]
              if(curTask.taskresultId != null && curTask.taskresultId == taskresultId){
                curTask.completeStatus = '1'
                innerBreak = true
                break;
              }
            }
          }
          if(innerBreak){
            break;
          }
        }
      },
      parentClose() {
        this.isShowPanchCard = false;
      },
      handlePredictionClose(){
        this.mySurveyDetail = {}
      },
      showDetail(item) {
        if(item.acttype == 'TEST'){
          this.getMyTaskResult(item.taskresultId,false)
        } else if(item.acttype == 'QA'){
          this.openNewPage("/questionnaire/false/" + item.taskresultId)
        } else if(item.acttype == 'BEST'){
            this.taskresultId = item.taskresultId;
            this.isShowPanchCard = true;
            this.ATTENDEVAL = false;
            this.punchStatus = '3';
        } else if(item.acttype == 'CONTENT'){
          this.changeContentTaskDetail(item.taskresultId)
        } else if(item.acttype == 'WORKSUPLOAD'){
          this.changeUploadHistory(item.taskresultId)
        } else if(item.acttype == 'ATTENDEVAL'){
        }
      },
      changeUploadHistory(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShowHistory = !this.uploadShowHistory;
      },
      changeContentTaskDetail(taskresultId){
        this.taskresultId = taskresultId
        this.contentTask = !this.contentTask
        this.contentTaskShow = !this.contentTaskShow;
      },
      handleContentTaskClose(){
        this.taskresultId = ""
        this.contentTask = !this.contentTask
        this.contentTaskShow = !this.contentTaskShow;
      },
      handleUploadHistoryClose(){
        this.taskresultId = ""
        this.uploadShowHistory = !this.uploadShowHistory;
      },
      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },
      // contentTaskShow
      changeUpload(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShow = !this.uploadShow;
      }
      ,
      todo(item) {
        if(item.acttype == 'TEST'){
          this.getMyTaskResult(item.taskresultId, true)
        } else if(item.acttype == 'QA'){
          this.openNewPage("/questionnaire/true/" + item.taskresultId)
        } else if(item.acttype == 'BEST'){
          this.$router.push({path:'/superiority-clockin/empty',query:{taskresultId: item.taskresultId}})
        }else if(item.acttype == 'CONTENT'){
          // teamShow
          this.changeContentTaskDetail(item.taskresultId)
        } else if(item.acttype == 'WORKSUPLOAD'){
          this.changeUpload(item.taskresultId)
        } else if(item.acttype == 'ATTENDEVAL'){
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
            let code = res.data.code
            if(code=='success'){
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
      openNewPage(urlPath){

        let routeData = this.$router.resolve({
          path: urlPath
        });
        window.open(routeData.href, '_blank');
        //window.open(window.location.origin + '/courseware/'+item.id+'?type=studentTask')
      },
      getCourseDetail(){
        this.classCourseId = this.$route.params.classCourseId
        let _this = this;
        let params = {
          classCourseId: this.classCourseId
        }
        axios.post(studentCourseDetailApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            this.courseDetail = res.data.result
            this.address.text = this.courseDetail.classCourseName
            for(let i=0; i<this.courseDetail.classChapters.length;i++){
              let taskList = this.courseDetail.classChapters[i].classChapterTaskInfoList
              if(taskList && taskList.length > 3){
                this.$set(this.courseDetail.classChapters[i],'isShowMore',true)
                this.$set(this.courseDetail.classChapters[i],'isShowUnMore',false)
                this.$set(this.courseDetail.classChapters[i], 'taskShowList',this.deepCloneUtil(taskList.slice(0,3)))
              }else {
                this.$set(this.courseDetail.classChapters[i],'isShowMore',false)
                this.$set(this.courseDetail.classChapters[i],'isShowUnMore',false)
                this.$set(this.courseDetail.classChapters[i], 'taskShowList',taskList ? this.deepCloneUtil(taskList) : null)
              }
            }
          } else {
            this.courseDetail = {}
          }
          setTimeout(() => {
            _this.loading = false;
          }, 500);
        })
      },
      goTrends(){
        this.$router.push('/student/task')
      },
      showMoreTask(item){
        let taskList = item.classChapterTaskInfoList
        if(taskList && taskList.length > 3){
          item.isShowMore = false
          item.isShowUnMore = true
          item.taskShowList = taskList
        }
      },
      unShowMoreTask(item){
        let taskList = item.classChapterTaskInfoList
        if(taskList && taskList.length > 3){
          item.isShowMore = true
          item.isShowUnMore = false
          item.taskShowList = taskList.slice(0,3)
        }
      },
      changeTeam(classChapterId) {
        this.classChapterId = classChapterId
        this.teamShow = !this.teamShow;
      },
      fitlerdes() {
        let text = this.courseDetail.classCourseDesc + "";

        if(text.length >　135){
          return this.desState ? text : text.slice(0, 133) + '...'
        } else {
          return text;
        }
      },
      computedtaskList(){
        let data = this.data
        for(let i=0;i<data.length;i++){
          if(data[i].taskList.length>3){
            data[i].showMore = 1
            data[i].taskListStr = data[i].taskList.slice(0,3)
          }else{
            data[i].taskListStr = data[i].taskList
            data[i].showMore = 0
          }
        }
        this.computedData = data
      },
      searchMore(item){

        let list = this.computedData
        for(let i=0; i<list.length;i++){
          if(list[i].id === item.id){
            list[i].taskListStr = list[i].taskList
            list[i].showMore = 0
          }
        }
        this.computedData = list
      },
    }
  };
</script>

<style lang="scss" scoped>
  .mycourseview {
    height: calc(100% - 0.1rem);
    .view {
      margin-top: 0.15rem;
      height: calc(100% - 0.29rem);
      overflow-y: auto;
      overflow-x: hidden;
      .des,
      .li {
        margin: 0;
        background: #fff;
        border: 0.01rem solid rgba(228, 232, 237, 1);
        border-radius: 0.05rem;
        padding: 0.2rem 0.1rem;
        margin-bottom: 0.1rem;
      }
      .workimg {
        width: 1.88rem;
        height: 1.98rem;
        margin: 0 auto;
        img{
          width:100%;
          height:100%;
        }
      }
      .workdes {
        margin-right: 0.2rem;
        h3 {
          font-size: 0.2rem;
          color: rgba(51, 51, 51, 1);
          margin-top: 0.15rem;
        }
        i {
          width: 0.14rem;
          height: 0.16rem;
          display: inline-block;
          margin-left: 0.1rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAIAAACp9tltAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQUJBQUVERjU1MjUxMUU5QTYxNUQwNDcyRkI4RjdGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQUJBQUVFMDU1MjUxMUU5QTYxNUQwNDcyRkI4RjdGMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNBQkFBRURENTUyNTExRTlBNjE1RDA0NzJGQjhGN0YyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNBQkFBRURFNTUyNTExRTlBNjE1RDA0NzJGQjhGN0YyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+o17PgQAAAR1JREFUeNqEkU9PwkAQxbtrFYzY0lrBFEUDMcSEk98/wU/gxYMhxoSUWkot/ZfWFml3GV1ssN2Ed5mZN7/DmwyiWSD8ael6puVEcQK91Dq71jtdTS23qESn78bcWl4osqbKMLpeuPLDG707GvYZILLiuD5wD/d3vatL5gD0YX++vs0U+byjKeBgtjAXjtqWSo4JRjBN22HjDk2+0rbUEmoCM07Sf2hBCMa4joJJCNmd5dmGYcHp4WnzpNloVNBsvU6zbzgUoqOnyWST58IhHYsirnOQr54bMLFiqYr0OB5B8/wy9YJof1VF801BKf1p8qKyqqLw1ZUfseYA+ivKvYyDzuYLPooQYuFKBVHM/QUe3vaOeH/aFwCDvr4VYAB1gXV5pjsWyAAAAABJRU5ErkJggg==)
          top left no-repeat;
          background-size: 100% 100%;
        }

        p {
          font-size: 0.14rem;
          color: rgba(136, 136, 136, 1);
          line-height: 0.24rem;
          margin-top: 0.25rem;
          var {
            color: #f79727;
            cursor: pointer;
            margin-top: 0.1rem;
          }
        }
        div {
          background: rgba(245, 246, 247, 1);
          border-radius: 0.02rem;
          padding: 0.05rem 0.1rem;
          margin-top: 0.15rem;
          span {
            display: block;
            color: rgba(51, 51, 51, 0.8);
            margin: 0.1rem 0 0.1rem 0.13rem;
            font-size: 0.14rem;
            line-height: 0.2rem;
            text-indent: 0.09rem;
            position: relative;
            &:after {
              content: "";
              display: block;
              width: 0.04rem;
              height: 0.04rem;
              background-color: #f79727;
              position: absolute;
              left: 0;
              top: 0.07rem;
            }
          }
        }
        var {
          cursor: pointer;
        }
      }
      .workList {
        height: 3.6rem;
        .li {
          padding:0.15rem;
          min-height: 2.14rem;
        }
        .liLeft{
          padding: 0.19rem 0.15rem 0.2rem;
        }
        h4 {
          font-size: 0.16rem;
          color: rgba(51, 51, 51, 1);
          text-indent: 0.15rem;
          position: relative;
          margin-bottom: 0.2rem;
          font-weight: bold;
          &:after {
            content: "";
            display: block;
            width: 0.05rem;
            height: 0.05rem;
            background-color: #f79727;
            border-radius: 100%;
            position: absolute;
            left: 0;
            top: 0.06rem;
          }
        }
        .workdes {
          background: rgba(255, 248, 240, 1);
          padding: 0.2rem;
          border-radius: 0.03rem;
          width: 100%;
          span {
            height: .15rem;
            font-size: 0.14rem;
            color: rgba(51, 51, 51, 1);
            display: block;
            text-indent: 0.25rem;
            line-height:0.15rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAIAAACpTQvdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQTU0QUU3RDUwNzMxMUU5OUZDQUM0RTFBODkyNENCMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQTU0QUU3RTUwNzMxMUU5OUZDQUM0RTFBODkyNENCMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNTRBRTdCNTA3MzExRTk5RkNBQzRFMUE4OTI0Q0IzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBBNTRBRTdDNTA3MzExRTk5RkNBQzRFMUE4OTI0Q0IzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+F0AhiQAAAK1JREFUeNpi/H2s88/lxQz/fjOAASO3GJvrBEZBZQZc4Pss3b+3t/7/8QGC/j7Y/2OF17/XV+AiaIiF4e8vJllruH4mCUNW09xf29L/f3uDZjSjgBKbYysLpp1M0pbs4Vsxxf89OfbrYB0TA9GAScbq/7vbIBt+zDcnXhtIA0fiSSJVA40mwUlQhw0LDcxs/x4dIkYpMOKAihl/H+/6c2khw78/RBjOwqIbCxBgAC7BV5pZEouKAAAAAElFTkSuQmCC) no-repeat;
            background-size: contain;
          }
          var {
            font-size: 0.14rem;
            color: rgba(153, 153, 153, 1);
            margin-top: 0.25rem;
            display: inline-block;
          }

          i {
            width: 0.14rem;
            height: 0.16rem;
            display: inline-block;
            margin-left: 0.1rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAIAAACp9tltAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQUJBQUVERjU1MjUxMUU5QTYxNUQwNDcyRkI4RjdGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQUJBQUVFMDU1MjUxMUU5QTYxNUQwNDcyRkI4RjdGMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNBQkFBRURENTUyNTExRTlBNjE1RDA0NzJGQjhGN0YyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNBQkFBRURFNTUyNTExRTlBNjE1RDA0NzJGQjhGN0YyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+o17PgQAAAR1JREFUeNqEkU9PwkAQxbtrFYzY0lrBFEUDMcSEk98/wU/gxYMhxoSUWkot/ZfWFml3GV1ssN2Ed5mZN7/DmwyiWSD8ael6puVEcQK91Dq71jtdTS23qESn78bcWl4osqbKMLpeuPLDG707GvYZILLiuD5wD/d3vatL5gD0YX++vs0U+byjKeBgtjAXjtqWSo4JRjBN22HjDk2+0rbUEmoCM07Sf2hBCMa4joJJCNmd5dmGYcHp4WnzpNloVNBsvU6zbzgUoqOnyWST58IhHYsirnOQr54bMLFiqYr0OB5B8/wy9YJof1VF801BKf1p8qKyqqLw1ZUfseYA+ivKvYyDzuYLPooQYuFKBVHM/QUe3vaOeH/aFwCDvr4VYAB1gXV5pjsWyAAAAABJRU5ErkJggg==)
            top left no-repeat;
            background-size: 100% 100%;
          }
        }
        .myteam {
          margin: 0.25rem 0 0.05rem 0;
          overflow: hidden;
          cursor: pointer;
          span {
            font-size: 0.14rem;
            color: rgba(102, 102, 102, 1);
            float: left;
            &:last-child {
              color: rgba(153, 153, 153, 1);
              float: right;
            }
            &.i {
              text-indent: 0.25rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAIAAACpTQvdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRTgxNzVBMTUwNzMxMUU5QTVGMEJBMURFRkJBNDgyMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRTgxNzVBMjUwNzMxMUU5QTVGMEJBMURFRkJBNDgyMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFFODE3NTlGNTA3MzExRTlBNUYwQkExREVGQkE0ODIwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFFODE3NUEwNTA3MzExRTlBNUYwQkExREVGQkE0ODIwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YtvelwAAAcNJREFUeNp8kbvLgXEUxz2PWy65pSySopSISa9kUnZKshkMRgNZDMpsNFjEgEFK2QyIMhmQcskf4FKSkFue98uDt7f38l2ec37P7/M753sOQVEU46X1ek2SpEQiabfb9Xp9uVxKpVKbzeZ0OplMJn2HoIHj8VgoFAaDgcPhuFwu4/HY6/WqVKrValUul1ksVjAYJAjiTlAPZbPZdDp9Pp/n83k4HN7v99RL4BOJRL/fp1MSzPV67Xa7Pp+PzWaPRiOTycTn89994nmLxTIcDun0DhwOB6BCofB5RJKM74KB2+32BYhEIrFYPJ1OEWu1Wjg5nU7v27iK+jqd7gnH43F85HJ5Lpfj8XhKpXKz2TSbTY1GIxAIttttPp+HN7fbTZt+TqnT6ZRKJQAfDyWTSWBI8ddqtbpcLi6X+zXWSqXS6/X8fr9arW40GtVq1W63m81mlIUx+mH4BH+PMZZoNIrSILGsWCyGfVE/lMlkisXivZ1UKtVqtRBhzaFQaLFYUL9pt9tFIhEMhgn7Ho8H5Wq1GnpAx4zfxOFwMG50Tur1eowVR7PZzGg0Mv6WwWCYTCasQCBA56irUCj+AWQyGTb4KcAA2uYQSPDBr6UAAAAASUVORK5CYII=) no-repeat;
            }
          }
        }
        .tasks {
          border-top: #e4e8ed 0.01rem solid;
          margin: 0 -0.15rem;
          ul {
            margin: 0.1rem 0.1rem 0 0.1rem;
          }

          li:hover  .TEST-task{
            text-indent: 0.25rem;
            height: .16rem;
            background: url("../../../../assets/images/icon/task1.png") no-repeat;
          }
          li:hover .QA-task{
            text-indent: 0.25rem;
            height: .16rem;
            background: url("../../../../assets/images/icon/task2.png") no-repeat;
          }
          li:hover .BEST-task{
            text-indent: 0.25rem;
            height: .16rem;
            background: url("../../../../assets/images/icon/task3.png") no-repeat;
          }
          li:hover .CONTENT-task{
            text-indent: 0.25rem;
            height: .16rem;
            background: url("../../../../assets/images/icon/task4.png") no-repeat;
          }
          li:hover  .WORKSUPLOAD-task{
            text-indent: 0.25rem;
            height: .16rem;
            background: url("../../../../assets/images/icon/task5.png") no-repeat;
          }

          li {
            padding: 0.1rem 0.2rem;
            cursor: pointer;
            a {
              color: #666666;
            }
            &:hover {
              background: #f5f6f7;
              a {
                color: #f79727;
              }
              span{
                color:rgba(247,151,39,1);
              }
            }
            .active {
              color: #999;
            }
            .el-col-6 {
              text-align: right;
            }
            small {
              color: #888;
              font-size: 0.12rem;
            }

            .TEST-task{
              text-indent: 0.25rem;
              height: .16rem;
              background: url("../../../../assets/images/icon/task1-gray.png") no-repeat;
              background-size: contain;
            }
            .QA-task{
              text-indent: 0.25rem;
              height: .16rem;
              background: url("../../../../assets/images/icon/task2-gray.png") no-repeat;
              background-size: contain;
            }
            .BEST-task{
              text-indent: 0.25rem;
              height: .16rem;
              background: url("../../../../assets/images/icon/task3-gray.png") no-repeat;
              background-size: contain;
            }
            .CONTENT-task{
              text-indent: 0.25rem;
              height: .16rem;
              background: url("../../../../assets/images/icon/task4-gray.png") no-repeat;
              background-size: contain;
            }
            .WORKSUPLOAD-task{
              text-indent: 0.25rem;
              height: .16rem;
              background: url("../../../../assets/images/icon/task5-gray.png") no-repeat;
              background-size: contain;
            }


            .li1 {
              text-indent: 0.25rem;
              height: .16rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTMwNzRENTUwNzMxMUU5QjI1MTk5MkFGNjhCMjExMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOTMwNzRENjUwNzMxMUU5QjI1MTk5MkFGNjhCMjExMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5MzA3NEQzNTA3MzExRTlCMjUxOTkyQUY2OEIyMTEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5MzA3NEQ0NTA3MzExRTlCMjUxOTkyQUY2OEIyMTEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hRP+lwAAAWxJREFUeNqEUk2LglAU9ekLKlpF0aYSWkT9hHbWpg/6kVr0DySwiFq0FHfiyoISCq1dFJRoZ8aZmnljzVn5jufed869j4RhyL3Gfr+fz+fX67XRaFSrVTD0jXq3202nU0mSMpnMeDwOgqBWq9E3ak3TeJ5Pp9PZbLbf76uqSinlwjhALcvyer22bVtRFM/zQB4Oh8FgQGN9ozeciKIYMfDT6/VOp1MikSBM6EjdbDbL5fKDXK1Wy+WSENLpdCijnkwmrVarVCr95JPJJMK02+18Pv/MADUsbjYbJo/jOMPh0HXd6Mg91GC3222sOgr9LPB9H6MwDINRo55RAzws4kcqlbIsC/0evvG9WCyQMpfL/RoiimazmWma6DQajSJXSPK395el2+2GHV0uFxyiGl3XkT5W/WEJLTEsDO58PiM6lo/but0u6+QbBM/L/8TxeMRqK5VKsVjE1F+9MYqrC4VCvV6HThAE7j/cBRgAjg9yxhKnJzkAAAAASUVORK5CYII=) no-repeat;
            }
            .li2 {
              height: .16rem;
              text-indent: 0.25rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NzA3MDhFOTUwNzMxMUU5OUU0QUVFQkQ1Q0M5NEU2OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NzA3MDhFQTUwNzMxMUU5OUU0QUVFQkQ1Q0M5NEU2OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3MDcwOEU3NTA3MzExRTk5RTRBRUVCRDVDQzk0RTY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3MDcwOEU4NTA3MzExRTk5RTRBRUVCRDVDQzk0RTY4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fBHV6gAAAV5JREFUeNqUUkuLglAUTr3YpFIUJLmqhWEQQUvJXYIQSNs2+QNbCbUQXLiMdu0C92W0VFDKXnOmO/iYkZg5i3u/8/gO3zn3Es/nc7VaHY/H0h9MEAQEF1RPJpNarfa+2vd9y7IQdliWrVar7wm32w1OsvRPQwm6XC6LxQJGyqYlSZJlOVEhimJKKJfLuq4/Ho8sgeM4UOK6bhRFrVZrPB6jbLrRaPzWbZomQRDNZtNxnMFggLK57XabSKrX691u1/M8iM9mM5Ik2+32er1OCdDmer3e73fsYsDzvKqqUP21n9eZEiiKGo1GPyR9vAxAHMebzabX6+VmCIIAEhhXKhVYC8ag07ZtYA6Hw5QA0eVyCdvALuxkOp1ivN/vT6eTYRigKjfDfD4vfKzz+cwwDE3TuRneWKfTSX7aNyEMQ4QKyKAbGkMqRwC58A0Le/f7fUVRDofDbrfTNA0inwIMAEOyg7t+vvmnAAAAAElFTkSuQmCC) no-repeat;
            }
            .li3 {
              height: .16rem;
              text-indent: 0.25rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MTZERDA0MTUwNzMxMUU5QTE3N0JENTI3MjcxOTNBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MTZERDA0MjUwNzMxMUU5QTE3N0JENTI3MjcxOTNBQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUxNkREMDNGNTA3MzExRTlBMTc3QkQ1MjcyNzE5M0FDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUxNkREMDQwNTA3MzExRTlBMTc3QkQ1MjcyNzE5M0FDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+l1GyIgAAARlJREFUeNqUUrGORFAURTYaH6AQySYKzSYShUZEswqJxu/xC6LRScTQUZEoVUp0QhDs3mFizW52xpzi5d7zzsk994HGcZym6bIsyDNgGMZxHGIYxjAMXycAMtM0MahwHEdOAGQQ5G3vi6IIwxAKWZZpmv432F4FQfC5AopHmxwbiPfruu/7tm2P/E8kSZI8z4M7iARtXddRFFVVBdGnaWJZluf5O8P7im1OkiRZlgmCoKoqvCYMAcayrJsBdgd2s3Vd5/s+MLquEwSxkVCIokhRlOu6V53jOGVZzvOc57lt2yRJapq2q48RbhMYhrlcLk3TgFRRFDgfvNLV8LECOQcMRdFxHM9IQQaroq/+fOjfj/XEhryIbwEGAEkdrqAf7cZyAAAAAElFTkSuQmCC) no-repeat;
            }
          }
          .tasksall {
            text-align: center;
            color: #f79727;
            margin-top: 0.1rem;
            cursor: pointer;
            i {
              transform: rotate(90deg);
              display: inline-block;
              margin: 0.03rem 0 0 0.05rem;
              vertical-align: middle;
            }
            &.icon{
              i{
                transform: rotate(-90deg);
                margin:-0.08rem 0 0 0.05rem;
              }
            }
            &.taskNo{
              height: .16rem;
            }
          }
        }
        .nowork {
          height: 1.98rem;
          position: relative;
          h4 {
            color: #333;
          }
          .icon_no {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 0.05rem;
            div {
              width: 0.75rem;
              margin: 0.7rem auto 0;
            }
            i {
              height: 0.46rem;
              width: 0.46rem;
              border: #ccc 0.03rem solid;
              border-radius: 100%;
              display: inline-block;
              position: relative;
              &:before {
                content: "";
                position: absolute;
                top: 52%;
                background: #ccc;
                width: 105%;
                height: 0.03rem;
                transform: rotate(-30deg);
              }
            }
            span {
              color: #ccc;
              font-weight: bold;
              display: block;
              margin: 0.1rem 0 0 -0.1rem;
            }
          }
        }
      }
    }
  }
</style>
