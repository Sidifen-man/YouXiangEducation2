<template>
  <div class="trends">
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <section>
      <div class="search-panel">
        <div class="left-title">
          <img :src="t7" alt>
          <span>发起的任务</span>
        </div>
        <el-select
          class="search"
          v-model="acttype"
          clearable
          placeholder="类型筛选"
          @change="handleConditionChange"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          class="search"
          v-model="completeStatus"
          clearable
          placeholder="状态筛选"
          @change="handleConditionChange"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          class="search"
          clearable
          v-model="rangeType"
          placeholder="完成情况"
          @change="handleConditionChange"
        >
          <el-option
            v-for="item in timerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="add-task" @click="addWorks">
          <span class="add-button">
            <i class="el-icon-plus"></i>
            添加任务
          </span>
        </div>
      </div>
      <!-- <el-scrollbar style="height:100%;" tag="div" class="table-wrap"> -->
      <div class="table-wrap">
        <el-table :data="tableData2" @sort-change="tableSortChange" style="width: 100%" row-class-name="tableRow">
          <el-table-column prop="typeOption" label="任务类型" sortable="typeOption" align="center" width="180">
            <template slot-scope="scope">
              <div @click="todoType(scope.row)">

                <img :src="task1" v-if="scope.row.typeOption == 'TEST'" alt class="icon">
                <img :src="task2" v-if="scope.row.typeOption == 'QA'" alt class="icon">
                <img :src="task3" v-if="scope.row.typeOption == 'BEST'" alt class="icon">
                <img :src="task3" v-if="scope.row.typeOption == 'ATTENDEVAL'" alt class="icon">
                <img :src="task4" v-if="scope.row.typeOption == 'CONTENT'" alt class="icon">
                <img :src="task5" v-if="scope.row.typeOption == 'WORKSUPLOAD'" alt class="icon">
                <span style="margin-left: 0.1rem">{{ scope.row.type }}</span>
                <p class="look">查看明细 ></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="任务名称" sortable='name' align="center" width="180" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="date" label="任务周期" sortable='date' align="center" width="190"></el-table-column>
          <el-table-column prop="todoStatus" label="完成状态" sortable='todoStatus' align="center"></el-table-column>
          <el-table-column prop="taskStatus" label="任务状态" align="center"></el-table-column>
          <el-table-column prop="pancel" label="操作" align="center">
            <template slot-scope="scope">
              <p @click="deleteTaskInfo(scope.row)">{{ scope.row.pancel }}</p>
            </template>
          </el-table-column>
        </el-table>
        <button class="more" v-if="totalCount>pageNo*pageSize"  @click="getMyNextTaskList">查看更多</button>
      </div>
    </section>

    <prediction-task :state.sync="isShowTask"></prediction-task>

    <punch-card
      :state="isShowPanchCard"
      :status="punchStatus"
      @close="parentClose"
      @showActivity="handleActivityShow"
    ></punch-card>

    <activity-name :state="isShowActivity" @close="parentClose" @invitation="invitation"></activity-name>

    <add-works :state="isShowAddWork" @close="parentClose" @handleJump="handleJump"
               @handleJump2="attendTaskAdd" :isHidden="isHidden"></add-works>
    <Ueditor :state="isShowEditor" @close="showContentTaskClose" @closeOption="closeContentTask"></Ueditor>

    <delete-works :state="isShowDeleteWorks" @confirmClose="deleteClose"  @close="deleteCloseFinal"></delete-works>

    <!-- 优势打卡弹框 -->
    <sign-dialog :state="isSignDialog" @close="signDialogClose" @closeOnly="closeOnly"></sign-dialog>

    <!-- 发布任务 -->
    <publish-task v-if="isPublishTask" :state.sync="isPublishTask" :acttype="acttype" @updateList="updateList"></publish-task>
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

  import SignDialog from '@/components/signdialog';
  import PublishTask from '@/components/pubishTask';

  import LoadingPage from '../../../common/loadingPage.vue'

  import ContentTaskDetail from '../../../student/course/works/contentTaskDetail.vue'

  import { myTaskResultDetailApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'
  import { deleteTaskInfo } from 'api/api'


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
    data() {
      return {

        isPublishTask: false,
        isSignDialog: false,
        completeStatus:"",
        curDeleteId:"",
        isConfirmDeleteWorks:false,
        contentTaskShow:false,

        myTasks:{},
        taskresultId:"",
        mySurveyDetail:{},
        editAble:false,
        loading: false,
        uploadShow: false,

        task1,
        task2,
        task3,
        task4,
        task5,

        acttype:"",
        sponsorId:"",
        rangeType:"",

        pageSize:30,
        pageNo:1,
        orderField:"",
        orderType:"",
        totalCount:0,

        fullPath: "",
        isShowDeleteWorks: false,
        isShowAddWork: false,
        isHidden:false,
        isShowEditor: false,
        isShowActivity: false,
        isShowPanchCard: false,
        isShowAdvantage: false,
        punchStatus: "1",
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
        typeOptions: [
          {
            value: 'QA',
            label: '问卷'
          },
          {
            value: 'TEST',
            label: '测试'
          },
          {
            value: 'BEST',
            label: '优势打卡'
          },
          {
            value: 'ATTENDEVAL',
            label: '优势打卡评价'
          },
          {
            value: 'CONTENT',
            label: '图文'
          },
          {
            value: 'WORKSUPLOAD',
            label: '上传作品'
          }
        ],
        statusOptions: [
          {
            value: "0",
            label: "未完成"
          },
          {
            value: "1",
            label: "已完成"
          }
        ],

        task2Template:{
          date: '',
          name: '',
          type: '',
          todoStatus: '',
          taskStatus: '',
          pancel: '',
          icon: t4
        },

        task1Template:{
          date: '',
          name: '',
          type: '',
          typeOption:'',
          todoStatus: '',
          taskStatus: '',
          pancel: ' >',
          completeStatus: '',
          icon: t4,
          acttype: "",
          id:1
        },
        timerOptions: [

          {
            value: '1',
            label: '执行中'
          },
          {
            value: '3',
            label: '已完成'
          },
          {
            value: '2',
            label: '已关闭'
          }
        ],
        tableData2: [],
        isShowTask: false
      };
    },
    created() {
      this.fullPath = this.$router.currentRoute.fullPath;
      if (this.$route.query.type === "showPunchCard") {
        this.isShowPanchCard = true;
      }


      this.getMyStartTaskList()

    },
    methods: {
      attendTaskAdd () {  // 添加 优势打卡
        this.isSignDialog = true

        // 任务类型：老师 - 优势打卡; 学生 - 优势打卡评价
        let curuser = JSON.parse(localStorage.getItem("loginuser"))
        if (curuser.teacher)
          this.acttype = "BEST";
        else if (curuser.student)
          this.acttype = "ATTENDEVAL";

      },
      signDialogClose (val) {
        this.isShowAddWork = false
        this.isSignDialog = false
        if(this.fullPath.includes('teacher')){
          this.isPublishTask = true
        }else if(this.fullPath.includes('student')){
          this.isPublishTask = false;
          // localStorage.setItem('studentActiveTitle',val)
          this.$router.push('/superiority-clockin/empty')
        }
        // this.fullPath.includes('teacher')
        //   ? (this.isPublishTask = true)
        //   : (this.isPublishTask = false)
      },
      updateList(){
        this.pageNo = 1
        this.tableData2 = []
        this.getMyStartTaskList()
      },
      closeOnly(){
        this.isShowAddWork = false
        this.isSignDialog = false
        // if(this.fullPath.includes('teacher')){
        //   this.isPublishTask = true
        // }else if(this.fullPath.includes('student')){
        //   this.isPublishTask = false;
        // }
      },
      tableSortChange(column) {
        if(column.prop == 'typeOption'){
          this.orderField = "acttype"
        }
        if(column.prop == 'name'){
          this.orderField = "name"
        }
        if(column.prop == 'date'){
          this.orderField = "dateto"
        }
        if(column.prop == 'todoStatus'){
          this.orderField = "completeStatus"
      }
        if (column.order === 'descending') {
          this.orderType = 'desc'
        } else {
          this.orderType = 'asc'
        }
        this.handleConditionChange()
      },

      deleteClose(confirmResult){
        if(confirmResult){


          let params = {
            taskInfoId: this.curDeleteId
          }

          axios.post(deleteTaskInfo, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code
            if(code == 'success'){


              for (let i = 0; i < this.tableData2.length; i++) {

                let item = this.tableData2[i]

                if(item.id === this.curDeleteId){

                  this.tableData2.splice(i,1)
                  break;
                }

              }

            } else {
            }

          })

        }
      },
      deleteCloseFinal(){
        this.isShowDeleteWorks = false;
      },

      deleteTaskInfo(item){
        this.curDeleteId = item.id
        this.isShowDeleteWorks = true
      },

      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },

      completeTask (taskresultId){
        let curTasks = this.tableData1


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
      handlePredictionClose(){
        this.mySurveyDetail = {}
      },

      changeContentTaskDetail(taskresultId){

        this.taskresultId = taskresultId
        this.contentTaskShow = !this.contentTaskShow;
      },
      handleContentTaskClose(){

        this.taskresultId = ""
        this.contentTaskShow = !this.contentTaskShow;
      },

      getMyStartTaskList(){
        // myStartTaskApi
        this.loading = true;
        // this.tableData1 = []

        let params = {
          acttype:this.acttype,
          completeStatus:this.completeStatus,
          taskstatus:this.rangeType,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          orderField:this.orderField,
          orderType:this.orderType

        }

        axios.post(myStartTaskApi, params,{
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

                let curTaskResult = this.deepCloneUtil(this.task2Template)


                curTaskResult.date = curTask.datefromStr + '-' + curTask.datetoStr
                curTaskResult.name =  curTask.name


                let className = ""

                if(curTask.classInfo && curTask.classInfo.name){
                  className = curTask.classInfo.name

                  if(className != null && className != ''){
                    curTaskResult.name = className + '-' + curTaskResult.name
                  }
                }



                if(curTask.acttype == 'TEST'){
                  curTaskResult.type =  '测试'
                } else if(curTask.acttype == 'QA'){
                  curTaskResult.type =  '问卷'
                } else if(curTask.acttype == 'BEST'){
                  curTaskResult.type =  '优势打卡'
                } else if(curTask.acttype == 'CONTENT'){
                  curTaskResult.type =  '图文'
                } else if(curTask.acttype == 'WORKSUPLOAD'){
                  curTaskResult.type =  '作品上传'
                } else if(curTask.acttype == 'ATTENDEVAL'){
                  curTaskResult.type =  '优势打卡评价'
                }

                curTaskResult.typeOption =  curTask.acttype

                if(curTask.completeStatus == 0 || curTask.completeStatus == null){
                  curTaskResult.todoStatus =  '未完成'

                } else {
                  curTaskResult.todoStatus =  '已完成'

                }

                curTaskResult.pancel = "删除"
                if(curTask.taskstatus == 0){

                  curTaskResult.taskStatus =  '未启动'

                } else if(curTask.taskstatus == 1){

                  curTaskResult.taskStatus =  '执行中'

                } else if(curTask.taskstatus == 2){

                  curTaskResult.taskStatus =  '已关闭'
                  curTaskResult.pancel =  '删除'

                }else if(curTask.taskstatus == 3){

                  curTaskResult.taskStatus =  '已完成'
                  curTaskResult.pancel =  '删除'

                }




                curTaskResult.completeStatus =  curTask.completeStatus


                curTaskResult.icon =  t4
                curTaskResult.id = curTask.id

                this.tableData2.push(curTaskResult)

              }
            }

          } else {
            this.myTasks = {}
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);
        })

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

      getMyNextTaskList(){
        this.pageNo = this.pageNo + 1
        this.getMyStartTaskList()
      },

      getMyTaskList(){
        this.loading = true;
        this.tableData1 = []

        let params = {

          acttype:this.acttype,
          completeStatus:this.completeStatus,
          sponsorName:this.sponsorId,
          pageSize:10,
          pageNo:this.pageNo,
          orderField:this.orderField,
          orderType:this.orderType

        }

        axios.post(myTaskListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == 'success'){
            let myTasks = res.data.result.datalist

            if(myTasks && myTasks.length > 0){
              for (let i = 0; i < myTasks.length; i++) {
                let curTask = myTasks[i];

                let curTaskResult = this.deepCloneUtil(this.task1Template)


                curTaskResult.date = curTask.taskInfo.datefromStr + '-' + curTask.taskInfo.datetoStr
                curTaskResult.name =  curTask.taskInfo.name

                if(curTask.taskInfo.acttype == 'TEST'){
                  curTaskResult.type =  '测试'
                } else if(curTask.taskInfo.acttype == 'QA'){
                  curTaskResult.type =  '调用问卷库'
                } else if(curTask.taskInfo.acttype == 'BEST'){
                  curTaskResult.type =  '优势打卡'
                } else if(curTask.taskInfo.acttype == 'CONTENT'){
                  curTaskResult.type =  '图文'
                } else if(curTask.taskInfo.acttype == 'WORKSUPLOAD'){
                  curTaskResult.type =  '作品上传'
                } else if(curTask.taskInfo.acttype == 'ATTENDEVAL'){
                  curTaskResult.type =  '优势打卡评价'
                }

                curTaskResult.typeOption =  curTask.taskInfo.acttype

                if(curTask.completeStatus == 0){
                  curTaskResult.todoStatus =  '未完成'
                  curTaskResult.pancel =  '去完成 >'
                } else {
                  curTaskResult.todoStatus =  '已完成'
                  curTaskResult.pancel =  '已完成 >'
                }
                curTaskResult.completeStatus =  curTask.completeStatus

                if(curTask.taskInfo.sponsor){
                  curTaskResult.taskStatus =  curTask.taskInfo.sponsor.name
                }

                curTaskResult.icon =  t4
                curTaskResult.id = curTask.id

                this.tableData1.push(curTaskResult)

              }
            }

          } else {
            this.myTasks = {}
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);
        })

      },


      handleClick (tab, event) {
      },
      handleConditionChange() {
        this.pageNo = 1
        this.tableData2 = []
        this.getMyStartTaskList()

      },
      handleStartConditionChange() {

        this.pageNoStart = 1
        this.tableData2 = []
        this.getMyStartTaskList()

      },
      showDetail(item) {


        if(item.typeOption == 'TEST'){
          this.getMyTaskResult(item.id,false)

        } else if(item.typeOption == 'QA'){
          // this.$router.push({
          //   path: "/questionnaire/false/" + item.id
          // });

          this.openNewPage("/questionnaire/false/" + item.id)
        } else if(item.typeOption == 'BEST'){

        } else if(item.typeOption == 'CONTENT'){
          this.changeContentTaskDetail(item.id)

        } else if(item.typeOption == 'WORKSUPLOAD'){
          this.changeUpload(item.id)
        } else if(item.typeOption == 'ATTENDEVAL'){

        }

      },
      todo(item) {


        if(item.typeOption == 'TEST'){
          this.getMyTaskResult(item.id, true)

        } else if(item.typeOption == 'QA'){
          // this.$router.push({
          //   path: "/questionnaire/true/" + item.id
          // });
          this.openNewPage("/questionnaire/true/" + item.id)
        } else if(item.typeOption == 'BEST'){

        } else if(item.typeOption == 'CONTENT'){
          this.changeContentTaskDetail(item.id)

        } else if(item.typeOption == 'WORKSUPLOAD'){
          this.changeUpload(item.id)
        } else if(item.typeOption == 'ATTENDEVAL'){

        }

      },
      changeUpload(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShow = !this.uploadShow;
      },

      addWorks() {
        this.isShowAddWork = true;
        this.isHidden = true;
      },
      handleJump() {
        this.isShowEditor = true;
      },
      handleClick(tab, event) {
        // console.log(tab, event)
      },

      parentClose() {
        this.isShowPanchCard = false;
        this.isShowActivity = false;
        this.isShowAddWork = false;
        this.isShowEditor = false;
        this.isShowDeleteWorks = false;
      },

      showContentTaskClose() {
        if(this.fullPath.includes('teacher')){
          this.isPublishTask = true
        }
        this.isShowPanchCard = false;
        this.isShowActivity = false;
        this.isShowAddWork = false;
        this.isShowEditor = false;
        this.isShowDeleteWorks = false;
      },
      closeContentTask(){
        this.isShowAddWork = false;
        this.isShowEditor = false;
      },
      handleActivityShow() {
        this.isShowActivity = true;
      },
      invitation() {
        this.isShowDeleteWorks = true;
      },
      todo(row) {
        let arr = this.tableData2.filter(item=>{
          return item.num != row.num
        })
        this.tableData2 = arr
      },
      todoType(row) {
        if (this.fullPath.includes("/teacher")) {
          this.$router.push({
            path: "/teacher/task/sponsor/detail/2/" + row.id,
            query:{name:row.name}
          });
        } else if (this.fullPath.includes("/student")) {
          this.$router.push({
            path: "/student/task/sponsor/detail/2/" + row.id,
            query:{name:row.name}
          });
        }
      },
      loadMore(id) {
        if (id === 1) {
          this.tableData1.push(
            this.tableData1[parseInt(Math.random() * this.tableData1.length)]
          );
        } else {
          this.tableData2.push(
            this.tableData2[parseInt(Math.random() * this.tableData2.length)]
          );
        }
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
      SignDialog,
      PublishTask

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
    margin: 0.4rem 0 0 0rem;
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
    text-align: left;
    padding-left: 0.43rem;
    box-sizing: border-box;
  }
  .add-task {
    margin-right: 0.36rem;
    .add-button {
      display: inline-block;
      width: 1.2rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      text-align: center;
      background: #f79727;
      color: #fff;
      cursor: pointer;
    }
    .add-button:active {
      opacity: 0.7;
    }
  }
</style>
