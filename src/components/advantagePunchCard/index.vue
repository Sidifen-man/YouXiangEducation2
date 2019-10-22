<template>
	<div class="details" v-loading="loading">
    <el-dialog class="details-dialog" :visible.sync="state" :before-close="handleClose">
			<div slot="title" class="punch">
        <div class="name">
          <p>完整优势打卡的展示</p>
          <div class="button">置顶到成长档案</div>
        </div>
        <div class="content">
          <div class="left">
            <!-- 优势图标 -->
            <div class="advantage">
              <div class="ad_left">
                <div v-for="item in advantageTag">
                  <img :src="item.imgsrcSed" alt="" class="ad_left_img">
                  <p>{{item.label}}</p>
                </div>
              </div>
              <div class="line"></div>
              <div class="ad_right">
                <div v-for="item in abilityTag">
                  <img :src="item.icon" alt="" class="ad_right_img">
                  <p>{{item.tipTitle}}</p>
                </div>
              </div>

            </div>
            <!-- 查看作品 -->
            <div class="works" >
              <div>
                <img src="../../assets/images/icon/ad_works.png" alt="">
                <p>{{attend.title}}</p>
              </div>
              <el-dropdown @command="seeWorks">
                <span class="el-dropdown-link">
                  <div  class="seeWorks">
                  查看作品 <img src="../../assets/images/icon/ad_next.png" alt="">
                </div>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <div v-if="attend.worksList && attend.worksList.length">
                    <el-dropdown-item :command="{param:workItem}" v-for="(workItem,idx) in attend.worksList" :key="idx">{{workItem.name}}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
           <!--  <div class="works" @click="jumpTo18">
              <div>
                <img src="../../assets/images/icon/ad_works.png" alt="">
                <p>{{attend.title}}</p>
              </div>
              <div>
                <p>查看作品</p>
                <img src="../../assets/images/icon/ad_next.png" alt="">
              </div>
            </div> -->
            <!-- 问答 -->
            <section class="qa">
              <p><i>Situation：</i>当时的情况/挑战是什么？</p>
              <div>{{attend.situation?attend.situation:'例如：我最喜欢的数学课学到很难得概念，我学不懂，测验失利（不超过140字）'}}</div>
              <p><i>Action：</i>你的主要行动是什么? </p>
              <div v-if="attend.action">{{attend.action}}</div>
              <div v-else>我主动找老师课后问问题<br>我和最好的朋友约着一起对卷子<br>我安慰自己，很快恢复了情绪</div>
              <p><i>Results：</i>结果如何?</p>
              <div>{{attend.result?attend.result:'周末作业我都完成了，也都会了'}}</div>
            </section>
          </div>
          <div class="middle_line"></div>
          <div class="right">
            <div class="punch_detail">
              <p>打卡时间：<i>{{attend.createDate}}</i></p>
              <p>活动类型：<i v-if="!ATTENDEVAL">优势打卡</i><i v-else>优势打卡评价</i></p>
              <!-- <p>科目方向：<i>stem</i></p> -->
              <p>担任角色：<i v-if="attend.role==1">社团负责人</i>
                           <i v-if="attend.role==2">活动组织者</i>
                           <i v-if="attend.role==3">组长/队长</i>
                           <i v-if="attend.role==4">团队成员</i>
                           <i v-if="attend.role==0">独立完成</i>
              </p>
              <p>参与时间：<i>{{attend.joinDate}}</i></p>
              <p>本次花费时间：<i>{{attend.hours}}小时</i></p>
            </div>
            <div class="comment">
              <div class="comment_title">
                <p class="title">活动评价</p>
                <div class="pagination" v-show="isStatus==='3'">
                  <button class="el-icon-arrow-left" @click.stop="prev"></button>
                  <span><b>{{currentPage}}</b>/{{data.length}}</span>
                  <button class="el-icon-arrow-right" @click.stop="next"></button>
                </div>
              </div>
              <div class="punch_person" v-show="isStatus==='1'||isStatus==='4'">
                <img src="../../assets/images/icon/ad_1.png" alt="">
                <p class="assess">你邀请的对象尚未完成评价</p>
                <p class="look">稍后查看</p>
              </div>
              <div class="punch_person" v-show="isStatus==='2'" @click.stop="goInvite">
                <img src="../../assets/images/icon/ad_2.png" alt="">
                <p class="assess">暂无活动评价</p>
                <p class="look">去邀请评价，赢得行动力积分</p>
              </div>
              <div class="person_comment" v-show="isStatus==='3'">
                <div class="page" v-show="currentPage===index+1" v-for="(item,index) in data" :key='index'>
                  <div class="comment_content">{{item.content}}</div>
                  <div class="comment_user">
                    <img src="../../assets/images/icon/ad_3.png" alt="">
                    <div>
                      <p class="user_name" v-if="item.user">{{item.user.name}}</p>
                      <p class="user_name" v-else>暂无名称</p>
                      <p class="comment_time">{{item.createDate}}</p>
                    </div>
                    <img src="../../assets/images/icon/icon_praise_selected.png" alt="" v-if="item.wow=='1'">
                    <img src="../../assets/images/icon/icon_praise.png" alt="" v-else>
                    <p class="wow">Wow</p>
                  </div>
                  <p class="ad_tag">优势标签</p>
                  <ul>
                    <li v-for ="item in stuAdvantage[index]">
                      <img :src="item.imgsrcSed" alt="">
                      <span>{{item.label}}</span>
                    </li>
                  </ul>
                  <p class="ad_tag">技能标签</p>
                  <ul>
                    <li v-for="item in stuAbility[index]">
                      <img :src="item.icon" alt="">
                      <span>{{item.tipTitle}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            
        </div>
        <footer>
          <button class="button1" v-show="isStatus==='1'||isStatus==='2'" @click="handleClose">完成并关闭</button>
          <button class="button2" v-show="isStatus==='1'||isStatus==='2'" @click="handleContinuePunch">继续打卡</button>
          <button class="button2" v-show="isStatus==='3'||isStatus==='4' " @click="handleClose">完成并关闭</button>
        </footer>
			</div>
    </el-dialog>
    <div class="contentTaskDetail">
      <content-task-detail :state.sync="contentTaskShow" :info="seeWorksObj" :task-result-id="taskresultId" v-on:close="handleContentTaskClose" ></content-task-detail>
    </div>
    

	</div>
</template>

<script>
  import { getAdvEvalTask } from 'api/api'
  import { getAdvActivityApi } from 'api/api'
  import ContentTaskDetail from './contentTaskDetail.vue'
  import axios from 'axios'
    
// 组建需三个props state控制dialog显示与隐藏，status根据不同打卡状态展示不同页面，close触发父组件方法
// status：1 表示对方尚未评价，2 表示没有邀请，3 表示完整打卡

export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: '2'
    },
    taskresultId:'',
    ATTENDEVAL:false,
  },
  components: {
      ContentTaskDetail,
    },
  data() {
    return {
      contentTaskShow:false,
      loading: false,
      currentPage:1,
      activeId:'',
      data:[],
      attend:'',
      office:'',
      sponsor:'',
      taskInfo:'',
      user:'',
      attendeval:{},
      superiority:[
        {
          "label": "欣赏美和卓越",
          "prop": "balanced",
        },{
          "label": "感恩",
          "prop": "thankful",
        },{
          "label": "乐观",
          "prop": "optimistic",
        },{
          "label": "幽默",
          "prop": "humorous",
        },{
          "label": "灵性",
          "prop": "spiritrual",
        },{
          "label": "热情",
          "prop": "enthusiastic",
        },{
          "label": "勇敢",
          "prop": "brave",
        },{
          "label": "坚毅",
          "prop": "fortitude",
        },{
          "label": "坦诚",
          "prop": "frank",
        },{
          "label": "团队精神",
          "prop": "teamSpirit",
        },{
          "label": "公平",
          "prop": "fair",
        },{
          "label": "统率",
          "prop": "command",
        },{
          "label": "深度交往",
          "prop": "deepCommunication",
        },{
          "label": "社交智慧",
          "prop": "wisdom",
        },{
          "label": "友善",
          "prop": "friendly",
        },{
          "label": "宽容",
          "prop": "tolerant",
        },{
          "label": "谦虚",
          "prop": "modest",
        },{
          "label": "谨慎",
          "prop": "prudent",
        },{
          "label": "自我控制",
          "prop": "selfControl",
           },{
          "label": "创意",
          "prop": "originality",
        },{
          "label": "好奇心",
          "prop": "curiosity",
        },{
          "label": "判断力",
          "prop": "judgment",
        },{
          "label": "喜爱学习",
          "prop": "learning",
        },{
          "label": "洞察力",
          "prop": "insight",
        }
      ],  //初始化优势
      operate:[
        {
          "light": "",
          "gery": "",
          "prop": "1",
          "showLight":false,
          "tipTitle": "判断性思维",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "2",
          "showLight":false,
          "tipTitle": "沟通技能",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "3",
          "showLight":false,
          "tipTitle": "团队协作",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "4",
          "showLight":false,
          "tipTitle": "创造力",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "5",
          "showLight":false,
          "tipTitle": "世界公民",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "6",
          "showLight":false,
          "tipTitle": "自我认知",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "7",
          "showLight":false,
          "tipTitle": "自我管理",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "8",
          "showLight":false,
          "tipTitle": "社会意识",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        },{
          "light": "",
          "gery": "",
          "prop": "9",
          "showLight":false,
          "tipTitle": "关系建立",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
          },{
          "light": "",
          "gery": "",
          "prop": "10",
          "showLight":false,
          "tipTitle": "决策能力",
          "tipDesc": "遇到问题时主动分析搜集信息，经过辨证思考后采取行动的技能"
        }
      ], 
      advantageTag:[],   //活动者的优势
      abilityTag:[],
      stuAbility:[],//评价的优势
      stuAdvantage:[],
      isStatus:'2',
      seeWorksObj:{}

    };
  },
  created() {
    this.initImgList()
  },
  mounted(){
    let activeId = this.$router.currentRoute.query.activeId
    if(activeId && !this.taskresultId)this.getActivityDetail(activeId)  
  },
  watch: {
    state(newVal,oldVal){ 
      if(newVal && this.taskresultId){
         this.getAdvEvalTask(this.taskresultId)
      }
    },
    status(newVal){
      this.isStatus = newVal;
    },
    taskresultId (newVal) {
     // this.getAdvEvalTask(newVal)
     /* if(this.$route.params.taskInfoId){
       this.getActivityDetail(this.$route.params.taskInfoId)
      }*/
    },
    ATTENDEVAL(newVal){

    }
  },
  methods: {
    handleContentTaskClose(){
      this.seeWorks()
    },
    goInvite(){
      this.$router.push({path:'/superiority-clockin/empty',query:{taskresultId: this.taskresultId}})
    },
    seeWorks(command){
      this.contentTaskShow = !this.contentTaskShow;
      if(command){
        console.log(command)
        this.seeWorksObj = command.param
      }
    },
    initImgList(){
       this.dynamicImportImg()
      // axios.get('/api/applyLabel', {emulateJSON: true}).then(Response=>{
      //   console.log(Response.data)
      //   this.operate = Response.data.data.addOperate;
      //   let superiority = []
      //   let superiorityold = Response.data.data.addSuperiority
      //   for(let i in superiorityold){
      //     superiority = superiority.concat(superiorityold[i].children)
      //   }
      //   this.superiority = superiority
      //   this.dynamicImportImg()
      // }).catch(err=>{

      //   console.log(err)
      // })
    },
    dynamicImportImg () {
      this.operate.forEach((item, index) => {
        import(`../../assets/images/advantage/icon${index + 1}_1.png`).then(res => {
          this.operate[index].icon = res
        })
      })
      this.superiority.forEach((item, index) => {
        import(`../../assets/images/superiority/select/icon${index + 1}.png`).then(res => {
          this.superiority[index].imgsrc = res
        })
        import(`../../assets/images/superiority/selected/icon${index + 1}.png`).then(res => {
          this.superiority[index].imgsrcSed = res
        })
      })
    },
     handleContinuePunch() {
     if(this.$router.currentRoute.fullPath.indexOf('taskresultId')>-1){
        let taskresult = this.$router.currentRoute.query.taskresultId;
        this.$router.push({
         path: "/superiority-clockin/empty",
         query:{
           taskresultId : taskresult
         }
        });
     }else{
        this.$router.push( "/superiority-clockin/empty",);
     } 
    },
    handleClose() {
      this.$emit("close");
    },
    jumpTo18(){
      this.$emit('showActivity')
    },
    prev(){
      if(this.currentPage <= 1){
        return
      }
      this.currentPage--
    },
    next(){
      if(this.currentPage >= this.data.length){
        return
      }
      this.currentPage++
    },
    getAdvEvalTask: function(id) {
      // 优势打卡评价活动详情
      this.loading = true;
        let  params = {}
         params.id = id
        axios.post(getAdvEvalTask, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){

            this.attend = res.data.result.attend;
            this.office = res.data.result.office;
            this.sponsor = res.data.result.taskInfo.sponsor;
            this.taskInfo = res.data.result.taskInfo;
            this.user = res.data.result.user;
            this.data = [];
            let attendeval = res.data.result.attendeval || {};
            if(res.data.result.attendeval){
               this.isStatus = '3'
               this.data.push(attendeval)
            }else{
              if(res.data.result.attend.evalList && res.data.result.attend.evalList.length){
                  this.isStatus = '3'
                  this.data = res.data.result.attend.evalList
              }else{
                this.isStatus = '4'
              }
            } 
            let advantageTag = this.attend.advantageTag
            if(advantageTag){
              if(typeof advantageTag == 'string'){
                advantageTag = advantageTag.split(',')
              }
               let advantageTagnew = []
              for(let i =0;i<advantageTag.length;i++){
                advantageTagnew.push(this.getTagInfo('superiority',advantageTag[i]))
             }
             this.advantageTag = advantageTagnew
           }
           let abilityTag = this.attend.abilityTag;
           this.abilityTag =[]
            if(abilityTag){
              if(typeof abilityTag == 'string'){
                abilityTag = abilityTag.split(',')
              }
              for(let i =0;i<abilityTag.length;i++){
                 this.abilityTag[i] = this.getTagInfo('operate',abilityTag[i])
             }
           }
            // 评价的
          if(this.data.length){
            this.data.forEach((item,index)=>{
              let stuAbility = item.abilityTag
              let stuAbilityList =[];
              if(stuAbility){
                if(typeof stuAbility == 'string'){
                  stuAbility = stuAbility.split(',')
                }
                for(let i =0;i<stuAbility.length;i++){
                   stuAbilityList[i] = this.getTagInfo('operate',stuAbility[i])
                }
              }
              this.stuAbility.push(stuAbilityList)
              let stuAdvantage = item.advantageTag;
              let stuAdvantageList =[];
              if(stuAdvantage){
                if(typeof stuAdvantage == 'string'){
                  stuAdvantage = stuAdvantage.split(',')
                }
                for(let i =0;i<stuAdvantage.length;i++){
                  stuAdvantageList.push(this.getTagInfo('superiority',stuAdvantage[i]))
                }
              }
              this.stuAdvantage.push(stuAdvantageList)
            })

          }
           // let stuAbility = res.data.result.attendeval.abilityTag
           //  if(stuAbility){
           //    if(typeof stuAbility == 'string'){
           //      stuAbility = stuAbility.split(',')
           //    }
           //    for(let i =0;i<stuAbility.length;i++){
           //       this.stuAbility[i] = this.getTagInfo('operate',stuAbility[i])
           //   }
           // }
           // let stuAdvantage = res.data.result.attendeval.advantageTag
           //  if(stuAdvantage){
           //    if(typeof stuAdvantage == 'string'){
           //      stuAdvantage = stuAdvantage.split(',')
           //    }
           //     let advantageTagnew = []
           //    for(let i =0;i<stuAdvantage.length;i++){
           //      advantageTagnew.push(this.getTagInfo('superiority',stuAdvantage[i]))
           //   }
           //   this.stuAdvantage = advantageTagnew
           // }
          }else{
            this.isStatus = '4'
          }
         
        }).catch(err=>{
         
          console.log(err)
        })
       setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    getActivityDetail: function(activeId) {
      // 优势打卡活动详情

       this.loading = true;
        let params = {
          id: activeId,
          works:1
        }
        axios.post(getAdvActivityApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
           this.attend = res.data.result;

           if(res.data.result.advantageTag){
              for(let i =0;i< res.data.result.advantageTag.length;i++){
                this.advantageTag[i] = this.getTagInfo('superiority',res.data.result.advantageTag[i])
             }
           }
           if(res.data.result.abilityTag){
            for(let i =0;i< res.data.result.abilityTag.length;i++){
              this.abilityTag[i] = this.getTagInfo('operate',res.data.result.abilityTag[i])
            }
           }
           
          } else {
            //this.activityList = []
            /*this.$message({
              message: res.data.message,
              type: 'warning'
            });*/
          }

        }).catch(err=>{
        console.log(err)
        })
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    getTagInfo: function(cat, tag) {  // 获取标签信息: 暂时处理，应从接口获取   图标名称修改了些还需调整
      let list = this[cat];
      for (let i = 0; i < list.length; i++) {
        if(cat == 'superiority'){
          if (tag == list[i].label || tag == list[i].prop)
          return list[i];
        }else{
          if (tag == list[i].prop ||  tag == list[i].tipTitle )
          return list[i];
        }
      }
      let nullList = ''
      return nullList;
    },
  }
};
</script>
<style lang="scss">
  .contentTaskDetail{
    .details{
      .el-dialog{
        height:auto !important;
      }
      .detailsHead{
        padding: 0!important;
        margin-right: 0 !important;
      }
    }
  }
  .el-dropdown-menu__item{
     &:not(.is-disabled){
      &:hover{
        background-color:#f8f8f8;
         color: #f79727;
      }
     }
    }
</style>
<style lang="scss" scoped>

.details {
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 0.16rem;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.44rem;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 0.04rem;
        height: 0.16rem;
        background: rgba(247, 151, 39, 1);
        top: 50%;
        left: -0.1rem;
        transform: translateY(-50%);
      }
    }
    .button {
      display:none;
      margin-right: 1.2rem;
      width: 1.5rem;
      height: 0.4rem;
      background: rgba(247, 151, 39, 1);
      box-shadow: 0rem 0rem 0rem 0rem rgba(247, 39, 151, 0.35);
      font-size: 0.15rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.4rem;
      border-radius: 0.06rem;
    }
  }
  .content {
    height: 5.4rem;
    margin: 0.14rem 0.2rem 0.33rem 0.31rem;
    display: flex;
    justify-content: space-between;
    .left {
      width: 6.39rem;
      height: 100%;
      .advantage {
        width: 100%;
        height: 0.8rem;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(228, 232, 237, 1);
        opacity: 0.8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.12rem;
        line-height: 0.12rem;
        .line {
          width: 1px;
          height: 0.32rem;
          background: rgba(228, 232, 237, 1);
        }
        .ad_left {
          width: 3.19rem;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > div {
            margin-left: 0.55rem;
            img {
              margin: 0 auto;
              display: block;
            }
            p {
              &:nth-of-type(1) {
                color: rgba(217, 87, 217, 1);
              }
              &:nth-of-type(2) {
                color: #24aef2;
              }
              &:nth-of-type(3) {
                color: #fa4b77;
              }
            }
          }
          .ad_left_img {
            width: 0.28rem;
            height: auto;
            margin-bottom: 0.15rem;
          }
        }
        .ad_right {
          width: 3.18rem;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > div {
            margin-left: 0.5rem;
            img {
              margin: 0 auto;
              display: block;
            }
            &:nth-of-type(2) {
              margin: 0 0.42rem;
            }
            &:nth-of-type(3) {
              margin: 0;
            }
            p {
              color: #f79727;
              margin-top: 0.1rem;
            }
          }
          .ad_right_img {
            width: 0.36rem;
            height: 0.4rem;
          }
        }
      }
      .works {
        height: 0.76rem;
        width: 100%;
        border-bottom: 1px solid rgba(228, 232, 237, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          &:nth-of-type(1) {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 0.72rem;
              height: 0.5rem;
            }
            p {
              font-size: 0.13rem;
              color: #333;
              margin-left: 0.14rem;
            }
          }
          .seeWorks{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              margin-left:0.1rem;
            }
          }
          &:nth-of-type(2) {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height:0.21rem;
            overflow:hidden;
            img {
              width: 0.18rem;
              height: 0.18rem;
            }
            p {
              font-size: 0.12rem;
              color: #999;
              margin-right: 0.11rem;
            }
          }
        }
      }
      .qa {
        p {
          font-size: 0.15rem;
          color: rgba(51, 51, 51, 1);
          line-height: 0.52rem;
          i {
            font-weight: bold;
          }
        }
        > div {
          background: rgba(255, 248, 240, 1);
          border-radius: 0.06rem;
          font-size: 0.14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(247, 151, 39, 1);
          padding: 0.18rem 0.31rem 0 0.2rem;
          line-height: 0.26rem;
          box-sizing: border-box;
          &:nth-of-type(1) {
            height: 0.6rem;
            max-height: 1.06rem;
            overflow: auto;
          }
          &:nth-of-type(2) {
            max-height: 1.06rem;
            overflow: auto;
          }
          &:nth-of-type(3) {
            height: 0.6rem;
            min-height: 0.6rem;
            overflow: auto;
          }
        }
      }
    }
    .middle_line {
      width: 1px;
      height: 100%;
      background: rgba(228, 232, 237, 1);
    }
    .right {
      width: 2.69rem;
      height: 100%;
      .comment_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pagination {
          button,
          span {
            display: inline-block;
            vertical-align: middle;
          }
          button {
            width: 0.2rem;
            height: 0.2rem;
            background: #fff;
            text-align: center;
            line-height: 0.2rem;
            cursor: pointer;
            color: rgba(188, 197, 204, 1);
            border: 1px solid rgba(188, 197, 204, 1);
            margin-right: 0.12rem;
            &:nth-of-type(2){
              margin-left: .12rem;
              margin-right: 0;
            }
            &:hover {
              background: #fff;
              color: rgba(247, 151, 39, 1);
              border: 1px solid rgba(247, 151, 39, 1);
            }
          }
          span {
            font-size: 0.14rem;
            b {
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: #f79727;
              font-size: 0.16rem;
            }
          }
        }
      }
      .punch_detail {
        width: 100%;
        height: 2rem;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(228, 232, 237, 1);
        opacity: 0.8;
        p {
          font-size: 0.13rem;
          line-height: 1;
          margin: 0.23rem 0;
          text-indent: 0.4rem;
          position: relative;
          color: #888;
          &::after {
            position: absolute;
            content: ".";
            width: 0.04rem;
            height: 0.04rem;
            background: rgba(247, 151, 39, 1);
            top: 50%;
            transform: translateY(-50%);
            left: 0.27rem;
          }
          i{
            color: #333;
          }
        }
      }
      .comment {
        height: 0.47rem;
        line-height: 0.47rem;
        .title {
          font-size: 0.16rem;
          color: #333;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          position: relative;
          margin-left: 0.1rem;
          &:after {
            content: "";
            position: absolute;
            width: 0.04rem;
            height: 0.16rem;
            background: rgba(247, 151, 39, 1);
            border-radius: 2px;
            top: 50%;
            left: -0.1rem;
            transform: translateY(-50%);
          }
        }
      }
      .punch_person {
        img {
          display: block;
          margin: 0.21rem auto 0.21rem;
          width: 1.5rem;
        }
        p {
          text-align: center;
          line-height: 0.26rem;
          &.assess {
            font-size: 0.16rem;
            color: #333;
            margin-bottom: 0.18rem;
          }
          &.look {
            font-size: 0.15rem;
            color: #999;
          }
        }
      }
      .person_comment {
        .page {
          .comment_content {
            height: 1.2rem;
            width: 100%;
            background-color: #f2f5f7;
            font-size: 0.13rem;
            color: #666;
            line-height: 0.22rem;
            box-sizing: border-box;
            padding: 0.18rem 0.15rem 0.24rem 0.17rem;
            text-indent: 2em;
            word-break: break-word;
          }
          .comment_user {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0.1rem 0;
            img {
              &:nth-of-type(1) {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.11rem;
              }
              &:nth-of-type(2) {
                width: 0.24rem;
                height: 0.25rem;
                margin-left: 0.34rem;
                margin-right: 0.1rem;
              }
            }
            .user_name {
              font-size: 0.14rem;
              color: #333;
              line-height: 0.22rem;
              font-family: MicrosoftYaHei;
            }
            .comment_time {
              font-size: 0.12rem;
              color: #999;
              line-height: 0.22rem;
            }
            .wow {
              font-size: 0.18rem;
              color: #333;
              font-family: Arial-BoldMT;
              font-weight: bold;
            }
          }
          .ad_tag {
            font-size: 0.15rem;
            color: #333;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            line-height: 1;
          }
          > ul {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            height: 0.43rem;
            &:nth-of-type(1) {
              li {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height:0.43rem;
                img {
                  display: block;
                  width: 0.19rem;
                  height: auto;
                }
                span {
                  font-size: 0.14rem;
                  display: block;
                  margin-left: 0.1rem;
                  line-height: 0.14rem;
                }
                
              }
            }
            &:nth-of-type(2) {
              li {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                height:0.43rem;
                img {
                  width: 0.26rem;
                  height: auto;
                  display: block;
                  margin-left: -0.02rem;
                }
                span {
                  font-size: 0.12rem;
                  display: block;
                  margin: 0 0.05rem;
                  line-height: 0.14rem;
                }
              }
            }
          }
        }
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 1.2rem;
      height: 0.36rem;
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 0.04rem;
      margin-right: 0.2rem;
      font-size: 0.14rem;
      background-color: #fff;
      &.button1 {
        color: #999;
      }
      &.button2 {
        color: #fff;
        background: linear-gradient(
          -90deg,
          rgba(255, 183, 38, 1),
          rgba(255, 129, 38, 1)
        );
        border: 1px solid #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.details /deep/ .el-dialog {
  width: 10rem;
  height: 7.1rem;
  margin: 0.22rem auto 0 !important;
}
.details /deep/ .el-dialog__header {
  height: 0.6rem;
  padding: 0;
  line-height: 0.6rem;
  border-bottom: 1px solid rgba(228, 232, 237, 1);
}
.details-dialog .el-dialog__body {
}
</style>
