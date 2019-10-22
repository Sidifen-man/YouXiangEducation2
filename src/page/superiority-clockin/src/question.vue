<template>
  <div class="questions">
    <div class="questions-header">
      <div class="left">
        <img :src="activeData.thumbUrl" alt="">
      </div>
      <div class="right">
        <h2 class="title">{{activeData.title||activeData.name}}</h2>
        <p class="desc">{{activeData.intro}}</p>
      </div>
    </div>
    <div class="questions-actions">
      <el-row>
        <el-col class="acrion-btn" :span="12">
          <button v-if="showAddSupBtn" @click="addSuperiority">添加优势应用标签</button>
          <ul v-else class="shown-list superity">
            <li :class="item.type" v-for="(item,index) in advantageTag" :key="index">
              <img :src="item.imgsrcSed||item.icon" alt="" v-if="item.icon||item.imgsrc">
              <p>{{item.title || item.label}}</p>
            </li>
            <li class="item_select" @click="addSuperiority" >再次选择</li>
          </ul>
        </el-col>
        <el-col class="acrion-btn" :span="12">
          <button v-if="showAddAbilitBtn" @click="addOperate">添加能力应用标签</button>
          <ul v-else class="shown-list ability">
            <li v-for="(item,index) in abilityTag" :key="index">
              <img :src="item.icon||item.imgsrc" alt="" v-if="item.icon||item.imgsrc">
              <p>{{item.tipTitle||item.title}}</p>
            </li>
            <li class="item_select" @click="addOperate">再次选择</li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="questions-details">
      <el-form v-model="form">
        <el-form-item>
          <el-select v-model="form.role" placeholder="担任的角色">
            <el-option
              v-for="item in roleOps"
              :value="item.value"
              :label="item.label"
              :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-date-picker v-model="form.joinDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd" style="width:160px" :picker-options="pickerOptionsStart" ></el-date-picker>
         <!-- <el-select v-model="form.joinDate" placeholder="参与活动时间">
            <el-option
              v-for="item in timeOps"
              :value="item.label"
              :label="item.label"
              :key="item.label">
            </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item>
          <el-input placeholder="花费时间" v-model="form.hours"  type="number" @input="hoursChange"> <template class="hours" slot="append" style="width:20px">小时</template></el-input>
        </el-form-item>
      </el-form>
      <ul class="question-list">
        <li class="question-list-item" v-for="(item,index) in questionList" :key="index">
          <span  :content="index+1" class="index"><img :src="indexPic" alt=""></span>
          <div class="title">
            <div class="tag">{{item.tag}}</div>
            <div class="label">{{item.label}}</div>
          </div>
          <div class="content">
            <item-input @change="handleChange" :prop="item.prop" :placeholder="item.placeholder" :itemValue="form[item.prop]"></item-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="questions-btn">
      <img class="left-img" :src="quesLeft" alt="">
      <button @click="handleNext" v-if="isShowButton">下一步</button>
      <button v-else>您的单次打卡已结束</button>
      <img class="right-img" :src="quesRight" alt="">
    </div>
    <add-superiority-dialog @change="handleSuperiChange" ref="addSuperiorityDialog" :advData.sync="advData"></add-superiority-dialog>
    <my-advantage :state.sync="isShowAdvantage" @ability="handleAbility" :advData.sync="advData"></my-advantage>
    <no-select :state.sync="isShowNoSelect"></no-select>
    <courseware-upload :state.sync="isShowUpload" :uploadList="uploadList" :activeId="activeId" @uploadSelect="handleUploadSelect" @invitative="handleInvitative"></courseware-upload>
    <upload-list :state.sync="isShowUploadList" @uploadtList="handleUploadList"></upload-list>
    <invitation-comments :state.sync="isShowComments" :id="activeId" @success="handleSuccess" @showActivity="handleActivityShow"></invitation-comments>
    <invitation-success :state.sync="isShowSuccess" :activeId="activeId"></invitation-success>
     <!-- 我的活动 -->
    <activity-name :state='isShowActivity' @close='parentClose' @invitation='invitation'></activity-name>
    <!-- 确认删除弹框 -->
    <delete-works :state='isShowDeleteWorks' @close='parentClose'></delete-works>

  </div>
</template>
<script>
import activity3 from 'assets/images/superiority/activity-03.png'
import activity2 from 'assets/images/superiority/activity-02.png'
import activity1 from 'assets/images/superiority/activity-01.png'
import activity4 from 'assets/images/superiority/activity-04.png'
import quesLeft from 'assets/images/superiority/ques-left.png'
import quesRight from 'assets/images/superiority/ques-right.png'
import indexPic from 'assets/images/superiority/index.png'

import ActivityName from '@/components/activityName'
import ItemInput from './item-input'
import AddSuperiorityDialog from './add-superiority-dialog.vue'
import MyAdvantage from '@/components/myAdvantageModal'
import CoursewareUpload from '@/components/coursewareUpload'
import NoSelect from '@/components/notSelectTag'
import InvitationSuccess from '@/components/invitationSuccess'
import InvitationComments from '@/components/invitationComments'
import UploadList from '@/components/uploadFileList'
import DeleteWorks from '@/page/teachers/course/deleteWork/deleteWork'

import { getAdvActivityApi } from 'api/api'
import { createAdvActivityApi } from 'api/api'
import axios from 'axios'

export default {
  components: {
    ItemInput,
    AddSuperiorityDialog,
    MyAdvantage,
    CoursewareUpload,
    NoSelect,
    InvitationSuccess,
    InvitationComments,
    UploadList,
    ActivityName,
    DeleteWorks
  },
  data () {
    return {
      activeId:'',
      taskresultId:'',  //老师发布优势打卡任务之后，创建的学生任务项id
      indexPic,
      advData:'',
      isShowDeleteWorks:false,
      isShowAdvantage: false,
      isShowNoSelect: false,
      isShowUpload: false,
      isShowComments: false,
      isShowSuccess: false,
      isShowUploadList: false,
      isShowActivity: false,
      isShowButton:true,   //是否展示按钮
      activity1,
      advantageTag: [],
      abilityTag: [],
      uploadList: [],
      quesRight,
      quesLeft,
      activeData: {},
      form: {
        role: '',
        hours: '',
        joinDate: '',
        situation: '',
        action: '',
        result: ''
      },
      roleOps: [
        {
          value: '1',
          label: '社团负责人'
        },
        {
          value: '2',
          label: '活动组织者'
        },
        {
          value: '3',
          label: '组长/队长'
        },
        {
          value: '4',
          label: '团队成员'
        },
        {
          value: '0',
          label: '独立完成'
        }
      ],
      questionList: [
        {
          id: 1,
          tag: 'Situation：',
          label: '当时的情况/挑战是什么？',
          placeholder: '例如：我最喜欢的数学课学到很难得概念，我学不懂，测验失利（不超过140字）',
          prop: 'situation'
        },
        {
          id: 2,
          tag: 'Action：',
          label: '你的主要行动是什么? （结合你的优势，你具体的行动是什么）',
          placeholder: '我主动找老师课后问问题<br/>我和最好的朋友约着一起对卷子<br/>我安慰自己，很快恢复了情绪',
          prop: 'action'
        },
        {
          id: 3,
          tag: 'Results：',
          label: '结果如何?',
          placeholder: '周末作业我都完成了，也都会了',
          prop: 'result'
        }
      ],
      tags: { // 优势、能力标签列表
        'ADV':[
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
        ],
        'ABL': [
           {
              showLight: true,
              prop:'1',
              tipTitle: '判断性思维',
            },
            {
              showLight: true,
              prop:'2',
              tipTitle: '沟通技能',
            },
            {
              prop:'3',
              showLight: true,
              tipTitle: '团队协作',
            },
            { prop:'4',
              showLight: true,
              tipTitle: '创造力',
            },
            {
              prop:'5',
              showLight: true,
              tipTitle: '世界公民',
            },
            {
              prop:'6',
              showLight: true,
              tipTitle: '自我认知',
            },
            {
               prop:'7',
              showLight: true,
              tipTitle: '自我管理',
            },
            {
              prop:'8',
              showLight: true,
              tipTitle: '社会意识',
            },
            {
              prop:'9',
              showLight: true,
              tipTitle: '关系建立',
            },
            {
              prop:'10',
              showLight: true,
              tipTitle: '决策能力',
            }
          ]
      },
      pickerOptionsStart: {
          disabledDate:time=> {
           return time.getTime() > Date.now() 
          }
        },
      
    }
  },
  computed: {
    showAddSupBtn () {
      return this.advantageTag.length <= 0
    },
    showAddAbilitBtn () {
      return this.abilityTag.length <= 0
    }
  },
  created () {
  
    this.dynamicImportImg();
    // this.initImgList()
    //let index = mockData.findIndex(item => item.id + '' === id)
    //this.setData(mockData[index]||{})
    
  },
  mounted(){
    let id = this.$route.query.id
    let taskresultId = this.$route.query.taskresultId;
    this.getActivityDetail(id);
  },
  methods: {
    // 动态导入图片
    dynamicImportImg () {
      this.tags.ABL.forEach((item, index) => {
        import(`../../../assets/images/advantage/icon${index + 1}_1.png`).then(res => {
          this.tags.ABL[index].icon = res
        })
      })
      this.tags.ADV.forEach((item, index) => {
        import(`../../../assets/images/superiority/select/icon${index + 1}.png`).then(res => {
          this.tags.ADV[index].imgsrc = res
        })
        import(`../../../assets/images/superiority/selected/icon${index + 1}.png`).then(res => {
          this.tags.ADV[index].imgsrcSed = res
        })
      })
    },
    hoursChange(val){
      this.form.hours=val.replace(/[^\d^\.]+/g,'')
    },
    // initImgList(){
    //   axios.get('/api/applyLabel', {emulateJSON: true}).then(Response=>{
    //     let ADV = Response.data.data.addSuperiority;
    //     let ADVlist = [];
    //     for(let i in ADV){
    //       ADVlist = ADVlist.concat(ADV[i].children)
    //     }
    //     this.tags.ADV = ADVlist
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    handleActivityShow () {
      this.isShowActivity = true
    },
    handleUploadSelect () {
      this.isShowUploadList = true
    },
    handleUploadList (list) {
      this.uploadList = list
    },
    handleAbility (list) {
      this.abilityTag = list
    },
    handleInvitative () {
      this.isShowComments = true
    },
    handleSuccess () {
      this.isShowSuccess = true
    },

    handleNext () {
      if (this.abilityTag.length >=1 && this.advantageTag.length >= 1) {
        if( this.form.role===''){
          this.$message({ message: '担任的角色必填', type: 'warning'});
        }else if(!this.form.joinDate){
          this.$message({ message: '参与活动时间必填', type: 'warning'});
        }else if(!this.form.situation){
          this.$message({ message: ' 当时的情况/挑战是什么？必填', type: 'warning'});
        }else if(!this.form.action){
          this.$message({ message: ' 你的主要行动必填', type: 'warning'});
        }else if(!this.form.result){
          this.$message({ message: ' 结果如何必填', type: 'warning'});
        }else if(!this.form.hours){
          this.$message({ message: '花费时间必填', type: 'warning'});
        }else{
          this.saveActive()
        }
      } else {
        this.isShowNoSelect = true
      }
    },
    saveActive(){
      let params = this.form;
      let advantageTags = ''; //添加优势应用
      let abilityTags ='';
      if(this.advantageTag.length>0){
         let advantageTagList= [];
        this.advantageTag.forEach((val,index,arr_ad)=>{
          advantageTagList.push(val.prop)
        })
        advantageTags = advantageTagList.join(',')
      }
      if(this.abilityTag.length>0){
        let abilityTagList = [];
        this.abilityTag.forEach((val,index,arr_ad)=>{
          abilityTagList.push(val.prop)
        })
         abilityTags = abilityTagList.join(',')
      }
      params.advantageTag = advantageTags 
      params.abilityTag = abilityTags;
      params.activityId= this.$route.query.id;
      params.taskresultId = this.$route.query.taskresultId;
      if(this.activeId) params.id = this.activeId;
      axios.post(createAdvActivityApi, params,{
        headers: {
          'sid': localStorage.getItem("sid")
        }
      }).then(res => {
        let code = res.data.code
        if(code == 'success'){
          let id = res.data.result.id;
          this.activeId = id;
          this.isShowUpload = true
        }else{
          this.isShowUpload = false
          this.$message({
            message: res.data.message,
            type: 'warning'
          });
        }
      })
    },
    addSuperiority () {
      this.$refs.addSuperiorityDialog.show()
    },
    addOperate () {
      this.isShowAdvantage = true
    },
    handleChange (obj) {
      this.form[obj.prop] = obj.val
    },
    setData (data) {
      this.activeData = data
      // console.log(this.activeData)
      for (let key in this.form) {
        this.form[key] = data[key]
      }
      this.advantageTag = this.formatTag('ADV', data.advantageTag);
      // console.log(this.advantageTag)
      this.abilityTag = this.formatTag('ABL', data.abilityTag)
    },
    formatTag: function(cat, tags) {  // 暂时处理：仅仅是标签列表
      if (!tags) return [];
      if (typeof tags == "string") {
        if (tags.indexOf('[') == 0) tags = JSON.parse(tags);
        else tags = tags.split(',');
      }
      for (let i = 0; i < tags.length; i++) {
        if (!tags[i]) tags[i] = {};
        else if (typeof tags[i] == 'string')
          tags[i] = this.getTagInfo(cat, tags[i]);
      }
      return tags;
    },
    getTagInfo: function(cat, tag) {  // 获取标签信息: 暂时处理，应从接口获取   图标名称修改了些还需调整
      let list = this.tags[cat];
      for (let i = 0; i < list.length; i++) {
        if(cat == 'ADV'){
          if (tag == list[i].title || tag == list[i].prop)
          return list[i];
        }else{
          if (tag == list[i].prop)
          return list[i];
        }
      }
      return {'cat':cat, 'title':tag};
    },
    handleSuperiChange (list){
      this.advantageTag = list
    },
    parentClose () {
      this.isShowActivity = false
      this.isShowDeleteWorks = false
    },
    invitation () {
      this.isShowDeleteWorks = true
    },
    getActivityDetail: function(activityId) {
      // 优势打卡活动详情
      this.loading = true;

        let params = {
          activityId: activityId
        }
        axios.post(getAdvActivityApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            if (res.data.result.id) {        // 判断打卡是否已存在: id 不为空
               this.isShowButton = false;       // 默认已结束
               this.setData(res.data.result);
               this.activeId = res.data.result.id;
               
               if (res.data.result.status==0) {     // 未发布的打卡: status == 0, 2019-7-1
                  this.isShowButton = true;         // 允许修改
                  this.form.status = null;
               }
               
            }else{
              this.isShowButton = true;    
              this.activeData = res.data.result;
              this.advantageTag = [];
              this.abilityTag = [];
              let form ={
                role: '',
                hours: '',
                joinDate: '',
                situation: '',
                action: '',
                result: ''
              }
              this.form = form;
            }
          } else {
            //this.activityList = []
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);
        }).catch(err=>{
        console.log(err)
        })
    }
  },
  watch: {
    $route () {
      let id = this.$route.query.id;
      this.taskresultId = this.$route.query.taskresultId;
     // let index = mockData.findIndex(item => item.id + '' === id)
      //this.setData(mockData[index])
      this.advData = id;
      this.getActivityDetail(id)
    }
  }
};
</script>
<style type="text/css">
  input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        appearance: none; 
        margin: 0; 
} 
input[type="number"]{-moz-appearance:textfield;}
</style>
<style lang="scss" scoped>

.hours{
  padding:0 5px;
}

.questions {
  height: calc( 100% - 1.34rem);
  overflow: auto;
  .questions-header {
    height: 1.88rem;
    width: 100%;
    padding: 0 0.24rem 0 0.31rem;
    margin-top: 0.21rem;
    display: flex;
    .left {
      margin-right: 0.29rem;
      img {
        height: 1.88rem;
        width: 3.22rem;
      }
    }
    .right {
      flex: 1;
      .title {
        line-height: 0.2rem;
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.26rem;
        margin-top: 0.2rem;

      }
      .desc {
        font-size: 0.14rem;
        color:rgba(136,136,136,1);
        line-height: 0.24rem;
      }
    }
  }
  .questions-actions {
    height: 0.8rem;
    margin: 0.21rem 0.31rem 0.33rem;
    background:rgba(248,248,248,0.8);
    border: 1px solid rgba(228,232,237,1);
    .el-row {
      height: 100%;
      position: relative;
    }
    .acrion-btn {
      text-align: center;
      height: 100%;
      button {
        height: 0.44rem;
        width: 1.86rem;
        text-align: center;
        line-height: 0.44rem;
        cursor: pointer;
        font-size: 0.15rem;
        border-radius: 0.04rem;
        margin-top: 0.16rem;
        border: 1px solid #F79727;
        box-sizing: border-box;
      }
      &:first-child button {
        background-color: #F79727;
        color: #fff;
      }
      &:last-child button {
        background-color: transparent;
        color: #F79727;
      }
      .shown-list {
        height: 100%;
        line-height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -moz-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 0.3rem;
        li {
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
         
          &:last-child{
            margin-right: 0;
          }
          img {
            display: inline-block;
            vertical-align: middle;
          }
          p {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.14rem;
          }
          &.item_select {
            width: 1.04rem;
            height: 0.36rem;
            line-height: 0.36rem;
            border: 1px solid rgba(247, 151, 39, 1);
            border-radius: 4px;
            font-size: 0.15rem;
            color: rgba(247, 151, 39, 1);
          }
        }
      }
      .shown-list.superity {
        img {
          width: 0.28rem;
          height: 0.28rem;
          margin-right: 0.08rem;
        }
        .spirit {
          color: #D957D9;
        }
        .emotion {
          color: #24AEF2;
        }
        .relationship {
          color: #FA4B77;
        }
      }
      .shown-list.ability {
        li {
          img {
            width: 0.36rem;
            height: 0.4rem;
          }
          p {
            color: #F79727;
          }
        }
      }
    }
    .acrion-btn:first-child:after {
      position: absolute;
      height: 0.36rem;
      width: 1px;
      content: "";
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(228,232,237,1);
    }
  }
  .questions-details {
    position: relative;
    .el-form {
      position: absolute;
      z-index: 5;
      right: 0.32rem;
      font-size: 0;
      top: -0.13rem;
      .el-form-item {
        width: 1.64rem;
        display: inline-block;
      }
      .el-form-item:nth-of-type(2) {
        width: auto;
        display: inline-block;
      }
      .el-form-item + .el-form-item {
        margin-left: 0.2rem;
      }
    }
    .question-list {
      .question-list-item {
        padding: 0 0.32rem 0 0.54rem;
        margin-bottom: 0.33rem;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        .tag,
        .label {
          color: #333;
          font-size: 0.15rem;
          display: inline-block;
          margin-bottom: 0.17rem;
        }
        .tag {
          font-weight: bold;

        }
        .index {
          position: absolute;
          left: 0.17rem;
          top: -0.05rem;
          img {
            height: 0.26rem;
            width: 0.26rem;
          }
          &:after {
            content: attr(content);
            position: absolute;
            width: 0.26rem;
            height: 0.26rem;
            left: 0;
            top: 0;
            text-align: center;
            line-height: 0.26rem;
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
  .questions-btn {
    height: 0.52rem;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0.33rem;
    button {
      height: 100%;
      width: 2.23rem;
      line-height: 0.52rem;
      background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
      border-radius: 0.26rem;
      color: #fff;
      font-weight: bold;
      font-size: 0.18rem;
      cursor: pointer;
    }
    .left-img {
      position: absolute;
      left: 0;
      bottom: -0.33rem;
      height: 1.34rem;
      width: 2.88rem;
    }
    .right-img {
      position: absolute;
      right: 0;
      bottom: -0.33rem;
      height: 1.07rem;
      width: 2.38rem;
    }
  }
}
</style>
