<template>
  <div class="universityLibrary">
    <div class="library-left">
      <div class="library-select">
        <div class="library-list">
          <div class="bar1 flexCenterXY">
            <p class="barTitle">{{value1}}</p>
            <el-select v-model="value1" placeholder="海外大学专业库" class="selectContain">
              <el-option
                v-for="(item,i) in options"
                :key="i"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="library-list_item">
            <div class="item-header">
              <img class="saixuan" src="../../images/saixuan.png" alt srcset />
              <span>筛选条件</span>
              <img class="shuaxin" @click="onrefrash" src="../../images/shuaxin.png" alt srcset />
            </div>
            <div class="name">
              <span>{{name}}</span>
            </div>
            <div class="namt-btn">
              <span
                v-for="(v,i) in btnList"
                :class="{'sele-btn':btnIndex == i}"
                :key="i"
                @click="onBtnIndex(i)"
              >{{v}}</span>
            </div>
            <div class="location">
              <div class="l-tip">Location</div>
              <div class="l-select">
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in options2"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Tuition & Fees</div>
              <div class="slide">
                <el-slider
                  :show-tooltip="showTooltip"
                  range
                  :min="10"
                  :max="90"
                  height="2px"
                  v-model="percent1"
                ></el-slider>
              </div>
              <div class="txt">
                <span>S10K</span>
                <span>S90K</span>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Acceptance Rate</div>
              <div class="slide">
                <el-slider
                  :show-tooltip="showTooltip"
                  range
                  :min="10"
                  :max="90"
                  height="2px"
                  v-model="percent2"
                ></el-slider>
              </div>
              <div class="txt">
                <span>S10K</span>
                <span>S90K</span>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Undergraguate Enroll</div>
              <div class="slide">
                <el-slider
                  :show-tooltip="showTooltip"
                  range
                  :min="10"
                  :max="90"
                  height="2px"
                  v-model="percent3"
                ></el-slider>
              </div>
              <div class="txt">
                <span>S10K</span>
                <span>S90K</span>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Fleld of Study</div>
              <div class="l-select">
                <el-select v-model="value3" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in categoryList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Most Considered Factor</div>
              <div class="l-select">
                <el-select v-model="value4" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in options4"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Institution Type</div>
              <div class="l-select">
                <el-select v-model="value5" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in type"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="location">
              <div class="l-tip">Ranking</div>
              <div class="slide">
                <el-slider
                  :show-tooltip="showTooltip"
                  range
                  :min="1"
                  :max="150"
                  height="2px"
                  v-model="percent4"
                ></el-slider>
              </div>
              <div class="txt">
                <span>1</span>
                <span>150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="library-right">
      <div class="search">
        <input type="text" placeholder="请输入大学名称" v-model="names"/>
        <div class="img">
          <img src="../../images/search.png" alt />
        </div>
      </div>
      <div class="search-select">
        <div class="search-se_item">
          <label for>是否收藏：</label>
          <span
            class="item"
            :class="{'item-active':i === searchIndex1}"
            v-for="(v,i) in searchList"
            :key="i"
            @click="onSerch(i,1)"
          >{{v}}</span>
        </div>
        <div class="search-se_item">
          <label for>标记梦想：</label>
          <span
            class="item"
            :class="{'item-active':i === searchIndex2}"
            v-for="(v,i) in searchList"
            :key="i"
            @click="onSerch(i,2)"
          >{{v}}</span>
        </div>
        <div class="btn-top-list">
          <div class="search-se_btn">
            <img src="../../images/chaxun.png" alt srcset />
            <span>查询</span>
          </div>
          <div class="search-se_btn" @click="onreset">
            <img src="../../images/chongzhi.png" alt srcset />
            <span>重置</span>
          </div>
        </div>
      </div>
      <div class="search-list">
        <el-row :gutter="32">
          <el-col :span="8" v-for="(item,i) in datalist" :key="i">
            <div class="list-item">
              <img src="../../images/q.png" alt srcset />
              <div class="tip">
                <h3>{{item.name}}</h3>
                <div class="univer-location">
                  <img class="lo-img" src="../../images/e.png" alt />
                  <span class="lo-name">{{item.state}}</span>
                  <img class="ri" @click="onrouter(item.id)" src="../../images/global/detail.png" alt srcset />
                </div>
              </div>
              <div class="index">
                <span>NO.{{item.id}}</span>
              </div>
              <div class="label-button">
                 <span class="love" @click="open_stamp(item,i)" :class="{active: item.is_collect}"></span>
                 <span class="collect"  @click="add_love(item,i)" :class="{active: item.is_love}"></span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="pageInation">
          <el-pagination layout="prev, pager, next" :total="count" v-on:current-change="goPage"></el-pagination>
        </div>
      </div>
    </div>
    <StampDialog
      ref="sp"
      @close="close_stamp"
      @confirm_ok="confirm_ok"
      :list="mylist"
      :is_show="dialog_show"
    />
  </div>
</template>

<script>
import StampDialog from "../../components/data/StampDialog";
import surver from "api/http/t-gloData.js";
export default {
  components: {
    StampDialog
  },
  data() {
    return {
      names: '',
      showTooltip: false,
      dialog_show: false,
      searchList: ["全部", "是", "否"],
      searchIndex1: 0,
      searchIndex2: 0,
      percent1: [10, 90],
      percent2: [10, 90],
      percent3: [10, 90],
      percent4: [1, 150],
      value1: "海外大学库",
      value2: "YN",
      value3: "",
      value4: "",
      value5: "",
      name: "University or College",
      btnList: ["u-university", "c-college"],
      btnIndex: 0,
      options2:[
        {
          label: "YN",
          value: "YN"
        },
      ],
      options: [
        {
          label: "国内大学库",
          value: "国内大学库"
        },
      ],
      type:[
        {
          label: "private",
          value: "private"
        },
        {
          label: "public",
          value: "public"
        }
      ],
      options4:[
        {
          label: "中学成绩严格",
          value: "Rigor of Secondary School Record"
        },
        {
          label: "平时成绩",
          value: "Academic GPA"
        },
        {
          label: "标准考试",
          value: "Standardized Tests"
        },
        {
          label: "班级排名",
          value: "Class Rank"
        },
        {
          label: "推荐信",
          value: "Recommendations"
        },
        {
          label: "课程作文",
          value: "Essay"
        },
        {
          label: "面试",
          value: "Interview"
        },
        {
          label: "业余爱好水平",
          value: "Level of Applicant's Interest"
        },
        {
          label: "志愿者工作",
          value: "Volunteer Work"
        },
        {
          label: "特长",
          value: "Particular Talent/Ability"
        },
        {
          label: "性格/个人品质",
          value: "Character/Personal Qualities"
        },
        {
          label: "上大学的第一代",
          value: "First Generation to Attend College"
        },
        {
          label: "州居住权",
          value: "State Residency"
        },
        {
          label: "地理居住地",
          value: "Geographic Residence"
        },
        {
          label: "与校友关系",
          value: "Relation with Alumnus"
        },
        {
          label: "宗教信仰",
          value: "Religious Affiliation/ Commitment"
        },
        {
          label: "民族",
          value: "Ethnicity"
        },
        {
          label: "工作经验",
          value: "Work Experience"
        },
      ],
      mylist: [
        {
          id: 1,
          title: "整体排名与竞争力符合我的预期",
          is_selected: true
        },
        {
          id: 2,
          title: "大学的氛围能够进一步发展我的个性优势",
          is_selected: false
        },
        {
          id: 3,
          title: "环境、授课模式、学生多样性等方面是我喜欢的",
          is_selected: false
        },
        {
          id: 4,
          title: "这里有我希望攻读的专业",
          is_selected: false
        },
        {
          id: 5,
          title: "大学的学费，奖学金政策很有吸引力",
          is_selected: false
        },
        {
          id: 6,
          title: "别人给我的建议",
          is_selected: false
        },
        {
          id: 7,
          title: "其他",
          is_selected: false
        }
      ],
      lang: '',
      categoryList: [],
      datalist: [],
      pageSize:10,
      pageNo: 1,
      count:0,
    };
  },
  created(){
    let LocalStorage = this.$cache.localStorage;
    this.lang = LocalStorage.get("lang");
    this.fcategory();
    this.list()
  },
  methods: {
    onBtnIndex(i) {
      this.btnIndex = i;
    },
    onSerch(i, index) {
      if (index === 1) {
        this.searchIndex1 = i;
      } else {
        this.searchIndex2 = i;
      }
    },
    onreset() {
      this.searchIndex1 = 0;
      this.searchIndex2 = 0;
    },
    onrefrash() {
      this.percent1 = [10, 90];
      this.percent2 = [10, 90];
      this.percent3 = [10, 90];
      this.percent4 = [1, 150];
      this.value1 = "海外大学库";
      this.value2 = "YN";
      this.value3 = "";
      this.value4 = "";
      this.value5 = "";
    },
    onrouter(id) {
      this.$router.push(`/students/profession/universityDetail/${id}`);
    },
    open_stamp(item,index) {
    console.log(item)
      if(item.favId){  
        this.collectionCancel(item.favId,'favId',index)  
      }else{
        this.addCollect(item,'favId',index)
      }
      item.is_collect = !item.is_collect;
    },
    confirm_ok(dream) {
      let item = '';
      let index = '';
      for (var i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].id == dream.id) {
          this.datalist[i].is_love = true;
          item = this.datalist[i];
          index = i;
        }
      }
      this.addCollect(item,'dreamId',index,dream.str)
      this.close_stamp();
    },
    close_stamp() {
      this.dialog_show = false;
    },
    add_love(item,index) {
      if (item.is_love) {
        this.$set(this.datalist[index],'is_love',false)
        this.collectionCancel(item.dreamId,'dreamId',index)
        return;
      }
      this.dialog_show = true;
      this.$refs.sp.set_current_id(item.id);
    },
    addCollect(item,type,index,tag){
      const param = {
        type :type=='favId'?1:2,
        name : item.name,
        id : item.id,
        lang : this.lang,
        tag : tag?tag:''
      }
      surver.c_collectionAdd(param).then(res => {
        if(res.data.code=="success"){
          this.datalist[index][type] = res.data.result;
        }else{
           this.$message.error(res.data.message);
        }
         
      });  
    },
    collectionCancel(id,type,index){
      const param = {
        type :type=='favId'?1:2,
        id : id,
        lang : this.lang
      }
      surver.c_collectionCancel(param).then(res => {
        if(res.data.code=="success"){
          this.$set(this.datalist[index],type,'')
          
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    },
    goPage(val){
      this.pageNo = val;
      this.list()
    },
    fcategory(){
      const param ={
        lang : this.lang,
        name :"",
        parentId:"0",
        path:""
      }
      surver.fcategory(param).then(res => {
        if(res.data.code=="success"){
          this.categoryList = res.data.result.list
        }else{
           this.$message.error(res.data.message);
        }
      }); 
    },
    list(){
      // const param = {
      //   searchType: this.btnIndex?"college":"university",
      //   type :this.value5,
      //   location: "NY",
      //   startFee: this.percent1[0], 
      //   endFee: this.percent1[1],
      //   startAdmissionRate: this.percent2[0],
      //   endAdmissionRate:this.percent2[1],
      //   // startStudens:this.percent3[0],
      //   // endStudens:this.percent3[1],
      //   startStudens:"",
      //   endStudens:"",
      //   fieldStudy:this.value3, 
      //   majorId:'' ,
      //   factor: this.value4,
      //   startRanking: this.percent4[0],
      //   endRanking: this.percent4[1],
      //   pageSize: this.pageSize,
      //   pageNo: this.pageNo,
      //   lang : this.lang,
      //   favFlag: this.searchIndex1?this.searchIndex1-1:'',
     //    dreamFlag: this.searchIndex2?this.searchIndex2-1:'',
     //    name: names
      // }
      const param ={
        "searchType":"university","type":"","lang":"en","location": "NY","startFee":"", "endFee":"","startAdmissionRate":"","endAdmissionRate":"","startStudens":"","endStudens":"","fieldStudy":"", "majorId": "","factor": "1","startRanking":"1","endRanking":"150","pageSize":this.pageSize,"pageNo":this.pageNo
      }
      surver.fcollegeList(param).then(res => {
        if(res.data.code=="success"){
          if(res.data.result.list && res.data.result.list.length){
            let datalist = res.data.result.list;
            this.count = res.data.result.count;
            if(datalist && datalist.length){
              datalist.forEach(item=>{
                item.is_love = item.dreamId?true:false;
                item.is_collect = item.favId?true:false;
              }) 
            }
            this.datalist = datalist
            
          }
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    }
  }
};
</script>


<style lang="less" scoped>
.universityLibrary {
  display: flex;
  background-color: #fff;
  .library-left {
    width: 246px;
    display: flex;
    justify-content: center;
    .library-select {
      width: 200px;
      .library-list {
        .bar1 {
          color: #fff;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          height: 51px;
          background: url("../../images/global/bg1.png") no-repeat left top;
          background-size: 100% 100%;
          border-radius: 5px;
          position: relative;
          .selectContain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
          .barTitle::after {
            content: "";
            border: 5px solid transparent;
            border-top-color: #fff;
            position: absolute;
            top: calc(50% + 5px);
            transform: translateY(-50%);
            margin-left: 8px;
          }
        }
        .library-list_item {
          //   height: 800px;
          box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
          border-radius: 6px;
          margin-top: 7px;
          overflow: hidden;
          .item-header {
            height: 36px;
            background: rgba(255, 135, 38, 1);
            border-radius: 6px 6px 0px 0px;
            padding: 0 14px;
            display: flex;
            align-items: center;
            .saixuan {
              width: 16px;
              height: 13px;
            }
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              margin-left: 10px;
            }
            .shuaxin {
              width: 16px;
              height: 16px;
              display: inline-block;
              margin-left: 70px;
            }
          }
          .name {
            padding: 20px 14px;
            height: 38px;
            display: flex;
            align-items: center;
            font-size: 12px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 0.8);
          }
          .namt-btn {
            display: flex;
            justify-content: space-between;
            span {
              padding: 8px 3px;
              border-radius: 4px;
              font-size: 12px;
              font-family: PingFang-SC-Bold;
              color: #999999;
              background-color: #ebebeb;
              margin: 0 5px;
              display: inline-block;
              width: 50%;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .sele-btn {
              background-color: #ff8726;
              color: #fff;
            }
          }
          .location {
            background-color: #f5f5f5;
            margin: 16px 5px;
            border-radius: 4px;
            .l-tip {
              padding: 14px 0 0 11px;
              font-size: 12px;
              font-family: PingFang-SC-Bold;
              font-weight: bold;
              color: rgba(51, 51, 51, 0.8);
            }
            .l-select {
              padding: 15px 11px;
              /deep/ .el-input__suffix {
                .el-select__caret {
                  color: #ff8726;
                }
              }
              /deep/ .el-input__inner {
                border: none;
              }
            }
            .slide {
              padding: 14px 11px 0 11px;
              /deep/.el-slider__runway {
                margin: 7px 5px;
              }
              /deep/.el-slider__bar {
                height: 5px;
                background: linear-gradient(
                  90deg,
                  rgba(255, 135, 38, 1),
                  rgba(255, 192, 0, 1)
                );
                border-radius: 2px;
              }
              /deep/ .el-slider__button-wrapper {
                top: -15px;
              }
              /deep/ .el-slider__button {
                border: 3px solid #ff8c22;
                width: 10px;
                height: 10px;
              }
              /deep/ .el-slider__runway {
                background-color: #fff;
                width: 95% !important;
              }
            }
            .txt {
              padding: 5px 11px 15px 11px;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              font-family: PingFang-SC-Bold;
              font-weight: bold;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
  }
  .library-right {
    flex: 1;
    margin-right: 28px;
    padding-top: 10px;
    .search {
      display: flex;
      align-items: center;
      height: 36px;
      background: rgba(255, 135, 38, 0.1);
      border-radius: 18px;
      padding: 0 22px 0 26px;
      margin-right: 20px;
      input {
        flex: 1;
        outline: none;
        width: 98px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        background: transparent;
        color: rgba(255, 135, 38, 1);
        line-height: 60px;
        &::placeholder {
          color: rgba(255, 135, 38, 1);
        }
      }
      .img {
        width: 23px;
        height: 22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .search-select {
      display: flex;
      align-items: center;
      box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
      border-radius: 6px;
      margin: 17px 0 15px 0;
      padding: 0 27px 0 0px;
      .search-se_item {
        padding-left: 30px;
        label {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 60px;
        }
        .item {
          cursor: pointer;
          padding: 0 15px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 85, 85, 1);
        }
        .item-active {
          cursor: pointer;
          width: 40px;
          height: 22px;
          padding: 5px 15px;
          line-height: 22px;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.32);
          border-radius: 60px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 105, 0, 1);
        }
      }
      .btn-top-list {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
        .search-se_btn {
          margin: 0 6px;
          width: 76px;
          height: 28px;
          background: rgba(255, 135, 38, 1);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 17px;
            height: 17px;
          }
          span {
            padding: 0 8px;
            color: #fff;
            font-size: 13px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .search-list {
      padding: 25px 25px 35px 25px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
      border-radius: 6px;
      margin-bottom: 70px;
      .list-item {
        margin-bottom: 29px;
        height: 220px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        &:hover {
          .label-button {
            display: block !important;
          }
          .index {
            display: none !important;
          }
        }
        img {
          width: 100%;
          height: 130px;
        }
        .tip {
          padding: 16px 11px 16px 17px;
          h3 {
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            height: 28px;
          }
          .univer-location {
            display: flex;
            align-items: center;
            padding-top: 13px;
            position: relative;
            .lo-img {
              width: 12px;
              height: 12px;
            }
            .lo-name {
              padding-left: 10px;
              font-size: 12px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
            }
            .ri {
              position: absolute;
              right: 0;
              width: 13px;
              height: 16px;
              display: block;
              cursor:pointer;
            }
          }
        }
        .index {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 30px;
          background: rgba(255, 135, 38, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          font-style: italic;
          color: rgba(255, 255, 255, 1);
          z-index: 99;
        }
        .label-button {
          z-index: 99;
          position: absolute;
          left: 0;
          top: 0;
          height: 30px;
          display: none;
          > .love,
          .collect {
            display: block;
            width: 30px;
            height: 30px;
            float: left;
            cursor: pointer;
            &:active {
              opacity: 0.7;
            }
          }
          .love {
            background: url("../../images/global/z.png") no-repeat center center;
            background-color: #ff8726;
            &.active {
              background-image: url("../../images/global/c.png");
            }
          }
          .collect {
            background: url("../../images/global/x.png") no-repeat center center;
            background-color: rgba(0, 0, 0, 0.6);
            &.active {
              background-image: url("../../images/global/v.png");
            }
          }
        }
      }
      .pageInation {
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
}
</style>

