<template>
  <div class="my-advantage" v-show="visible">
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="8.4rem" :before-close="handleClose">
      <div class="adt-title-wrap">
        <div class="adt-line"></div>
        <div class="adt-title">我的优势打卡</div>
      </div>
      <div class="adt-desc-wrap">
        <h3 class="adt-desc-title">核心能力标签</h3>
        <p class="adt-desc">
          回忆这次的活动体验，选中你认为自己充分展示的技能有哪些，每个能力种类勾选标签
          <span class="adt-color">不能超过3个</span>
        </p>
      </div>

      <div class="content-wrap">
        <div class="slogan-top">
          <span class="text-mode">21</span><span class="sub">st</span> 世纪核心素养
        </div>
        <div class="slogan-bottom">社会情商技能</div>
        <div class="tag-wrap">
          <div class="warn-message" v-show="isWarn">你的标签选择超过了三个，请选择此次活动中你最突出的三个能力标签</div>
          <ul class="ability-list">
            <li class="ability-item" v-for="(tag, index) in tagList" :key="index" @click="handleSelectTag(tag, index)">
              <el-tooltip placement="right" effect="light" >
                <div slot="content" class="tip-content">
                  <div class="tip-title">{{ tag.tipTitle }}   </div>
                  <div class="tip-desc">{{ tag.tipDesc }}</div>
                </div>
                <img class="tag-icon" :src="tag.showLight ? tag.light : tag.gery" alt>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>
      <div class="submit-wrap">
        <div class="submit" @click="handleSubmit">确定</div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    advData:''
  },
  data () {
    return {
      num: 0,
      visible: false,
      isWarn: false,
      selectTagNumber: 0,
      tagList: [ {
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
      }],
      isOK: false
    }
  },
  watch: {
    state (newVal, oldVal) {
      console.log(newVal, 'newVal')
      this.visible = newVal
      this.$emit('update:state', newVal)
    },
    advData(newVal){
      if(newVal){
        this.selectTagNumber = 0;
        this.tagList.forEach(item=>{
          item.showLight = false
        })
      }
    }
  },
  created () {
    // this.initImgList()
    this.dynamicImportImg()
  },
  methods: {
    // 动态导入图片
    dynamicImportImg () {
      this.tagList.forEach((item, index) => {
        import(`../../assets/images/advantage/icon${index + 1}_light.png`).then(
          res => {
            this.tagList[index].light = res
          }
        )

        import(`../../assets/images/advantage/icon${index + 1}_gery.png`).then(
          res => {
            this.tagList[index].gery = res
          }
        )

        import(`../../assets/images/advantage/icon${index + 1}_1.png`).then(res => {
          this.tagList[index].icon = res
        })
      })
    },
    // initImgList(){
    //   axios.get('/api/applyLabel', {emulateJSON: true}).then(Response=>{
    //    this.tagList = Response.data.data.addOperate;
    //    this.dynamicImportImg()
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    handleClose () {
      this.visible = false
      this.$emit('update:state', false)
      this.$emit('close')
    },
    handleSubmit () {
      let list = this.tagList.filter(item => item.showLight);
      if(!list.length){
        this.$alert('请您选择至少一位标签', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
      }else{
        this.visible = false
        this.$emit('update:state', false)
        this.$emit('ability', list)
      }
      
    },
    handleSelectTag (tag, index) {
      let originTag = JSON.parse(JSON.stringify(tag))
       if (tag.showLight) {
         this.isWarn = false
        this.selectTagNumber--
      }
      if (this.selectTagNumber < 3) {
        this.isWarn = false
        this.isOK = false
        if (!tag.showLight) {
          this.selectTagNumber++
        }
        this.tagList[index].showLight = !this.tagList[index].showLight
      } else {
        this.tagList[index].showLight = false
      }

      if (this.selectTagNumber === 3 && !originTag.showLight && this.isOK) {
        this.isWarn = true
        this.isOK = false
      } else {
        this.isWarn = false
      }

      if (!originTag.showLight && this.selectTagNumber === 3) {
        this.isOK = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-advantage /deep/ .el-dialog__header,
.my-advantage /deep/ .el-dialog__body {
  padding: 0
}

.my-advantage /deep/ .el-tooltip__popper {
 border: none;
}
</style>

<style lang="scss" scoped>
.my-advantage {
  border-radius: 0.06rem;
}
.adt-title-wrap {
  height: 0.6rem;
  line-height: 0.6rem;
  padding-left: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #E4E8ED;
  border-radius: 0.06rem 0.06rem 0 0;
  font-size: 0;
  font-weight: bold;
  .adt-line {
    width: 0.04rem;
    height: 0.16rem;
    background:rgba(247,151,39,1);
    border-radius: 0.02rem;
    margin-right: 0.1rem;
  }

  .adt-line,
  .adt-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }
}

.adt-desc-wrap {
  text-align: center;
  h3.adt-desc-title {
    font-size: 20px;
    padding: 0.22rem 0 0.15rem 0;
    font-weight: bold;
  }

  .adt-color {
    color:rgba(247,149,42,1);
  }
}

.content-wrap {
  width: 7.5rem;
  margin: 0 auto;
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  background:rgba(245,247,250,1);
  border: 0.01rem solid rgba(218,223,230,1);
  border-radius: 0.06rem;
  position: relative;
  margin-top: 0.22rem;
}

.slogan-top,
.slogan-bottom {
  writing-mode: lr-tb;
  width: 16px;
  font-size: 14px;
  position: absolute;
  left: 0.17rem;
}

.slogan-top {
  top: 0.3rem;
}

.slogan-bottom {
  bottom: 0.47rem;
}

.text-mode,
.sub {
  display: inline-block;
  transform: rotateZ(-270deg);
  margin-right: 0.2rem;
}

.sub {
  font-size: 12px;
  margin-left: 7px;
  transform: rotateZ(-270deg) scale(0.8);
}

.ability-list {
  margin-left: 0.27rem;
  .ability-item {
    display: inline-block;
    vertical-align: middle;
    margin-top: 0.2rem;
    margin-right: 0.2rem;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
  .tag-icon {
    width: 1.2rem;
    height: 1.4rem;
  }
}

.tag-wrap {
  position: relative;
}

.warn-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 5.7rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 16px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0.04rem 0.1rem 0px rgba(188,188,188,0.4);
  border-radius: 0.04rem;
}

.submit-wrap {
  text-align: center;
  padding: 0.2rem 0;
}

.submit {
  width: 1.8rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 16px;
  color: #fff;
  background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  vertical-align: middle;
}

.tip-content {
  color: #666;
  font-size: 12px;

  .tip-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.12rem;
  }
}

body /deep/ .el-tooltip__popper {
   width:185px;
  height:110px;
  border: none !important;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 10px 0px rgba(188,188,188,0.4);
  border-radius:4px;
}

</style>

<style>
.el-tooltip__popper.is-light{
  margin-left:0 !important;
  margin-right:0 !important;
  margin-top:0 !important
}
.el-tooltip__popper {
  width: 1.85rem;
  height:auto;
  border: none !important;
  background:rgba(255,255,255,1);
  box-shadow: 0px 4px 10px 0px rgba(188,188,188,0.4);
  border-radius: 0.04rem;
  padding: 0.15rem 0.18rem 0.17rem 0.22rem;
}

.el-tooltip__popper[x-placement^=right] .popper__arrow {
  border: none;
}
</style>
