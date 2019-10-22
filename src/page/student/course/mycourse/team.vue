<template>
  <div class="team">
    <LoadingPage :isShowModal="loading"></LoadingPage>
    <el-dialog  :visible.sync="state" :close-on-click-modal="false" :before-close="handleClose">
      <span slot="title" class="teamTitle">
        <h3>我的小组</h3>
      </span>
      <div class="group"  v-if="list2.length > 0">
        <ul class="list-group">
          <el-carousel :interval="0" arrow="always" :loop='false'>
            <el-carousel-item v-for="(group3, index1) in list2" :key="index1">
              <li class="li-group" v-for="(group, index) in group3" :key="index">
                <h4>0{{index1*3 + index+1}}组</h4>
                <el-scrollbar tag="div" class="teamMain" wrap-class="wrap">
                  <div class="teamBlock" v-for="(item,index) in group" :key="item.id">
                    <div class="teamAvatar">

                      <img class="avatar-img" v-if="item.phone=='1'" src="../../../../assets/images/userimg/boy-student.jpg" alt="">
                      <img class="avatar-img" v-if="item.phone=='2'" src="../../../../assets/images/userimg/girl-teacher.jpg" alt="">
                      <span  class="text-single-comm">{{item.name}}</span>
                    </div>
                    <div class="teamText" v-if="item.adv" >
                      {{item.adv}}
                    </div>

                    <div class="teamText" v-else>

                    </div>
                  </div>
                </el-scrollbar>
              </li>
            </el-carousel-item>
          </el-carousel>
        </ul>

      </div>
      <empty-page v-if="list2.length == 0" ></empty-page>
    </el-dialog>

  </div>
</template>

<script>


  import LoadingPage from '../../../common/loadingPage.vue'


  import EmptyPage from '../../../../components/empty/index.vue'


  import {teacherGetChapterGroupApi} from "api/api"

  import {teacherSaveGroupApi} from "api/api"
  import {teacherGetChapterUnGroupApi} from "api/api"


  import axios from 'axios'

import head from "assets/images/head.png";
export default {
  name: "team",
  props: ["state", "classChapterId"],
  watch:{
    classChapterId(){

      this.searchMyTeam()
    }
  },
  components: {
    LoadingPage,
    EmptyPage

  },
  data() {
    return {
      loading: true,
      head,
      data: [[1,2,3],[4,5,6],[7,8,9]],
      group1Index: 0,
      list2:[],
    };
  },
  created() {
    let _this = this;
    setTimeout(() => {
      _this.loading = false;
    }, 200);
    this.searchMyTeam()
  },
  methods: {

    searchMyTeam(){

      this.list2 = []

      this.loading = true;
      let params = {
        classChapterId:this.classChapterId
      }



      axios.post(teacherGetChapterGroupApi, params,{
        headers: {
          'sid': localStorage.getItem("sid")
        }
      }).then(res => {

        let code = res.data.code

        console.log("code===" + code)
        if(code == "success"){
          // 如无数据，则跳过 2019-6-13  
          if (!res.data.result || !res.data.result.datalist)
                return;

          let curGroups = res.data.result.datalist

          console.log("curGroups.length===" + curGroups.length)

          let list2Size = Math.floor(curGroups.length / 3)

          console.log("list2Size===" + list2Size)

          if(curGroups.length%3 > 0){
            list2Size = list2Size + 1;
          }
          for (let j = 0; j < list2Size; j++) {

            let curArray = []
            let k = 0;
            for (let i = j*3; i < curGroups.length && i < (j+1) * 3; i++) {
              // 优势标签
              for(let n=0;n< curGroups[i].userList.length;n++){
                let advantageTag = curGroups[i].userList[n].advantageTag
                if(advantageTag && typeof advantageTag =='string'){
                  advantageTag = advantageTag.replace(/,/g,' | ');
                  curGroups[i].userList[n].adv = advantageTag
                }
              }
              // 
              curArray[k] = curGroups[i].userList
              k++;
            }
            this.list2[j] = this.deepCloneUtil(curArray)
          }

          // this.list2 = this.deepCloneUtil(this.list2Orgin)
          // this.list3 = this.deepCloneUtil(this.list3Orgin)

        }

        // console.log("this.courseOptions===" + JSON.stringify(this.courseOptions))

        setTimeout(() => {
          this.loading = false;
        }, 200);
      })
    },

    handleClose() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>

.el-scrollbar {
  height: 100%;
  width: 3.33rem;
  overflow-y: auto;
  max-height: 5.45rem;
}
.el-scrollbar__wrap {
  max-height: 6.45rem;
  height: auto;
}
.team /deep/ .el-scrollbar__bar.is-horizontal {
  display: none;
}
.team /deep/ .el-scrollbar__bar.is-vertical > div {
  display: none !important;
}
.team {
  .teamTitle {
    font-size: 0.16rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    position: relative;
    text-indent: 0.15rem;
    h3 {
      font-weight: bold;
      &:after {
        content: "";
        display: block;
        width: 0.04rem;
        height: 0.16rem;
        background-color: #f79727;
        border-radius: 0.02rem;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .group {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin: 0 .2rem;
    width: 11.4rem;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      height: 5.77rem;
      width: 100%;
      overflow: hidden;
    }
    li {
      border: 0.01rem solid #e4e8ed;
      display: inline-block;
      margin-right: 0.1rem;
      width: 3.33rem;
      height: 5.75rem;
      &:last-child {
        margin-right: 0;
      }
      h4 {
        background: rgba(245, 246, 248, 1);
        color: #333;
        font-size: 0.14rem;
        padding: 0.2rem;
      }
      .teamMain {
        padding: 0.1rem 0.1rem 0.1rem 0.13rem;
        box-sizing: border-box;
        // max-height: 5.34rem;
        // overflow-y: scroll;
        // height: auto;
      }
      .teamBlock {
        margin-bottom: 0.12rem;
        display: flex;
      }
      .teamAvatar {
        flex: 1;
        max-width: 0.9rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 100%;
        }
        span {
          color: #333;
          font-size: 0.14rem;
          display: block;
          margin: 0.1rem 0 0;
          font-weight: bold;
        }
      }
      .teamText {
        flex: 1;
        width: 2.3rem;
        font-size: 0.12rem;
        font-family: ArialMT;
        color: #999;
        line-height: 0.2rem;
      }
      &:hover {
        h4 {
          background: #fff3e5;
          color: #333;
          font-weight: bold;
        }
      }
    }
  }
}
.group1-prev,
.group1-next {
  width: 34px;
  height: 34px;
  background: #eee;
  border-radius: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 18px;
  color: #fff;
  margin: 0 0.2rem;
  &:hover {
    background: rgba(247, 151, 39, 1);
    color: #fff;
  }
}
// .group1-prev {
//   left: -60px;
// }
// .group1-next {
//   right: -60px;
// }
.team /deep/ .el-dialog {
  margin-top: 0.45rem !important;
  height: 6.79rem;
  width: 11.8rem;
}
.team /deep/ .el-dialog__body {
  overflow: hidden !important;
  max-height: 600px;
}
.team /deep/ .el-dialog__wrapper {
  overflow: hidden !important;
}
.team /deep/ .el-carousel {
  height: 5.77rem;
  width: 100%;
  .el-carousel__container {
    height: 5.77rem !important;
    width: 10.3rem;
    margin: 0 auto;
  }
  .el-carousel__arrow--right{
    right: -.55rem;
  }
  .el-carousel__arrow--left{
    left: -.55rem;
  }
  .el-carousel__arrow{
    display: block !important;
  }
  .el-carousel__arrow:hover{
    background-color: #F79727;
    color: #fff;
  }
}
.team /deep/ .el-carousel--horizontal{
    overflow: hidden !important;
  }
</style>
