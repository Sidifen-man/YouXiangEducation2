<template>
  <div class="upload" >


    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog :visible.sync="state" :close-on-click-modal="false" width="6.62rem" :before-close="handleClose">
      <div slot="title" class="uploadHead">
        <h3>已上传作品</h3>
      </div>
      <div class="form-wraper">
        <el-form ref="form" :model="form" label-width="1.2rem">
          <el-form-item label="作品完成日期：">
            <el-date-picker type="date" placeholder="选择日期" disabled v-model="taskDetails.finishdateStr" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="作品名称：">
            <el-input disabled v-model="taskDetails.name"></el-input>
          </el-form-item>
          <el-form-item label="作品介绍：">
            <el-input disabled type="textarea" v-model="taskDetails.worksintro" :rows="4" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="所属课程：">

            <el-input disabled  v-model="taskDetails.course.name"></el-input>
          </el-form-item>

          <el-form-item label="所属课时：">

            <el-input disabled v-model="taskDetails.chapter.name"></el-input>


          </el-form-item>
          <el-form-item label="作品归属：">
            <el-select disabled v-model="taskDetails.workstype" placeholder="请选择小组/个人作品">
              <el-option label="个人" value="1"></el-option>
              <el-option label="小组" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="粘贴URL链接：">
            <el-input disabled v-model="taskDetails.attchurl" placeholder="输入URL链接"></el-input>
          </el-form-item>
          <el-form-item label="查看权限：">
            <el-checkbox-group disabled v-model="taskDetails.ispublic">
              <el-checkbox label="0">仅自己和教师</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="文件上传：">
            <div class="uploadFile">

              <div class="picList" >
                <div class="upok">已上传文件</div>
                <ul>
                  <li>
                    <img :src="taskDetails.thumburl" />
                  </li>
                </ul>
              </div>

            </div>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>

    <div class="deletework"  v-if="deleteShow">
      <el-dialog :visible.sync="deleteShow" :close-on-click-modal="false" width="38%" >
            <span slot="title" class="deletework_title">
              <h3>{{confirmTitle}}</h3>
            </span>
        <div class="content">
          <p>{{confirmMsg}}</p>
          <div class="buttons" v-if="confirmType == 'upload'">
            <button style="cursor:pointer;" @click="closeDeleteDialog">取消</button>
            <button style="cursor:pointer;" @click="createStudentWork" >确认</button>
          </div>
          <div class="buttons" v-if="confirmType == 'error'">
            <button style="cursor:pointer;" @click="closeDeleteDialog">关闭</button>
            <button style="cursor:pointer;" @click="closeDeleteDialog" >确认</button>
          </div>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import icon_course_name from 'assets/images/icon/icon_course_name.png'

  import LoadingPage from '../../../common/loadingPage.vue'

  import { uploadWorksFileApi } from 'api/api'

  import { createStudentWorkApi } from 'api/api'

  import { getUserChapterList } from 'api/api'

  import { getTaskresultDetailApi } from 'api/api'

  import { getUserCourseList } from 'api/api'

  import { getContentTaskDetailApi  } from 'api/api'
  import axios from 'axios'



  export default {
    name: "Upload",
    props:['state', 'taskresultId'],
    components: {
      LoadingPage
    },
    data() {
      return {

        showCreateButton:true,
        taskDetails:{},
        taskresult:{},
        isComplete:false,

        workThumbPath :"",

        confirmType:"",
        confirmTitle:"",
        confirmMsg:"",
        deleteShow:false,

        icon_course_name,
        loading: true,
        deleteShow:false,
        showUploadButton:true,

        courseOptions: [],
        chapterOptions: [],
        isSubmit:false,

        form: {

          taskresultId:"",
          workFileId:"",
          workFileZoomPath:"",
          workFilePath:"",
          courseId:"",
          chapterId:"",

          name: '',
          desc: '',
          date: null,
          cat1: "",
          cat2: "1",
          url: '',
          authority: [],
          // fileList: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      };
    },
    watch: {
      taskresultId (newVal) {
        this.visible = newVal
        this.isSubmit = false
        this.$emit('update:state', newVal)

      },
      state(newVal){
        if(newVal){

          this.getCourseList()
        }
      }
    },
    created() {


      let curuser = JSON.parse(localStorage.getItem("loginuser"))


      if (!curuser.student){
        this.showCreateButton = false
        this.showUploadButton = false
      } else {

      }

      this.getContentTaskDetail()


      let _this = this;
      setTimeout(() => {
        _this.loading = false;
      }, 100);

      // this.getCourseList()
    },
    methods: {

      getContentTaskDetail(){

        let params = {
          taskResultId: this.taskresultId,
          id: this.taskresultId
        }

        axios.post(getContentTaskDetailApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code=='success'){
             console.log(res.data.result.works.course)
            this.taskDetails = res.data.result.works
           
            if(this.taskDetails.ispublic === '0'){
              this.taskDetails.ispublic = ["0"]
            } else {
              this.taskDetails.ispublic = []
            }
            // this.works = res.data.result.works
            // this.fileDetails = res.data.result.datalist

          }

        })

      },
      closeDeleteDialog(){

        this.deleteShow = false

      },

      getTaskresultDetail(){

        let params = {
          taskresultId:this.taskresultId
        }

        axios.post(getTaskresultDetailApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.taskresult = res.data.result
            if(this.taskresult.completeStatus == '1'){
              this.isComplete = true
            }

          }

          console.log("this.courseOptions===" + JSON.stringify(this.courseOptions))

        })

      },
      getCourseList(){

        let params = {

        }

        axios.post(getUserCourseList, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.courseOptions = res.data.result.dataList

          }

          console.log("this.courseOptions===" + JSON.stringify(this.courseOptions))

        })

      },


      getChapterList(courseId){

        let params = {
          courseId: courseId
        }

        axios.post(getUserChapterList, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.chapterOptions = res.data.result.dataList

          }
        })
      },

      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },



      uploadFile(){

        let _this = this
        _this.loading = true;

        let param = new FormData()
        param.append("bizid", "wiiiiiinney")
        param.append("picUrlCreate", this.file)
        console.log(param.get("picUrlCreate"))

        let config = {
          headers: {
            "Content-Type": "multipart/form-data" },
          'sid': localStorage.getItem("sid")

        }
        axios.post(uploadWorksFileApi, param, config).then(function (response){


          if(response.data.success){
            let fileUploadObj = response.data.result

            if(fileUploadObj.bizid =='error'){

              _this.confirmType = "error"
              _this.confirmTitle = "上传失败"
              _this.confirmMsg = "支持PDF,图片格式上传（20M以内），请检查文件格式和大小！"
              _this.deleteShow = true

            } else {
              _this.form.workFileZoomPath = fileUploadObj.thumbUrl
              _this.workThumbPath = fileUploadObj.thumbUrl
              _this.form.workFilePath = fileUploadObj.fileurl

              _this.form.workFileId = fileUploadObj.bizid

              _this.showUploadButton = false
            }


          }

          setTimeout(() => {
            _this.loading = false;
          }, 100);

        }).catch(function (error) {
          console.log(error);

          setTimeout(() => {
            _this.loading = false;
          }, 100);
        });

      },


      confirmCreate(){

        this.confirmType = "upload"
        this.confirmTitle = "创建作品"
        this.confirmMsg = "确认创建作品吗？"
        this.deleteShow = true

      },

      createStudentWork(){

        this.deleteShow = false
        this.loading = true;

        if(this.taskresultId === 'empty'){
          this.form.taskresultId = ""
        } else {
          this.form.taskresultId = this.taskresultId
        }


        let params = this.form

        axios.post(createStudentWorkApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == "success"){


            this.$emit('completeTask', this.taskresultId);

            setTimeout(() => {
              this.handleClose()
            }, 100);
            this.isSubmit = true

          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

          // this.handleClose()

        })

      },

      //createStudentWorkApi
      handleClose() {
        this.$emit('close');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .upload {
    .uploadHead {

      h3 {
        margin-left: 0.2rem;
        font-size: 0.18rem;
      }
    }

    .el-form {
      .el-form-item {
        margin-bottom: 0.14rem;
        textarea {
          height: 1.22rem;
        }
        .el-select {
          width: 100%;
        }
      }
    }

    .uploadFile {
      border:0.01rem solid rgba(220,224,230,1);
      border-radius:0.02rem;
      padding: 0.1rem;
      .but {
        font-size: 0.12rem;
        color: #333;
        height: 0.4rem;
        line-height: 0.38rem;
        box-sizing: border-box;
        background:rgba(245,246,248,1);
        border:0.01rem dashed rgba(228,228,228,1);
        border-radius:0.03rem;
        display: block;
        padding: 0 0.1rem;
        text-align: center;
        img {width: 0.14rem; margin-right: 0.1rem;}
      }
      .but .text {
        display: inline-block;
        vertical-align: middle;
        color: #333;
        font-size: 0.12rem;
        margin: 0;
      }

      .picList {
        padding: 0.15rem 0.05rem;
        font-size: 0;
        background:rgba(245,246,248,1);
        border: 0.01rem dashed rgba(228,228,228,1);
        margin-top: 0.1rem;
        .upok {
          font-size: 0.12rem;
          line-height: 0.12rem;
          margin-bottom: 0.1rem;
          color: #333;
          box-sizing: border-box;
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        li {
          width: 0.56rem;
          height: 0.56rem;
          border: #F79727 0.01rem solid;
          display: inline-block;
          img {
            width: 0.56rem;
            height: 0.56rem;
          }
        }
      }
      .picdes {
        li {
          width: 50%;
          height: auto;
          border:none;
          margin: 0.05rem 0;
        }
      }
      .changeUpdate {
        width: 1.1rem;
        color: #F79727;
        font-size: 0.14rem;
        height: 0.38rem;
        line-height: 0.38rem;
        margin: 0.1rem auto;
        background:rgba(247,151,39,.1);
        border-radius: 0.03rem;
        text-align: center;
      }

      .upok {
        text-align: center;
      }

      .text {
        text-align: center;
        color: #999;
        font-size: 0.12rem;
        line-height: 0.12rem;
        margin-bottom: 0.07rem;
      }
    }

    .uploadSubmit {
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      span {
        font-size: 0.15rem;
        font-weight: bold;
        display: inline-block;
        height: 100%;
        width: 2rem;
        cursor: pointer;
        background:rgba(247,151,39,1);
        border-radius:0.2rem;
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">


  .upload {


    .el-dialog__header {
      padding: 0.2rem;
      height: 0.6rem;
      border-bottom: #E4E8ED 0.01rem solid;
    }
    .el-dialog {
      border-radius: 0.06rem;
    }
    .el-dialog__body {
      padding: 0.22rem 1.62rem 0.2rem 0.41rem;
      .el-form {
        .el-form-item__label {
          color:#666;
          font-size: 0.15rem;
        }
        .el-form-item:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .picList {
    .el-upload-list {
      padding: 0 0 0.05rem;
      font-size: 0;
      background:rgba(245,246,248,1);
      border: 0.01rem dashed rgba(228,228,228,1);
      // min-height: 0.58rem;
      border-top: none;
      border-radius: 0.03rem;
      font-size: 0;
      line-height: 0;

      li {
        width: 0.56rem;
        height: 0.56rem;
        margin: 0;
        padding: 0;
        border: #F79727 0.01rem solid;
        display: inline-block;
        border-radius: 0;
        margin-bottom: 0.1rem;
        img {
          width: 0.56rem;
          height: 0.56rem;
        }
      }
      li{
        margin-left: 0.05rem;
      }

      .el-upload-list__item-thumbnail {
        margin-left: 0;
      }
      .el-upload-list__item-name {
        display: none;
      }
    }
  }

  .deletework {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
  }
  .deletework /deep/ .el-dialog__header {
    height: 0.6rem;
    border-bottom: 0.01rem solid rgba(228, 232, 237, 1);
    padding: 0.22rem 0.3rem;
    box-sizing: border-box;
    .deletework_title {
      font-size: 0.16rem;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      h3 {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 0.26rem;
      }
    }
  }
  .deletework /deep/ .el-dialog__body {
    padding: 0.29rem 1.06rem 0.26rem;
  }
  .deletework {
    .content {
      img {
        width: 0.82rem;
        height: 0.82rem;
        display: block;
        margin: 0 auto;
        background-color: rgb(253, 246, 236);
        border-radius: 0.1rem;
      }
      p {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        // line-height: 0.26rem;
        text-align: center;
        margin: 0.25rem 0;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          width: 1.2rem;
          height: 0.36rem;
          border: 0.01rem solid rgba(204, 204, 204, 1);
          border-radius: 0.04rem;
          color:rgba(153,153,153,1);
          font-size: 0.14rem;
          &:nth-of-type(2){
            background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
            color: #fff;
            border: none;
          }
        }
      }
    }
  }
</style>
