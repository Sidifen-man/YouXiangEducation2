<template>
  <div class="trends">
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <section>
      <div class="search-panel">
        <div class="left-title">
          <img :src="activeName==='1'?t10:t9" alt>
          <span>发起任务详细</span>
        </div>
        <el-select
          class="search"
          clearable
          v-model="timer"
          placeholder="完成状态"
          @change="handleConditionChange"
        >
          <el-option
            v-for="item in timerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="search-box">
          <input type="text" placeholder="执行人搜索" @keyup.enter="handleConditionChange" v-model="taskUserName">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <!-- <el-scrollbar style="height:100%;" tag="div" class="table-wrap"> -->
      <div class="table-wrap">
        <el-table :data="tableData1" style="width: 100%" row-class-name="tableRow">
          <el-table-column label="执行人" align="center" width="180">
            <template slot-scope="scope">
              <div>
                <!-- <img :src="scope.row.icon" alt class="icon"> -->
                <span>{{ scope.row.type }}</span>
                <!-- <p class="look">查看明细 ></p> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="人员类型" align="center" width="180"></el-table-column>
          <el-table-column prop="date" label="所属班级" align="center"></el-table-column>
          <el-table-column prop="todoStatus" label="完成状态" align="center"></el-table-column>
          <el-table-column prop="taskStatus" label="任务周期" align="center" width="190"></el-table-column>
          <el-table-column prop="pancel" label="操作" align="center">
            <template slot-scope="scope">
              <p @click="showDetail(scope.row)">{{ scope.row.pancel }}</p>
            </template>
          </el-table-column>
        </el-table>
        <button class="more"  v-if="totalCount>pageNo*pageSize"  @click="loadMore">查看更多</button>
      </div>
    </section>

    <prediction-task :state.sync="isShowTask"></prediction-task>


    <!-- <activity-name :state="isShowActivity" @close="parentClose" @invitation="invitation" :taskresultId = "taskresultId" :ATTENDEVAL="ATTENDEVAL"></activity-name>查看作品暂时隐藏，引用可能出错--> 

    <add-works :state="isShowAddWork" @close="parentClose" @handleJump="handleJump"></add-works>
    <Ueditor :state="isShowEditor" @close="parentClose"></Ueditor>

    <delete-works :state="isShowDeleteWorks" @close="parentClose"></delete-works>

    <prediction-task :my-survey-detail="mySurveyDetail"  :edit-able="editAble" :state.sync="isShowTask" @completeTask="completeTask" v-on:close="handlePredictionClose"></prediction-task>

    <content-task-detail  :state="contentTaskShow"  @completeTask="completeTask" :task-result-id="taskresultId" v-on:close="handleContentTaskClose"  :contentTask.sync="contentTask"></content-task-detail>

    <upload v-if="uploadShow" :state="uploadShow" :taskresult-id="taskresultId"  @completeTask="completeTask" v-on:close="handleUploadClose" />
    <upload-result v-if="uploadShowHistory" :state="uploadShowHistory" :taskresult-id="taskresultId"  @completeTask="completeTask" v-on:close="handleUploadHistoryClose" />
    <!--完整的打卡展示-->
    <punch-card :state="isShowPanchCard" :status="punchStatus" :taskresultId="taskresultId" @close="parentClose" @showActivity="handleActivityShow"  :ATTENDEVAL="ATTENDEVAL"></punch-card>

    <!-- <my-advantage :state="isShowAdvantage"></my-advantage> -->
    <!-- <courseware-upload :state.sync="isShowAdvantage"></courseware-upload> -->
    <!-- <no-select :state.sync="isShowAdvantage"></no-select> -->
    <!-- <invitation-success :state.sync="isShowAdvantage"></invitation-success> -->
    <!-- <invitation-comments :state.sync="isShowAdvantage"></invitation-comments> -->
    <!-- <invitation-comments :state.sync="isShowAdvantage"></invitation-comments> -->
  </div>
</template>

<script>
  import t1 from "@/assets/images/icon/t1.png";
  import t2 from "@/assets/images/icon/t2.png";
  import t3 from "@/assets/images/icon/t3.png";
  import t4 from "@/assets/images/icon/t4.png";
  import t5 from "@/assets/images/icon/t5.png";
  import t6 from "@/assets/images/icon/t6.png";
  import t7 from "@/assets/images/icon/t7.png";
  import t8 from "@/assets/images/icon/t8.png";
  import t9 from "@/assets/images/icon/t9.png";
  import t10 from "@/assets/images/icon/t10.png";
  import t11 from "@/assets/images/icon/t11.png";
  import PredictionTask from "../prediction";
  import PunchCard from "@/components/advantagePunchCard";
  import ActivityName from "@/components/activityName";
  import AddWorks from "../addworks/addWorkTypes";
  import Ueditor from "@/page/ueditor/ueditor";
  import DeleteWorks from "../deleteWork/deleteWork";
  import Upload from '../../../student/course/works/upload.vue'

  import UploadResult from '../../../student/course/works/uploadResult.vue'

  import LoadingPage from '../../../common/loadingPage.vue'


  import ContentTaskDetail from '../../../student/course/works/contentTaskDetail.vue'

  import { myTaskResultDetailApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'

  import { myTaskListApi } from 'api/api'

  import { myStartTaskApi } from 'api/api'


  import task1 from '@/assets/images/icon/task1.png'
  import task2 from '@/assets/images/icon/task2.png'
  import task3 from '@/assets/images/icon/task3.png'
  import task4 from '@/assets/images/icon/task4.png'
  import task5 from '@/assets/images/icon/task5.png'


  import axios from 'axios'


  export default {
    name: "Trends",
    watch:{

      taskInfoId(newVal){
        this.pageNo = 1
        this.getMyTaskList()
      }

    },
    data() {
      return {

        taskUserName:"",
        taskresultId:"",
        contentTaskShow:false,
        contentTask:false,
        uploadShowHistory:false,
        editAble:false,
        loading: false,
        uploadShow: false,
        loading: false,

        taskInfoId:this.$route.params.taskInfoId,
        pageSize:200,
        pageNo:1,
        mySurveyDetail:{},

        isShowDeleteWorks: false,
        isShowAddWork: false,
        isShowEditor: false,
        isShowActivity: false,
        isShowPanchCard: false,
        isShowAdvantage: false,
        ATTENDEVAL: false,
        punchStatus: "3",
        teacher: "",
        activeName: "1",
        type: "",
        status: "",
        timer: "",
        t1,
        t2,
        t3,
        t4,
        t5,
        t6,
        t7,
        t8,
        t9,
        t10,
        t11,
        totalCount:0,
        typeOptions: [
          {
            value: "1",
            label: "问卷"
          },
          {
            value: "2",
            label: "测试"
          },
          {
            value: "3",
            label: "优势打卡"
          },
          {
            value: "4",
            label: "上传作品"
          }
        ],
        statusOptions: [
          {
            value: "1",
            label: "未完成"
          },
          {
            value: "2",
            label: "已完成"
          }
        ],
        timerOptions: [
          {
            value: "0",
            label: "未完成"
          },
          {
            value: "1",
            label: "已完成"
          }
        ],


        task1Template:{
          date: "",
          name: "",
          type: "",
          todoStatus: "",
          taskStatus: "2019/03/05-2019/05/08",
          pancel: "",
          icon: t4,
          id: 1,
          typeOption:""
        },
        tableData1: [
        ],
        isShowTask: false,
        address: {
          onePath: "/",
          text: ""
        }
      };
    },
    created() {
      if (this.$route.query.type === "showPunchCard") {
        this.isShowPanchCard = true;
      }
      this.getMyTaskList()
    },
    methods: {

      getMyTaskResult(taskResultId, editAble){
        this.loading = true;
        this.editAble = editAble

        let params = {

          taskResultId:taskResultId

        }
        // myTaskResultAnswerDetailApi
        if(editAble){

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

      handleUploadHistoryClose(){
        this.taskresultId = ""
        this.uploadShowHistory = !this.uploadShowHistory;
      },
      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },
      handlePredictionClose(){
        this.mySurveyDetail = {}
      },
      handleContentTaskClose(){
        this.taskresultId = ""
        this.contentTaskShow = !this.contentTaskShow;
        this.contentTask = !this.contentTask
      },
      completeTask (taskresultId){

      },
      showDetail(item) {

        if(item.typeOption == 'TEST'){
          this.getMyTaskResult(item.id,false)

        } else if(item.typeOption == 'QA'){
          // curTaskResult.type =  ''
          // this.$router.push({
          //   path: "/questionnaire/false/" + item.id
          // });

          this.openNewPage("/questionnaire/false/" + item.id)
        } else if(item.typeOption == 'BEST'){
           this.taskresultId = item.id
           // this.isShowActivity = true;
           this.ATTENDEVAL = false;
           this.isShowPanchCard = true;
        } else if(item.typeOption == 'CONTENT'){
          this.changeContentTaskDetail(item.id)

        } else if(item.typeOption == 'WORKSUPLOAD'){
          this.changeUploadHistory(item.id)
        } else if(item.typeOption == 'ATTENDEVAL'){
          this.taskresultId = item.id;
          // this.isShowActivity = true;
          this.ATTENDEVAL = true;
          this.isShowPanchCard = true;
        }
      console.log('this.isShowPanchCard'+"....."+this.isShowPanchCard)
      },
      changeUploadHistory(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShowHistory = !this.uploadShowHistory;
      },

      changeContentTaskDetail(taskresultId){

        this.taskresultId = taskresultId
        this.contentTaskShow = !this.contentTaskShow;
        this.contentTask = !this.contentTask
      },
      getMyTaskList(){
        this.loading = true;
        // this.tableData1 = []
        let params = {
          taskUserName: this.taskUserName,
          completeStatus:this.timer,
          taskInfoId:this.taskInfoId,
          pageSize:this.pageSize,
          pageNo:this.pageNo

        }
        axios.post(myTaskListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            let myTasks = res.data.result.datalist
            this.totalCount = res.data.result.totalCount

            if(myTasks && myTasks.length > 0){
              for (let i = 0; i < myTasks.length; i++) {
                let curTask = myTasks[i];


                this.totalCount = res.data.result.totalCount

                let curTaskResult = this.deepCloneUtil(this.task1Template)

                curTaskResult.taskStatus = curTask.taskInfo.datefromStr + '-' + curTask.taskInfo.datetoStr
                curTaskResult.type =  curTask.user.name

                curTaskResult.typeOption = curTask.taskInfo.acttype
                if(curTask.taskInfo.classInfo){
                  curTaskResult.date = curTask.taskInfo.classInfo.name
                }
                curTaskResult.id = curTask.id
                curTaskResult.icon = t4


                if(curTask.user.student){
                  curTaskResult.name='学生'
                } else {
                  curTaskResult.name='老师'
                }

                if(curTask.completeStatus == 0){
                  curTaskResult.todoStatus =  '未完成'
                  curTaskResult.pancel = ""
                } else {
                  curTaskResult.todoStatus =  '已完成'
                  curTaskResult.pancel =  '查看详情'
                }

                curTaskResult.completeStatus =  curTask.completeStatus


                this.tableData1.push(curTaskResult)

              }
            }

          } else {
            // this.myTasks = {}
          }

        })

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },

      addWorks() {
        this.isShowAddWork = true;
      },
      handleJump() {
        this.isShowEditor = true;
      },
      handleClick(tab, event) {
        // console.log(tab, event)
      },
      handleConditionChange() {

        this.pageNo = 1
        this.tableData1 = []
        this.getMyTaskList()

      },
      parentClose() {
        this.isShowPanchCard = false;
        this.isShowActivity = false;
        this.isShowAddWork = false;
        this.isShowEditor = false;
        this.isShowDeleteWorks = false;
      },
      handleActivityShow() {
        this.isShowActivity = true;
      },
      invitation() {
        this.isShowDeleteWorks = true;
      },
      todo(row) {
        console.log(111)
        // if (row.id === 1) {
        //   this.$router.push({
        //     path: "/questionnaire"
        //   });
        // } else if (row.id === 2) {
        //   this.isShowTask = true;
        //   // this.isShowAdvantage = true
        // } else if (row.id === 3) {
        //   this.punchStatus = row.status;
        //   this.isShowPanchCard = true;
        // }
      },
      // todoType(row) {
      //   if (row.id === 1) {
      //     this.$router.push({
      //       path: "/questionnaire"
      //     });
      //   } else if (row.id === 2) {
      //     this.isShowTask = true;
      //     // this.isShowAdvantage = true
      //   } else if (row.id === 3) {
      //     this.$router.push("/superiority-clockin/empty");
      //   }
      // },
      loadMore() {
        this.pageNo = this.pageNo + 1
        this.getMyTaskList()
      }
    },
    components: {
      PredictionTask,
      PunchCard,
      ActivityName,
      AddWorks,
      Ueditor,
      DeleteWorks,
      LoadingPage,
  ContentTaskDetail,
      UploadResult,
      Upload
      // MyAdvantage,
      // CoursewareUpload,
      // NoSelect,
      // InvitationSuccess,
      // InvitationComments
    }
  };
</script>

<style lang="scss" scoped>
  .trends {
    flex: 1;
    height: 100%;
    margin: 0.15rem 0 0 0;
    background-color: #fff;
    border-radius: 6px;
    .look {
      display: none;
    }
    .nav_img_1,
    .nav_img_2 {
      img {
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.08rem;
        margin-top: -0.03rem;
      }
    }
    .search-box {
      width: 2.42rem;
      height: 0.32rem;
      background: rgba(238, 242, 245, 1);
      border-radius: 0.16rem;
      margin: 0 0.46rem 0 0.2rem;
      position: relative;
      input {
        height: 100%;
        width: 100%;
        background-color: rgba(238, 242, 245, 1);
        border-radius: 0.16rem;
        padding-left: 0.24rem;
        padding-right: 0.4rem;
        box-sizing: border-box;
        &::-webkit-input-placeholder {
          color: rgba(170, 170, 170, 1);
        }
      }
      i {
        position: absolute;
        right: 0.24rem;
        top: 0.08rem;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .left-title {
    flex: 1;
    padding-left: 0.4rem;
    font-size: 16px;
    font-weight: bold;
    img {
      width: 22px;
      vertical-align: middle;
    }
  }
  .trends .more {
    display: block;
    width: 1.2rem;
    height: 0.34rem;
    line-height: 0.32rem;
    text-align: center;
    background-color: transparent;
    border: 0.01rem solid #ccc;
    border-radius: 0.17rem;
    color: #999;
    font-size: 0.13rem;
    font-family: "MicrosoftYaHei";
    cursor: pointer;
    margin: 0.2rem auto;
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
    height: 0.68rem;
    line-height: 0.68rem;
    width: 1.83rem;
    text-align: center;
    color: rgba(153, 153, 153, 1);
    border: none;
    font-size: 0.16rem;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    color: rgba(153, 153, 153, 1);
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header {
    background: rgba(255, 255, 255, 1);
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: none;
    color: #f79727;
    border-right: 1px solid rgba(228, 232, 237, 1);
    border-left: 1px solid rgba(228, 232, 237, 1);
  }
  .trends /deep/ #tab-1 {
    border: 0 none;
  }
  // .trends /deep/ #tab-1.is-active {
  //   background: #fff url("../../../../assets/images/icon/t11.png") no-repeat;
  // }
  // .trends /deep/ #tab-2.is-active {
  //   background: #fff url("../../../../assets/images/icon/t8.png") no-repeat;
  // }
  .search-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 0.2rem;
    padding: 0.21rem 0 0.2rem 0;
    border-bottom: 1px solid #e4e8ed;
  }
  .search {
    width: 1.5rem;
    margin-right: 0.1rem;
  }
  button {
    width: 1.2rem;
    line-height: 0.32rem;
    height: 0.32rem;
    background: rgba(247, 151, 39, 1);
    border-radius: 0.16rem;
    font-size: 0.14rem;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin: 0 0.36rem 0 0.3rem;
    i {
      width: 0.15rem;
      height: 0.15rem;
      line-height: 0.1rem;
      font-size: 0.2rem;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .table-wrap {
    margin: 0 0.36rem 0 0.4rem;
    height: 100%;
    overflow: auto;
    max-height: calc(100vh - 2.3rem);
    .icon {
      width: 0.16rem;
      height: 0.16rem;
      display: inline-block;
      vertical-align: middle;
      margin-top: -0.05rem;
    }
  }
  .table-wrap /deep/ .el-table__body-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .table-wrap /deep/ .el-table td.is-center:nth-of-type(1),
  .el-table th.is-center:nth-of-type(1) {
    text-align: center;
    // padding-left: 0.43rem;
    box-sizing: border-box;
  }
  .trends /deep/ .el-table .tableRow td:nth-of-type(5) {
    text-decoration: none;
  }
</style>
