<template>
  <div class="commonTable">
    <div class="section-select">
      <!-- <div class="select-item">
        <label for class="ml20">教育水平等级：</label>
         <div class="line">
          <div class="process" :style="{width:process}"></div>
        </div>
        <div class="slide">
          <el-slider
            range
            :min="0"
            :max="5"
            height="2px"
            v-model="percent"
          ></el-slider>
        </div>
        <div class="txt">
          <span>1</span>
          <span>5</span>
        </div>
      </div> -->
      <div class="select-item">
        <label for class="ml20">stem：</label>
        <el-select class="ml20" placeholder="全部" v-model="value">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </div>
      <div class="select-item">
        <label for class="ml20">
          教育水平：
          <div class="profession">           
            <el-tooltip placement="bottom" effect="light" popper-class="home_help">
              <div slot="content" class="content">
                <p>职业推荐是由系统根据ONet职业兴趣和价值观测评结果，通过大数据智能算法分析得出的与您最匹配的职业推荐，并按照教育水平要求由高到低展示。</p>
              </div>
              <img class="w15" src="../images/erqi/center/help.png" alt srcset />
            </el-tooltip>
          </div>
        </label>
        <el-select class="ml20" placeholder="全部" v-model="Edvalue">
          <el-option label="没有教育程度门槛" value="1"></el-option>
          <el-option label="需要一定的职业技术培训" value="2"></el-option>
          <el-option label="高中学位" value="3"></el-option>
          <el-option label="本科学位要求" value="4"></el-option>
          <el-option label="硕士学位要求" value="5"></el-option>
        </el-select>
      </div>
    </div>
    <div class="section-table">
      <div>
        <el-table
          :data="tableData"
          stripe
          cell-class-name="center"
          :header-row-style="style"
          style="width: 100%;text-align: center;"
        >
          <el-table-column prop="name" label="职业"></el-table-column>
          <el-table-column prop="stem" label="STEM">
            <template slot-scope="scope">
               <span>{{scope.row.stem}}</span>
              <img class="w15" src="../images/erqi/center/help.png" alt srcset />

              <!-- <img class="w15" src="../images/erqi/center/2.png" alt srcset /> -->

            </template>
          </el-table-column>
          <el-table-column prop="eduLevel" label="教育水平等级">
            <template slot-scope="scope">

             <!--  <span style="color:#FF7733">{{scope.row.eduLevel}}</span>
              <img class="w15" src="../images/erqi/center/help.png" alt srcset /> -->

              <span style="color:#FF7733">{{scope.row.eduLevel}}</span>
             
              <el-tooltip placement="bottom" effect="light" popper-class="home_help">
                <div slot="content" class="content">
                  <p>职业推荐是由系统根据ONet职业兴趣和价值观测评结果，通过大数据智能算法分析得出的与您最匹配的职业推荐，并按照教育水平要求由高到低展示。</p>
                </div>
                <img class="w13" src="../images/erqi/center/help.png" alt srcset />
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column prop="industryName" label="所属行业"></el-table-column>
          <el-table-column prop="corrCoef" label="分数" style="color:#FF7733">
            <template slot-scope="scope">
              <span style="color:#38A7EE">{{scope.row.corrCoef/100}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 暂时隐藏 -->
        <div class="pageInation">
         <!--  <el-pagination layout="prev, pager, next" :total="15"></el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    list :'',
  },
  data() {
    return {
      process: "100%",
      value: "",
      Edvalue:'',
      percent:5,
      style: {
        background: "red"
      },
      tableData: []
    };
  },
  watch:{
    list(newVal){
      if(newVal){
        this.tableData = newVal;
      }
    },
    Edvalue(newVal){
      this.$emit('edvalue',newVal)
    },
    value(newVal){
      this.$emit('stem',newVal)
    }
  }
};
</script>

<style lang="less" scoped>
.section-select {
  padding: 20px 25px 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position:relative;
  background: #fff;
  .profession{
    position: absolute;
    right: 5%;
    height: 20px;
    top: 50%;
    cursor:pointer;
  }
  .select-item {
    flex: 1;
    padding: 20px 10px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    label {
      padding: 7px 0;
    }
    .ml20 {
      margin-left: 20px;
    }
    .slide {
      width: 80%;
      margin: 0px 0 0px 25px;
      /deep/.el-slider__runway {
        margin: 7px 0;
      }
      /deep/.el-slider__bar {
        background: linear-gradient(
          90deg,
          rgba(255, 135, 38, 1),
          rgba(255, 192, 0, 1)
        );
      }
      /deep/ .el-slider__button {
        border: 3px solid #ff8c22;
      }
    }
    .line {
      width: 80%;
      background-color: #fff;
      height: 3px;
      margin: 7px 0 7px 25px;
      position: relative;
      .process {
        position: absolute;
        height: 100%;
        background: linear-gradient(
          90deg,
          rgba(255, 135, 38, 1),
          rgba(255, 192, 0, 1)
        );
      }
      &::before {
        content: "";
        position: absolute;
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 3px solid #ff8c22;
        background-color: #fff;
        z-index: 99;
      }
      &::after {
        content: "";
        position: absolute;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 3px solid #ff8c22;
        background-color: #fff;
        z-index: 99;
      }
    }
    .txt {
      width: 80%;
      margin: 0px 0 0px 25px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.w15 {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.w13 {
  width: 13px;
  height: 13px;
  display: inline-block;
}
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
</style>
