<template>
  <div class="trends" >
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <section>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="我收到的任务" name="1">
          <span slot="label" class="nav_img_1">
            <img :src="activeName==='1'?t10:t9" alt>我收到的任务
          </span>
          <div class="search-panel">
            <el-select
              class="search"
              clearable
              placeholder="类型筛选"
              @change="handleConditionChange"
              v-model="acttype"
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
              clearable
              placeholder="状态筛选"
              @change="handleConditionChange"
              v-model="completeStatus"
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
              placeholder="周期筛选"
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
              <input type="text" placeholder="发起人搜索" v-model="sponsorId">
              <i class="el-icon-search"></i>
            </div>
          </div>
          <!-- <el-scrollbar style="height:100%;" tag="div" class="table-wrap"> -->
          <div class="table-wrap">

            <el-table
              :data="tableData1"
              style="width: 100%"
              row-class-name="tableRow"
            >
              <el-table-column label="任务类型" sortable align="center" width="180">
                <template slot-scope="scope">


                  <img :src="task1" v-if="scope.row.typeOption == 'TEST'" alt class="icon">
                  <img :src="task2" v-if="scope.row.typeOption == 'QA'" alt class="icon">
                  <img :src="task3" v-if="scope.row.typeOption == 'BEST'" alt class="icon">
                  <img :src="task3" v-if="scope.row.typeOption == 'ATTENDEVAL'" alt class="icon">
                  <img :src="task4" v-if="scope.row.typeOption == 'CONTENT'" alt class="icon">
                  <img :src="task5" v-if="scope.row.typeOption == 'WORKSUPLOAD'" alt class="icon">

                  <span style="margin-left: 0.1rem">{{ scope.row.type }}</span>
                  <p  style="cursor: pointer;" @click="showDetail(scope.row)"  class="look" v-if="scope.row.completeStatus == '1'">查看明细 ></p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="任务名称" sortable align="center" width="180"></el-table-column>
              <el-table-column prop="date" label="任务周期" sortable align="center"></el-table-column>
              <el-table-column prop="todoStatus" label="完成状态" sortable align="center"></el-table-column>
              <el-table-column prop="taskStatus" label="发起人" align="center"></el-table-column>
              <el-table-column prop="pancel" label="操作" align="center">
                <template slot-scope="scope">
                  <p style="cursor: pointer;" v-if="scope.row.completeStatus == '0'" @click="todo(scope.row)">去完成</p>
                  <p   v-if="scope.row.completeStatus == '1'">已完成</p>
                </template>
              </el-table-column>
            </el-table>
          </div>


          <!-- </el-scrollbar> -->
        </el-tab-pane>

        <el-tab-pane label="我发起的任务" name="2">
          <span slot="label" class="nav_img_2">
            <img :src="activeName==='2'?t7:t6" alt>我发起的任务
          </span>
          <div class="search-panel">
            <el-select
              class="search"
              v-model="acttypeStart"
              clearable
              placeholder="类型筛选"
              @change="handleStartConditionChange"
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
              v-model="completeStatusStart"
              clearable
              placeholder="状态筛选"
              @change="handleStartConditionChange"
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
              v-model="rangeTypeStart"
              placeholder="周期筛选"
              @change="handleStartConditionChange"
            >
              <el-option
                v-for="item in timerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
<!--            <button>-->
<!--              <i>+</i>&nbsp;添加任务-->
<!--            </button>-->
          </div>
          <!-- <el-scrollbar style="height:100%;" tag="div" class="table-wrap"> -->
          <div class="table-wrap">
            <el-table
              :data="tableData2"
              style="width: 100%"
              row-class-name="tableRow"
            >
              <el-table-column label="任务类型" sortable align="center" width="180">
                <template slot-scope="scope">
                  <div @click="todo(scope.row)">
                    <img :src="scope.row.icon" alt class="icon">
                    <span style="margin-left: 0.1rem">{{ scope.row.type }}</span>
                    <p class="look">查看明细 ></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="任务名称" sortable align="center" width="180"></el-table-column>
              <el-table-column prop="date" label="任务周期" sortable align="center"></el-table-column>
              <el-table-column prop="todoStatus" label="完成状态" sortable align="center"></el-table-column>
              <el-table-column prop="taskStatus" label="任务状态" align="center"></el-table-column>
              <el-table-column prop="pancel" label="操作" align="center"></el-table-column>
            </el-table>

          </div>

        </el-tab-pane>
      </el-tabs>
    </section>

    <prediction-task :my-survey-detail="mySurveyDetail"  :edit-able="editAble" :state.sync="isShowTask" @completeTask="completeTask" v-on:close="handlePredictionClose"></prediction-task>

    <content-task-detail  :state="contentTaskShow"  @completeTask="completeTask" :task-result-id="taskresultId" v-on:close="handleContentTaskClose" ></content-task-detail>

    <upload :state="uploadShow" :taskresult-id="taskresultId"  @completeTask="completeTask" v-on:close="handleUploadClose" />
  </div>
</template>

<script>

  import task1 from '@/assets/images/icon/task1.png'
  import task2 from '@/assets/images/icon/task2.png'
  import task3 from '@/assets/images/icon/task3.png'
  import task4 from '@/assets/images/icon/task4.png'
  import task5 from '@/assets/images/icon/task5.png'

  import t1 from '@/assets/images/icon/t1.png'
  import t2 from '@/assets/images/icon/t2.png'
  import t3 from '@/assets/images/icon/t3.png'
  import t4 from '@/assets/images/icon/t4.png'
  import t5 from '@/assets/images/icon/t5.png'
  import t6 from '@/assets/images/icon/t6.png'
  import t7 from '@/assets/images/icon/t7.png'
  import t8 from '@/assets/images/icon/t8.png'
  import t9 from '@/assets/images/icon/t9.png'
  import t10 from '@/assets/images/icon/t10.png'
  import t11 from '@/assets/images/icon/t11.png'
  import PredictionTask from '../prediction'
  import Upload from '../../../student/course/works/upload.vue'


  import LoadingPage from '../../../common/loadingPage.vue'


  import ContentTaskDetail from '../../../student/course/works/contentTaskDetail.vue'

  import { myTaskResultDetailApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'


  import { myTaskListApi } from 'api/api'

  import { myStartTaskApi } from 'api/api'



  import axios from 'axios'

  export default {

    name: 'Trends',

    data () {
      return {

        contentTaskShow:false,

        myTasks:{},
        taskresultId:"",
        mySurveyDetail:{},
        editAble:false,
        loading: false,
        uploadShow: false,

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
        task1,
        task2,
        task3,
        task4,
        task5,


        acttype:"",
        completeStatus:"",
        sponsorId:"",
        rangeType:"",

        pageSize:10,
        pageNo:1,
        orderField:"",
        orderType:"",



        acttypeStart:"",
        completeStatusStart:"",
        rangeTypeStart:"",
        pageSizeStart:10,
        pageNoStart:1,
        orderFieldStart:"",
        orderTypeStart:"",




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
            value: '0',
            label: '未完成'
          },
          {
            value: '1',
            label: '已完成'
          }
        ],
        timerOptions: [
          {
            value: '1',
            label: '1-3天'
          },
          {
            value: '2',
            label: '3-7天'
          },
          {
            value: '3',
            label: '7-30天'
          },
          {
            value: '4',
            label: '1月-3月'
          }
        ],
        tableData1: [],
        tableData2: [],
        isShowTask: false,


        task2Template:{
          date: '2019/03/05-2019/05/08',
          name: '',
          type: '',
          todoStatus: '',
          taskStatus: '',
          pancel: '',
          icon: t4
        },

        task1Template:{
          date: '2019/03/05-2019/05/08',
          name: '',
          type: '',
          typeOption:'',
          todoStatus: '',
          taskStatus: '',
          pancel: ' >',
          completeStatus: '0',
          icon: t4,
          acttype: "",
          id:1
        }
      }
    },

    created(){

      this.getMyTaskList()
      this.getMyStartTaskList()
    },
    methods: {

      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },

      completeTask (taskresultId){

        console.log("this.taskresultId === " + taskresultId)

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
          acttype:this.acttypeStart,
          completeStatus:this.completeStatusStart,
          pageSize:10,
          pageNo:this.pageNoStart,
          orderField:this.orderFieldStart,
          orderType:this.orderTypeStart

        }

        axios.post(myStartTaskApi, params,{
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


                let curTaskResult = this.deepCloneUtil(this.task2Template)


                curTaskResult.date = curTask.datefromStr + '-' + curTask.datetoStr
                curTaskResult.name =  curTask.name



                if(curTask.acttype == 'TEST'){
                  curTaskResult.type =  '测试'
                } else if(curTask.acttype == 'QA'){
                  curTaskResult.type =  '调用问卷库'
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

                curTaskResult.pancel = ""
                if(curTask.taskstatus == 0){

                  curTaskResult.taskStatus =  '未启动'

                } else if(curTask.taskstatus == 1){

                  curTaskResult.taskStatus =  '执行中'

                } else if(curTask.taskstatus == 2){

                  curTaskResult.taskStatus =  '已关闭'
                  curTaskResult.pancel =  '删除'

                }




                curTaskResult.completeStatus =  curTask.completeStatus

                // if(curTask.taskInfo.sponsor){
                //   curTaskResult.taskStatus =  curTask.taskInfo.sponsor.name
                // }

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
        console.log("=============")
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

      openNewPage(urlPath){

        let routeData = this.$router.resolve({
          path: urlPath
        });
        window.open(routeData.href, '_blank');

        //window.open(window.location.origin + '/courseware/'+item.id+'?type=studentTask')
      },

      getMyNextTaskList(){
        this.pageNo = this.pageNo + 1
        this.getMyTaskList()
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

        console.log("==========================")
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
        console.log(tab, event)
      },
      handleConditionChange() {
        this.pageNo = 1
        this.tableData1 = []
        this.getMyTaskList()

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
      }
    },
    components: {
      PredictionTask,
      Upload,
      ContentTaskDetail,
      LoadingPage
    }
  }
</script>

<style lang="scss" scoped>


  .loader-btn-wraper {
    margin: 0.2rem 0;
    text-align: center;
    height: 0.34rem;
    .load-btn {
      display: inline-block;
      width: 1.2rem;
      height: 0.34rem;
      line-height: 0.32rem;
      text-align: center;
      background-color: transparent;
      border: 0.01rem solid #ccc;
      border-radius: 0.17rem;

      color: #999;
      font-size: 0.13rem;
      font-family: 'MicrosoftYaHei';
      cursor: pointer;
    }
  }

  .trends {
    flex: 1;
    height: auto;
    width: 11.85rem;
    margin: 0.4rem 0 0 0.2rem;
    background-color: #fff;
    border-radius: 6px;

    /*.more{*/
    /*  display: block;*/
    /*  width: 1.2rem;*/
    /*  height: .34rem;*/
    /*  line-height: .32rem;*/
    /*  text-align: center;*/
    /*  background-color: transparent;*/
    /*  border: .01rem solid #ccc;*/
    /*  border-radius: .17rem;*/
    /*  color: #999;*/
    /*  font-size: .13rem;*/
    /*  font-family: MicrosoftYaHei;*/
    /*  cursor: pointer;*/
    /*  margin: .2rem auto;*/
    /*}*/

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
    background: rgba(248, 248, 248, 1);
  }
  .trends /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: none;
    color: #f79727;
    border-right: 1px solid rgba(228, 232, 237, 1);
    border-left: 1px solid rgba(228, 232, 237, 1);
  }
  .trends /deep/ #tab-1.is-active {
    background: #fff url("../../../../assets/images/icon/t11.png") no-repeat;
  }
  .trends /deep/ #tab-2.is-active {
    background: #fff url("../../../../assets/images/icon/t8.png") no-repeat;
  }
  .search-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 0.2rem;
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
    /*overflow: auto;*/
    // max-height: 5rem;
    /*max-height: calc(100vh - 2.3rem);*/
    .icon {
      width: 0.16rem;
      height: 0.16rem;
      display: inline-block;
      vertical-align: middle;
      margin-top: -0.05rem;
    }
  }
  .table-wrap /deep/ .el-table__body-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 6.6rem;
  }
  .table-wrap /deep/ .el-table td.is-center:nth-of-type(1),
  .el-table th.is-center:nth-of-type(1) {
    text-align: left;
    padding-left: 0.43rem;
    box-sizing: border-box;
  }
</style>
