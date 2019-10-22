<template>
  <div class="profession">
    <div class="category">
      <div class="topbar">
        <div class="bar1">
          <p>职业详情案例</p>
        </div>
      </div>
      <!-- 所有职业分类 -->
      <div class="list">
        <div class="bar2">
          <p>
            <img src="../../../images/global/icon1.png" />行业分类
          </p>
        </div>
        <ul>
          <!-- <li class="menu">
            <p>全部行业</p>
          </li> -->
          <li
            class="menu menu1"
            :class="{active: current.index == item.id}"
            v-for="item in list"
            @click="onTab(item.id)"
          >
            <p>{{item.name}}</p>
            <div
              class="sub-menu"
              v-show="item.sub_menu&&current.index==item.id&&item.sub_menu.length > 0&&item.is_show"
            >
              <ul>
                <li
                  v-for="theme in item.sub_menu"
                  :class="{active: current.sub_index == theme.id}"
                  @click.stop="select(theme.id)"
                >{{item.name}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 职业列表 -->
    <div class="pro-list">
      <div style="padding: 0 14px;">
        <div class="pro-search">
          <input class="ser-input" placeholder="请输入职业名称"  v-model="condition.name"/>
          <img src="../../../images/global/search.png" alt />
        </div>
      </div>
      <div class="tag-list">
        <div class="tag-good">
          <div class="tag-nav">
            <span class="tag-title">优势个性:</span>
            <div class="tag-parent">
              <span class="label active" @click="condition.style_id=''">全部</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Creativity'}"
                @click="condition.style_id='Creativity'"
              >创意</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Curiosity'}"
                @click="condition.style_id='Curiosity'"
              >好奇心</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Judgment'}"
                @click="condition.style_id='Judgment'"
              >判断力</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='LoveLearning'}"
                @click="condition.style_id='LoveLearning'"
              >喜爱学习</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Perspective'}"
                @click="condition.style_id='Perspective'"
              >洞察力</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Spirituality'}"
                @click="condition.style_id='Spirituality'"
              >灵性</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Bravery'}"
                @click="condition.style_id='Bravery'"
              >勇敢</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Honesty'}"
                @click="condition.style_id='Honesty'"
              >坦诚</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Perseverance'}"
                @click="condition.style_id='Perseverance'"
              >坚毅</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Zest'}"
                @click="condition.style_id='Zest'"
              >热情</span>
              <span
                class="label"
                :class="{selected: condition.style_id=='Kindness'}"
                @click="condition.style_id='Kindness'"
              >友善</span>
              <span
                class="icon"
                @click="change_label_flag"
                :class="{'el-icon-arrow-down': label_flag ==0, 'el-icon-arrow-up': label_flag ==1,}"
              ></span>
            </div>
          </div>
          <div class="tag-content active">
            <ul>
              <li :class="{selected: condition.style_id=='Love'}" @click="condition.style_id='Love'">深度交往</li>
              <li :class="{selected: condition.style_id=='SocialIntell'}" @click="condition.style_id='SocialIntell'">社交智慧</li>
              <li :class="{selected: condition.style_id=='Fairness'}" @click="condition.style_id='Fairness'">公平</li>
              <li :class="{selected: condition.style_id=='Leadership'}" @click="condition.style_id='Leadership'">统率</li>
              <li :class="{selected: condition.style_id=='Teamwork'}" @click="condition.style_id='Teamwork'">团队精神</li>
              <li :class="{selected: condition.style_id=='Forgiveness'}" @click="condition.style_id='Forgiveness'">宽容</li>
              <li :class="{selected: condition.style_id=='Humility'}" @click="condition.style_id='Humility'">谦逊</li>
              <li :class="{selected: condition.style_id=='Prudence'}" @click="condition.style_id='Prudence'">谨慎</li>
              <li :class="{selected: condition.style_id=='Self-Regulation'}" @click="condition.style_id='Self-Regulation'">自我控制</li>
              <li :class="{selected: condition.style_id=='Gratitude'}" @click="condition.style_id='Gratitude'">感恩</li>
              <li :class="{selected: condition.style_id=='Hope'}" @click="condition.style_id='Hope'">乐观</li>
              <li :class="{selected: condition.style_id=='Humor'}" @click="condition.style_id='Humor'">幽默</li>
              <li :class="{selected: condition.style_id=='Appreciation'}" @click="condition.style_id='Appreciation'">欣赏美与卓越</li>
            </ul>
          </div>
        </div>
        <div class="tag-category">
          <div class="common-item">
            <div class>
              <span class="title">弗兰德代码:</span>
              <span class="active" @click="condition.code=''">全部</span>
              <span
                class="label"
                :class="{selected: condition.code=='C'}"
                @click="condition.code='C'"
              >常规型C</span>
              <span
                class="label"
                :class="{selected: condition.code=='R'}"
                @click="condition.code='R'"
              >实际型R</span>
              <span
                class="label"
                :class="{selected: condition.code=='E'}"
                @click="condition.code='E'"
              >企业型E</span>
              <span
                class="label"
                :class="{selected: condition.code=='I'}"
                @click="condition.code='I'"
              >调研型I</span>
              <span
                class="label"
                :class="{selected: condition.code=='S'}"
                @click="condition.code='S'"
              >社会型S</span>
              <span
                class="label"
                :class="{selected: condition.code=='A'}"
                @click="condition.code='A'"
              >艺术型A</span>
            </div>
          </div>
          <div class="common-item">
            <div class>
              <span class="title">教育水平:</span>
              <el-select v-model="condition.level" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="common-item">
            <div class>
              <span class="title">STEM:</span>
              <span class="active" @click="condition.stem=''">全部</span>
              <span
                class="yes label"
                :class="{selected: condition.stem===1}"
                @click="condition.stem=1"
              >是</span>
              <span
                class="no label"
                :class="{selected: condition.stem===0}"
                @click="condition.stem=0"
              >否</span>
            </div>
          </div>
          <div class="common-item">
            <div class>
              <span class="title">是否收藏:</span>
              <span class="active" @click="condition.is_collect=''">全部</span>
              <span
                class="yes label"
                :class="{selected: condition.is_collect==1}"
                @click="condition.is_collect=1"
              >是</span>
              <span
                class="no label"
                :class="{selected: condition.is_collect===0}"
                @click="condition.is_collect=0"
              >否</span>
            </div>
          </div>
          <div class="common-item search-job">
            <div class="hot">
              <span>查看热门:</span>
              <el-switch v-model="condition.is_hot" active-color="#f02222" inactive-color="#EAEAEA" ></el-switch>
            </div>
            <div class="tag-btn">
              <el-button class="custom" @click="search">
                <img src="../../../images/global/a_search.png" alt class="imgIcon" />查询
              </el-button>
              <el-button class="custom" @click="reset">
                <img src="../../../images/global/a_reset.png" alt class="imgIcon" /> 重置
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 职业列表 -->
      <div class="work-list">
        <div class="work-con">
          <el-row :gutter="32">
            <el-col :span="8" v-for="(item,index) in profession" :key="item.id">
              <div class="li">
                <div class="work-cover">
                  <div class="label-button">
                    <span class="love" @click="open_stamp(item,index)" :class="{active: item.is_collect}"></span>
                  </div>
                  <img class="fengmian" :src="item.image" alt />
                </div>
                <h3>{{item.name}}</h3>
                <div class="sub-title">
                  <span class="num">{{item.eduLevel}}</span>
                  <span class="ques">{{item.require}}</span>
                  <span class="icon" @click="start_detail(item.id)">
                    <img src="../../../images/global/detail.png" alt />
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 分页部分 -->
        <el-pagination class="page" background layout="prev, pager, next" :total="count" v-on:current-change="goPage" :current-page.sync="pageNo"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import surver from "api/http/t-gloData.js";
export default {
  data() {
    return {
      lang: '',
      mylist: [
        {
          id: 1,
          title: "这个职业的发展前景很好",
          is_selected: true
        },
        {
          id: 2,
          title: "这个职业的行业是我感兴趣的",
          is_selected: false
        },
        {
          id: 3,
          title: "这个职业要求的专业知识是我擅长和喜欢的",
          is_selected: false
        },
        {
          id: 4,
          title: "这个职业需要的个性特质与我个人很匹配",
          is_selected: false
        },
        {
          id: 5,
          title: "这个职业的日常工作内容是我感兴趣的",
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
      // 搜索条件
      condition: {
        name:'',
        style_id: '',
        code: '',
        level: '',
        stem: '',
        is_collect: '',
        is_hot: false
      },
      dialog_show: false,
      label_flag: 0,
      flag: false,
      pageNo:1,
      pageSize:8,
      count:0,
      current: {
        index: 0,
        sub_index: 0
      },
      options: [
       {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "没有教育程度门槛"
        },
        {
          value: 2,
          label: "需要一定的职业技术培训"
        },
        {
          value: 3,
          label: "高中学历"
        },
        {
          value: 4,
          label: "本科学位要求"
        },
        {
          value: 5,
          label: "硕士学位要求"
        }
      ],
      list: [
        {
          id: 1,
          title: "酒店、娱乐和旅游",
          is_show: true,
          sub_menu: []
        },
      ],
      profession: [
       /* {
          id: 1,
          title_name: "住宿经理",
          is_love: false,
          is_collect: false,
          require: "本科学历要求"
        },*/
      ]
    };
  },
  created() {
   let LocalStorage = this.$cache.localStorage;
   this.lang = LocalStorage.get("lang");
   this.getIndustrylist();
   this.getlist('');
  },
  methods: {
    reset() {
      for (var key in this.condition) {
        if(key=='is_hot'){
          this.condition['is_hot'] = false
        }else{
          this.condition[key] = '';
        }
         
      }
    },

    search() {
      /*for (var i = 0; i < 2; i++) {
        this.profession.splice(i, 1);
      }*/
      this.getlist(this.current.index)
    },

    onTab(index) {
      this.current.index = index;
      this.current.sub_index = 1;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id == index) {
          this.list[i].is_show = !this.list[i].is_show;
        } else {
          this.list[i].is_show = false;
        }
      }
      this.getlist(index)
    },
    goPage(val){
      this.pageNo = val;
      this.getlist(this.current.index)
    },
    getlist(index){
      const industryId = this.current.index==0?'':this.current.index;
      const param = {
        industryId: industryId,
        eduLevel : this.condition.level,
        name: this.condition.name,
        stem: this.condition.stem,
        hldCode: this.condition.code,
        favFlag: this.condition.is_collect,
        hotFlag : this.condition.is_hot?1:0,
        viaStrengthIds: this.condition.style_id,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        lang : this.lang
      }
      surver.getlist(param).then(res => {
        this.profession = [] 
        if(res.data.code=="success"){
          let list = res.data.result.list;
          this.count = res.data.result.count;
          if(list && list.length){
            list.forEach(item=>{
              if(item.industry){
                item.image = require('../../../images/global/industry/industry_rect_'+item.industry.id+'.png');
              }
              item.is_collect = item.favId?true:false;
              let level = this.options.find(opt=>opt.value==item.eduLevel);
              item.require = level.label;
            })           
            this.profession = list;
          }
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    },
    select(index) {
      this.current.sub_index = index;
    },
    start_detail(id) {
      this.$router.push(`/teacher/profession/pdetail/${id}`);
    },
    open_stamp(item,index) {
      if(item.favId){  
        this.collectionCancel(item.favId,'favId',index)  
      }else{
        this.addCollect(item,'favId',index)
      }
      item.is_collect =!item.is_collect;
    },
    change_label_flag() {
      if (this.label_flag == 0) {
        this.label_flag = 1;
      } else {
        this.label_flag = 0;
      }
    },
    confirm_ok(dream) {
      let item = '';
      let index = '';
      for (var i = 0; i < this.profession.length; i++) {
        if (this.profession[i].id == dream.id) {
          this.profession[i].is_love = true;
          item = this.profession[i];
          index = i;
        }
      }
      this.addCollect(item,'dreamId',index,dream.str)
      this.close_stamp();
    },
    close_stamp() {
      this.dialog_show = false;
    },
    collectionCancel(id,type,index){
      const param = {
        type :type=='favId'?1:2,
        id : id,
        lang : this.lang
      }
      surver.collectionCancel(param).then(res => {
        if(res.data.code=="success"){
          this.profession[index][type] = '';
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    },
    addCollect(item,type,index,tag){
      const param = {
        type :type=='favId'?1:2,
        name : item.name,
        id : item.id,
        lang : this.lang,
        tag : tag?tag:''
      }
      surver.collectionAdd(param).then(res => {
        if(res.data.code=="success"){
          this.profession[index][type] = res.data.result;
        }else{
           this.$message.error(res.data.message);
        }
         
      });  
    },
    getIndustrylist(){
      const param = {
        name : '',
        lang : this.lang
      }
      surver.getIndustrylist(param).then(res => {
        if(res.data.code=="success"){
           res.data.result.list.map(item=>item.is_show = false)
           const item0 = {
                          id: 0,
                          is_show: false,
                          name: "全部行业"
                         };
            const list = [item0,...res.data.result.list];
            this.list = list;
        }else{
           this.$message.error(res.data.message);
        }
         
      });
    },
  }
};
</script>

<style lang="less" scoped>
.profession {
  background-color: #fff;
  padding: 0 30px 30px;
  display: flex;
  justify-content: space-between;
  .category {
    width: 200px;
    .bar1,
    .bar2 {
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
    }
    .bar1 {
      font-size: 14px;
      height: 44px;
      background: url("../../../images/global/bg1.png") no-repeat left top;
      background-size: 100%;
      border-radius: 5px;
    }
    .bar2 {
      font-size: 12px;
      height: 51px;
      background: rgba(255, 135, 38, 1);
      border-radius: 5px 5px 0px 0px;
      img {
        vertical-align: bottom;
        margin-right: 5px;
      }
    }
    .list {
      margin-top: 10px;
      box-shadow: 0px 1px 26px 0px rgba(202, 202, 202, 0.32);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      li {
        cursor: pointer;
      }
      .menu {
        line-height: 51px;
        font-size: 13px;
        color: #666;
        p {
          padding-left: 20px;
          border-left: 4px solid #fff;
        }
      }
      .menu1 {
        &.active,
        &:hover {
          background-color: #f8f8f8;
          p {
            border-color: #ff8726;
            color: #ff8726;
          }
        }
        .sub-menu {
          padding: 4px 10px;
          border-top: 2px solid #fff;
          li {
            height: 26px;
            line-height: 26px;
            padding: 0 20px;
            &.active,
            &:hover {
              background: rgba(255, 135, 38, 1);
              border-radius: 3px;
              color: #fff;
            }
          }
        }
      }
    }
  }

  // 职业列表
  .pro-list {
    width: 695px;
    .pro-search {
      height: 36px;
      border-radius: 18px;
      background-color: #fff3e9;
      padding-left: 26px;
      position: relative;
      overflow: hidden;
      > img {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
      }
      .ser-input {
        width: 90%;
        display: block;
        height: 36px;
        line-height: 36px;
        background-color: #fff3e9;
        border: 0 none;
        outline: 0 none;
        color: #ff8726;
        &::placeholder {
          color: #ff8726;
        }
      }
    }
    .tag-list {
      margin-top: 11px;
      box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
      border-radius: 6px;
      .tag-good {
        background-color: #fff;
        font-size: 12px;
        .tag-nav {
          // border-bottom: 1px solid #f5f5f5;
          padding: 9px 14px 0 20px;
          position: relative;
          display: flex;
          align-items: center;
          .tag-parent {
          }
          .icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            display: none;
          }
        }
        span {
          display: inline-block;
          margin-bottom: 5px;
        }
        .tag-title {
          width: 70px;
          color: #999;
        }
        .label {
          display: inline-block;
          padding: 6px 7px;
          cursor: pointer;
          &.active {
            box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.32);
            border-radius: 11px;
            color: #ff6900;
          }
          &:hover,
          &.selected {
            background-color: #ff8726;
            color: #fff;
            border-radius: 11px;
            box-shadow: 0px 1px 10px 0px rgba(244, 109, 0, 0.32);
          }
        }
        .tag-content {
          overflow: hidden;
          height: 0;
          transition: all 0.5s;
          &.active {
            height: 70px !important;
          }
          ul {
            padding: 5px 50px 0px 89px;
            li {
              display: inline-block;
              padding: 6px 7px;
              margin-bottom: 6px;
              cursor: pointer;
              &:hover,
              &.selected {
                background-color: #ff8726;
                color: #fff;
                border-radius: 11px;
                box-shadow: 0px 1px 10px 0px rgba(244, 109, 0, 0.32);
              }
            }
            border-bottom: 1px solid #f5f5f5;
          }
        }
      }

      .tag-category {
        .common-item {
          border-bottom: 1px solid #f5f5f5;
          font-size: 12px;
          padding: 9px 20px;
          /deep/ input.el-input__inner {
            border-radius: 16px;
            box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
            border: 0 none;
          }
          .title {
            width: 70px;
            color: #999;
            display: inline-block;
          }
          span {
            display: inline-block;
            padding: 6px 7px;
            cursor: pointer;
            margin-right: 5px;
            &.active {
              box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.32);
              border-radius: 11px;
              color: #ff6900;
            }
            &.label:hover,
            &.label.selected {
              background-color: #ff8726;
              color: #fff;
              border-radius: 11px;
              box-shadow: 0px 1px 10px 0px rgba(244, 109, 0, 0.32);
            }
            &.yes {
              margin-left: 5px;
            }
            &.no {
              margin-left: 15px;
            }
          }

          &.search-job {
            display: flex;
            justify-content: space-between;
            .hot {
              background: url("../../../images/global/hot.png") no-repeat left
                center;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-left: 15px;
              > span {
                margin-right: 10px;
              }
              /deep/ .el-switch {
                &.is-checked {
                  .el-switch__core {
                    &:after {
                      background-color: #fff !important;
                    }
                  }
                }
                .el-switch__core {
                  height: 14px;
                  &:after {
                    top: -2px;
                    background: rgba(240, 34, 34, 1);
                    box-shadow: 0px 1px 6px 0px rgba(240, 34, 34, 0.5);
                  }
                }
              }
            }
            .tag-btn {
              /deep/ .el-button {
                font-size: 14px;
                i {
                  font-size: 17px;
                  &.el-icon-refresh-right {
                    transform: rotate(-90deg);
                  }
                }
              }
            }
            /deep/ .custom {
              background-color: #ff8726;
              color: #fff;
              outline: 0 none;
              border: 0 none;
              padding: 7px 15px;
              .imgIcon {
                margin-right: 7px;
                vertical-align: -3px;
              }
              &:active {
                opacity: 0.7;
              }
            }
          }
        }
      }
    }

    .work-list {
      margin-top: 20px;
      padding: 25px 25px 35px 25px;
      box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
      border-radius: 6px;
      .work-con {
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-around;
        .li {
          width: 190px;
          height: 190px;
          box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
          border-radius: 6px;
          margin-bottom: 22px;
          .work-cover {
            position: relative;
            cursor: pointer;
            &:hover {
              .label-button {
                display: block !important;
              }
            }
            .label-button {
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
                border-top-left-radius: 6px;
                background: url("../../../images/global/z.png") no-repeat center
                  center;
                background-color: #ff8726;
                &.active {
                  background-image: url("../../../images/global/c.png");
                }
              }
              .collect {
                background: url("../../../images/global/x.png") no-repeat center
                  center;
                background-color: #000;
                &.active {
                  background-image: url("../../../images/global/v.png");
                }
              }
            }
          }
          .fengmian {
            width: 190px;
            height: 130px;
          }
          h3 {
            font-size: 14px;
            color: #333;
            padding: 13px 15px 0;
          }
          .sub-title {
            padding: 0 18px 0 12px;
            margin-top: 10px;
            .num {
              display: inline-block;
              width: 14px;
              height: 14px;
              background: rgba(255, 135, 38, 1);
              border-radius: 50%;
              color: #fff;
              font-size: 12px;
              text-align: center;
              line-height: 14px;
            }
            .ques {
              font-size: 12px;
              color: #999;
            }
            .icon {
              float: right;
              cursor: pointer;
            }
          }
        }
      }

      // 分页部分
      .page {
        padding-top: 20px;
        padding-bottom: 40px;
        /deep/ .number,
        /deep/ .btn-prev,
        /deep/ .btn-next {
          background-color: #fff;
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 4px;
          font-weight: normal;
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
  }
}
</style>
