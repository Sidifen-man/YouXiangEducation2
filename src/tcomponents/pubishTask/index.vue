<template>
  <div class="my-advantage" v-show="visible">

    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog
      :visible.sync="visible"
      width="5.9rem"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="adt-title-wrap">
        <div class="adt-line"></div>
        <div class="adt-title">发布任务</div>
      </div>
      <div class="task-content">
        <div class="task-time">
          <div class="time-title">任务有效期：</div>
          <el-date-picker v-model="value1" value-format="yyyy-MM-dd"  type="date" placeholder="请选择开始日期"></el-date-picker>
          <el-date-picker type="date" v-model="value2"  value-format="yyyy-MM-dd"   placeholder="请选择结束日期"></el-date-picker>
        </div>
        <div class="class-publish">
          <div class="class-title">班级发布：</div>
          <ul class="cp-list">
            <li class="cp-item" v-for="(item, index) in classList" :key="index">
              <span class="cp-item-title">{{ item.name }}</span>
              <el-checkbox v-model="item.isSelect" class="cp-item-check"></el-checkbox>
            </li>
          </ul>
        </div>

        <div class="school-publish">
          <div class="school-title">校内发布：</div>
          <div class="search-box">
            <input type="text" placeholder="查找姓名/账号并邀请发布任务" @input="searchByUserName" v-model="username">
            <i class="el-icon-search"></i>
          </div>
          <div class="table-wrap">

            <el-table :data="tableDataFinal" style="width: 100%;overflow: scroll;max-height: 200px;" row-class-name="invitRow">
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="type" label="账户" align="center"></el-table-column>
              <el-table-column prop="classInfoName" label="班级" align="center"></el-table-column>
              <el-table-column prop="grade" label="年级" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isSelect" class="cp-item-check"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="submit-wrap">
        <div class="over-btn" @click="handleClose">取消任务</div>
        <div class="submit" @click="createContentTask">发布任务</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>


  import { getUserClassListApi } from 'api/api'
  import { getUserSchoolUserApi } from 'api/api'

  import {createContentTaskApi} from 'api/api'

  import LoadingPage from '../../page/common/loadingPage.vue'


  import axios from 'axios'


  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      },
      acttype: {
        default: 'content'
      }
    },

    components: {
      LoadingPage
    },
    data() {
      return {

        loading:false,

        visible: this.state,
        value1: "",
        value2: "",
        username: '',
        classList: [
        ],
        tableData2: [
        ],
        tableDataFinal: [
        ],
        form:[]
      };
    },
    watch: {
      state(newVal, oldVal) {
        console.log(newVal, 'task')
        this.visible = newVal;
        this.$emit("update:state", newVal);
      },
      acttype(newVal, oldVal) {	// 暂无用
        console.log(newVal, 'acttype')
        this.acttype = newVal;
      }
    },
    created() {
      console.log(this.state, 'state')
      console.log(this.acttype, 'acttype')
      this.getClassList()
      this.getSchoolUserList()

      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    methods: {


      searchByUserName(){
        if(this.username.trim() != ''){

          let finalIndex = 0
          this.tableDataFinal = []
          for (let i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].isSelect = false

            if(this.tableData2[i].name.indexOf(this.username) >= 0){
              this.tableDataFinal.push(this.deepCloneUtil(this.tableData2[i]))
            }
            finalIndex++
          }
        } else {
          this.tableDataFinal = this.deepCloneUtil(this.tableData2)
        }
      },

      getClassList(){


        let params = this.form
        console.log(params)
        params.student = true;
        axios.post(getUserClassListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == "success" && res.data.result){
            this.classList = res.data.result.datalist||[]

          }

          setTimeout(() => {
            // this.loading = false;
          }, 100);

          // this.handleClose()

        })
      },

      getSchoolUserList(){


        let params = this.form

        axios.post(getUserSchoolUserApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code
          if(code == "success"){

            this.tableData2 = res.data.result.datalist
            for (let i = 0; i < this.tableData2.length; i++) {
              this.tableData2[i].isSelect = false
            }

            this.tableDataFinal = this.deepCloneUtil(this.tableData2)

          }

          setTimeout(() => {
            // this.loading = false;
          }, 100);

          // this.handleClose()

        })
      },


      createContentTask(){
        this.$emit("sss");   
        // createContentTaskApi

        let localClassList = []

       // console.log("this.classList === " + JSON.stringify(this.classList))

        for (let i = 0; i < this.classList.length; i++) {

          if(this.classList[i].isSelect){
            let curOne = {
              id: this.classList[i].id
            }
            localClassList.push(curOne)
          }

        }



        let localUserList = []

        for (let i = 0; i < this.tableDataFinal.length; i++) {

          if(this.tableDataFinal[i].isSelect){
            let curOne = {
              id: this.tableDataFinal[i].id
            }
            localUserList.push(curOne)
          }

        }


        let params = {
          acttype: this.acttype,  // 任务类型，默认为 content 图文
          name: localStorage.getItem("taskName"),
          actcontent: localStorage.getItem("taskContent"),
          startDate: this.value1,
          endDate: this.value2,
          bizId: localStorage.getItem("taskFileId"),
          classList:localClassList,
          userList:localUserList

        }
        
        // 清除不必要的参数: 2019-6-16 -- 临时处理
        if (this.acttype == 'BEST') {
            params.name = '';
            params.bizId = '';
            params.actcontent = '';
        }

        axios.post(createContentTaskApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
           console.log("publicTask", res)
          let code = res.data.code
          if(code == "success"){

          }

          setTimeout(() => {
            // this.loading = false;
          }, 100);
          this.handleSubmit()
          

        })

      },

      handleClose() {
        this.visible = false;
        this.$emit("update:state", false);
        this.$emit("close");
      },
      handleSubmit() {
        this.visible = false;
        this.$emit("update:state", false);
      }
    },
    beforeDestroy() {
      this.timer = null;
    }
  };
</script>

<style lang="scss" scoped>
  .my-advantage /deep/ .el-dialog__header,
  .my-advantage /deep/ .el-dialog__body {
    padding: 0;
  }

  .my-advantage /deep/ .el-tooltip__popper {
    border: none;
  }

  .task-content /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.24rem;
    margin-right: 0.14rem;
  }

  .task-content /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #F79727;
    border-color: #F79727;
  }

  .task-content /deep/ .el-checkbox__inner:hover {
    border-color: #F79727;
  }

  .table-wrap {
    /deep/ .el-table__header .has-gutter tr th {
      height: 0.5rem !important;
      padding: 0 !important;
    }
  }


  .table-wrap /deep/ .el-table .invitRow {
    height: 0.52rem;
    line-height: 0.52rem;
  }

  .table /deep/ .el-table th, .el-table tr {
    height: 0.52rem;
  }

  .table-wrap /deep/ .el-table {
    /deep/ tr {
      height: 0.52rem;
      line-height: 0.52rem;
    }
  }

  .table-wrap /deep/ .el-table .invitRow:after {
    height: 0.52rem;
    line-height: 0.52rem;
  }

  .table-wrap /deep/ .el-table .invitRow:hover {
    height: 0.52rem;
    line-height: 0.52rem;
    background: #fff !important;

  }

  .table-wrap /deep/ .el-table--small td {
    padding: 0;
  }

  .task-content /deep/ .el-table th {
    background:rgba(245,246,247,1);
  }

  .task-content /deep/ .el-table tr {
    background: rgba(248, 248, 248, 0.4);
  }

  .task-content /deep/ .el-input--suffix .el-input__inner {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }

  .task-content /deep/ .el-input--small .el-input__icon {
    display: none;
  }
</style>

<style lang="scss" scoped>
  .my-advantage {
    width: 5.9rem;
    // height: 6.88rem;
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(228, 232, 237, 1);
    border-radius: 0.06rem;
  }

  .task-content {
    padding: 0.22rem 0.34rem;

    .time-title {
      display: inline-block;
      verticle-align: middle;
      margin-right: 0.16rem;
      color: #333;
    }

    .class-publish {
      width: 5.2rem;
      height: 1.12rem;
      background: rgba(248, 248, 248, 1);
      border: 0.01rem solid rgba(225, 225, 225, 0.4);
      border-radius: 0.04rem;
      margin: 0.14rem 0;
      padding: 0 0.2rem;
      box-sizing: border-box;

      .class-title {
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding-top: 0.15rem;
        padding-bottom: 0.2rem;
      }

      .cp-list {
        font-size: 12px;
         height: 50%;
         overflow-y: auto;
        .cp-item {
          width: 25%;
          display: inline-block;
          text-align: center;
          margin-bottom: 0.12rem;
        }

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

    .school-publish {
      width: 5.2rem;
      background: rgba(248, 248, 248, 0.4);
      border: 0.01rem solid rgba(225, 225, 225, 1);
      border-radius: 0.04rem;
      padding: 0 0.15rem;
      box-sizing: border-box;

      .school-title {
        font-weight: bold;
        color: #333;
        padding-left: 0.05rem;
        padding-top: 0.15rem;
        padding-bottom: 0.12rem;
      }

    }
  }
  .adt-title-wrap {
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #e4e8ed;
    border-radius: 0.06rem 0.06rem 0 0;
    font-size: 0;
    font-weight: bold;
    .adt-line {
      width: 0.04rem;
      height: 0.16rem;
      background: rgba(247, 151, 39, 1);
      border-radius: 0.02rem;
      margin-right: 0.1rem;
    }

    .adt-line,
    .adt-title {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
    }
  }

  .adt-desc-wrap {
    text-align: center;
    h3.adt-desc-title {
      font-size: 20px;
      padding: 0.22rem 0 0.15rem 0;
      font-weight: bold;
    }

    .adt-color {
      color: rgba(247, 149, 42, 1);
    }
  }

  .submit-wrap {
    text-align: center;
    font-size: 0;
    padding-bottom: 0.22rem;
  }

  .submit,
  .over-btn {
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
  }

  .submit {
    background: linear-gradient(
        -90deg,
        rgba(255, 183, 38, 1),
        rgba(255, 129, 38, 1)
    );
  }

  .over-btn {
    border: 0.01rem solid rgba(221, 221, 221, 1);
    color: #999;
    margin-right: 0.2rem;
  }

  .search-box {
    width: 100%;
    height: 0.32rem;
    line-height: 0.32rem;
    background: rgba(238, 242, 245, 1);
    border-radius: 0.16rem;
    position: relative;
    margin-bottom: 0.16rem;
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
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
