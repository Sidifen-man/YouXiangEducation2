<template>
  <div class="container">
    <div class="bread">
      <bread :address="address"></bread>
    </div>
    <div class="banner">
      <div class="leftTitle">
        <p>
          {{detail.name}}
        </p>
      </div>
      <div class="rightAct">
        <div v-for="(v, i) in actions" :key="i" @click="changeAction(i,v)">
          <img :src="v.acimg" alt="" v-if="v.isShow">
          <img :src="v.img" alt="" v-else>
          <p :class="{act: v.isShow}">{{v.des}}</p>
        </div>
      </div>
    </div>
    <div class="whatis">
      <div class="study com">
        <div class="top">
          <div class="line"></div>
          <p>这个专业学什么?</p>
        </div>
        <div class="bottom">
          <p>
            {{detail.intro}}
          </p>
        </div>
      </div>
      <div class="recom com">
        <div class="top">
          <div class="line"></div>
          <p>高中课程推荐</p>
        </div>
        <div class="bottom">
          <ul>
            <li v-for="item in course">
              <p class="circle"></p>
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <div class="need com">
        <div class="top">
          <div class="line"></div>
          <p>就读这个，我需要做什么？......</p>
        </div>
        <div class="bottom">
          <p>
            {{detail.ready}}
          </p>
        </div>
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
import Bread from '../../components/data/breadcrumb2'
import surver from "api/http/t-gloData.js";
export default {
  components: {
    Bread,
    StampDialog
  },
  data() {
    return {
      acindex: 0,
      actions:[
        {
          img: require('../../images/global/r.png'),
          acimg: require('../../images/global/q.png'),
          des: '收藏',
          isShow:false,
        },
        {
          img: require('../../images/global/w.png'),
          acimg: require('../../images/global/t.png'),
          des: '标记梦想',
          isShow:false,
        },
        {
          img: require('../../images/global/e.png'),
          acimg: require('../../images/global/y.png'),
          des: '开设该专业的院校',
          isShow: false,
        },
      ],
      address: {
        title: '全球数据库',
        onePath: '/global_data',
        twoPath: {
          path: '/students/profession/discipline',
          text: '海外大学专业库'
        },
        threePath: {
          path: '',
          text: ''
        },
        text: '艺术与娱乐管理'
      },
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
      favId:'',//收藏夹id
      dreamId: '',
      detail: '',
      course: []
    }
  },
  created() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;
    this.getDetail(id,type)
  },
   methods: {
      changeAction (i,item) {
        // this.acindex = i
        
        if(!item.isShow){
          if(i==0)this.addCollect('favId');
          if(i==1)this.open_stamp();
          // if(i==2);
        }else{
          if(i==0)this.collectionCancel('favId',this.favId) ;
          if(i==1)this.collectionCancel('dreamId',this.dreamId);
        }
        item.isShow = !item.isShow;
      },
      collectionCancel(type,id){
        const param = {
          type :type=='favId'?1:2,
          id : id,
          lang : this.lang
        }
        surver.m_collectionCancel(param).then(res => {
          if(res.data.code=="success"){
            if(type=='favId'){
              this.favId = ''
            }else{
              this.dreamId = ''
            }
          }else{
             this.$message.error(res.data.message);
          }
          
        });
      },
      addCollect(type,tag){
        const param = {
          type :type=='favId'?1:2,
          name : this.detail.name,
          id : this.detail.id,
          lang : this.$cache.localStorage.get('lang'),
          tag : tag?tag:''
        }
        surver.m_collectionAdd(param).then(res => {
          if(res.data.code=="success"){
            if(type=='favId'){
              this.favId = res.data.result
            }else{
              this.dreamId = res.data.result
            } 
          }else{
            this.$message.error(res.data.message);
          }
        });  
      },
      open_stamp(item,index) {
        this.dialog_show = true;
        //this.$refs.sp.set_current_id(item.id);
      },
      confirm_ok(dream){
        this.addCollect('dreamId',dream.str)
        this.close_stamp();
      },
      close_stamp(){
        this.dialog_show = false
      },
      getDetail(id,type){
        const param = {
          lang : this.$cache.localStorage.get('lang'),
          id : id
        }
        if(type==1){
          this.fdetail(param)
        }else{
          this.idetail(param)
        }
      },
      fdetail(param){
        surver.foreignDetail(param).then(res => {
          if(res.data.code=="success"){
             this.detail = res.data.result;
             this.$set(this.address,'text',this.detail.category.name)
             if(res.data.result.course){
              this.course = res.data.result.course.split(',')
             }
             
          }else{
             this.$message.error(res.data.message);
          }
        })
      },
      idetail(param){
        surver.inlandDetail(param).then(res => {
          if(res.data.code=="success"){
             this.detail = res.data.result;
             
          }else{
             this.$message.error(res.data.message);
          }
        })
      }
    }
}
</script>
<style lang="less" scoped>
.container {
  padding: 0 29px 45px;
  border: 1px solid transparent;
  box-sizing: border-box;
  // overflow: auto;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  .com {
    background-color: rgba(247, 249, 252, 1);
    overflow: hidden;
    border-radius: 8px;
  }
  background-color: #fff;
  .bread {
    margin-top: 5px;
    // overflow: hidden;
  }
  .banner {
    height: 55px;
    padding-left: 30px;
    padding-right: 2px;
    margin: 28px auto;
    box-sizing: border-box;
    background: url('../../images/global/detailbg.png') no-repeat left top;
    background-size: 100% 100%;
    background-color: rgba(255, 135, 38, 1);
    border-radius: 6px;
    box-shadow: 0px 1px 30px 0px rgba(255, 135, 38, 0.32);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftTitle {
      font-size: 20px;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
    }
    .rightAct {
      display: flex;
      width: 390px;
      height: 51px;
      background-color: #fff;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
      border-radius: 6px;
      box-sizing: border-box;
      .act {
        color:rgba(255,135,38,1);
      }
      div {
        display: flex;
        align-items: center;
        cursor:pointer;
        img {
          width: 14px;
          height: 14px;
          margin-right: 7px;
        }
      }
      p {
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .whatis {
    .top {
      margin-top: 23px;
      display: flex;
      align-items: center;
      .line {
        width: 4px;
        height: 18px;
        margin-right: 12px;
        background: rgba(252, 121, 39, 1);
        border-radius: 1px;
      }
      p {
        font-size: 16px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
      }
    }
    .bottom {
      padding: 18px 36px;
      box-sizing: border-box;
      p {
        font-size: 14px;
        font-family:  PingFang-SC-Heavy;
        font-weight: 500;
        color: rgba(159, 166, 176, 1);
        line-height: 23px;
      }
      li {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(159, 166, 176, 1);
        line-height: 27px;
        .circle {
          width: 5px;
          height: 5px;
          background: rgba(255, 135, 38, 1);
          border-radius: 50%;
          margin-right: 9px;
        }
      }
    }
    .study {
      height: 120px;
    }
    .recom {
      min-height: 231px;
      margin: 20px 0;
    }
    .need {
      height: 120px;
    }
  }
}
</style>


