<template>
  <div class="details" v-loading="loading">
    <el-dialog class="details-dialog" :close-on-click-modal="false" :visible.sync="state" width="60%" :before-close="handleClose">
      <div slot="title" class="detailsHead">
        <div class="avatar">
         <!-- <img :src="works.user.phone" />-->
          <img  />
        </div>
        <div class="name">
          <h3>{{works.name}}</h3>
          <span class="time"><time>更新时间：{{works.islike}}</time></span>
        </div>
        <div class="but" @click="openNewPage">
          <span class="action-btn"><img class="bimg39" :src="icon_39" /><span  class="text">下载</span></span>
        </div>
      </div>
      <div class="group">
        <div v-for="item in fileDetails" v-if="fileDetails.length > 0" :key="item.id">
          <img :src="item.fileurl" />
        </div>

        <div  v-if="fileDetails.length == 0" >
          <img :src="works.workPath" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import details1 from 'assets/images/details1.png'
  import movie1 from 'assets/images/movie.mp4'
  import head from 'assets/images/head.png'
  import icon_39 from 'assets/images/icon/icon_39.png'
  import icon_40 from 'assets/images/icon/icon_40.png'
  import icon_42 from 'assets/images/icon/icon_42.png'

  import boy from '@/assets/images/userimg/boy-student.jpg'
  import girl from '@/assets/images/userimg/girl-teacher.jpg'
  import female from '@/assets/images/userimg/female-teacher.jpg'
  import man from '@/assets/images/userimg/man-teacher.jpg'

  // getWorksFileApi

  import { getWorksFileApi } from 'api/api'


  import axios from 'axios'

  export default {
    name: "workDetails",
    props: {
      state: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {
          return {}
        }
      },
      workFileId:""
    },
    data() {
      return {

        boy,
        girl,
        female,
        man,

        userImg:"",


        works:{
          user: {}
        },
        fileDetails:[],
        loading: true,
        details1,
        head,
        icon_39,
        icon_40,
        icon_42,
        movie1
      };
    },
    created() {



      let _this = this;
      setTimeout(() => {
        _this.loading = false;
      }, 100);
    },
    watch: {
      workFileId (newVal) {
        this.getCourseList()
      }
    },
    methods: {

      openNewPage(){
        window.open(this.works.workPath, '_blank');
      },

      getCourseList(){

        let params = {
          workFileId: this.workFileId
        }

        axios.post(getWorksFileApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.works = res.data.result.works;
            console.log(res.data.result.datalist)
            if(res.data.result.datalist)this.fileDetails = res.data.result.datalist
            let curuser = this.works.user

            if (curuser.teacher){
              if (curuser.phone != null && curuser.phone == '1'){
                curuser.phone = man

              } else {
                curuser.phone = female

              }
            } else {
              if (curuser.phone != null && curuser.phone == '1'){
                curuser.phone = boy
              } else {
                curuser.phone = girl
              }
            }

          }

        })

      },
      handleClose() {
        this.$emit('close');
      }
    }
  };
</script>

<style lang="scss" scoped>
.details {
  img {width: 100%;}
  .detailsHead {
    display: flex;
    margin-right: 0.3rem;
    padding: 0.1rem 0;
    border-right: 0.01rem solid rgba(228, 232, 237, 1);

    .avatar {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 100%;
      img { width: 0.4rem; height: 0.4rem; border-radius: 100%}
    }

    .name {
     flex: 1;
     font-size: 0.14rem;
     margin-left: 0.1rem;
     h3{color: #333; font-weight: bold; margin: 0.04rem 0 0.07rem 0;}
     span {
      color: #999;
      time {margin-left: 0.11rem;}
     }
    }

    .but {
      flex: 1;
      text-align: right;
      height: 0.4rem;
      line-height: 0.4rem;
      .action-btn {
        display: inline-block;
        color: #666;
        font-size: 0.13rem;
        cursor: pointer;
        vertical-align: middle;
        margin-right: 0.2rem;
        .text {
          display: inline-block;
          vertical-align: middle;
        }
      }
      img {
        height: 0.2rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
      .bimg39 {width: 0.15rem;}
      .bimg40 {width: 0.16rem;}
      .bimg42 {width: 0.2rem;}
    }
    .time {
      font-size: 0.13rem;
      color: #999;
    }
  }

  .group {
    overflow-x: scroll;
    max-height: 6rem;
    margin-top: -0.3rem;
    margin-bottom: -0.3rem;
    text-align: center;
    padding-bottom: 0.2rem;
    border-left:0.01rem solid rgba(228,232,237,1);
    border-right:0.01rem solid rgba(228,232,237,1);

    video{
        width: 80%;
    }
  }

}
</style>
<style lang="scss">
.details {
  .el-dialog__header {
    position: relative;
    padding: 0 0.2rem;
    border-bottom: #E4E8ED 0.01rem solid;
    .el-dialog__headerbtn {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .details-dialog .el-dialog__body {
    padding: 0.3rem 0.5rem;
  }
}
</style>
