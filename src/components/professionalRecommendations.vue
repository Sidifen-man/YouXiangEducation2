<template>
  <div class="professionalRecommendations">
    <div class="content">
      <div class="tip">
        <p>
          Onet职业测评体系通过20年积累的问卷大数据库算法与数据库中1000多个职业进行匹配，你将获得你的霍兰德职业代码分数，并基于此获得与您的职业兴趣最相关的职业推荐列表，你也可以按照学历要求，STEM技能要求等筛选出最适合你的...
          <span
            class="more"
            @click="onRouter"
          >了解更多</span>
        </p>
      </div>
      <div class="img">
        <img src="../images/professionalRecommendations.png" alt />
      </div>
    </div>
    <div class="section">
      <div class="section-title">
        <div class="title">
          <span>相关职业推荐</span>
        </div>
        <div class="help">
          <div class="select-item" v-show="unfinish">
            <div class="info" @click="goto">
              <span>查看职业库</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="unfinish">
        <commonTable :list="dataList" v-on:edvalue="edvalue" v-on:stem="stem"></commonTable>
      </div>
      <div class="unfinish" v-show="!unfinish">
        <img src="../images/unfinish.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import commonTable from "./commonTable";
import surver from "api/http/evaluation.js";
export default {
  data() {
    return {
      unfinish: true,
      dataList : [], 
      eduLevelval:'',
      stemval:''
    };
  },
  created(){
    this.getCareerRecommenda()
  },
  methods: {
    onRouter() {
      this.$router.push("/students/home/ProfessionalAssessment");
    },
    goto(){
      window.open('http://www.bestucareer.com/evaluation/#/jobs','_blank')
    },
    edvalue(newval){
      this.eduLevelval = newval;
      this.getCareerRecommenda()
    },
    stem(newval){
      this.stemval = newval
      this.getCareerRecommenda()
    },
    getCareerRecommenda(){
      let LocalStorage = this.$cache.localStorage
      let lang = LocalStorage.get('lang');
      let user =  JSON.parse(LocalStorage.get('loginuser'));
      let id = user.id;
      let param = {
        id : id,
        lang : lang,
        stem : this.stemval,
        eduLevel : this.eduLevelval,
      }
      surver.getCareerRecommendation(param).then(res=>{
        if(res.data.code === "success"){
          let list =  res.data.result;
          if(list && list.length){
            this.dataList = list;
            if(list.length<10){
              this.dataList = list;
            }else{
              let list2 = [] 
              for(let i=0;i<list.length;i++){
                if(i<10){
                  list2.push(list[i])
                }
               }
               this.dataList = list2 
            }
            this.unfinish = true;
          }else{
            this.dataList = []
            if(this.stemval || this.eduLevelval){
              this.unfinish = true;
            }else{
              this.unfinish = false;
            }
            
          }
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });   
        }
      })
    },
  },
  components: {
    commonTable
  }
};
</script>
<style lang='less' scoped>
.professionalRecommendations {
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
    border-radius: 7px;
    overflow: hidden;
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
      cursor:pointer;
      .select-item {
        margin-right: 15px;
        .info {
          width: 130px;
          height: 40px;
          border: 1px solid rgba(255, 135, 38, 1);
          border-radius: 4px;
          color: #ff8726;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 135, 38, 1);
          span{
           // margin-left: 10px;
          }
        }
      }
    }
  }
  .unfinish {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>

