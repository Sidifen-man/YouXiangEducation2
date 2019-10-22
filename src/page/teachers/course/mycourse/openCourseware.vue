<template>
  <div>
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog
      class="open-class-dialog"
      :close-on-click-modal="false"
      :visible.sync="showClass"
      :before-close="handleClose"
      width="4.96rem">
      <div class="header-wraper" slot="title">
        <div class="title">班级列表</div>
        <el-input placeholder="搜索班级" class="search-box" @input="searchClass" v-model="className" suffix-icon="el-icon-search"></el-input>
      </div>
      <ul class="class-list">
        <li
          v-for="(item, index) in classList"
          :key="index"
          class="class-item">
          <span class="class-item__title">{{item.classInfoName}}</span>
          <span v-if="item.coursewareStatus != '1'"
            class="class-item__btn"
            :class="{'is-inclass': item.coursewareStatus != '1'}"
            @click="handleClassBegin(item)">
            <img :src="item.coursewareStatus != '1' ? openCourseware: lock"/>
          </span>

          <span v-if="item.coursewareStatus == '1'"
            class="class-item__btn"
            :class="{'is-inclass': item.coursewareStatus != '1'}">
            <img :src="item.coursewareStatus != '1' ? openCourseware: lock"/>
          </span>
        </li>
      </ul>
      <div class="page-btn">
        <span class="prev-btn" @click="goPage(-1)">上一页</span>
        <span class="next-btn" @click="goPage(1)">下一页</span>
      </div>

    </el-dialog>

    <div class="deletework"  v-if="deleteShow">
      <el-dialog :visible.sync="deleteShow" :close-on-click-modal="false" width="38%" >
            <span slot="title" class="deletework_title">
              <h3>开放课件</h3>
            </span>
        <div class="content">
          <!--          <img src="@/assets/images/teacher/21.png" alt>-->
          <p>确认开放课件吗？</p>
          <div class="buttons">
            <button style="cursor:pointer;" @click="closeDeleteDialog">取消</button>
            <button style="cursor:pointer;" @click="startEducation" >确认</button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  import LoadingPage from '../../../common/loadingPage.vue'
  import beginClass from 'assets/images/icon/begin-class.png'
  import inclass from 'assets/images/icon/inclass.png'

  import openCourseware from 'assets/images/teacher/openCourseware.png'
  import lock from 'assets/images/teacher/lock.png'
  import { teacherPptAuthApi } from 'api/api'


  import axios from 'axios'


  import DeleteDialog from '../../../common/deleteDialog.vue'
  export default {

    components:{
      DeleteDialog,
      LoadingPage
    },

    name: 'OpenClass',
    props: {
      classChapterId:"",
      classForPpt: {},
      required: true
    },
    data() {
      return {
        loading:false,
        openCourseware,
        lock,
        beginClass,
        inclass,
        deleteShow:false,
        deleteObj:{},
        allData: [],
        classForPptAll: [],
        showClass: false,
        className: '',
        currentPage: 1,
        pageSize: 7,
        pageNo: 1,
        total: '',
        classList: [],
        searchTotal:0
      }
    },
    created () {
      this.className = ""
      this.getClassList()

      console.log("22222222222222222222===============")
    },
    watch: {
      classChapterId: function () {

        console.log("11111111111111111111111111")
      }
    },

    methods: {

      closeDeleteDialog(){

        this.deleteShow = false

      },

      startEducation(){

        if (this.deleteObj.coursewareStatus != '0') {

        } else {



          let _this = this;

          _this.loading = true

          let params = {
            classChapterId: this.deleteObj.classChapterId
          }

          axios.post(teacherPptAuthApi, params,{
            headers: {
              'sid': localStorage.getItem("sid")
            }
          }).then(res => {

            let code = res.data.code

            if(code == 'success'){

              this.deleteObj.coursewareStatus = "1"

            } else {

            }

            setTimeout(() => {
              _this.loading = false;
            }, 500);

          })

        }
        this.deleteShow = false
      },


      searchClass(){

        this.currentPage = 1

        let tempClassForPpt = []

        for (let i = 0; i < this.classForPptAll.length; i++) {
          let curPpt = this.classForPptAll[i]

          console.log("curPpt.classInfoName.indexOf(this.className) ===" + curPpt.classInfoName.indexOf(this.className))
          console.log("curPpt.classInfoName.indexOf(this.className) ===" + curPpt.classInfoName)
          console.log("curPpt.classInfoName.indexOf(this.className) ===" + this.className)

          if(curPpt.classInfoName.indexOf(this.className) >= 0){
            tempClassForPpt.push(this.deepCloneUtil(curPpt))
          }


        }

        // console.log("this.tempClassForPpt===" + JSON.stringify(tempClassForPpt))
        this.allData = this.deepCloneUtil(tempClassForPpt)
        // console.log("this.allData111===" + JSON.stringify(this.allData))
        this.getCurrenPageData()
        console.log("this.allData111===" + JSON.stringify(this.classList))

        console.log("222222222222222222221234324")
        //className
      },

      show() {
        this.showClass = true;
        this.currentPage = 1
      },
      handleClassBegin(classItem) {

        this.deleteShow = true
        this.deleteObj = classItem

      },
      handleClose(){

        this.$emit('close');
      },
      goPage(num) {
        if (num === 1) {
          if (this.currentPage < this.total) {
            this.currentPage += 1
          }
        } else {
          if(this.currentPage > 1) {
            this.currentPage -= 1
          }
        }

        this.getCurrenPageData()

      },
      getCurrenPageData() {
        console.log((this.currentPage - 1) * this.pageSize, this.pageSize)
        let index = (this.currentPage - 1) * this.pageSize
        this.classList = this.allData.slice(index, this.pageSize + index)

        console.log("this.classForPptAll===" + JSON.stringify(this.classForPptAll))
        console.log("this.classList===" + JSON.stringify(this.classList))
      },
      getClassList() {

        console.log("22222222222222222222abc")

        this.allData = []

        this.allData = this.allData.concat(this.deepCloneUtil(this.classForPpt));

        this.classForPptAll = []

        this.classForPptAll = this.classForPptAll.concat(this.deepCloneUtil(this.classForPpt));



        this.total = Math.ceil(this.classForPptAll.length/this.pageSize);
        this.getCurrenPageData()
        console.log("22222222222222222222")
      }
    },
    watch: {
      classForPpt(newVal){
        this.getClassList()
      }
    }
    ,
    deleteDialogCallback(confirmResult){


      this.deleteShow = !this.deleteShow

      this.deleteConfirm = confirmResult

      if(this.deleteConfirm){
        this.deleteConfirm = true
        this.loading = true

        setTimeout(() => {
          this.loading = false
        }, 2000)


      } else {

      }
    }
  }
</script>
<style lang="scss" >
  .open-class-dialog {
    .el-dialog {
      border-radius: 0.06rem;
    }

    .el-dialog__header {
      padding: 0.11rem 0.22rem 0;
      .header-wraper {
        height: 0.5rem;
        box-sizing: border-box;
        padding-bottom: 0.11rem;
        border-bottom: 0.01rem solid rgba(228,232,237,1);
        .title {
          height:0.16rem;
          font-size:0.16rem;
          font-weight:bold;
          margin-left: 0.36rem;
          color:rgba(51,51,51,1);
          display: inline-block;
          vertical-align: middle;
        }
        .search-box {
          display: inline-block;
          margin-left: 0.28rem;
          width: 2.85rem;
          .el-input__inner {
            width:2.85rem;
            height:0.38rem;
            background:rgba(238,238,238,1);
            border-radius: 0.19rem;
            border: none;
            padding-left: 0.31rem;
            padding-right: 0.45rem;
          }
          .el-input__suffix {
            right: 0.22rem;
            .el-icon-search {
              font-size: 0.16rem;
            }
          }
        }
      }
    }

    .el-dialog__body {
      padding: 0.16rem 0.58rem;
      .class-list {
        height:3.52rem;
        box-sizing: border-box;
        border:0.01rem solid rgba(245,246,247,1);
        .class-item {
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.47rem 0 0.49rem;
          .class-item__title {
            font-size: 0.16rem;
            font-weight: bold;
            color:#333;
            float: left;
          }
          .class-item__btn {
            float: right;
            width: 1.12rem;
            height: 0.32rem;
            line-height: 0.32rem;
            color: #fff;
            font-size: 0.16rem;
            text-align:center;
            background-color: #F79727;
            border-radius: 0.04rem;
            margin-top: 0.09rem;
            cursor: pointer;
            font-size: 0;
          }
          .class-item__btn.is-inclass {
            background-color: #DBDBDB;
            color: #fff;
          }
        }
        .class-item:nth-child(even) {
          background: #fff;
        }
        .class-item:nth-child(odd) {
          background: #F5F6F7;
        }
      }
      .page-btn {
        padding: 0.2rem 0 0.1rem;
        text-align: center;
        font-size: 0;
        .prev-btn,
        .next-btn {
          display: inline-block;
          width:1.7rem;
          height: 0.44rem;
          line-height: 0.42rem;
          box-sizing: border-box;
          border: 0.01rem solid #FFB726;
          border-radius:0.04rem;
          font-size:0.16rem;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
        }
        .prev-btn {
          background: #fff;
          color: #FF8126;
        }

        .next-btn {
          color: #fff;
          margin-left: 0.2rem;
          background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
        }
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
