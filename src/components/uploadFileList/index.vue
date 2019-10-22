<template>
  <div class="invitation-comments">
    <el-dialog :visible.sync="visible" width="5.9rem" :before-close="handleClose">
      <div class="adt-title-wrap">
        <div class="adt-line"></div>
        <div class="adt-title">课堂作品</div>
      </div>
      <div class="table-wrap">
        <el-table :data="tableData2" style="width: 100%" row-class-name="invitRow">
          <el-table-column prop="name" label="文件名" align="center" width="180"></el-table-column>
          <el-table-column prop="course.name" label="课程名" align="center"></el-table-column>
          <el-table-column prop="chapter.name" label="课时名" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div @click="selectInvitation(scope)">
                <p class="invitation-btn" :class="[ scope.row.operate ? 'is-select' : 'no-select' ]" >选中上传</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="submit-wrap">
        <div class="over-btn" @click="handleReset">重置</div>
        <div class="submit" @click="submit">确认添加</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { studentWorksListApi } from 'api/api'
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      visible: false,
      tableData2: [
        {
          fileName: '余周周的课件作品.PDF',
          courseName: 'K5上期优势情商',
          lessonName: '102倾听他人',
          operate: false
        }
      ],
      invatitationArr: [],
    }
  },
  created(){
    this.initData()
  },
  watch: {
    state (newVal) {
      this.visible = newVal;
      this.$emit('update:state', newVal)
    }
  },
  methods: {
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
    },
    handleReset () {
      this.tableData2.forEach((item, index) => {
        this.tableData2[index].operate = false
      })
    },
    submit () {
      this.visible = false
      this.$emit('update:state', false)
      let selectList = this.tableData2.filter(item => item.operate)
      console.log(selectList)
      this.$emit('uploadtList', selectList)
    },
    selectInvitation (scope) {
      this.tableData2[scope.$index].operate = !this.tableData2[scope.$index].operate
      if (this.tableData2[scope.$index].operate) {
        this.invatitationArr.push(scope)
      } else {
        this.invatitationArr.forEach((item, index) => {
          if (scope.$index === item.$index) {
            this.invatitationArr.splice(index, 1)
          }
        })
      }
      console.log(scope, 'scope')
    },
    initData(){
    console.log(888)
      axios.post(studentWorksListApi, {},{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
        console.log(res)
          let code = res.data.code
          if(code == 'success'){
            let  list  = res.data.result.datalist;

            for(let i in list){
              list[i].operate = false;
            }
            this.tableData2 = list;
          }
        })
    }

  }
}
</script>

<style lang="scss" scoped>
.invaitation-comments {
  height: 3.88rem;
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
    cursor: pointer;
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
    cursor: pointer;

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

.table-wrap {
  padding: 0 0.3rem;
  padding-top: 0.22rem;
  height: 4rem;
  overflow: auto;
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

.table-wrap {
  /deep/ .el-table__header .has-gutter tr th {
    height: 0.5rem !important;
    padding: 0 !important;
  }
}

.table-wrap /deep/  .el-table .invitRow {
  height: 0.5rem;
}

.table-wrap /deep/ .el-table {
  /deep/ tr {
    height: 0.52rem;
    line-height: 0.52rem;
  }
}

.table-wrap /deep/  .el-table .invitRow:after {
  height: 0.52rem;
  line-height: 0.52rem;
}

.table-wrap /deep/ .el-table .invitRow:hover {
  height: 0.52rem;
  line-height: 0.52rem;
  background: #fff !important;
  border: 0.01rem solid red;
}

.table-wrap /deep/ .el-table--small td {
  padding: 0;
}
</style>
