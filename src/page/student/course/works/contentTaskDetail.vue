<template>
  <div class="details" v-loading="loading">
    <el-dialog v-if="startTask" class="details-dialog" :close-on-click-modal="false" :visible.sync="state" width="60%" :before-close="handleClose">
      <div slot="title" class="detailsHead">
        <div class="avatar"><img :src="head" /></div>
        <div class="name">
          <h3>{{taskDetails.name}}</h3>
        </div>
        <div class="but">
            <el-button type="warning" icon="el-icon-download" v-if="url" @click="downLoad">下载附件</el-button>
        </div>
      </div>
      <div class="group"  v-html="taskDetails.courseTask?taskDetails.courseTask.actcontent:taskDetails.actcontent" ></div>
      <div class="buttons" v-if="completeStatus == '0'&& isShow">
        <button style="cursor:pointer;" ></button>
        <button style="cursor:pointer;" v-if="!isConfirmed" @click="confirmComplete" >确认</button>
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

  // getWorksFileApi

  import { getContentTaskDetailApi  } from 'api/api'
  import { completeTaskResultApi  } from 'api/api'


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
      taskResultId:"",
      contentTask:false,
    },
    data() {
      return {
        taskDetails:[],

        startTask:true,

        loading: true,

        isConfirmed:false,
        isShow:false,
        details1,
        head,
        icon_39,
        icon_40,
        icon_42,
        movie1,
        completeStatus:0,
        url:''
      };
    },
    created() {
      let _this = this;
      setTimeout(() => {
        _this.loading = false;
      }, 100);
    },
    watch: {
      changeViewProp(newVal,oldVal){
        if(newVal.taskResultId && newVal.contentTask){
           this.getContentTaskDetail()
        }
      }
    },
    computed:{
      changeViewProp(){
        const  { taskResultId, contentTask} = this;
        return{taskResultId,contentTask}
      }
    },
    methods: {

      openNewPage(){
        window.open(this.works.workPath, '_blank');
      },
      downLoad(){
        window.location.href=this.url
      },
      confirmComplete(){

        // this.$emit('completeTask', this.taskresultId);
        let params = {
          taskresultId: this.taskResultId
        }

        axios.post(completeTaskResultApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == 'success'){
            this.$emit('completeTask', this.taskResultId);
            this.isConfirmed = true

            setTimeout(() => {
              this.handleClose()
            }, 100);
            // this.works = res.data.result.works
            // this.fileDetails = res.data.result.datalist
            // this.startTask = true
          }

        })

      },

      getContentTaskDetail(){
        let params = {
          taskResultId: this.taskResultId,
          id: this.taskResultId
        }
        axios.post(getContentTaskDetailApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code =="success"){
            this.isConfirmed = false
            this.taskDetails = res.data.result.taskInfo;
            if(res.data.result.completeStatus){
              this.completeStatus = res.data.result.completeStatus
              this.isShow = true;
            }else{
              this.completeStatus = res.data.result.taskInfo.completeStatus
            }
            
            this.startTask = true;
          }else{
            this.isConfirmed = true
            let message = res.data.message
            this.$alert(message, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        })
        

      },
      handleClose() {
        this.startTask = false
        this.$emit('update:contentTask','false')
        this.$emit('close');
        
      }
    }
  };
</script>

<style lang="scss" scoped>
  .details {

    .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        &:nth-of-type(2){
          width: 1.2rem;
          height: 0.36rem;
          border: 0.01rem solid rgba(204, 204, 204, 1);
          border-radius: 0.04rem;
          color:rgba(153,153,153,1);
          font-size: 0.14rem;
          background:linear-gradient(-90deg,rgba(255,183,38,1),rgba(255,129,38,1));
          color: #fff;
          border: none;
        }
      }
    }

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
        margin-right: 0.2rem;
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
      min-height: 4.5rem;
      max-height: 4.5rem;
      margin-top: -0.3rem;
      margin-bottom: 0.3rem;
      text-align: center;
      padding-bottom: 0.2rem;
      border-left:0.01rem solid rgba(228,232,237,1);
      border-right:0.01rem solid rgba(228,232,237,1);

      video{
        width: 80%;
      }
    }
    .group /deep/ p:nth-of-type(1){
      font-size:16px;
      margin-top:0.3rem;
    }
    .group /deep/ p{
      line-height: 0.4rem;
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
