<template>
  <el-dialog
    custom-class="add-superiority"
   :visible.sync="dialogVisible">
    <div class="title" slot="title">
      添加优势应用标签
    </div>
    <div class="desc">
      <p class="title">快来分享你本周的巅峰时刻</p>
      <ul class="desc-list">
        <li>你知道吗？ 你身上具备所有24个优势！</li>
        <li>这次的活动体验中哪三个优势帮助了你？</li>
        <li>点击选择对应的优势图标，赢得你的优势勋章！</li>
      </ul>
    </div>
    <div class="content">
        <div class="left">
          <div class="main-list-wraper">
            <ul class="main-list">
              <li
                v-for="(item,index) in datas"
                :key="index"
                :class="item.prop"
                class="main-list-item">
                <div class="top">
                  <span class="top-title">{{item.title}}</span>
                  <span class="top-descs">{{item.desc}}</span>
                </div>
                <div class="bottom">
                  <ul class="detail-list">
                    <li
                      class="detail-list-item"
                      :class="{'selected':seletedList.findIndex(item=>item.prop===detailItem.prop)>-1 || reseletedList.findIndex(item=>item.prop===detailItem.prop)>-1}"
                      v-for="detailItem in item.children"
                      :key="detailItem.prop"
                      @click="handleReselect(item.prop, detailItem.prop, detailItem.label, detailItem.imgsrc,detailItem.imgsrcSed)"
                      @dblclick="handleSelest(item.prop, detailItem.prop, detailItem.label, detailItem.imgsrc,detailItem.imgsrcSed)">
                      <img :src="detailItem.imgsrc" alt="">
                      <p>{{detailItem.label}}</p>
                    </li>
                  </ul>
              </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="center"><i @click="addToLeft" class="el-icon-d-arrow-right"></i></div>
        <div class="right">
          <h4>您选中的优势</h4>
          <ul class="selected-list">
            <li class="selected-list-item" v-for="(item,index) in seletedList" :key="index">
              <img :src="item.imgsrcSed"  alt="">
              <p :class="item.cat">{{item.title}}</p>
              <i class="remove-icon" @click="handleRemove(item.prop)"></i>
            </li>
          </ul>
        </div>
    </div>
    <div class="action-btn">
      <button @click="submit">确定</button>
    </div>
  </el-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    advData:''
  },
  data() {
    return {
      seletedList: [],
      reseletedList: [],
      dialogVisible: false,
      datas: [
      {
        "prop": "spirit",
        "title": "精神追求类优势",
        "desc": "帮助我们与意义感和宇宙万物连接的优势",
        "children": [{
          "label": "欣赏美和卓越",
          "prop": "balanced",
          "imgsrc": "./static/images/superiority/select/icon1.png",
          "imgsrcSed": "./static/images/superiority/selected/icon1.png"
        },{
          "label": "感恩",
          "prop": "thankful",
          "imgsrc": "./static/images/superiority/select/icon2.png",
          "imgsrcSed": "./static/images/superiority/selected/icon2.png"
        },{
          "label": "乐观",
          "prop": "optimistic",
          "imgsrc": "./static/images/superiority/select/icon3.png",
          "imgsrcSed": "./static/images/superiority/selected/icon3.png"
        },{
          "label": "幽默",
          "prop": "humorous",
          "imgsrc": "./static/images/superiority/select/icon4.png",
          "imgsrcSed": "./static/images/superiority/selected/icon4.png"
        },{
          "label": "灵性",
          "prop": "spiritrual",
          "imgsrc": "./static/images/superiority/select/icon5.png",
          "imgsrcSed": "./static/images/superiority/selected/icon5.png"
        }]
      },{
        "prop": "relationship",
        "title": "人际交往类优势",
        "desc": "帮助我们关注他人，成为别人的朋友",
        "children": [{
          "label": "热情",
          "prop": "enthusiastic",
          "imgsrc": "./static/images/superiority/select/icon6.png",
          "imgsrcSed": "./static/images/superiority/selected/icon6.png"
        },{
          "label": "勇敢",
          "prop": "brave",
          "imgsrc": "./static/images/superiority/select/icon7.png",
          "imgsrcSed": "./static/images/superiority/selected/icon7.png"
        },{
          "label": "坚毅",
          "prop": "fortitude",
          "imgsrc": "./static/images/superiority/select/icon8.png",
          "imgsrcSed": "./static/images/superiority/selected/icon8.png"
        },{
          "label": "坦诚",
          "prop": "frank",
          "imgsrc": "./static/images/superiority/select/icon9.png",
          "imgsrcSed": "./static/images/superiority/selected/icon9.png"
        }]
      },{
        "prop": "emotion",
        "title": "情感类优势",
        "desc": "帮助我们用意志力完成目标，尤其在遭遇外在困难和内心挫败",
        "children": [{
          "label": "团队精神",
          "prop": "teamSpirit",
          "imgsrc": "./static/images/superiority/select/icon10.png",
          "imgsrcSed": "./static/images/superiority/selected/icon10.png"
        },{
          "label": "公平",
          "prop": "fair",
          "imgsrc": "./static/images/superiority/select/icon11.png",
          "imgsrcSed": "./static/images/superiority/selected/icon11.png"
        },{
          "label": "统率",
          "prop": "command",
          "imgsrc": "./static/images/superiority/select/icon12.png",
          "imgsrcSed": "./static/images/superiority/selected/icon12.png"
        }]
      },{
        "prop": "social",
        "title": "社交类优势",
        "desc": "帮助我们用意志力完成目标，尤其在遭遇外在困难和内心挫败1",
        "children":[{
          "label": "深度交往",
          "prop": "deepCommunication",
          "imgsrc": "./static/images/superiority/select/icon13.png",
          "imgsrcSed": "./static/images/superiority/selected/icon13.png"
        },{
          "label": "社交智慧",
          "prop": "wisdom",
          "imgsrc": "./static/images/superiority/select/icon14.png",
          "imgsrcSed": "./static/images/superiority/selected/icon14.png"
        },{
          "label": "友善",
          "prop": "friendly",
          "imgsrc": "./static/images/superiority/select/icon15.png",
          "imgsrcSed": "./static/images/superiority/selected/icon15.png"
        }]
      },{
        "prop": "emotion1",
        "title": "情感类优势",
        "desc": "帮助我们用意志力完成目标，尤其在遭遇外在困难和内心挫败1",
        "children": [{
          "label": "宽容",
          "prop": "tolerant",
          "imgsrc": "./static/images/superiority/select/icon16.png",
          "imgsrcSed": "./static/images/superiority/selected/icon16.png"
        },{
          "label": "谦虚",
          "prop": "modest",
          "imgsrc": "./static/images/superiority/select/icon17.png",
          "imgsrcSed": "./static/images/superiority/selected/icon17.png"
        },{
          "label": "谨慎",
          "prop": "prudent",
          "imgsrc": "./static/images/superiority/select/icon18.png",
          "imgsrcSed": "./static/images/superiority/selected/icon18.png"
        },{
          "label": "自我控制",
          "prop": "selfControl",
          "imgsrc": "./static/images/superiority/select/icon19.png",
          "imgsrcSed": "./static/images/superiority/selected/icon19.png"
           }]
        },{
        "prop": "wisdoms",
        "title": "智慧类优势",
        "desc": "帮助我们用意志力完成目标，尤其在遭遇外在困难和内心挫败1",
        "children":[{
          "label": "创意",
          "prop": "originality",
          "imgsrc": "./static/images/superiority/select/icon20.png",
          "imgsrcSed": "./static/images/superiority/selected/icon20.png"
        },{
          "label": "好奇心",
          "prop": "curiosity",
          "imgsrc": "./static/images/superiority/select/icon21.png",
          "imgsrcSed": "./static/images/superiority/selected/icon21.png"
        },{
          "label": "判断力",
          "prop": "judgment",
          "imgsrc": "./static/images/superiority/select/icon22.png",
          "imgsrcSed": "./static/images/superiority/selected/icon22.png"
        },{
          "label": "喜爱学习",
          "prop": "learning",
          "imgsrc": "./static/images/superiority/select/icon23.png",
          "imgsrcSed": "./static/images/superiority/selected/icon23.png"
        },{
          "label": "洞察力",
          "prop": "insight",
          "imgsrc": "./static/images/superiority/select/icon24.png",
         "imgsrcSed": "./static/images/superiority/selected/icon24.png"
        }]
      }]
    }
  },
  watch: {
    advData(newVal){
      if(newVal){
        this.seletedList = [];
        this.reseletedList = []
      }
    }
  },
  created(){
      this.dynamicImportImg()
      // this.init();  //初始化图标
  },
  methods: {
    dynamicImportImg () {
      this.datas.forEach((item, index) => {
        import(`../../../assets/images/superiority/select/icon${index + 1}.png`).then(res => {
          this.datas[index].children.imgsrc = res
        })
        import(`../../../assets/images/superiority/selected/icon${index + 1}.png`).then(res => {
          this.datas[index].children.imgsrcSed = res
        })
      })
    },
    // init(){
    //   axios.get('/api/applyLabel', {emulateJSON: true}).then(Response=>{
    //     this.datas = Response.data.data.addSuperiority
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    show() {
      this.dialogVisible = true;
    },
    mergeArray(arr1, arr2) {
      let concatArray = arr1.concat(arr2);
      let newArray = [];
      for(let item1 of concatArray){
        let flag = true; 
        for(let item2 of newArray){ 
          if(item1.prop==item2.prop){
            flag = false;
          }
        }
        if(flag){
          newArray.push(item1);
        }
      }
      return newArray;
    },
    addToLeft() {
      this.seletedList = this.mergeArray(this.seletedList, this.reseletedList);
    },
    handleReselect(catProp, detailProp, label, src,srcEd) {
      if (this.seletedList.findIndex(item => item.prop === detailProp) > -1) {
        return
      }
      let index = this.reseletedList.findIndex(item => item.prop === detailProp);
      if (index < 0) {
        if (this.mergeArray(this.reseletedList, this.seletedList).length >= 3) {
          this.$message({
            message: '你的选择超过了三个，请选择此次活动中你最突出的三个优势应用标签!',
            type: 'warning',
            customClass: 'limit-message'
          });
          return;
        }
        this.reseletedList.push({
          cat: catProp,
          prop: detailProp,
          title: label,
          imgsrc: src,
          imgsrcSed:srcEd
        })
      } else {
        this.reseletedList.splice(index, 1);
      }
    },
    handleSelest(catProp, detailProp, label, src,srcEd) {
      let index = this.seletedList.findIndex(item => item.prop === detailProp);
      if (index < 0) {
        if (this.seletedList.length >= 3) {
          this.$message({
            message: '你的选择超过了三个，请选择此次活动中你最突出的三个优势应用标签!',
            type: 'warning',
            customClass: 'limit-message'
          });
          return;
        }
        this.seletedList.push({
          cat: catProp,
          prop: detailProp,
          title: label,
          imgsrc: src,
          imgsrcSed:srcEd
        })
      }
    },
    handleRemove(prop) {
      let index = this.seletedList.findIndex(item => item.prop === prop);
      this.seletedList.splice(index, 1);
      let reIndex = this.reseletedList.findIndex(item => item.prop === prop);
      this.reseletedList.splice(reIndex, 1);
    },
    submit() {
      if(!this.seletedList.length){
         this.$alert('优势标签需要在右侧的选择框中出现', '请选择您的优势标签', {
          confirmButtonText: '确定',
          callback: action => {}
        });
      }else{
        this.$emit('change', this.seletedList)
        this.dialogVisible = false;
      }
      
    }
  }
};
</script>
<style lang="scss">
  .add-superiority {
    height: 7.16rem;
    width: 9.4rem;
    .el-dialog__header {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.16rem;
      color: #333;
      font-weight: bold;
      padding: 0 0 0 0.44rem;
      border-bottom: 1px solid #E4E8ED;
      .title {
        position: relative;
      }
      .title:before {
        position: absolute;
        content: "";
        width: 0.04rem;
        height: 0.18rem;
        left: -0.1rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: #F79727;
        margin-right: 0.14rem;
        border-radius: 0.2rem;
      }
    }
    .el-dialog__body {
      padding: 0.16rem 0.4rem 0.24rem 0.3rem;
      .desc {
        width: 6.19rem;
        height: 1.28rem;
        border: 1px solid #E1E1E1;
        background-color: rgba(248,248,248,1);
        border-radius: 0.04rem;
        padding: 0.2rem;
        .title {
          font-size: 0.16rem;
          color: #F79727;
        }
        .desc-list {
          font-size: 0.14rem;
          color: #888;
          line-height: 0.22rem;
          margin-top: 0.1rem;
          li {
            position: relative;
            text-indent: 0.14rem;
          }
          li:after {
            content: "";
            position: absolute;
            width: 0.04rem;
            height: 0.04rem;
            background-color: #c2c8cc;
            top: 0.08rem;
            left: 0;
          }
        }
      }
      .content {
        height: 4rem;
        margin-top: 0.18rem;
        display: flex;
        .left {
          height: 100%;
          width: 6.2rem;
          border: 1px solid rgba(228,232,237,1);
          border-radius: 0.06rem;
          background:rgba(255,255,255,1);
          vertical-align: middle;
          padding: 0.2rem 0.1rem 0.2rem 0;
          .main-list-wraper {
            height: 100%;
            width: 100%;
            overflow: auto;
            padding-left: 0.4rem;
          }
          .main-list-item {
            position: relative;
            &:before {
              position: absolute;
              content: "";
              height: 0.08rem;
              width: 0.08rem;
              border-radius: 50%;
              left: -0.18rem;
              top: 0.03rem;
            }
            .top {
              font-size: 0;
              .top-title {
                font-size: 0.15rem;
                font-weight:bold;
                color:rgba(51,51,51,1);
              }
              .top-descs {
                font-size: 0.14rem;
                margin-left: 0.1rem;
                color:rgba(153,153,153,1);
              }
            }
            .bottom {
              margin-bottom: 0.14rem;
              .detail-list {
                display: flex;
                flex-wrap: wrap;
                overflow: auto;
                .detail-list-item {
                  width: 0.82rem;
                  height: 0.82rem;
                  text-align: center;
                  border-radius: 0.04rem;
                  margin: 0.14rem 0.14rem 0;
                  position: relative;
                  box-sizing: border-box;
                  border: 1px dashed transparent;
                  p {
                    font-size: 0.12rem;
                    color: #666;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    bottom: 0.12rem;
                    position: absolute;
                    width: 100%;
                    height: 0.12rem;
                  }
                  img {
                    margin: 0.15rem auto;
                    width: 0.3rem;
                    height: 0.3rem;
                  }
                }
               .detail-list-item.selected {
                  background:rgba(245,247,250,1);
                  border: 1px dashed #DADFE6;
                }
              }
            }
          }
          .main-list-item.spirit:before {
            background-color: #D957D9;
          }
          .main-list-item.emotion:before {
            background-color: #24AEF2;
          }
          .main-list-item.emotion1:before {
            background-color: #24AEF2;
          }
          .main-list-item.relationship:before {
            background-color: #FA4B77;
          }
        }
        .center {
          height: 100%;
          width: 0.2rem;
          line-height: 100%;
          margin: 0 0.25rem;
          vertical-align: middle;
          position: relative; 
          .el-icon-d-arrow-right {
            position: absolute;
            top: 50%;
            font-weight: bold;
            font-size: 0.25rem;
            transform: translateY(-50%);
            color: #C2C6CC;
          }
        }
        .right {
          width: 1.8rem;
          height: 100%;
          background:rgba(255,255,255,1);
          border:1px solid rgba(228,232,237,1);
          border-radius:0.06rem;
          vertical-align: middle;
          h4 {
            color: #333;
            font-size: 0.15rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 0.12rem;
            margin-top: 0.1rem;
          }
          .selected-list {
            padding: 0 0.35rem 0.05rem;
            .selected-list-item {
              height: 1.1rem;
              width: 1.1rem;
              background:rgba(245,247,250,1);
              border:1px solid rgba(218,223,230,1);
              border-radius: 0.04rem;
              text-align: center;
              margin-bottom: 0.09rem;
              position: relative;
              img {
                width: 0.29rem;
                height: 0.28rem;
                margin: 0.26rem auto 0;
              }
              p {
                font-size: 0.12rem;
                margin-top: 0.14rem;
              }
              .remove-icon {
                position: absolute;
                width: 0.18rem;
                height: 0.18rem;
                border-radius: 50%;
                background-color:rgba(221,221,221,1);
                right: 0.1rem;
                bottom: 0.1rem;

                &:after {
                  position: absolute;
                  height: 0.02rem;
                  width: 0.08rem;
                  background-color: #fff;
                  content: "";
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &:hover {
                  background-color: #f07777;
                }
              }
            }
            p.spirit {
              color: #D957D9;
            }
            p.emotion {
              color: #24AEF2;
            }
            p.relationship{
              color: #FA4B77;
            }
          }
        }
      }
      .action-btn {
        text-align: center;
        margin-top: 0.2rem;
        button {
          width:1.8rem;
          height:0.5rem;
          background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
          border-radius:0.25rem;
          font-weight:bold;
          font-size:0.16rem;
          color:rgba(255,255,255,1);
          cursor: pointer;
        }
      }
    }
  }
</style>


