<template>
  <div class="courseware">
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <div class="taskleft">
      <div class="backclass" v-if="$route.query.type !== 'teacherTask'" @click="goback">
      </div>
      <div class="step"  ref="stepImgParent" v-if="showPPT" >
        <div ref="stepImg" class="stepimg" >
          <!-- <img class="step-content" v-if="chapterPPTs.length > 0" :style="imgClacStyle" :src="chapterPPTs[page].fileurl"> -->
           <img class="step-content" v-if="chapterPPTs.length > 0" :style="imgClacStyle" :src="chapterPPTs[page].fileurl" ref="stepImgchild" >
        </div>
      </div>
      <div class="stepbut">
        <button class="pre" :class="{'active':page === 1}" @click="previousPage()">上一页</button>
        <span class="pages">
              <var>{{page}}</var>/{{chapterPPTs.length-1}}
            </span>
        <button class="next" :class="{'active':page === (chapterPPTs.length-1)}" @click="nextPage()">下一页</button>
        <div class="allPrint" @click="screenF">
          <img :src="fullShow ?closePrint:allPrint">
          <span>{{fullShow ? '退出全屏' : '全屏' }}</span>
        </div>
      </div>
    </div>
    <hgroup :class="{'active':isHidden}" >
     <div><p>本课时任务</p></div>
      <draggable element="ul" class="task" @change="log" v-model="computedTask" draggable=".task-item">

        <li class="task-item" v-for="(item, index) in computedTask" :key="index">

          <h4 :class="item.acttype + '-task'" >
            <!-- <span class="task-item__title" v-show='!isHidden'>{{ item.name }}</span><el-tooltip popper-class="hoverTip" class="item" effect="dark" :content="item.name" placement="bottom">-->
              <el-button class="task-item__title"  @click="showTeacherDetail(item)">{{item.name}}</el-button>
<!--            </el-tooltip>-->

            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="showTeacherDetail(item)" v-if="item.completeStatus==='0' && $route.query.type === 'teacherTask' " >查看</span>

            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="showDetail(item)" v-else-if="item.completeStatus==='1' && $route.query.type === 'studentTask' " >查看结果</span>

           
<!--            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="openNewPage('/student/task')"   v-else-if="$route.query.type === 'studentTask'" >去完成</span>-->
            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="todo(item)"   v-else-if="item.completeStatus==='0' && $route.query.type === 'studentTask' " >去完成</span>
            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn"    v-else-if="(item.completeStatus==='' || item.completeStatus==null) && $route.query.type === 'studentTask' " >未开始</span>
             <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="deleTeacherTask(item,index)" v-else-if="$route.query.type === 'teacherTaskDelete' && item.custActivity" >删除</span>
             <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn"  v-else-if="$route.query.type === 'teacherTaskDelete' && item.courseTask" @click="showTeacherDetail(item)">查看</span>
            <span :class="[item.type, {'hidden':isHidden}]" class="task-item__btn" @click="showDetail(item)" v-else >查看</span>


          </h4>

        </li>

      </draggable>

      <img :class="['bottom',{'hidden':isHidden}]" @click="changeIsHidden" src="../../assets/images/icon/icon_open.png" alt>
      <ul class="operation" v-if="$route.query.type === 'teacherTaskDelete'">
        <li class="edit" v-on:click="saveTaskInfo">
            <span>
              <i class="el-icon-check"></i>分配到班级
            </span>
        </li>
        <li class="add" @click="addworks">
            <span>
              <i class="el-icon-plus"></i>添加任务
            </span>
        </li>
      </ul>
    </hgroup>

    <popup-modal v-model="isShowSaveTask">
      <save-task @taskClose="handleTaskClose" @confirmDel='confirmDel'></save-task>
    </popup-modal>

    <delete-work :state='isdelete' @close='handleClose' @confirmClose="confirmClose"></delete-work>

    <add-works :state='addwork' @close='addworkClose' @handleJump='jump' @handleJump2='jump2'></add-works>
    <teacher-editor :state='editor' @close='editorClose' @closeOption="closeOptionEditor"></teacher-editor>

    <content-task-detail  :state="contentTaskShow"  @completeTask="completeTask" :task-result-id="taskresultId" v-on:close="handleContentTaskClose" :contentTask.sync="contentTaskDetails"></content-task-detail>

    <!-- 任务弹窗区域 -->
    <prediction-task :my-survey-detail="mySurveyDetail"  :edit-able="editAble" @completeTask="completeTask" :state.sync="isShowTask" v-on:close="handlePredictionClose"></prediction-task>

    <upload v-if="uploadShow" :state="uploadShow" :taskresult-id="taskresultId" @completeTask="completeTask" v-on:close="handleUploadClose" /></upload>
    <upload-result v-if="uploadShowHistory" :state="uploadShowHistory" :taskresult-id="taskresultId"  @completeTask="completeTask" v-on:close="handleUploadHistoryClose" /></upload-result>
    <!-- 优势打卡弹框 -->
    <sign-dialog :state='isSignDialog' @close='signDialogClose' @closeOnly="signDialogCloseOnly"></sign-dialog>
   <!-- 选择班级弹框 -->
   <select-class v-on:close="handleClassClose" ref="ClassBeginDialog" :state.sync="isClassDialog" ></select-class>
   <!-- 优势打卡评价，已完成状态 弹框 -->
    <punch-card :state="isShowPanchCard"  :status="punchStatus" @close="parentClose"  :taskresultId="taskresultId"  :ATTENDEVAL="ATTENDEVAL"></punch-card>
  </div>

</template>

<script>

  import ContentTaskDetail from '../student/course/works/contentTaskDetail.vue'
  import PunchCard from "@/components/advantagePunchCard";
  import PredictionTask from '../teachers/course/prediction'
  import Upload from '../student/course/works/upload.vue'
  import LoadingPage from '../common/loadingPage.vue'
 
  import UploadResult from '../student/course/works/uploadResult.vue'
  import SignDialog from '@/components/signdialog'
  import selectClass from "./selectClass";

  import { studentChapterDetailApi } from 'api/api'


  import { studentChapterTaskApi } from 'api/api'

  import { teacherChapterTaskApi } from 'api/api'
  import { myTaskResultAnswerDetailApi } from 'api/api'
  import { myTaskResultDetailApi } from 'api/api'
  import { createContentTaskApi } from 'api/api'
  import { taskaddApi } from 'api/api'
  import { teacherTaskDeleteApi } from 'api/api'
  import { teacherTaskOrderApi } from 'api/api'
  import axios from 'axios'

  import screenfull from "screenfull";
  import material from "assets/images/student/material.png";
  import details1 from "assets/images/details1.png";
  import allPrint from "assets/images/48.png";
  import closePrint from "assets/images/49.png";
  import PopupModal from '@/components/popup';
  import SaveTask from "@/page/teachers/course/saveTask";
  import DeleteWork from "@/page/teachers/course/deleteWork/deleteWork";
  import AddWorks from "@/page/teachers/course/addworks/addWorkTypes";
  import TeacherEditor from "@/page/ueditor/ueditor";



  import draggable from "vuedraggable";

  export default {
    name: "tasks",

    data() {
      return {
        isSignDialog: false,
        contentTaskShow:false,

        isShowPanchCard:false,
        ATTENDEVAL:false,
        punchStatus:'2',

        uploadShowHistory:false,
        isTeacher:true,

        isShowTask: false,
        myTasks:{},
        taskresultId:"",
        mySurveyDetail:{},
        editAble:false,
        uploadShow: false,
        isClassDialog:false,
        contentTaskDetails:false,

        chapterPPTs :[],
        showPPT: false,

        editor: false,
        addwork: false,
        isdelete: false,
        loading: true,
        material,
        details1,
        allPrint,
        closePrint,
        imgClacStyle: {},
        fullShow: false,
        page: 1,
        isHidden: false,
        isShowSaveTask: false,
        teacherTask: [],
        studentTask: [],
        classTask: [],
        newTeacherTask:'',
        deletId:'',
        itemIndex:'',
        chapterName:'',
        saveCard:false,
        number:0

      };
    },
    computed: {
      showCloseIcon() {
        let queryType = this.$route.query.type;
        if (queryType === 'teacherTask') {
          return false;
        } else {
          return true;
        }
      },
      computedTask: {
        get() {
          let queryType = this.$route.query.type;
          // return queryType === 'teacherTask' ? this.teacherTask : (this.$route.query.type === 'classTask' ? this.classTask : this.studentTask)
          return ('teacherTaskDelete'.indexOf(queryType)!=-1) ? this.teacherTask : (this.$route.query.type === 'classTask' ? this.classTask : this.studentTask)
        },
        set(newValue) {
          return newValue
        }
      }
    },
    created() {
      let curuser = JSON.parse(localStorage.getItem("loginuser"))
      if (curuser.teacher){
        this.isTeacher = true
      }

      let _this = this;
      setTimeout(() => {
        _this.loading = false;
      }, 100);
      this.getCourseWareDetail()
    },
    updated() {
      this.setImgStyle()
    },
    methods: {
      handleUploadHistoryClose(){
        this.taskresultId = ""
        this.uploadShowHistory = !this.uploadShowHistory;
      },
      handleUploadClose(){
        this.taskresultId = ""
        this.uploadShow = !this.uploadShow;
      },
      parentClose() {
        this.isShowPanchCard = false;
      },
      completeTask (taskresultId){


        let curTasks = this.computedTask


        if(curTasks){
          for (let j = 0; j < curTasks.length; j++) {
            let curTask = curTasks[j]
            if(curTask.taskresultId != null && curTask.taskresultId == taskresultId){

              curTask.completeStatus = '1'
              break;
            }
          }
        }

      },
      handleClassClose(){

      },
      saveTaskInfo(){
         this.isClassDialog = true;
         let computedTask = this.computedTask;
         let ids = []
         for(let i=0;i<computedTask.length;i++){
           ids.push(computedTask[i].id)
         }
         let params ={
          ids : ids,
          classChapterId:this.$route.params.classChapterId
         }
         axios.post(teacherTaskOrderApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {
            this.$message(res.data.message)
          })
       //  let computedTask = this.computedTask;   批量添加删除暂时修改
       //  let teacherTask = this.teacherTask;
       //  let shiftList = [];
       //  let addList = [];
       //  for(let i =0 ;i<computedTask.length;i++){
       //    if(computedTask[i].id){
       //      shiftList.push(i);
       //     }else{
       //      addList.push(computedTask[i])   
       //     }
       //  }
       //  if(addList.length){
       //    // this.isPublishTask = true;
       //    this.isClassDialog = true;
       //    // this.$refs.ClassBeginDialog.show();
       //    for(let i in addList){
       //      this.saveTask(computedTask[i],i)
       //    }
       //  }
       //  var id = ''
       // if(shiftList.length<teacherTask.length){
       //    let length = teacherTask.length - shiftList.length;
       //    for(let i =0 ;i<length;i++){
       //      id += teacherTask[shiftList.length+i].id+','
       //      // deletId =

       //      this.deletTask(teacherTask[shiftList.length+i].id)
       //    }
          
       // }
       // console.log(id)
      },
      deletTask(id){
       let params = {
          taskInfoId :id,
        }
        axios.post(teacherTaskDeleteApi, params,{
              headers: {
                'sid': localStorage.getItem("sid")
              }
            }).then(res => {
              let code = res.data.success
              if(code){
                this.$message('删除成功')
                // this.computedTask[i].id = res.data.result
              } else {
                this.$message(res.data.message)
              }

            })
      },
      saveTask(item,i){
        let params = {
            acttype:'CONTENT',
            classChapterId:this.$route.params.classChapterId,
            name:item.name,
            actcontent:item.actcontent,
            fileurl:item.fileurl,
            bizId:item.bizId,
          }
          if(item.acttype == 'BEST'){
            params.acttype = 'BEST',
            params.actcontent='',
            params.fileurl = '',
            params.bizId = ''
          }
          this.loading = true;
          axios.post(taskaddApi, params,{
              headers: {
                'sid': localStorage.getItem("sid")
              }
            }).then(res => {
              let code = res.data.code
              if(code =='success'){
                this.$message('添加成功')
                this.getCourseWareDetail()
                // let length = this.computedTask.length-1
                //  this.computedTask[length].id = res.data.result
                
                // this.computedTask[i].id = res.data.result
              } else {
                this.$message(res.data.message)
              }
              setTimeout(() => {
                this.loading = false;
              }, 100);

            })
      },
      handlePredictionClose(){
        this.mySurveyDetail = {}
      },
      signDialogClose(){
        this.isSignDialog = false
        this.saveCard = true;
        let name = ''; //优势打卡文件名字
        let orderNum = this.number?"("+this.number+")":'';
        if(this.chapterPPTs[0] && this.chapterPPTs[0].filename && this.chapterPPTs[0].filename.length){
          let lastPoint =this.chapterPPTs[0].filename.lastIndexOf('.')
          if(lastPoint>-1){
            let newName = this.chapterPPTs[0].filename.substring(0,lastPoint);
             name = newName.length>6 ? (newName.substring(0,6)+orderNum) : newName;
          }else{
             name = this.chapterPPTs[0].filename>6 ? (this.chapterPPTs[0].filename.substring(0,6)+orderNum) : this.chapterPPTs[0].filename;
          }
        }else{
           name = `优势打卡${orderNum}`
        } 
        this.number = this.number+1;
        let newTeacherTask ={
          name :name,
          actcontent:'',
          acttype : 'BEST'
        }
        setTimeout(()=>{
          // this.computedTask.push(newTeacherTask)
          this.saveTask(newTeacherTask)
        }, 0)
        // this.isPublishTask = true
      },
      signDialogCloseOnly(){
         this.isSignDialog = false
      },
      getTeacherTaskResult(taskResultId, editAble){
        this.loading = true;
        this.editAble = editAble

        let params = {

          id:taskResultId

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
        }


      },

      showTeacherDetail(item) {
        if(item.acttype == 'TEST'){
          this.getTeacherTaskResult(item.id,false)

        } else if(item.acttype == 'QA'){


          this.openNewPage("/questionnaire/teacher/" + item.id)
        } else if(item.acttype == 'BEST'){
            this.taskresultId = item.id;
            this.isShowPanchCard = true;
            this.ATTENDEVAL = false;
            this.punchStatus = '3';
        } else if(item.acttype == 'CONTENT'){
           this.changeContentTaskDetail(item.id)

        } else if(item.acttype == 'WORKSUPLOAD'){
          this.changeUpload(item.id)
        } else if(item.acttype == 'ATTENDEVAL'){

        }

      },

      showDetail(item) {


        if(item.acttype == 'TEST'){
          this.getMyTaskResult(item.taskresultId,false)

        } else if(item.acttype == 'QA'){
          this.openNewPage("/questionnaire/false/" + item.taskresultId)
        } else if(item.acttype == 'BEST'){
          this.taskresultId = item.id;
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
      deleTeacherTask(item,index){
        this.isdelete = true;
        this.itemIndex = index
        this.deletId = item.id ? item.id:''
      },
      changeContentTaskDetail(taskresultId){
        this.taskresultId = taskresultId;
        this.contentTaskDetails = true;
        this.contentTaskShow = !this.contentTaskShow;
      },
      handleContentTaskClose(){

        this.taskresultId = ""
        this.contentTaskShow = !this.contentTaskShow;
      },

      changeUpload(taskresultId){
        // this.taskresultId = taskresultId
         this.taskresultId = ''
        this.uploadShow = !this.uploadShow;
      }
      ,
      todo(item) {


        if(item.acttype == 'TEST'){
          this.getMyTaskResult(item.taskresultId, true)

        } else if(item.acttype == 'QA'){
          this.openNewPage("/questionnaire/false/" + item.taskresultId)
        } else if(item.acttype == 'BEST'){
          this.$router.push({path:'/superiority-clockin/empty'})
        } else if(item.acttype == 'CONTENT'){
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

            let code = res.data.success;
            
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

      changeUploadHistory(taskresultId){
        this.taskresultId = taskresultId
        this.uploadShowHistory = !this.uploadShowHistory;
      },
      openNewPage(urlPath){
        let routeData = this.$router.resolve({
          path: urlPath
        });
        window.open(routeData.href, '_blank');

        //window.open(window.location.origin + '/courseware/'+item.id+'?type=studentTask')
      },
      nextPage(){
        if(this.page < (this.chapterPPTs.length-1)){
          this.page = this.page +1;
        }
        this.setImgStyle();
      },

      previousPage(){
        if(this.page > 1){
          this.page = this.page -1;
        }
        this.setImgStyle();

      },

      // studentChapterTaskApi


      getCourseWareDetail(){
        let classChapterId = this.$route.params.classChapterId

        let params = {
          classChapterId: classChapterId
        }

        axios.post(studentChapterDetailApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success' && res.data.result){
            let chapterPPTs =  res.data.result.datalist
            this.chapterPPTs = res.data.result.datalist
            this.showPPT = true
            this.page = 1

          } else {
            this.chapterPPTs = []
          }

        })


        axios.post(studentChapterTaskApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
         
          let code = res.data.code
          if(code == 'success' && res.data.result){
            this.studentTask = res.data.result.datalist||[]

          } else {
            this.studentTask = []
          }

        })

        axios.post(teacherChapterTaskApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          
          let code = res.data.code
          if(code == 'success' && res.data.result){
            this.teacherTask = res.data.result.datalist
            // if(res.data.result.datalist && res.data.result.datalist.length){
            //    this.chapterName = res.data.result.datalist[0].chapter.name;
            // }
           
          } else {
            this.teacherTask = []
          }

        })

      },


      setImgStyle() {
        if (!this.$refs.stepImgParent) {
          return;
        }
        let img = this.$refs.stepImgParent.querySelector("img");
        // let img = this.$refs.stepImgchild
        if (!img) {
          return;
        }

        let parentWidth = this.$refs.stepImgParent.offsetWidth - 3;
        let parentHeight = this.$refs.stepImgParent.offsetHeight - 3;
        let orgPercent = parentWidth / parentHeight;
        let that = this;
        var imgtemp = new Image();
        imgtemp.src = img.src;
        imgtemp.onload = function() {
          let realWidth = this.width;
          let realHeight = this.height;
          let upPercent = realWidth / realHeight;
          if (upPercent < orgPercent) {
            that.$refs.stepImgchild.style.width ="auto";
            that.$refs.stepImgchild.style.height = parentHeight + "px"
            // that.imgClacStyle = { width: "auto", height: parentHeight + "px" };
          } else {
            that.$refs.stepImgchild.style.height ="auto";
            that.$refs.stepImgchild.style.width = parentWidth + "px"
            // that.imgClacStyle = { height: "auto", width: parentWidth + "px" };
          }
        };
      },
      log: function (evt) {
        let el = evt.moved
        let list = this.computedTask
        list.splice(el.oldIndex, 1)
        list.splice(el.newIndex, 0, el.element)
        this.computedTask = list
      },
      handleTaskClose(bool) {
        this.isShowSaveTask = bool;
      },
      handleTaskList(type) {
        let queryType = this.$route.query.type;
        if (queryType === 'teacherTask') {
          if (type === 'works') {
            this.isShowSaveTask = !this.isShowSaveTask;
          }
        }
      },
      goback() {
        screenfull.exit();
        this.$router.go(-1);
      },
      screenF() {
        this.fullShow = !this.fullShow;
        screenfull.toggle();
      },
      changeIsHidden() {
        this.isHidden = !this.isHidden;
      },
      handleClose() {
        this.isdelete = false
      },
      confirmClose(){
        this.computedTask.splice(this.itemIndex,1)
        this.deletTask(this.deletId)
      },
      confirmDel() {
        this.isdelete = true
      },
      addworkClose() {
        this.addwork = false
      },
      addworks() {
        this.addwork = true
      },
      editorClose() {
        this.editor = false;
        this.newTeacherTask ={
          name :localStorage.getItem('taskName'),
          actcontent:localStorage.getItem('taskContent'),
          fileurl:localStorage.getItem('taskFileUrl'),
          bizId:localStorage.getItem('taskFileId'),
        } 
        setTimeout(()=>{
          // this.computedTask.push(this.newTeacherTask)
          this.saveTask(this.newTeacherTask)
        }, 0)
      },
      closeOptionEditor(){
        this.editor = false;
      },
      jump() {
        this.editor = true
        this.addwork = false
      },
      jump2(){
        this.isSignDialog = true
        this.addwork = false;
      },
    },
    components: {
      PopupModal,
      SaveTask,
      DeleteWork,
      AddWorks,
      TeacherEditor,
      draggable,
      ContentTaskDetail,
      PredictionTask,
      UploadResult,
      SignDialog,
      Upload,
      LoadingPage,
      selectClass,
      PunchCard
    }
  };
</script>

<style lang="scss" scoped>
.courseware {
  background: #eef2f5;
  border: 0.01rem solid rgba(228, 232, 237, 1);
  border-radius: 0.06rem;
  padding: 0.2rem 0 0.2rem 0.2rem;
  display: flex;
  min-height: 100vh;
  position: relative;
  width: 13.66rem;
  max-width: 13.66rem;
  min-width: 12.88rem;
  margin: 0 auto;
  .taskleft {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.06rem;
    padding: 0.2rem;
    margin-right: 0.12rem;
    // align-items: stretch;
  }
  .step {
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(228, 232, 237, 1);
    border-radius: 0.06rem;
    flex: 1;
    height: 5.94rem;
    // width: 10.18rem;
    // min-width: 10.18rem;
    .stepimg {
      // max-height: 100%;
      // width: auto;
      // max-width: 100%;
      margin: 0 auto;
      width: 9.92rem;
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        max-height: 100%;
        width: auto;
        max-width: 100%;
        margin: 0 auto;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
      }
      .step-content {
        max-width: 100%;
      }
    }
  }
  .stepbut {
    position: relative;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.19rem;
    width: 100%;
    button {
      margin: 0 0.2rem;
      cursor: pointer;
      width: 1.7rem;
      height: 0.44rem;
      border-radius: 0.04rem;
      font-size: 0.16rem;
      border: 0.01rem solid rgba(0, 0, 0, 1);
      background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
      );
      border: none;
      color: #fff;
    }
    .active {
      background: transparent;
      border: rgba(255, 129, 38, 1) 0.01rem solid;
      color: #ff8126;
    }
    .pages {
      font-size: 0.12rem;
      color: #666;
      var {
        color: #f79727;
      }
    }
    .allPrint {
      position: absolute;
      color: #666;
      font-size: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      height: 0.2rem;
      line-height: 0.2rem;
      cursor: pointer;
      img {
        width: 0.2rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.18rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .backclass {
    color: #666666;
    font-size: 0.16rem;
    line-height: 0.16rem;
    height: 0.16rem;
    cursor: pointer;
    margin-bottom: 0.18rem;
  }
}
hgroup.has-btn {
  display: flex;
  flex-direction: column;
  .task {
    flex: 1;
  }
}
hgroup {
  flex: 1;
  width: 100%;
  max-width: 2.75rem;
  min-height: 100%;
  padding-bottom: 0.2rem;
  float: right;
  border-left: 0.01rem solid rgba(228, 232, 237, 1);
  transition: width 0.3s;
  background-color: #fff;
  position: relative;
  /*padding-bottom: 2.05rem;*/
  & > div {
    padding: 0 0.2rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background-image: url("../../assets/images/task_bg.png");
    display: flex;
    font-size: 0.18rem;
    color: #fff;
    font-weight: 600;
    p {
      width: 100%;
      text-align: center;
    }
  }
  & > .task{
    overflow: hidden;
    height: 70%;
    box-sizing: border-box;
    width:100%;
  }
  & > .task > .task-item {
    padding: 0.2rem 0.1rem 0 0.2rem;
    h4 {
      display: flex;
      justify-content: space-between;
      height: 0.3rem;
      line-height: 0.3rem;
      font-weight: 600;
      text-indent: 0.26rem;
      background-size: 0.16rem 0.16rem;
      background-position: 0 0;
      background-repeat: no-repeat;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 0.16rem;
        width: 0.16rem;
      }


      &.TEST-task:after {
        background-image: url("../../assets/images/icon/task1.png");
      }
      &.QA-task:after {
        background-image: url("../../assets/images/icon/task2.png");
      }
      &.BEST-task:after {
        background-image: url("../../assets/images/icon/task3.png");
      }
      &.CONTENT-task:after {
        background-image: url("../../assets/images/icon/task4.png");
      }
      &.WORKSUPLOAD-task:after {
        background-image: url("../../assets/images/icon/task5.png");
      }



      &.icon-course:after {
        background-image: url("../../assets/images/icon/icon_course_name.png");
      }
      &.icon-test:after {
        /*background-image: url("../../assets/images/icon/icon_course_content.png");*/
        background-image: url("../../assets/images/icon/icon_course_edit.png");
      }
      &.icon-questionnaire:after {
        content: "";
        background-size: 0.14rem 0.16rem;
        /*background-image: url("../../assets/images/icon/icon_course_look.png");*/
        background-image: url("../../assets/images/icon/icon_course_question.png");
      }
      &.icon-works:after {
        background-size: 0.16rem 0.14rem;
        background-position: 0.01rem 0;
        /*background-image: url("../../assets/images/icon/icon_course_completed.png");*/
        background-image: url("../../assets/images/icon/icon_course_pic.png");
      }
      &.icon-clock:after {
        /*background-image: url("../../assets/images/icon/icon_clock.png");*/
        background-image: url("../../assets/images/icon/icon_course_check.png");
      }
    }
    div {
      background-color: #f2f5f7;
      padding: 0.15rem 0.12rem 0.03rem;
      p {
        display: block;
        font-size: 0.12rem;
        line-height: 0.12rem;
        text-indent: 0.16rem;
        position: relative;
        color: #888;
        margin-bottom: 0.11rem;
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
    max-width: 1.03rem;
    width: 1.03rem;
    padding-bottom: 0;
    // margin-top: 0.28rem;
    background-color: #fff;
    // border: none;
    & > div {
      padding: 0;
      width: 100%;
      height: 0.7rem;
      font-size: 0.14rem;
      text-align: center;
      span:nth-child(2) {
        display: none;
      }
    }
    ul {
      li {
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 0.06rem;
          height: 0.06rem;
          background: rgba(39, 137, 247, 1);
          background: rgba(204, 204, 204, 1);
          border-radius: 50%;
          top: 60%;
          right: 0.29rem;
        }
        b,
        span {
          display: none;
        }
      }
    }
    .operation {
      display: none;
    }
    .bottom {
      display: block;
    }
  }
  .has-btn.task {
  }
  .task {
    overflow: auto;
    margin-right: 0.1rem;
    max-height: calc(100vh - 1.4rem);
    .task-item__title {
      flex: 1;
      text-align: left;
      display: inline-block;
      max-width: 1.45rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 0 0 0.24rem;
      border: none;
      font-size: 12px;
      font-weight: 700;
      &:hover {
        color: #f79727;
        background: #fff;
      }
    }
    .task-item__btn.hidden {
      display: none;
    }
    span.task-item__btn {
      float: right;
      border: 0.01rem solid #ccc;
      border-radius: 0.04rem;
      color: #ccc;
      font-weight: normal;
      text-indent: 0;
      display: inline-block;
      padding: 0.06rem 0.14rem;
      font-size: 0.12rem;
      line-height: 0.12rem;
      margin-top: 0.02rem;
      cursor: pointer;
      &.active {
        border: 0.01rem solid #f79727;
        color: #f79727;
      }
      &:hover {
        border-color: #f79727;
        color: #f79727;
      }
    }
  }
  .operation {
    position: absolute;
    bottom: 0.92rem;
    left: 0.52rem;
    text-align: center;
    span {
      font-size: 0.16rem;
      line-height: 0.42rem;
      display: inline-block;
    }
    i {
      margin-right: 0.1rem;
    }
    .edit,
    .add {
      width: 1.7rem;
      height: 0.44rem;
      box-sizing: border-box;
      border: 0.01rem solid rgba(187, 187, 187, 1);
      border-radius: 0.22rem;
      line-height: 0.42rem;
      text-align: center;
      margin: 0 auto;
      color: #999;
      cursor: pointer;
    }
    .edit {
      border-color: rgba(247, 151, 39, 1);
      color: #f79727;
      margin-bottom: 0.14rem;
    }
  }
  .bottom {
    width: 0.22rem;
    height: 0.14rem;
    position: absolute;
    top: 4rem;
    left: 0.2rem;
    z-index: 10;
    background-color: #fff;
    &.hidden {
      transform: rotate(180deg);
    }
  }
}
</style>
<style lang="scss">
.el-tooltip__popper.is-dark.hoverTip {
  background-color: #f5f6f7;
  color: #666;
  .popper__arrow {
    border-bottom-color: #f5f6f7;
    &:after {
      border-bottom-color: #f5f6f7 !important;
    }
  }
}
</style>
