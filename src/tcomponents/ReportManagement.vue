<template>
  <div class="reportManagement">
    <div class="reportManagement-content">
      <div class="tab-content">
        <div class="section-title">
          <div class="title">
            <span>报告解读</span>
          </div>
          <div class="help"></div>
        </div>
        <div class="section-content">
          <div class="item">
            <img src="../images/erqi/management/zu2.png" alt srcset />
          </div>
          <div class="item-line"></div>
          <div class="item" @click="$router.push('/home/report')">
            <img src="../images/erqi/management/zu3.png" alt srcset />
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">
          <div class="title">
            <span>历史报告</span>
          </div>
          <div class="help">
            <!-- <el-form :inline="true">
            <el-form-item label="报告类型：">-->
            <label for>报告类型：</label>
            <el-select placeholder="全部" v-model="value">
              <el-option label="职业推荐报告" value="2"></el-option>
              <el-option label="VIA报告" value="1"></el-option>
            </el-select>
            <!-- </el-form-item>
            </el-form>-->
          </div>
        </div>
        <div class="section-table">
          <el-table
            :data="tableData"
            stripe
            cell-class-name="center"
            :header-row-style="style"
            style="width: 100%;text-align: center;"
          >
            <el-table-column prop="reportName" label="报告名称"></el-table-column>
            <el-table-column prop="finishDate" label="完成时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="$router.push('/home/report')" v-if="scope.row.reportType=='onet'">
                  <img src="../images/erqi/management/see-1.png" alt srcset class="hover" />
                  <img src="../images/erqi/management/see.png" alt srcset class="see" />
                  查看报告
                </span>
                <span v-else @click="download(scope.row.reportUrl)">
                  <img src="../images/erqi/management/download-1.png" class="hover" alt srcset />
                  <img src="../images/erqi/management/download.png"  class="see" alt srcset />
                 下载报告
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pageInation">
            <el-pagination layout="prev, pager, next"  :page-count ="pageCount" @current-change="clickPage" ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import surver from "api/http/evaluation.js";
export default {
  data() {
    return {
      value: "",
      style: {
        background: "red"
      },
      isShow:false,
      pageSize:5,
      pageNo:1,
      pageCount:0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
      ]
    };
  },
  created(){
    this.initData();
  },
  watch:{
    value(newVal){
      this.initData()
    }
  },
  methods:{
    clickPage(val){
      this.pageNo = val;
      this.initData()
    },
    download(url){
      const elt = document.createElement('a');
      elt.setAttribute('href', url);
      elt.setAttribute('download', 'file.png');
      elt.style.display = 'none';
      document.body.appendChild(elt);
      elt.click();
      document.body.removeChild(elt);

      // window.open(url,'_blank')
    },
    initData(){
      let LocalStorage = this.$cache.localStorage
      let lang = LocalStorage.get('lang');
  
      let param = {
        lang : lang,
        pageSize: this.pageSize,
        pageNo : this.pageNo
      }
      surver.getHistoryReport(param).then(res=>{
        if(res.data.code === "success"){
          if(this.value==2 && this.pageNo == 1){
            this.tableData = [];
            this.tableData.push(res.data.result.dataList[0]);
            this.pageCount = 1;
          }else{
            this.pageCount = res.data.result.pageCount;
            this.tableData = res.data.result.dataList;
          }
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });   
        }
      })
    },

  }
};
</script>
<style lang="less" scoped>
.reportManagement {
  .tab-content {
    background-color: #fff;
    border-radius: 0 0 7px 7px;
    .section-content {
      display: flex;
      justify-content: center;
      padding: 8px 0 33px 0;
      .item {
        width: 31%;
        height: 80px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .item-line {
        width: 3%;
        height: 80px;
      }
    }
  }
  .section {
    margin: 20px 0 30px 0;
    border-radius: 7px;
    overflow: hidden;
    .section-table {
      padding: 20px 25px 0 25px;
      background-color: #fff;
      .center {
        text-align: center;
      }
      /deep/ thead th {
        background-color: #49c7f1;
        text-align: center;
        color: #fff;
      }
      /deep/ td {
        text-align: center;
      }
      /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f5f9fc;
      }
      /deep/ .el-table--striped .el-table__body tr.el-table__row:hover span{
        color: #49c7f1
      }
      /deep/ .el-table--striped .el-table__body tr.el-table__row:hover td .cell .see{
         display:none;
      }
      /deep/ .el-table--striped .el-table__body tr.el-table__row:hover td .cell .hover{
         display:inline-block;
      }
      .see{
        display:inline-block;
      }
      .hover{
        display:none
      }
      .pageInation {
        padding: 20px 0 30px 0;
        /deep/ button {
          border: 1px solid #dcdcdc;
          border-radius: 5px;
          padding: 0;
        }
        /deep/ .el-pagination .btn-next {
          margin-left: 6px;
        }
        /deep/ li {
          border: 1px solid #dcdcdc;
          border-radius: 5px;
          margin-left: 6px;
          color: #b2b2b2;
        }
        /deep/ .el-pager li.active {
          color: #ff8726;
          border: 1px solid #ff8726;
          cursor: default;
        }
      }
    }
  }
  .section-title {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 14px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
    .title {
      padding-top: 15px;
      span {
        padding-left: 25px;
        border-left: 3px solid rgba(255, 135, 38, 1);
      }
    }
    .help {
      display: flex;
      align-items: flex-end;
      padding-right: 25px;
      margin-top: 10px;
    }
  }

  .border7 {
    border-radius: 7px 7px 0 0;
  }
}
</style>
