<template>
  <div class="profession">
    <div class="category">
      <div class="topbar">
        <div class="bar1 flexCenterXY">
          <p class="barTitle cursor" :class="{active:isShowOption}" @click="handleOption">{{selectVal}}</p>
          <div class="selectContain" v-if="isShowOption">
            <ul>
              <li class="cursor" @click="handleDiscipline">{{optionVal}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 所有职业分类 -->
      <div class="list">
        <div class="bar2 flexCenterXY">
          <p class="flexCenterXY">
            <img src="../../images/global/discipline-icon1.png" />专业分类
          </p>
        </div>
        <ul>
          <!-- <li class="menu">
            <p>全部行业</p>
          </li> -->
          <li
            class="menu"
            :class="{active: current.index == item.id}"
            v-for="item in list"
            :key="item.id"
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
                  :key="theme.id"
                  :class="{'active': current.sub_index == theme.id,'overflow1':true}"
                  @click.stop="select(theme.id)"
                >{{theme.name}}</li>
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
          <input class="ser-input"  placeholder="请输入职业名称" v-model="name"/>
          <img  src="../../images/global/search.png" alt/>
        </div>
      </div>
      <div class="tag-list">
        <div class="tag-category">
          <div class="common-item flexCenterY">
            <div class="collect">
              <span class="title">是否收藏 :</span>
              <span
                @click="changeCollect(i)"
                :class="{'active': collIdx==i}"
                v-for="(v, i) in collection"
                :key="i"
              >{{v}}</span>
            </div>
          </div>
          <div class="common-item search-job flexCenterY">
            <div class="sj">
              <span class="title">标记梦想 :</span>
              <span
                @click="changeFlag(i)"
                :class="{'active': flagIdx==i}"
                v-for="(v, i) in flags"
                :key="i"
              >{{v}}</span>
            </div>
           <div class="hot">
              <span>查看热门:</span>
              <el-switch v-model="flag" active-color="#f02222" inactive-color="#EAEAEA"></el-switch>
            </div>
            <div class="tag-btn">
              <el-button
                class="custom"
                @click="search"
              ><img src="../../images/global/a_search.png" alt="" class="imgIcon">查询</el-button>
              <el-button
                class="custom"
                @click="reset"
              ><img src="../../images/global/a_reset.png" alt="" class="imgIcon"> 重置</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 职业列表 -->
      <div class="work-list">
        <div>
          <ul class="work-con">
            <li
              v-for="(item,index) in profession"
              :key="item.id"
            >
              <div class="work-cover">
                <div class="label-button">
                  <span class="love" :class="{active: item.is_collect}"  @click="handleLove(item,index)"></span>
                  <span  class="collect"  :class="{active: item.is_love}" @click="open_stamp(item,index)" ></span>
                </div>
                <img
                  class="fengmian"
                  src="../../images/global/discipline-1.png"
                  alt
                  v-if="item.id%3==1"
                />
                <img
                  class="fengmian"
                  src="../../images/global/discipline-2.png"
                  alt
                  v-if="item.id%3==2"
                />
                <img
                  class="fengmian"
                  src="../../images/global/discipline-3.png"
                  alt
                  v-if="item.id%3==0"
                />
              </div>
              <div class="sub-title flexCenterY">
                <span class="ques">{{item.name}}</span>
                <span
                  class="icon"
                  @click="start_detail(item.id)"
                >
                  <img
                    src="../../images/global/detail.png"
                    alt
                  />
                </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页部分 -->
        <el-pagination
          class="page"
          background
          layout="prev, pager, next"
          :total="count"
          v-on:current-change="goPage" 
        ></el-pagination>
      </div>
    </div>
    <StampDialog
      ref="sp"
      @close="close_stamp"
      :is_show="dialog_show"
      :list="mylist"
      @confirm_ok="confirm_ok"
    />
  </div>
</template>

<script>
import StampDialog from '../../components/data/StampDialog'
import surver from "api/http/t-gloData.js";
export default {
  data() {
    return {
      collection: ['全部', '是', '否'],
      flags: ['全部', '是', '否'],
      collIdx: 0,
      flagIdx: 0,
      name:'',
      pageNo:1,
      pageSize:10,
      count:0,
      selectVal: '海外大学专业库',
      optionVal: '国内大学专业库',
      isShowOption: false,
      mylist: [
        {
          id: 1,
          title: '这个专业和我感兴趣的职业方向对口',
          is_selected: true
        },
        {
          id: 2,
          title: '这个专业的学科要求是我擅长和喜欢的',
          is_selected: false
        },
        {
          id: 3,
          title: '这个专业未来有硕士和博士深造的机会',
          is_selected: false
        },
        {
          id: 4,
          title: '这个专业的就业方向广、前景好',
          is_selected: false
        },
        {
          id: 5,
          title: '别人给我的建议',
          is_selected: false
        },
        {
          id: 6,
          title: '其他',
          is_selected: false
        }
      ],
      dialog_show: false,
      label_flag: 0,
      flag: false,
      current: {
        index: 0,
        sub_index: -1
      },
      list: [],
      profession: [
        {
          id: 1,
          is_love: true,
          is_collect: true,
          require: '美国文学'
        },
        {
          id: 2,
          is_love: false,
          is_collect: false,
          require: '英国文学'
        },
        {
          id: 3,
          is_love: false,
          is_collect: false,
          require: '加拿大文学'
        },
        {
          id: 4,
          is_love: false,
          is_collect: false,
          require: '儿童和青少年文学'
        },
        {
          id: 5,
          is_love: false,
          is_collect: false,
          require: '创意写作'
        },
        {
          id: 6,
          is_love: false,
          is_collect: false,
          require: '英语'
        },
        {
          id: 7,
          is_love: false,
          is_collect: false,
          require: '美国文学'
        },
        {
          id: 8,
          is_love: false,
          is_collect: false,
          require: '美国文学'
        },
        {
          id: 9,
          is_love: false,
          is_collect: false,
          require: '美国文学'
        }
      ],
      tempArr: [] //临时模拟查询数组，对接接口后可删除
    }
  },
  watch: {
    selectVal(newVal) {
      if (newVal === '海外大学专业库') {
         this.FcategoryList()
      } else if (newVal === '国内大学专业库') {
        // this.list = this.list2
         this.categoryList()
      }
    }
  },
  created() {
    // this.list = this.list1;
    // this.tempArr = this.profession;
    // this.categoryList();
    this.FcategoryList()
    
  },
  mounted(){
    
    
  },
  methods: {
    changeCollect(i) {
      this.collIdx = i
    },
    changeFlag(i) {
      this.flagIdx = i
    },
    onTab(index) {
      this.current.index = index
      this.current.sub_index = -1
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id == index) {
          this.list[i].is_show = !this.list[i].is_show
        } else {
          this.list[i].is_show = false
        }
      }
      this.search()
    },
    select(index) {
      this.current.sub_index = index;
      this.search()
    },
    start_detail(id) {
      if (this.selectVal === '海外大学专业库') {
        this.$router.push(`/students/profession/professionDetail/1/${id}`)
      } else if (this.selectVal === '国内大学专业库') {
        this.$router.push(`/students/profession/professionDetail/2/${id}`)
      }
    },
    open_stamp(item,index) {
      if (item.is_love) {
        item.is_love = false;
        this.collectionCancel(item.dreamId,'dreamId',index)
        return;
      }
      this.dialog_show = true;
      this.$refs.sp.set_current_id(item.id);
    },
    change_label_flag() {
      if (this.label_flag == 0) {
        this.label_flag = 1
      } else {
        this.label_flag = 0
      }
    },
    close_stamp() {
      this.dialog_show = false
    },
    // 切换专业库
    handleDiscipline() {
      this.reset();
      [this.selectVal, this.optionVal] = [this.optionVal, this.selectVal];
      this.isShowOption = false;
    },
    handleOption() {
      this.isShowOption = !this.isShowOption;
    },
    //点击查询
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    goPage(val){
      this.pageNo = val;
      this.search()
    },
    search() {
      let favFlag = '';
      let dreamFlag = '';
      let categoryId ='';
      if(this.collIdx == 1)favFlag=1;
      if(this.collIdx == 2)favFlag=0;
      if(this.flagIdx == 1)dreamFlag=1;
      if(this.flagIdx == 2)dreamFlag=0; 
      if(this.current.sub_index ==-1){
        categoryId = this.current.index==0?'':this.current.index;
      }else{
        categoryId = this.current.sub_index;
      }
      const param = {
        categoryId: categoryId,
        favFlag: favFlag,
        dreamFlag: dreamFlag,
        hotFlag: this.flag?1:0,
        name: this.name,
        pageNo : this.pageNo,
        pageSize :this.pageSize,
        lang : this.$cache.localStorage.get('lang'),
      }
      if (this.selectVal === '海外大学专业库') {
         this.fsearch(param);
      } else if (this.selectVal === '国内大学专业库') {
         this.isearch(param)
      }
      
      // this.profession = this.getRandomArrayElements(this.tempArr, Math.floor(Math.random()*7+3));
      // if (this.profession.length%3==2) {
      //   this.profession.length = this.profession.length + 1;
      // }
      
    },
    fsearch(param){
      surver.foreignList(param).then(res => {
        this.profession = [] 
        if(res.data.code=="success"){
          let list = res.data.result.list;
          this.count = res.data.result.count;
          if(list && list.length){
            list.forEach(item=>{
              // if(item.industry){
              //   item.image = require('../../images/global/industry/industry_rect_'+item.industry.id+'.png');
              // }
              item.is_love = item.dreamId?true:false;
              item.is_collect = item.favId?true:false;
              // item.require = level.label;
            })           
            this.profession = list;
          }
        }else{
           this.$message.error(res.data.message);
        }
      })
    },
    isearch(param){
      surver.inlandList(param).then(res => {
        this.profession = [] 
        if(res.data.code=="success"){
          let list = res.data.result.list;
          this.count = res.data.result.count;
          if(list && list.length){
            list.forEach(item=>{
              // if(item.industry){
              //   item.image = require('../../images/global/industry/industry_rect_'+item.industry.id+'.png');
              // }
              item.is_love = item.dreamId?true:false;
              item.is_collect = item.favId?true:false;
              // item.require = level.label;
            })           
            this.profession = list;
          }
        }else{
           this.$message.error(res.data.message);
        }
      })
    },
    reset() {
      this.flagIdx = 0;
      this.collIdx = 0;
    },
    handleLove(collect_list, index) {
      if(collect_list.favId){
        this.collectionCancel(collect_list.favId,'favId',index)  
      }else{
        this.addCollect(collect_list,'favId',index)
      }
      collect_list.is_collect = !collect_list.is_collect
    },
    collectionCancel(id,type,index){
      const param = {
        type :type=='favId'?1:2,
        id : id,
        lang : this.lang
      }
      surver.m_collectionCancel(param).then(res => {
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
        lang : this.$cache.localStorage.get('lang'),
        tag : tag?tag:''
      }
      surver.m_collectionAdd(param).then(res => {
        if(res.data.code=="success"){
          this.$set(this.profession[index],type,res.data.result)
        }else{
           this.$message.error(res.data.message);
        }
         
      });  
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
    categoryList(){
      const param = {
        lang : this.$cache.localStorage.get('lang'),
      }
      surver.categoryList(param).then(res => {
        if(res.data.code=="success"){
          const list = res.data.result.list;
          const firstParent = {
                                  id: 0 ,
                                  is_show: true ,
                                  name: "全部行业",
                                } 
           const tree = this.setTreeData(list)
           this.list =[firstParent,...tree]
           this.search();
        }else{
           this.$message.error(res.data.message);
        }
      })
    },
    FcategoryList(){
      const param = {
        lang : this.$cache.localStorage.get('lang'),
      }
      surver.FcategoryList(param).then(res => {
        if(res.data.code=="success"){
           const list = res.data.result.list;
           const firstParent = {
                                  id: 0 ,
                                  is_show: true ,
                                  name: "全部行业",
                                } 
           const tree = this.setTreeData(list)
           this.list =[firstParent,...tree]
           this.search();
        }else{
           this.$message.error(res.data.message);
        }
      })
    },
    setTreeData(arr) {
        //  删除所有 sub_menu,以防止多次调用
        arr.forEach(function (item) {
                delete item.sub_menu;
        });
        let map = {}; // 构建map
        arr.forEach(i => {
            map[i.id] = i; // 构建以id为键 当前数据为值
        });
        let treeData = [];
        arr.forEach(child => {
            const mapItem = map[child.parentId]; // 判断当前数据的parentId是否存在map中
            if (mapItem) { // 存在则表示当前数据不是最顶层数据
                // 注意: 这里的map中的数据是引用了arr的它的指向还是arr，当mapItem改变时arr也会改变,踩坑点
                (mapItem.sub_menu || ( mapItem.sub_menu = [] )).push(child); // 这里判断mapItem中是否存在children, 存在则插入当前数据, 不存在则赋值children为[]然后再插入当前数据
            } else { // 不存在则是组顶层数据
                treeData.push(child);
            }
        });
        return treeData;
    }
  },
  components: {
    StampDialog
  }
}
</script>

<style lang="less" scoped>
.cursor{
  cursor: pointer;
}
.overflow1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flexCenterXY {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexCenterY {
  display: flex;
  align-items: center;
}
.profession {
  background-color: #fff;
  padding: 30px;
  padding-top: 0;
  display: flex;
  justify-content: space-between;
  .category {
    width: 200px;
    .bar1,
    .bar2 {
      color: #fff;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
    }
    .bar1 {
      font-size: 16px;
      height: 51px;
      background: url('../../images/global/bg1.png') no-repeat left top;
      background-size: 100% 100%;
      border-radius: 5px;
      position: relative;
      .selectContain {
        position: absolute;
        top: 51px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        color: #666;
        box-shadow:0px 1px 30px 0px rgba(202,202,202,0.32);
        border-radius:0 0 6px 6px;
        ul{
          li{
            height: 51px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: normal;
          }
        }
      }
      .barTitle::after {
        content: '';
        border: 5px solid transparent;
        border-top-color: #fff;
        position: absolute;
        top: calc(50% + 5px);
        transform: translateY(-50%);
        margin-left: 8px;
      }
      .barTitle.active::after {
        border: 5px solid transparent;
        border-bottom-color: #fff;
        top: calc(50% - 5px);
      }
    }
    .bar2 {
      font-size: 14px;
      height: 36px;
      background: rgba(255, 135, 38, 1);
      border-radius: 5px 5px 0px 0px;
      img {
        width: 19px;
        vertical-align: bottom;
        margin-right: 5px;
      }
    }

    .list {
      margin-top: 10px;
      box-shadow: 0px 1px 26px 0px rgba(202, 202, 202, 0.32);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      ul {
        border-radius: 6px;
      }
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
      margin-top: 17px;
      .tag-category {
        border-radius: 6px;
        margin-top: 10px;
        box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
        .common-item {
          border-bottom: 1px solid #f5f5f5;
          font-size: 12px;
          padding: 9px 20px;
          .title {
            width: 70px;
            color: #999;
            display: inline-block;
          }
          span {
            display: inline-block;
            padding: 6px 7px;
            cursor: pointer;
            &.active {
              box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.32);
              border-radius: 11px;
              color: #ff6900;
            }
            &:nth-child(3){
              margin-left: 5px;
            }
            &:nth-child(4) {
              margin-left: 15px;
            }
          }

          &.search-job {
            display: flex;
            justify-content: space-between;
            > .sj {
              padding-top: 3px;
            }
            .hot {
              background: url("../../images/global/hot.png") no-repeat left
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
                }
              }
              .imgIcon{
                width: 17px;
                height: 17px;
                margin-right: 7px;
              }
            }
            /deep/ .custom {
              background-color: #ff8726;
              color: #fff;
              outline: 0 none;
              border: 0 none;
              padding: 6px 11px;
              border-radius: 6px;
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
      padding: 26px 20px 0;
      box-shadow: 0px 1px 30px 0px rgba(202, 202, 202, 0.32);
      border-radius: 6px;
      .work-con {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 190px;
          height: 172px;
          box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
          border-radius: 6px;
          margin-bottom: 28px;
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
                background: url('../../images/global/z.png') no-repeat center
                  center;
                background-color: #ff8726;
                border-top-left-radius: 6px;
                &.active {
                  background-image: url('../../images/global/c.png');
                }
              }
              .collect {
                background: url('../../images/global/x.png') no-repeat center
                  center;
                background-color: rgba(0, 0, 0, 0.6);
                &.active {
                  background-image: url('../../images/global/v.png');
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
            height: 42px;
            line-height: 42%;
            // margin-top: 10px;
            padding: 0 13px;
            box-sizing: border-box;
            justify-content: space-between;
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
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              width: 100%;
              height: 14px;
              line-height: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
