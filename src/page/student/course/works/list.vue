<template>
  <div class="student-works container-tends">

    <LoadingPage :isShowModal="loading"></LoadingPage>
    <div class="tendsHead">
      <section>
        <h2>课堂作品</h2>
        <div class="teandsearch">
          <a class="upload" @click="changeUpload"><img :src="icon_task_close" />上传作品</a>
        </div>
      </section>
      <div class="head">
        <h3>当前课时：<span>{{classHoureName}}</span></h3>
        <div class="search-panel">
          <el-checkbox class="my-checkbox" @change="handleConditionChange(0)" v-model="myWorksSearch" style="margin-right:0.10rem;">我的作品</el-checkbox>
          <el-select
            class="search"
            v-model="classes"
            placeholder="班级筛选"
            clearable
            @change="handleConditionChange(1)">
            <el-option
              v-for="item in classesOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select
            class="search"
            v-model="course"
            placeholder="课程筛选"
            clearable
            @change="handleConditionChange(2)">
            <el-option v-html="item.name"
              v-for="item in courseOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select
            class="search"
            v-model="classHoure"
            placeholder="课时"
            clearable
            @change="handleConditionChange(3)">
            <el-option v-html="item.name"
              v-for="item in classHoureOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select
            class="search"
            v-model="works"
            placeholder="作品分类"
            clearable
            @change="handleConditionChange(4)">
            <el-option
              v-for="item in worksOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>
      </div>
    </div>


    <div class="waterfall-wraper">
      <waterfall :col='col' :gutterWidth="gutterWidth"  :data="worksList"   >
        <template >
          <div class="cell-item" v-for="(item,index) in worksList" :key="item.id">
            <div>
              <div class="taskimg">
                <img @click="changedetails(item)" style="cursor: pointer;" :src="item.thumburl" />
                <div class="but">

                  <el-tooltip effect="dark"  v-if="item.myself == '1'" content="删除" placement="top">
                    <i @click="changeDeleteShow(item, index)"><img  :src="icon_40" /></i>
                  </el-tooltip>

                  <el-tooltip effect="dark"   content="下载" placement="top">
                    <i  @click="changedetails(item)"><img  :src="icon_39" /></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="item-body">
                <div class="item-desc">{{item.name}}</div>
                <div class="task-name">{{item.taskInfo ? '任务名称： ' + item.taskInfo.name : ''}}</div>
                <div class="name" v-if="item.course">课程：{{item.course.name}}</div>
                <div class="name" v-if="item.chapter">课时：{{item.chapter.name}}</div>
                <div class="dianzan">
                  <div class="dianzan-head">
                    <span><img :src="item.user.phone" alt=""></span>
                    <span class="tname">{{item.user.name}}</span>
                  </div>
                  <div class="good" :class="{'is-zan':item.islike == '0'}">
                    <span style="cursor: pointer;" v-if="item.islike == '0'"  @click="handleLike(item)">
                      <img class="like-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QTJGRjhGMjU1MzcxMUU5QUU2OUVDQjlGOTkzNEQ3QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QTJGRjhGMzU1MzcxMUU5QUU2OUVDQjlGOTkzNEQ3QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVBMkZGOEYwNTUzNzExRTlBRTY5RUNCOUY5OTM0RDdBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVBMkZGOEYxNTUzNzExRTlBRTY5RUNCOUY5OTM0RDdBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tjw++AAAANlJREFUeNqUkUsPRTAQhZV6LDxC0p3/4P+v7e1FbCywk8hFxKMOTUTEvbfOojnT9utMZwjnXHlSlmV1XUdR5LrudV9VvqhpmnEc0zS97T8Dy7J0XQfTtq0UUJYlGBh+6A/Q932e58IbhkEI+QUMw5AkyTzPIvQ873aBoBvTNME5jhOGYRzH+Ot5bNv2lUHHaFEU67oisCwLwPU29Dl0hlVVqbquK9LCoyqlVB5A2e8A/OddSb7vv8hgmuZeknyGIAj2wclnYIztADolYk3TsGIUwtyEkQlgE2AAwPpTUmAwyA0AAAAASUVORK5CYII=" alt="">
                    </span>
                    <span style="cursor: pointer;"  v-if="item.islike != '0'" @click="handleUnLike(item)">
                      <img class="like-img"  :src="zan">
                    </span>
                    <span>{{item.totallike}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
      <div class="loader-btn-wraper">
        <button v-if="totalCount > pageNo*pageSize" class="load-btn" @click="loadmore">查看更多</button>
      </div>
    </div>


    <!--  -->
    <work-details :info="itemInfo" :workFileId="workFileId" :state="detailsShow" v-on:close="changedetailsClose" />
    <upload v-if="uploadShow" :state="uploadShow" @completeTask="completeTask" :taskresult-id="'empty'" v-on:close="changeUpload" />


    <delete-dialog :title="'删除作品'"   v-on:close="deleteDialogCallback"  :state="deleteShow" />

  </div>
</template>

<script>
  import WorkDetails from './details.vue'
  import Upload from './upload.vue'

  import LoadingPage from '../../../common/loadingPage.vue'
  import DeleteDialog from '../../../common/deleteDialog.vue'

  import pic1 from 'assets/images/pic1.png'
  import pic2 from 'assets/images/pic2.png'
  import pic3 from 'assets/images/pic3.png'
  import pic4 from 'assets/images/pic4.png'
  import pic5 from 'assets/images/pic5.png'
  import pic6 from 'assets/images/pic6.png'
  import pic8 from 'assets/images/pic8.png'
  import icon_39 from 'assets/images/icon/icon_39.png'
  import icon_40 from 'assets/images/icon/icon_40.png'
  import icon_42 from 'assets/images/icon/icon_42.png'
  import icon_task_close from 'assets/images/icon/icon_task_close.png'
  import zan from 'assets/images/student/zan.png'


  import boy from '@/assets/images/userimg/boy-student.jpg'
  import girl from '@/assets/images/userimg/girl-teacher.jpg'
  import female from '@/assets/images/userimg/female-teacher.jpg'
  import man from '@/assets/images/userimg/man-teacher.jpg'

  import { unLikeWorksApi } from 'api/api'
  import { likeWorksApi } from 'api/api'
  import { studentWorksListApi } from 'api/api'

  import { studentWorksDeleteApi } from 'api/api'


  import { getClassListApi } from 'api/api'

  import { getCourseListApi } from 'api/api'

  import { getChapterListApi } from 'api/api'


  import axios from 'axios'


  export default{

    components: {

      WorkDetails,
      Upload,
      DeleteDialog,
      LoadingPage

    },

    data () {

      return {
        boy,
        girl,
        female,
        man,
        myWorksSearch:false,

        userImg:"",

        workFileId:"",

        totalCount :0,

        classId:"",
        courseId:"",
        chapterId:"",
        workstype:"",
        pageSize:6,
        pageNo:0,

        worksList:[],


        itemInfo: {},
        icon_39,
        icon_40,
        icon_42,
        zan,
        icon_task_close,

        detailsShow: false,
        uploadShow: false,
        deleteConfirm : false,

        deleteShow:false,
        deleteBizId:"",
        deleteBizObj:{},
        deleteBizIndex:-1,

        classHoureName:"",

        data: [],
        loading: true,
        col: 3,
        classHoure: '',
        course: '',
        works: '',
        classes: '',
        classHoureOptions: [],
        courseOptions: [],
        worksOptions: [{
          value: '1',
          label: '个人作品'
        }, {
          value: '2',
          label: '小组作品'
        }],
        classesOptions: []

      }

    },

    created () {





      setTimeout(() => {
        this.loading = false
        this.loadmore()
      }, 100)



      // this.getStudentWorkList()


      this.getClassList()

      this.getCourseList()

      // this.getChapterList()


    },
    computed: {
      itemWidth () {
        return (138 * 0.5 * (document.documentElement.clientWidth / 375))
      },
      gutterWidth () {
        return (9 * 0.5 * (document.documentElement.clientWidth / 375))
      }
    },

    methods: {

      completeTask(taskresultId){

      },

      getClassList(){

        let params = {

        }
        axios.post(getClassListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code
          if(code == "success" &&  res.data.result){
            let oldArr =  res.data.result.datalist;
            let allArr = [];
            for(let i=0;i<oldArr.length;i++){
              let flag = true;
          　　for(let j=0;j<allArr.length;j++){
          　　　　if(oldArr[i].code == allArr[j].code){
          　　　　　　flag = false;
          　　　　};
          　　}; 
          　　if(flag){
          　　　　allArr.push(oldArr[i]);
          　　};
          };
            this.classesOptions = allArr;
          }
        })

      },

      getCourseList(){

        let params = {

        }

        axios.post(getCourseListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.courseOptions = res.data.result.datalist

          }

        })

      },

      getChapterList(courseId){

        let params = {
          courseId:courseId
        }
        axios.post(getChapterListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code

          if(code == "success"){
            // console.log(res)
            if(!res.data.result.datalist)this.classHoureOptions=[]
            else this.classHoureOptions = res.data.result.datalist
          }

        })

      },

      getStudentWorkList(){

        let myWorks = ""

        if(this.myWorksSearch){
          myWorks = "1"
        }

        this.loading = true;
        // classes
        // course
        // classHoure
        // works
        let params = {

          classId : this.classes,
          courseId : this.course,
          chapterId : this.classHoure,
          workstype : this.works,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          myWorks: myWorks

        }

        axios.post(studentWorksListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.totalCount = res.data.result.totalCount
            if(this.totalCount){
              for (let i = 0; i < res.data.result.datalist.length; i++) {
                this.worksList.push(this.deepCloneUtil(res.data.result.datalist[i]))
              }


              // this.worksList = this.worksList.concat(this.deepCloneUtil(res.data.result.datalist))

              for (let i = 0; i < this.worksList.length; i++) {

                let curuser = this.worksList[i].user

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
            }
            

            
            // console.log("JSON.stringify(this.worksList)==" + this.worksList.length)
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

        })

      },


      deleteStudentWork(){

        this.loading = true;

        let params = {

          worksId : this.deleteBizId

        }

        axios.post(studentWorksDeleteApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            this.worksList.splice(this.deleteBizIndex, 1)
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

        })

      },


      handleLike(listItem) {

        let params = {

          worksId : listItem.id

        }

        axios.post(likeWorksApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            listItem.islike = '1'
            listItem.totallike = listItem.totallike*1 + 1
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

        })
      },
      handleUnLike(listItem) {

        let params = {

          worksId : listItem.id

        }

        axios.post(unLikeWorksApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {

          let code = res.data.code

          if(code == "success"){

            listItem.islike = '0'
            listItem.totallike = listItem.totallike*1 - 1
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

        })
      },
      handleConditionChange(type) {

        if(type === 2){
          if(this.course != ''){
            this.getChapterList(this.course)
          } else {
            this.classHoureOptions = []
          }

        }

        // console.log("classHoure===" + this.classHoure)

        for (let i = 0; i < this.classHoureOptions.length; i++) {

          let curHour = this.classHoureOptions[i]

          // console.log("curHour===" + curHour.id)

          if(this.classHoure === curHour.id){

            this.classHoureName = curHour.name
            break;

          }

          if(i == this.classHoureOptions.length - 1){
            this.classHoureName = ""
          }

        }
        this.pageNo = 1
        this.worksList = [];
        this.getStudentWorkList()

      },

      mix () {
        this.$waterfall.mix()
      },
      switchCol (col) {
        this.col = col
      },
      loadmore () {

        this.pageNo = 1 + this.pageNo
        this.getStudentWorkList()
      },
      changedetails(data){
        this.itemInfo = data;
        this.detailsShow = !this.detailsShow;
        this.workFileId = data.id
      },
      changedetailsClose(){
        this.detailsShow = !this.detailsShow;

      },
      changeUpload(){
        this.uploadShow = !this.uploadShow;
        this.worksList = []

        this.pageNo = 1
        this.getStudentWorkList()
      },
      changeDeleteShow(data, index){

        this.deleteShow = !this.deleteShow;

        this.deleteBizId = data.id
        this.deleteBizIndex = index + 0



      },
      deleteDialogCallback(confirmResult){


        this.deleteShow = !this.deleteShow

        this.deleteConfirm = confirmResult

        if(this.deleteConfirm){
          this.deleteConfirm = true
          this.loading = true

          setTimeout(() => {
            this.deleteConfirm = false
          }, 5000)

          setTimeout(() => {
            this.loading = false
          }, 2000)

          this.deleteStudentWork()

        } else {

        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.student-works.container-tends {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .tendsHead {
    background-color: #fff;
    border-radius: 0.06rem;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    padding-right: 0.1rem;
    margin-top: 0.2rem;
    padding: 0.12rem 0.2rem 0.14rem;
    margin-right: 0.14rem;
    border:0.01rem solid rgba(228,232,237,1);
  }
  section {
    display: flex;
    height: 0.51rem;
    line-height: 0.5rem;
    border-bottom: 0.01rem solid #E4E8ED;
    h2{
      flex: 1;
      display: block;
      height: 0.4rem;
      line-height: 0.4rem;
      text-indent: 0.4rem;
      position: relative;
      font-size: 0.18rem;
      font-weight: bold;
      color: #333;
      &:after{
        content: '';
        position: absolute;
        width: 0.2rem;
        height: 0.18rem;
        top: 0.11rem;
        left: 0.1rem;
        background: url('../../../../assets/images/student/work6.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .teandsearch {
      width: 1.37rem;
      cursor: pointer;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.2rem;
      box-sizing: border-box;
      background-color: #F79727;
      padding: 0 0.2rem;
      margin-right: 0.2rem;
      .el-input {
        float: left;
        width:2.42rem;
        input.el-input__inner {
          width:2.42rem;
          height:0.4rem;
          background:rgba(238,242,245,1);
          border-radius:0.1rem;
        }
      }
      a {
        float: left;
        height: 0.4rem;
        font-size: 0.15rem;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
      .upload {
        img {
          width: 0.22rem;
          height: 0.22rem;
          transform: rotate(-90deg);
          margin-right: 0.1rem;
        }
      }
    }
  }
  .head{
    height: 0.32rem;
    line-height: 0.32rem;
    display: flex;
    align-items: center;
    font-size: 0;
    margin-top: 0.13rem;
    h3{
      color: #888;
      flex: 1;
      height: 0.32rem;
      line-height: 0.32rem;
      font-size: 0.14rem;
      text-indent: 0.1rem;
      span{
        color:#333;
        font-weight: bold;
      }
    }
    .search {
      width: 1.5rem;
      height: 0.32rem;
    }
    img {border-radius: 100%}
    .tname {margin-left: 0.08rem}
  }
  &>button {
    display: block;
    width: 1.2rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    margin: 0 auto;
    background-color: #fff;
    border: 0.01rem solid #ccc;
    border-radius: 0.17rem;
    margin: 0.2rem auto 0;
    color: #999;
    font-size: 0.13rem;
    font-family: '微软雅黑';
    cursor: pointer;
  }
  .cell-item {
    padding-right: 0.1rem;
    margin-bottom: 0.14rem;
    .item-body{
      padding: 0.16rem;
      background: #fff;
      border-radius: 0.04rem;
      .item-desc{
        font-size: 0.13rem;
        line-height: 0.14rem;
        margin-bottom: 0.1rem;
      }
      .task-name{
        font-size: 0.13rem;
        color:#999;
        margin-bottom: 0.1rem;
      }
      .name {
        background-color: rgba(153,153,153,.1);
        display: inline-block;
        height: 0.24rem;
        line-height: 0.24rem;
        padding: 0 0.1rem;
        font-weight:bold;
        font-size: 0.12rem;
        color: rgba(153,153,153,1);
        margin-bottom: 0.1rem;
      }
      .dianzan{
        display: flex;
        position: relative;
        .dianzan-head {
          float: 1;
          display: flex;
          span:nth-child(1){
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
            overflow: hidden;
          }
          .tname {
            display: inline-block;
            line-height: 0.3rem;
            margin-left: 0.08rem;
            font-size: 0.12rem;
          }
        }
        .good {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 0.16rem;
          line-height: 0.16rem;
          font-size: 0;
          span {
            position: relative;
            margin-left: 0.1rem;
            display: inline-block;
            color: #999;
            font-size: 0.12rem;
            vertical-align: middle;
          }
          .like-img {
            height: 0.16rem;
            width: 0.16rem;
            vertical-align: top;
          }
        }
      }
    }
  }
}

.search-panel {
  margin-right: 0.2rem;
  .el-select + .el-select {
    margin-left: 0.1rem;
  }
  /deep/ .my-checkbox {
    .is-focus {
      .el-checkbox__inner {
        border-color: #f79727;
      }
    }
    .is-checked {
      .el-checkbox__inner {
        background-color: #f79727;
        border-color: #f79727;
      }
    }
    &.is-checked {
      .el-checkbox__label {
        color: #f79727;
      }
    }
  }
}
.waterfall-wraper {
  flex: 1;
  overflow: auto;
  padding-right: 0.24rem;
  margin-right: 0.14rem;
  background-color: transparent;
}
.waterfall-wraper::-webkit-scrollbar {
  width: 0.06rem;
  height: 0.06rem;
}
.waterfall-wraper::-webkit-scrollbar-thumb {
  border-radius: 0.03rem;
  background: #fff;
  color: #fff;
}
.vue-waterfall-column {
  img{
    width: 100%;
  }
  &:nth-child(5n){
    .cell-item {
      padding-right: 0;
    }
  }
}
.cell-item>div{
  overflow: hidden;
  border-radius:0.04rem;
  border:0.01rem solid rgba(228,232,237,1)
}

.taskimg {
  position: relative;
  .but {
    position: absolute;
    bottom: 0.1rem;
    width: 100%;
    text-align: center;
    display: none;
    img {width: 0.2rem;
      cursor: pointer;}
    .add {
      width: 0.26rem;
    }
    i {cursor: pointer;
      background: #fff;
      width: 0.58rem;
      height: 0.58rem;
      line-height: 0.58rem;
      text-align: center;
      border-radius: 100%;
      display: inline-block;
      margin: 0 0.1rem;
    }
  }
  &:hover {
    .but {
      display: block;
    }
  }
}

  .loader-btn-wraper {
    margin: 0.2rem 0;
    text-align: center;
    height: 0.34rem;
    .load-btn {
      display: inline-block;
      width: 1.2rem;
      height: 0.34rem;
      line-height: 0.32rem;
      text-align: center;
      background-color: transparent;
      border: 0.01rem solid #ccc;
      border-radius: 0.17rem;

      color: #999;
      font-size: 0.13rem;
      font-family: 'MicrosoftYaHei';
      cursor: pointer;
    }
  }

  .serach-result {
    height: 0.68rem;
    line-height: 0.68rem;
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(228, 232, 237, 1);
    border-radius: 0.06rem;
    font-size: 0.14rem;
    color: #333;
    margin-bottom: 0.1rem;
    margin-top: -0.1rem;
    padding-left: 0.2rem;
    font-weight: bold;
    margin-right: 0.14rem;
    span {
      color: #f79727;
      font-weight: normal;
    }
  }
</style>
