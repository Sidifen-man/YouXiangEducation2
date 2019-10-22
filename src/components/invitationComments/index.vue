<template>
  <div class="invitation-comments">
    <el-dialog
      :visible.sync="visible"
      width="5.9rem"
      :before-close="handleClose"
      :show-close="isshowclose"
    >
      <div class="adt-title-wrap">
        <div class="adt-line"></div>
        <div class="adt-title">邀请他人评价</div>
        <div class="preview" @click="handlePreview">
          <img src="../../assets/images/advantage/play.png" alt class="preview-icon">
          <span class="preview-text">预览邀请模板</span>
        </div>
      </div>

      <div class="content-wrap">
        <div class="tag-content">
          <div class="tag-name">已邀请人：</div>
          <ul class="tag-list">
            <li class="tag-item" v-for="(item, index) in invatitationArr" :key="index">
              <div class="invat-name">{{ item.row.name }}</div>
              <i class="el-icon-close close" @click="cancelInvatitaion(index,item)"></i>
            </li>
          </ul>
        </div>

        <div class="search-panel">
          <el-select
            class="search class-select"
            v-model="className"
            clearable
            placeholder="班级筛选"
            @change="handleConditionChange()"
          >
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            class="search account-select"
            v-model="account"
            clearable
            placeholder="账号类型筛选"
            @change="handleConditionChange"
          >
            <el-option
              v-for="item in accountOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="search-box">
            <input type="text" placeholder="搜索" v-model="name">
            <i class="el-icon-search" @click="initData()"></i>
          </div>
        </div>

        <el-scrollbar style="height:100%;" tag="div" class="table-wrap">
          <div class="table-wrap">
            <el-table :data="tableData2" style="width: 100%" row-class-name="tableRow">
              <el-table-column prop="name" label="姓名" align="center" width="180"></el-table-column>
              <el-table-column prop="account" label="账户类型" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <div @click="selectInvitation(scope)">
                    <p
                      class="invitation-btn"
                      :class="[ scope.row.operate? 'is-select' : 'no-select' ]"
                    >选中邀请</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>

      <div class="submit-wrap">
        <!-- <div class="over-btn" @click="handleJump">跳过</div> -->
        <div class="submit" @click="submit">确认邀请</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getUserList } from 'api/api'
import { createAdvActivityApi } from 'api/api'
import { getClassListApi } from 'api/api'
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    id:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      isshowclose: false,
      name: '',
      className: '',
      account: '',
      classOptions: [
        {
          value: '1',
          label: '班级01'
        },
      ],
      accountOptions: [
        {
          value: '1',
          label: '学生'
        },
        {
          value: '2',
          label: '教师'
        },
        {
          value: '3',
          label: '家长/监护人'
        }
      ],
      tableData2: [
        {
          name: '王展鹏',
          account: '教师',
          operate: false
        }
      ],
      invatitationArr: [],
      studentFlag:'',
      teacherFlag:'',
      guardianFlag:'',
    }
  },
  created(){
   this.getClassList()
   this.initData()
  },
  watch: {
    state (newVal) {
      this.visible = newVal
      this.$emit('update:state', newVal)
    }
  },
  methods: {
     handlePreview () {
      this.$emit('showActivity')
    },
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
    },
    handleConditionChange () {
      // if(this.className){this.tableData2  = []}
      if(this.account){
        this.studentFlag ='';
        this.teacherFlag = '';
        this.guardianFlag = '';
        if(this.account=='1')this.studentFlag = 'A';
        if(this.account=='2')this.teacherFlag = 'A';
        if(this.account=='3')this.guardianFlag = 'A'
        
      }
       this.initData(this.className)
    },
    selectInvitation (scope) {
      this.tableData2[scope.$index].operate = !this.tableData2[scope.$index].operate
      let isId = this.invatitationArr.findIndex(v =>{
        return v.row.id == scope.row.id
      })
      if(isId==-1){
         this.invatitationArr.push(scope)
      }else{
        this.invatitationArr.splice(isId, 1)
      }
      // if (this.tableData2[scope.$index].operate) {
      //   this.invatitationArr.push(scope)
      // } else {
      //   this.invatitationArr.forEach((item, index) => {
      //     if (scope.$index === item.$index) {
      //       this.invatitationArr.splice(index, 1)
      //     }
      //   })
      // }
    },
    getClassList(){

      let params = {

      }
      axios.post(getClassListApi, params,{
        headers: {
          'sid': localStorage.getItem("sid")
        }
      }).then(res => {

        let code = res.data.code
        if(code == "success"){
          let oldArr =  res.data.result.datalist;
          let allArr = [];
          for(let i=0;i<oldArr.length;i++){
            let flag = true;
        　　for(let j=0;j<allArr.length;j++){
        　　　　if(oldArr[i].code == allArr[j].code){
        　　　　　　flag = false;
        　　　　};
        　　}; 
        　　if(flag){
        　　　　allArr.push(oldArr[i]);
        　　};
         };
          this.classOptions = allArr;
        }
      })

    },
    submit () {
      if(!this.invatitationArr.length){
        this.$message({
          message: '请选择邀请人',
          type: 'warning'
        });
        return
      }
      let appraisers = '';
      for(let i=0 ;i<this.invatitationArr.length;i++){
        if(i<this.invatitationArr.length-1)appraisers += this.invatitationArr[i].row.id+','
        else appraisers += this.invatitationArr[i].row.id
      }
      let params ={
        activityId :this.$route.query.id ,
        taskresultId :this.$route.query.taskresultId,
        id :this.id,
        appraisers: appraisers
      }
      axios.post(createAdvActivityApi, params,{ headers: { 'sid': localStorage.getItem("sid")} }).then(res => {
        let code = res.data.code
        if(code == 'success'){
          this.visible = false
          this.$emit('update:state', false)
          this.$emit('success')
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    handleJump () {
      this.$message({
          message: '必须选择邀请人',
          type: 'warning'
        });
      // this.visible = false
      // this.$emit('update:state', false)
      // this.$router.push({
      //   path: '/student/task',
      //   query: {
      //     type: 'showPunchCard',
      //     activeId:this.id,
      //     taskresultId :this.$route.query.taskresultId,
      //   }
      // })
    },
    cancelInvatitaion (index,item) {
      this.tableData2.forEach((tab,indx)=>{
        if(tab.id == item.row.id){
           this.tableData2.splice(indx, 1)
        }
      })
      // this.tableData2.splice(this.invatitationArr[index].$index, 1)
      this.invatitationArr.splice(index, 1)
    },
    initClassList(){
      
    },
    initData(classId){ 
      if(!classId){
        let loginuser = JSON.parse(localStorage.getItem('loginuser'))
        classId = loginuser.classId;
      }
      let params = {
        classId: classId,
        pageSize:5,
        name:this.name,
        studentFlag:this.studentFlag,
        teacherFlag:this.teacherFlag,
        guardianFlag:this.guardianFlag,
      };
      let configs = {
        headers: {'sid': localStorage.getItem("sid") }}
        axios.post(getUserList , params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            let tableData = [];
            if (res.data.result) tableData = res.data.result.datalist||[];
            tableData.forEach((item, index) => {
              let account = ''
              if(item.student)account='学生';
              else if(item.teacher)account='老师';
              else if(item.guardian)account='家长/监护人';
              else if(item.adminUser)account='管理人员';
              tableData[index].account = account;
              let id = this.invatitationArr.findIndex((v)=>{
                return v.row.id == item.id
              })
              if(id !=-1)tableData[index].operate = true;
              else tableData[index].operate = false;
              
            })
            this.tableData2 = tableData
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.invaitation-comments {
}

.tag-content {
  height: 0.46rem;
  line-height: 0.46rem;
  background: rgba(248, 248, 248, 1);
  border: 0.01rem solid rgba(225, 225, 225, 1);
  border-radius: 0.04rem;
  margin-top: 0.16rem;
  padding: 0 0.2rem;
  box-sizing: border-box;

  .tag-name,
  .tag-list,
  .tag-item {
    display: inline-block;
    vertical-align: middle;
  }

  .tag-item {
    position: relative;
    margin-right: 0.2rem;
    .close {
      position: absolute;
      top: 10px;
      right: -12px;
      display: inline-block;
      transform: scale(0.8);
    }
  }

  .tag-name {
    font-weight: bold;
    margin-right: 0.2rem;
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
  position: relative;
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

  .preview {
    text-align: right;
    position: absolute;
    top: 50%;
    right: 0.3rem;
    transform: translateY(-50%);
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #f79727;

    .preview-icon,
    .preview-text {
      display: inline-block;
      vertical-align: middle;
    }

    .preview-icon {
      width: 0.1rem;
    }
  }
}

.content-wrap {
  padding: 0 0.3rem;

  .search-panel {
    padding: 0.16rem 0;
    font-size: 0;
    .class-select,
    .account-select {
      margin-right: 0.1rem;
      width: 1.5rem;
    }

    .class-select,
    .account-select,
    .search-box {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
    }

    .search-box {
      width: 2.1rem;
      height: 0.32rem;
      line-height: 0.32rem;
      background: rgba(238, 242, 245, 1);
      border-radius: 0.16rem;
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
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.submit-wrap {
  text-align: center;
  padding: 0.2rem 0;
  font-size: 0;

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
}

.invitation-btn {
  display: inline-block;
  vertical-align: middle;
  width: 0.9rem;
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  color: #fff;
  border-radius: 16px;

  &.is-select {
    background: rgba(247, 151, 39, 1);
  }

  &.no-select {
    color: #999;
    border: 0.01rem solid rgba(221, 221, 221, 1);
  }
}

.invitation-comments /deep/ .el-dialog__header,
.invitation-comments /deep/ .el-dialog__body {
  padding: 0;
}

.invaitation-comments /deep/ .el-select {
  width: 1.5rem;
}

.content-wrap {
  /deep/ .el-table__header .has-gutter tr th {
    height: 0.5rem !important;
  }
}

.content /deep/ .trends .el-table .tableRow {
  height: 0.5rem !important;
}

.content /deep/ .trends .el-table .tableRow:after {
  height: 0.5rem !important;
}
</style>
