<template>
  <div>
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog
      class="open-class-dialog"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="visible"
      width="4.96rem"
      >
      <div class="header-wraper" slot="title">
        <div class="title">班级列表</div>
        <el-input placeholder="搜索班级" class="search-box" @input="searchClass" v-model="className" suffix-icon="el-icon-search"></el-input>
      </div>
      <ul class="class-list cp-list">
          <li class="cp-item" v-for="(item, index) in classList" :key="index">
            <span class="cp-item-title">{{ item.name }}</span>
            <el-checkbox v-model="item.isSelect" class="cp-item-check"></el-checkbox>
          </li>
      </ul>
      <div class="submit-wrap">
        <div class="submit" @click="addClass">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import LoadingPage from '../common/loadingPage.vue'
  import beginClass from 'assets/images/icon/begin-class.png'
  import inclass from 'assets/images/icon/inclass.png'


  import { teacherTaskDispatchApi } from 'api/api'
  import { getUserClassListApi } from 'api/api'
  import axios from 'axios'


  import DeleteDialog from '../common/deleteDialog.vue'
  export default {

    components:{
      DeleteDialog,
      LoadingPage
    },

    name: 'selectClass',
    props: {
      state: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {

        loading:false,
        checkedStu:[],
        classList: [],
        visible: this.state,
        beginClass,
        inclass,
        showClass: false,
        className: '',
      }
    },
    created () {
      this.getClassList()
    },
    watch: {
      state(newval){
        this.visible = newval
      }
    },

    methods: {
      closeDeleteDialog(){
        this.deleteShow = false
      },
      searchClass(){},
      addClass(){
         let classListed = [];
         this.classList.forEach(item=>{
          if(item.isSelect){
            classListed.push({id:item.id})
          }
         })
         if(classListed.length){
            let classChapterId = this.$route.params.classChapterId;
            let params = {
              classChapterId : classChapterId,
              classList : classListed
            }
            axios.post(teacherTaskDispatchApi, params,{
              headers: {
                'sid': localStorage.getItem("sid")
              }
            }).then(res => {
              this.$message(res.data.message)
            })
         }
       this.handleClose() 
      },
      saveClass(){

      },
      getClassList(){
        // let classChapterId = this.$route.params.classChapterId
        let params = {
          studentFlag: 'A'
        }
        axios.post(getUserClassListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == "success"){
            this.classList = res.data.result.datalist
          }
          setTimeout(() => {
            // this.loading = false;
          }, 100);
        })
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
        this.visible = false;
        this.$emit("update:state", false);
        this.$emit("close");
      }
    },
  };
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
        padding:0.1rem;
        box-sizing: border-box;
        border:0.01rem solid rgba(245,246,247,1);
        font-size: 12px;
        overflow-y: auto;
        .cp-item {
          width: 50%;
          display: inline-block;
          text-align: center;
          margin-bottom: 0.12rem;
          
        }
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
            background: #F79727;
            border-color: #F79727;
        }
        .el-checkbox__inner:hover{ border-color: #F79727;}
        .cp-item-title,
        .cp-item-check {
          display: inline-block;
          verticle-align: middle;
        }

        .cp-item-title {
          margin-right: 0.1rem;
        }
      }
    }
  }

 .submit-wrap {
    text-align: center;
    font-size: 0;
    padding-bottom: 0.22rem;
    margin-top: 0.2rem;
  }

  .submit{
    width: 1.8rem;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    font-size: 16px;
    color: #fff;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
     background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
    );
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
