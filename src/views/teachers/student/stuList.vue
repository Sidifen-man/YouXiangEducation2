<template>
  <div class="container">
    <!-- 班级选择 -->
    <div class="className">
      <div class="selectContainer">
        <!-- <div :class="{'inpAct': className != '', 'inpNorm': className == ''}">
          <i class="el-icon-caret-bottom arrow"></i>
          {{className}}
        </div> -->
        <el-select
          v-model="className"
          clearable
          ref="select"
          prefix="el-icon-caret-top"
          placeholder="请选择"
          @change="classChange"
        >

          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 班级完成情况 -->
    <div class="completeCondi">
      <div class="titles">
        <div class="line"></div>
        <p class="subtitle">班级完成情况</p>
      </div>
      <div class="charts">
        <div
          class="piedata"
          v-for="(el, idx) in mycharts"
          :key="idx"
        >
          <div class="leftData">
            <pie-chart
              :chart-data="el.data"
              :shadowColor="el.shadowColor"
              :labelColor="el.labelColor"
              :showText="el.showText"
              :width="'80px'"
              :height="'80px'"
              :r1="22"
              :r2="32"
              :r3="24"
              :r4="30"
            />
          </div>
          <div class="rightData">
            <p class="tip">{{el.tip}}</p>
            <p
              :class="{'rate': true ,'nodata':el.per=='暂无数据'}"
              :style="{color: el.labelColor}"
            >{{el.per}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 班级优势画像 -->
    <div class="classPic">
      <div class="mytabs">
        <div class="leftTab">
          <div
            v-for="(v, i) in tabs"
            :key="i"
            @click="tabChange(i)"
          >
            <p
              class="active"
              v-if="tabindex == i"
            ></p>
            <p :class="{'act': tabindex ==i}">{{v}}</p>
          </div>
        </div>
        <div
          class="rightSear"
          v-if="tabindex==1"
        >
          <el-input
            placeholder="输入学生姓名查找"
            suffix-icon="el-icon-search"
            v-model="stuName"
          >
          </el-input>
        </div>
      </div>
      <!-- 优势画像 -->
      <div v-if="tabindex == 0">
        <div class="advantage">
          <div class="leftradar">
            <p class="radartitle">班级突出优势分布</p>
            <radar :chart-data="radarData"></radar>
          </div>
          <div class="rightline">
            <p class="radartitle">班级突出优势排名</p>
            <line-chart  :chart-data="lineData" :linColor="linColor"></line-chart>
          </div>
        </div>
        <!-- 班级突出优势详细分布 -->
        <div class="detail">
          <p class="radartitle">班级突出优势详细分布</p>
          <div class="distribute">
            <div class="kind dis1">
              <p class="disP">精神追求优势</p>
              <div class="sort">
                <div>欣赏美与卓越</div>
                <div>感恩</div>
                <div>乐观</div>
                <div>幽默</div>
                <div>灵性</div>
              </div>
              <div class="stu"  v-for="item in via0List">
                <h3>{{item.name}}</h3>
                  <div v-for="via in item.viaList">
                    <span :style="{backgroundColor:via.color}" ></span>
                  </div> 
              </div>
            </div>
            <div class="kind dis2">
              <p class="disP">情感类优势</p>
              <div class="sort">
                <div>勇敢</div>
                <div>坚毅</div>
                <div>坦诚</div>
                <div>热情</div>
              </div>
              <div class="stu" v-for="item in via1List">
                <div v-for="via in item">
                  <span :style="{backgroundColor:via.color}" ></span>
                </div> 
              </div>
            </div>
            <div class="kind dis3">
              <p class="disP">公民感优势</p>
              <div class="sort">
                <div>团队精神</div>
                <div>公平</div>
                <div>统率</div>
              </div>
              <div class="stu" v-for="item in via2List">
                <div v-for="via in item">
                  <span :style="{backgroundColor:via.color}" ></span>
                </div> 
              </div>
            </div>
            <div class="kind dis6">
              <p class="disP">人际关系优势</p>
              <div class="sort">
                <div>深度交往</div>
                <div>社交智慧</div>
                <div>友善</div>
              </div>
              <div class="stu" v-for="item in via3List">
                <div v-for="via in item">
                  <span :style="{backgroundColor:via.color}" ></span>
                </div> 
              </div>
            </div>
            <div class="kind dis4">
              <p class="disP">自我控制</p>
              <div class="sort">
                <div>宽容</div>
                <div>谦逊</div>
                <div>谨慎</div>
                <div>自我控制</div>
              </div>
              <div class="stu" v-for="item in via4List">
                <div v-for="via in item">
                  <span :style="{backgroundColor:via.color}" ></span>
                </div> 
              </div>
            </div>
            <div class="kind dis5">
              <p class="disP">思维类优势</p>
              <div class="sort">
                <div>创意</div>
                <div>好奇心</div>
                <div>判断力</div>
                <div>热爱学习</div>
                <div>洞察力</div>
              </div>
              <div class="stu" v-for="item in via5List">
                <div v-for="via in item">
                  <span :style="{backgroundColor:via.color}" ></span>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 学生列表 -->
      <div class="stulist"  v-if="tabindex == 1" >
        <el-table
          stripe
          :data="tableData"
          :cell-style="cellStyle"
          style="width: 100%;margin-bottom:10px"
          :header-cell-style="{background:'#49C7F1',color:'#fff'}"
        >
          <el-table-column
            prop="name"
            label="学生姓名"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column  prop="name"  label="突出优势"  width="180"  align="center" >
            <template slot-scope="scope">
              <div class="advan" v-if="scope.row.via_answer && scope.row.via_answer.length">
                <div v-for="(item, idx) in scope.row.via_answer"  :key="idx">
                  <img :src="require('../../../images/erqi/ceping/'+item.type+'.png')"   alt="" > 
                  <p>{{item.name}}</p>
                </div>
              </div>
              <div class="advan" v-else>
                暂无数据
              </div>
            </template>
          </el-table-column>
          <el-table-column  prop="address"  label="霍兰德代码"  align="center">
            <template slot-scope="scope">
              <div class="des" v-if="scope.row.cip_answer && scope.row.cip_answer.length">
                <p v-for="(item, idx) in scope.row.cip_answer" :key="idx"  v-if="idx<3">
                  {{item.name}}&nbsp;{{item.code.substring(0,1)}}
                </p>
              </div>
              <div class="des"  v-else>
                暂无数据
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address"  label="价值观代码"  align="center">
            <template slot-scope="scope">
              <div class="des" v-if="scope.row.wip_answer && scope.row.wip_answer.length">
                <p  v-for="(item,indx) in scope.row.wip_answer" :key="indx" v-if="indx<3">
                  {{item.name}}
                </p>
              </div>
              <div class="des" v-else>
                暂无数据
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div class="action">
                <div @click="viewAdPic(scope.row)">
                  <img
                    src="../../../images/view1.png"
                    alt=""
                  >
                  <span>查看优势画像</span>
                </div>
                <div @click="viewJobRecom(scope.row)">
                  <img
                    src="../../../images/view.png"
                    alt=""
                  >
                  <span>查看职业推荐</span>
                </div>
                <div @click="download(scope.row)">
                  <img
                    src="../../../images/download.png"
                    alt=""
                  >
                  <span>下载优势报告</span>
                </div>
              </div>

            </template>
          </el-table-column>
        </el-table>
       <el-pagination
          class="page"
          layout="prev, pager, next"
          :total="30"
        ></el-pagination>
      </div>

    </div>
    <!-- 弹框组件 -->
    <div v-if="showModal">
       <portrait @closeModal="closeDialog" :userId="userId" :stuName="userName" > </portrait>
    </div>
    <div v-if="showJobDialog">
       <jobsRecom @closeJob="closeJobDialog" :userId="userId" :stuName="userName"></jobsRecom>
    </div>
   
  </div>
</template>
<script>
import PieChart from '../../../tcomponents/pieChart/PieChart'
import radar from '../../../tcomponents/pieChart/radar'
import LineChart from '../../../tcomponents/pieChart/LineChart'
import portrait from './advantagePor'
import jobsRecom from './jobRecom'
import surver from "api/http/t-evaluation.js";

export default {
  components: {
    PieChart,
    radar,
    LineChart,
    portrait,
    jobsRecom,
  },
  data() {
    return {
      userId: '',
      userName:'',
      linColor:'#EEE',
      dataList: [],
      via0List: [],
      via1List: [],
      via2List :[],
      via3List :[],
      via4List:[],
      via5List:[],
      showModal: false,
      showJobDialog: false,
      lineData: [
        {value:2, name: '灵性',order:4}, {value: 4, name: '好奇心',order:2}, 
        {value: 5, name: '创意',order:1}, {value: 3, name: '深度交往',order:3}, 
        {value: 1, name: '友善',order:5}
        ],
        radarData: [
              { text: '思维类优势', max: 5 ,value: '1'},
              { text: '情感类优势', max: 5 ,value: '1' },
              { text: '人际关系优势', max: 5 ,value: '1' },
              { text: '公民感优势', max: 5 ,value: '1' },
              { text: '自我节制优势', max: 5 ,value: '1' },
              { text: '精神追求优势', max: 5 ,value: '1' }
            ],
      stuName: '',
      tabindex: 0,
      tabs: ['班级优势画像', '学生列表'],
      tableData: [],
      mycharts: [
        {
          tip: 'VIA优势测评完成率',
          per: '78%',
          showText: false,
          data: {
            crude: '78',
            thin: '22'
          },
          labelColor: '#FF8726',
          shadowColor: 'rgba(255, 135, 38, 0.2)'
        },
        {
          tip: '职业兴趣测评完成率',
          per: '78%',
          showText: false,
          data: {
            crude: 78,
            thin: 22
          },
          labelColor: '#26C9FF',
          shadowColor: 'rgba(38, 201, 255, 0.2)'
        },
        {
          tip: '职业价值观测评完成率',
          per: '暂无数据',
          showText: false,
          data: {
            crude: 78,
            thin: 22
          },
          labelColor: '#3DDEBE',
          shadowColor: 'rgba(61, 222, 190, 0.2)'
        }
      ],
      className: '',
      options: [],
    }
  },
  created(){
   let LocalStorage = this.$cache.localStorage
   this.lang = LocalStorage.get('lang');
  },
  mounted(){
    this.init()
  },
  watch:{
    stuName(val){
      this.search()
    }
  },
  methods: {
    viewAdPic (item) { // 查看优势画像
      this.showModal = true;
      this.userId = item.id;
      this.userName = item.name;
    },
    closeDialog (val) {
      this.showModal = val
    },
    viewJobRecom (item) { // 查看职业推荐
     this.showJobDialog = true;
     this.userId = item.id;
     this.userName = item.name;
    },
    closeJobDialog (val) {
      this.showJobDialog = false
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      //自定义单元格字体颜色
      return 'color:#888;font-size:13px;font-family:PingFang-SC-Medium;'
    },
    tabChange(i) {
      this.tabindex = i
    },
    search(){
      this.getClassSurveyList(this.className)
    },
    classChange(id) {
      this.classSurveyRatio(id)
      this.getClassViaPortrait(id)
      this.getClassSurveyList(id)
    },
    getClassSurveyList(id){
      const parms = {
        classInfoId:id,
        lang : this.lang,
        name : this.stuName
      }
      surver.getClassSurveyList(parms).then(res=>{
        if(res.data.code == 'success'){
          this.tableData = []
          if(res.data.result && res.data.result.length){
            this.tableData = res.data.result
          }
        }
       })
    },
    download(item){
      const parms = {
        userId : item.id,
        lang : this.lang
      }
      surver.getViaReport(parms).then(res=>{
        if(res.data.code == 'success'){
          window.open(res.data.result.reportUrl)
        }
       })
    },
    getClassViaPortrait(id){
      const parms = {
        classInfoId:id,
        lang : this.lang
      }
      surver.getClassViaPortrait(parms).then(res=>{
        this.via0List = [];
        this.via1List = [];
        this.via2List = [];
        this.via3List = [];
        this.via4List = [];
        this.via5List = [];
        if(res.data.code == 'success'){
          if(res.data.result.typeStat.length && res.data.result.users.length){

            const lineData = res.data.result.typeStat.splice(0,5);  

            let lineListObj = [];
            let lineList = [];
            let listIndex = [];
            for(let i=0;i<lineData.length;i++){
              if(lineList.indexOf(lineData[i].value)>-1){
                listIndex.unshift(lineData[i]);   //保持从小到大顺序
              }else{
                lineList.push(lineData[i].value);
                lineListObj.push(lineData[i])
              }
            }
            const  lineSort = lineListObj.sort(this.compare('value'));  //去除重复项后，从小到大排序
            let newLine = [];
            for(let i=0;i<lineSort.length;i++){
              listIndex.forEach(item=>{
                if(item.value==lineSort[i].value){
                  newLine.push(item)                 //重复项插入数组，保持数据初始倒序状态 
                }
              })
               newLine.push(lineSort[i]);
            }
             //设置排名
            this.$set(this.lineData[0],'name',newLine[3].name)
            this.$set(this.lineData[1],'name',newLine[1].name)
            this.$set(this.lineData[2],'name',newLine[0].name)
            this.$set(this.lineData[3],'name',newLine[2].name)
            this.$set(this.lineData[4],'name',newLine[4].name)    
    


            this.linColor = ''
            const catStat = res.data.result.catStat;
            this.radarData[0].value = catStat[1]?catStat[1].value:1;
            this.radarData[1].value = catStat[2]?catStat[2].value:1;
            this.radarData[2].value = catStat[3]?catStat[3].value:1;
            this.radarData[3].value = catStat[4]?catStat[4].value:1;
            this.radarData[4].value = catStat[5]?catStat[5].value:1;
            this.radarData[5].value = catStat[6]?catStat[6].value:1;
            const users = res.data.result.users; 
            const viaList =['Appreciation','Gratitude','Hope','Humor','Spirituality','Bravery','Perseverance','Honesty','Zest','Teamwork','Fairness','Leadership','Love','SocialIntell','Kindness','Forgiveness','Humility','Prudence','Self-Regulation','Creativity','Curiosity','Judgment','LoveLearning','Perspective'];
   
            for(let i=0;i<users.length;i++){
              const viaOjb = users[i].via_answer;
              let item = {};
                item.name = users[i].name;
              let via = [],via1=[],via2=[],via3=[],via4=[],via5=[];
              for(let j=0;j<viaOjb.length;j++){
                const index = viaList.findIndex(item =>item == viaOjb[j].type )
                const color = this.colorData(j,index);
                let obj = {};
                obj.color = color;
                obj.id = index;
                if(index<5){
                  via.push(obj)
                }else if(index<9){
                  via1.push(obj)    
                }else if(index<12){
                  via2.push(obj)                 
                }else if(index<15){
                  via3.push(obj)           
                }else if(index<19){
                  via4.push(obj)
                }else{
                  via5.push(obj)
                }
              }
              let a =  [];
              a = via.sort(this.compare('id'));
              item.viaList = a;
              this.via0List.push(item);

              let via11 = via1.sort(this.compare('id'))
              this.via1List.push(via11);

              let via22 = via2.sort(this.compare('id'));
              this.via2List.push(via22);

              let via33 = via3.sort(this.compare('id'));
              this.via3List.push(via33);

              let via44 = via4.sort(this.compare('id'));
              this.via4List.push(via44);

              let via55 = via5.sort(this.compare('id'));
              this.via5List.push(via55)
            }
          }else{
            this.radarData.map(item =>item.value = 1)
            this.via0List = [];
            this.via1List = [];
            this.via2List = [];
            this.via3List = [];
            this.via4List = [];
            this.via5List = [];
            this.linColor = '#EEE'
            this.lineData = [
                {value:2, name: '灵性',order:4}, {value: 4, name: '好奇心',order:2}, 
                {value: 5, name: '创意',order:1}, {value: 3, name: '深度交往',order:3}, 
                {value: 1, name: '友善',order:5}
                ]
          }
        }
       })
    },
    colorData(j){
      if(j<5){
        return '#FF8726'
      }else if(j<=23 && j>18){
        return '#30BDF1'
      }else{
        return '#f8f8f8'
      }
    },
    compare(pro){
      return function(a,b){
        let val1 = a[pro];
        let val2 = b[pro];
        return val1 - val2
      }
    },
    classSurveyRatio(id){
      surver.getClassSurveyRatio({classInfoId:id}).then(res=>{
      if(res.data.code == 'success'){
        if(res.data.result){
          const viaRatio = res.data.result.viaRatio
          this.classCommit(0,viaRatio)
          const cipRatio = res.data.result.cipRatio;
          this.classCommit(1,cipRatio)         
          const wipRatio = res.data.result.wipRatio;
          this.classCommit(2,wipRatio)
        }
      }
     })
    },
    classCommit(objOrd,val){
      this.mycharts[objOrd].per = val>=0?`${val}%`:"暂无数据";
      this.mycharts[objOrd].data.crude = val>=0?val:0;
      this.mycharts[objOrd].data.thin =  val>=0?(100-val):100;
    },
    init(){
     surver.getclasslist().then(res=>{
      if(res.data.code == 'success'){
        if(res.data.result && res.data.result.datalist && res.data.result.datalist.length){
          this.options = res.data.result.datalist;
          this.className = res.data.result.datalist[0].id;
          this.classSurveyRatio(this.className)
          this.getClassViaPortrait(this.className)
          this.getClassSurveyList(this.className)
        }
      }
     })
    }
  }
}
</script>
<style lang="less" scoped>
@bgc: #fff;
.container {
  .act {
    font-size: 14px;
    font-family: PingFang-SC-Heavy;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .active {
    width: 20px;
    height: 2px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fc7927;
  }
  .className {
    background-color: @bgc;
    // box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 25px;
    box-sizing: border-box;
    position: relative;
    // .myinp {
    //   appearance: none;
    //   -moz-appearance: none;
    //   -webkit-appearance: none;
    //   border: 1px solid red;
    //   width: 116px;
    //   height: 34px;
    //   padding-left: 20px;
    //   box-sizing: border-box;
    //   position: absolute;
    //   z-index: 999;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   background-color: #eee;
    //   // option {
    //   //   width: 100%;
    //   //   padding-left: 20px;
    //   //   box-sizing: border-box;
    //   // }
    // }
    .selectContainer {
      position: relative;
      width: 116px;
      height: 34px;
      .newval {
        color: #fff;
      }
      .arrow {
       font-size: 22px;
        position: absolute;
        right: 6px;
        transform: translateY(-50%);
        top: 48%;
      }
      .inpAct {
        position: absolute;
        z-index: 999;
        border-radius: 4px;
        width: 100%;
        height: 34px;
        color:#fff;
        display: flex;
        align-items: center;
        // justify-content: center;
        padding-left: 10px;
        background-color: #FF8726;
        pointer-events: none;
        .arrow {
          width:20px;
          height: 10px;
          line-height: 10px;
          display: inline-block;
          background-color: #FF8726;
          // background-color: red;
          color: #fff;
        }
      }
      .inpNorm {
        position: absolute;
        z-index: 999;
        border-radius: 4px;
        width: 100%;
        height: 34px;
         display: flex;
        align-items: center;
        padding-left: 10px;
        // justify-content: center;
        color: green;
        // background-color: #eee;
        // background-color: red;
        pointer-events: none;
        .arrow {
          width:20px;
          height: 10px;
          line-height: 10px;
          display: inline-block;
           background: rgba(255, 247, 237, 1);
          color:#B1B1B1;
        }
      }
      .el-select {
        width: 116px;
        height: 34px;
      }
    }
  }
  .completeCondi {
    margin-top: 16px;
    height: 182px;
    background-color: @bgc;
    box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
    // border-radius: 12px;
    padding: 15px 25px 25px 0;
    box-sizing: border-box;
    .titles {
      display: flex;
      .line {
        width: 2px;
        height: 15px;
        background: rgba(252, 121, 39, 1);
        border-radius: 1px;
      }
      .subtitle {
        height: 15px;
        font-size: 14px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        margin-left: 20px;
      }
    }
    .charts {
      padding: 25px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .chart {
        position: relative;
        top: -8px;
        left: -8px;
      }
      .piedata {
        width: 286px;
        height: 100px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
        display: flex;
        padding: 18px 0 18px 31px;
        box-sizing: border-box;
        .leftData {
          width: 100px;
          height: 100px;
        }
        .rightData {
          .tip {
            // width: 119px;
            height: 14px;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          .rate {
            margin-top: 16px;
            // width: 44px;
            height: 17px;
            font-size: 24px;
            font-family: DIN-Medium;
            font-weight: bold;
          }
          .nodata {
            font-size: 16px;
          }
        }
      }
    }
  }
  .radartitle {
    font-size: 16px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 135, 38, 1);
    line-height: 40px;
    margin-top: 23px;
    text-align: center;
  }
  .classPic {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(177, 79, 0, 0.07);
    border-radius: 12px;
    margin-top: 16px;
    padding: 15px 25px;
    .mytabs {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .leftTab {
        display: flex;
        div {
          cursor: pointer;
          position: relative;
          height: 25px;
          line-height: 25px;
          margin-right: 55px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: normal;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .advantage {
      display: flex;
      justify-content: space-between;
      .leftradar {
        width: 443px;
        height: 367px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
      }
      .rightline {
        width: 443px;
        height: 367px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
      }
    }
    .el-input {
      width: 170px;
      height: 34px;
    }
    .stulist {
      .action {
        img {
          width: 14px;
          height: 16px;
        }
        div {
          cursor: pointer;
          line-height: 24px;
        }
      }
      .des p {
        line-height: 24px;
      }
    }
    .advan {
      display: flex;
      justify-content: space-around;
      img {
        width: 39px;
        height: 39px;
      }
      p {
        height: 20px;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
      }
    }
  }
  .detail {
    margin-top: 20px;
    // width: 918px;
    overflow: hidden;
    height: 530px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
    border-radius: 6px;
    .radartitle {
      margin: 20px;
    }
    .distribute {
      display: flex;
      justify-content: space-around;
      padding-left: 50px;
      box-sizing: border-box;
      .kind {
        .stu {
          display: flex;
          justify-content: space-between;
          margin-top: 3px;
          position: relative;
          h3 {
            width: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // background-color: red;
            position: absolute;
            font-size: 12px;
            text-align: right;
            padding-right: 4px;
            box-sizing: border-box;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            top: 50%;
            transform: translateY(-50%);
            left: -54px;
          }
          div {
            width: 28px;
            height: 28px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #54be81;
            background: rgba(248, 248, 248, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              display: block;
              width: 20px;
              height: 20px;
              background-color: #54be54;
            }
          }
        }
        .sort {
          display: flex;
          justify-content: space-between;
          div {
            width: 28px;
            height: 120px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            writing-mode: vertical-lr;
            color: #54be81;
            background: rgba(248, 248, 248, 1);
            font-family: PingFang-SC-Bold;
          }
        }
      }
      .disP {
        text-align: center;
        height: 30px;
        font-size: 14px;
        // font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        border-radius: 4px 4px 0px 0px;
      }
      .dis1 {
        width: 152px;
        p {
          background-color: #54be81;
        }
      }
      .dis2 {
        width: 121px;
        p {
          background-color: #2891e2;
        }
        .sort div {
          color: #2891e2;
        }
        .stu {
          div {
            span {
              display: block;
              background-color: #2891e2;
            }
          }
        }
      }
      .dis3 {
        width: 90px;
        p {
          background-color: #13b4ae;
        }
        .sort div {
          color: #13b4ae;
        }
        .stu {
          div {
            span {
              display: block;
              background-color: #13b4ae;
            }
          }
        }
      }
      .dis4 {
        width: 121px;
        p {
          background-color: #8e74cf;
        }
        .sort div {
          color: #8e74cf;
        }
        .stu {
          div {
            span {
              display: block;
              background-color: #8e74cf;
            }
          }
        }
      }
      .dis5 {
        width: 152px;
        p {
          background-color: #01acc5;
        }
        .sort div {
          color: #01acc5;
        }
        .stu {
          div {
            span {
              display: block;
              background-color: #01acc5;
            }
          }
        }
      }
      .dis6 {
        width: 90px;
        p {
          background-color: #E1991B;
        }
        .sort div {
          color: #E1991B;
        }
        .stu {
          div {
            span {
              display: block;
              background-color: #01acc5;
            }
          }
        }
      }
    }
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
 /deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
        z-index: 0;
  }
}
</style>


