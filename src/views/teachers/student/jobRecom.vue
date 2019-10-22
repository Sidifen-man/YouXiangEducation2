<template>
  <div class="professionalRecommendations">
    <div class="section">
     <img class="close" src="../../../images/close1.png" alt="" @click="closeModal">
      <div class="title">{{stuName}}的职业推荐</div>
      <div v-show="unfinish">
        <commonTable :list="dataList" v-on:edvalue="edvalue" v-on:stem="stem"></commonTable>
      </div>
       <el-pagination
          class="page"
          layout="prev, pager, next"
          v-show="unfinish"
          :total="count"
          :page-size = "pageSize"
          v-on:current-change = "goPage"
        ></el-pagination>
      <div
        class="unfinish"
        v-show="!unfinish"
      >
        <img
          src="../../../images/unfinish.png"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script>
import commonTable from '../../../tcomponents/commonTable'
import surver from '../../../api/http/evaluation.js'
export default {
  props: {
    stuName: {
      type: String,
      default: ''
    },
    userId:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      unfinish: true,
      dataList: [],
      eduLevelval:'',
      stemval:'',
      pageSize: 5,
      pageNo:1,
      count:0,
      list:[]
    }
  },
  watch:{
    userId:{
      deep: true,
      immediate:true,
      handler(val) {
        this.getData(val)
      }  
    },
  },
  created() {},
  methods: {
    closeModal () {
      this.$emit('closeJob', false)
    },
    edvalue(newval){
      this.eduLevelval = newval;
      this.getData(this.userId)
    },
    stem(newval){
      this.stemval = newval
      this.getData(this.userId)
    },
    goPage(pageNo){
      this.pageNo = pageNo;
      this.setArr(this.list)
    },
    getData(userId){
      const LocalStorage = this.$cache.localStorage;
      const lang = LocalStorage.get("lang");
      const param = {
        id: 'via86',
        lang: lang,
        userId: userId,
        stem : this.stemval,
        eduLevel : this.eduLevelval,
      };
      surver.getCareerRecommendation(param).then(res=>{
        this.dataList=[];
        this.pageSize = 5;
        this.pageNo = 1;
        let list =  res.data.result;
          if(list && list.length){
            this.count = list.length;
            this.list = list;
            this.setArr(list)
   
            this.unfinish = true;
          }else{
            if(this.stemval || this.eduLevelval){
              this.unfinish = true;
            }else{
              this.unfinish = false;
            }
            
          }
      })
    },
    setArr(list){
      let array = [];
      let count = this.pageSize*this.pageNo;
      let prevNum = this.pageSize*(this.pageNo-1);
      if(list.length>=count){
        this.dataList = list.slice(prevNum,count)
      }
      if(list.length<count){
        this.dataList = list.slice(prevNum,list.length)
      }
      console.log(this.dataList)
    }
  },
  components: {
    commonTable
  }
}
</script>
<style lang='less' scoped>
.professionalRecommendations {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  .content {
    padding: 30px 40px 50px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background-color: #fff;
    .tip {
      flex: 1;
      p {
        text-indent: 2em;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
        line-height: 23px;
        .more {
          font-size: 11px;
          font-weight: 800;
          color: #ff8726;
          line-height: 17px;
          cursor: pointer;
        }
      }
    }
    .img {
      margin-left: 40px;
      width: 202px;
      height: auto;
      border: 6px solid rgba(39, 164, 251, 0.5);
      box-shadow: 0px 5px 24px 0px rgba(39, 164, 251, 0.5);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .section {
    margin: 20px 0 30px 0;
    width: 968px;
    margin: 150px auto;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-radius: 7px;
    // overflow: hidden;
    background-color: #fff;
    position: relative;
    .close {
      width: 24px;
      height: 40px;
      position: absolute;
      right: 20px;
      top: -40px;
      cursor:pointer;
    }
    .title {
      font-size: 20px;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      text-align: center;
    }
  }

  .unfinish {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .page {
        padding-top: 20px;
        padding-bottom: 40px;
        box-sizing: border-box;
        /deep/ .number,
        /deep/ .btn-prev,
        /deep/ .btn-next {
          background-color: #fff;
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 4px;
          font-weight: normal;
          margin: 0 4px;
          width: 30px;
          height: 30px;
          &:hover {
            color: rgba(255, 135, 38, 1);
          }
        }
        /deep/ .active {
          border: 1px solid rgba(255, 135, 38, 1);
          border-radius: 4px;
          color: rgba(255, 135, 38, 1);
          font-weight: normal;
        }
      }
}
</style>

