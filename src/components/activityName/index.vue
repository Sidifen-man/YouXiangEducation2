<template>
	<div class="details" v-loading="loading">
    <el-dialog class="details-dialog" :visible.sync="state" :before-close="handleClose">
			<div slot="title">
        <div class="name">
          <div class="left">
            <img src="../../assets/images/icon/ac1.png" alt="">
            <p>{{attend.title}}</p>
          </div>
          <div class="button">
            <img src="../../assets/images/icon/ad_3.png" alt="">
            <div>
              <p>{{sponsor.name}}</p>
              <p>{{office.name}}</p>
            </div>
          </div>
        </div>
        <div class="punch_info">
          <span>.</span>
          <span>打卡时间：<i>{{attend.joinDate}}</i></span>
          <span>.</span>
          <span>活动类型：<i v-if="ATTENDEVAL">优势打卡评价</i><i v-else>优势打卡</i></span>
          <span>.</span>
          <span>科目方向：<i>stem</i></span>
        </div>
        <div class="content">
          <div class="left">
            <!-- 问答 -->
            <section class="qa">
              <p><i>Situation：</i>当时的情况/挑战是什么？</p>
              <textarea maxlength="140" readonly="readonly">{{attend.situation}}</textarea>
              <p><i>Action：</i>你的主要行动是什么? （结合你的优势，你具体的行动是什么）</p>
              <textarea readonly="readonly">{{attend.action}}</textarea>
              <p><i>Results：</i>结果如何?</p>
              <textarea readonly="readonly">{{attend.result}}</textarea>
            </section>
          </div>
          <div class="right">
            <p>为他点赞</p>
            <p>分享你的评价</p>
            <textarea maxlength="100" name="" id="" cols="30" rows="10" placeholder="不超过100字" readonly="readonly" v-model="attendeval.content">
            </textarea>
            <p>如果你参与了这个活动，点击分享你看到对方展示的优势与能力标签</p>
           <!--  <div class="add_ad_button">
              <button v-if="attend.abilityTag">{{attend.abilityTag}}</button>
              <button v-if="attend.advantageTag">{{attend.advantageTag}}</button>
            </div> -->
            <div class="addTag">
              <ul  class="shown-list superity">
                <li :class="item.type" v-for="(item,index) in stuAdvantage" :key="index">
                  <img :src="item.imgsrcSed||item.icon" alt="" v-if="item.icon||item.imgsrc">
                </li>
              </ul>
              <ul class="shown-list ability">
                <li v-for="(item,index) in stuAbility" :key="index">
                  <img :src="item.icon||item.imgsrc" alt="" v-if="item.icon||item.imgsrc">
                </li>
              </ul>
            </div>
            <div class="zan">
              <img src="../../assets/images/dianzan1.png" alt="" v-if="!goLik">
              <img src="../../assets/images/dianzan.png" alt="" v-else>点赞
              <!-- <img src="../../assets/images/dianzan.png" alt=""> -->
              <!-- <img src="../../assets/images/icon/zan.png" alt=""> -->
            </div>
          </div>

        </div>
        <footer>
          <button class="button2" @click="handleClose">关闭</button>
        </footer>
			</div>
    </el-dialog>
	</div>
</template>

<script>
// 获取
import { getAdvEvalTask } from 'api/api'
import axios from 'axios'
// 组建需三个props state控制dialog显示与隐藏，close触发父组件方法
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    taskresultId:'',
    ATTENDEVAL:true,
  },
  data () {
    return {
      loading: true,
      evaluation:'',
      attend:'',
      office:'',
      sponsor:'',
      taskInfo:'',
      user:'',
      attendeval:'',
      goLik:false,  //点赞
      stuAdvantage:[],
      stuAbility:[],
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
    }
  },
  watch: {
    state (newVal) {
      this.visible = newVal
      this.$emit('update:state', newVal)
    },
    taskresultId (newVal) {
       this.init(newVal)
    }
  },
  created () {
    let _this = this
    setTimeout(() => {
      _this.loading = false
    }, 1000)
    this.dynamicImportImg()
  },
  methods: {
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
    handleClose () {
      this.$emit('close')
    },
    init(){
      let params = {
        id: this.taskresultId
      }
      console.log(this.taskresultId)
      axios.post(getAdvEvalTask, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == 'success'){
            this.attend = res.data.result.attend;
            console.log(787)
            console.log(this.attend.title)
            if(res.data.result.office)this.office = res.data.result.office;
            if(res.data.result.taskInfo.sponsor) this.sponsor = res.data.result.taskInfo.sponsor;
            this.taskInfo = res.data.result.taskInfo;
            this.user = res.data.result.user;
            if( res.data.result.attendeval) this.attendeval = res.data.result.attendeval;
            if(res.data.result.attendeval.wow)this.goLik = true;
             // 评价的
            let stuAbility = res.data.result.attendeval.abilityTag
              if(stuAbility){
                if(typeof stuAbility == 'string'){
                  stuAbility = stuAbility.split(',')
                }
                for(let i =0;i<stuAbility.length;i++){
                   this.stuAbility[i] = this.getTagInfo('operate',stuAbility[i])
               }
            }
            let stuAdvantage = res.data.result.attendeval.advantageTag
              if(stuAdvantage){
                if(typeof stuAdvantage == 'string'){
                  stuAdvantage = stuAdvantage.split(',')
                }
                 let advantageTagnew = []
                for(let i =0;i<stuAdvantage.length;i++){
                  advantageTagnew.push(this.getTagInfo('superiority',stuAdvantage[i]))
               }
               this.stuAdvantage = advantageTagnew
             }
              console.log(this.stuAbility)
          }else{
            this.$message(res.data.message)
          }
         
        }).catch(err=>{
         
          console.log(err)
        })
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

<style lang="scss" scoped>
.details {
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    border-bottom: 1px solid #e4e8ed;
    margin-bottom: 0.31rem;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 0.47rem;
        height: 0.46rem;
      }
      p {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 0.1rem;
        position: relative;
      }
    }
    .button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 1.3rem;
      img {
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.09rem;
        border-radius: 50%;
      }
      p {
        font-size: 0.12rem;
        line-height: 1;
        &:nth-of-type(1) {
          color: #333;
          margin-bottom: 0.05rem;
        }
        &:nth-of-type(2) {
          color: #999;
          font-size: 0.11rem;
        }
      }
    }
  }
  .punch_info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: .61rem;
    span{
      &:nth-of-type(2n + 1) {
        width: 4px;
        height: 4px;
        background-color: #f79727;
      }
      &:nth-of-type(2n) {
       font-size: .13rem;
       line-height: 1;
       margin: 0 .29rem 0 .1rem;
       color: #888;
       i{
         color: #333;
       }
      }
    }
  }
  .content {
    margin: 0 0.32rem 0 0.61rem;
    display: flex;
    justify-content: space-between;
    .left {
      width: 5.3rem;
      .qa {
        p {
          font-size: 0.15rem;
          color: #333;
          line-height: 1;
          margin: .25rem 0 .17rem;
          font-family:MicrosoftYaHei-Bold;
          i {
            font-weight: bold;
          }
        }
        > textarea {
          background: #fff;
          border-radius: 0.06rem;
          font-size: 0.14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(247, 151, 39, 1);
          padding: 0.18rem 0.34rem 0 0.2rem;
          line-height: 0.26rem;
          box-sizing: border-box;
          height: 1rem;
          max-height: 1rem;
          overflow: auto;
          width: 100%;
          resize: none;
        }
      }
    }
    .right {
      width: 4.9rem;
      height: 4.6rem;
      border: 1px dashed #E67A00;
      margin-top: .18rem;
      border-radius: .06rem;
      box-sizing: border-box;
      padding: .18rem .43rem .47rem .31rem;
      position: relative;
      p{
        font-size: .15rem;
        color: #333;
        line-height: .24rem;
        position: relative;
        margin-left: .1rem;
        &:nth-of-type(1){
          margin-bottom: .25rem;
        }
        &::after{
          position: absolute;
          content:'';
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #aaa;
          top: .13rem;
          left: -.1rem;
        }
      }
      textarea{
        width: 4.2rem;
        height: 1.8rem;
        max-height: 1.8rem;
        overflow: auto;
        border-radius: .06rem;
        padding: .18rem;
        box-sizing: border-box;
        margin: .16rem 0 .2rem;
        resize: none;
      }
      .add_ad_button{
        display: flex;
        justify-content: flex-start;
        margin-top: .2rem;
        button{
          width: 1.6rem;
          height: .4rem;
          border-radius: .04rem;
          border: 1px solid #F7952A;
          font-size: .15rem;
          color: #F7952A;
          background-color: #FFF8F0;
          margin-right: .19rem;
        }
      }
      .zan{
        position: absolute;
        width: .9rem;
        height: .4rem;
        top: 0rem;
        right: .4rem;
        line-height:.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: .2rem;
          height: auto;
        }
      }
      .addTag{
        height:0.5rem;
        width:85%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
          -webkit-align-items: center;
          -moz-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        .shown-list {
          height: 100%;
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
          width:1.6rem;
          li {
            height: 0.5rem;
            line-height: 0.5rem;
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
              margin-left:0;
              margin-top:0;
              font-size:12px;
              margin-bottom: 0;
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
          margin-right:0.19rem;
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
    }
  }
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .22rem;
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
  width: 11.4rem;
  height: 6.65rem;
  margin: .6rem auto !important;
  background-color: #fff8f0;
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
