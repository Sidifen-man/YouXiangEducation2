<template>
  <div class="teacher-works container-tends">
    <div class="tendsHead">
      <section>
        <img src="../../../../assets/images/student/work6.png" alt="">
        <h2 class="title">课堂作品</h2>
        <div class="search-by-name">
          <el-input
            v-model="nameKey"
            placeholder="姓名检索"
            prefix-icon="el-icon-search"
            class="teandsearchInput"
          ></el-input>
          <a @click="searchByName">搜索</a>
        </div>
      </section>
      <div class="head">
        <h3>
          当前课时：
          <span>{{classHoureName}}</span>
        </h3>
        <div class="search-panel">
          <el-select
            class="search"
            v-model="classes"
            clearable
            placeholder="班级筛选"
            @change="handleConditionChange(1)"
          >
            <el-option
              v-for="item in classesOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            class="search"
            v-model="course"
            clearable
            placeholder="课程筛选"
            @change="handleConditionChange(2)"
          >
            <el-option v-html="item.name"
              v-for="item in courseOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            class="search"
            clearable
            v-model="classHoure"
            placeholder="课时"
            @change="handleConditionChange(3)"
          >
            <el-option v-html="item.name"
              v-for="item in classHoureOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select
            class="search"
            v-model="works"
            clearable
            placeholder="作品分类"
            @change="handleConditionChange(4)"
          >
            <el-option
              v-for="item in worksOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
<!--    <div v-show="showResult" class="serach-result">-->
<!--      ：-->
<!--      <span>{{ worksCount + ''}}</span>-->
<!--    </div>-->

    <div class="waterfall-wraper">
      <waterfall :col='col' :gutterWidth="gutterWidth"  :data="worksList"   >
        <template >
          <div class="cell-item" v-for="(item,index) in worksList" :key="item.id">
            <div>
              <div class="taskimg">
                <!--                <img :src="item.thumburl" />-->
                <img :src="item.thumburl" @click="changedetails(item)" />
                <div class="but">


                  <el-tooltip effect="dark"   content="下载" placement="top">
                    <i @click="changedetails(item)" ><img   :src="icon_39" /></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="item-body">
                <div class="item-desc">{{item.name}}</div>
                <div class="task-name">{{item.taskInfo ? '任务名称： ' + item.taskInfo.name : ''}}</div>
                <div class="name" v-if="item.chapter">课程：{{item.course.name}}</div>
                <div class="name" v-if="item.chapter">课时：{{item.chapter.name}}</div>
                <div class="dianzan">
                  <div class="dianzan-head" style="display: flex;">
                    <span style="    display: inline-block;width: 0.3rem;height: 0.3rem;border-radius: 50%; overflow: hidden;"><img :src="item.user.phone" alt=""></span>
                    <span class="tname" style="    display: inline-block; line-height: .3rem;margin-left: .08rem;font-size: .12rem;">{{item.user.name}}</span>
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

    <work-details :info="itemInfo" :workFileId="workFileId" :state="detailsShow" v-on:close="changedetailsClose" />
<!--    <work-details :info="itemInfo" :state="detailsShow" v-on:close="changedetails" />-->
  </div>
</template>

<script>
  import WorkDetails from '@/page/student/course/works/details'

  import pic1 from "assets/images/pic1.png";
  import pic2 from "assets/images/pic2.png";
  import pic3 from "assets/images/pic3.png";
  import pic4 from "assets/images/pic4.png";
  import pic5 from "assets/images/pic5.png";
  import pic6 from "assets/images/pic6.png";
  import pic8 from "assets/images/pic8.png";
  import icon_39 from "assets/images/icon/icon_39.png";
  import icon_40 from "assets/images/icon/icon_40.png";
  import icon_42 from "assets/images/icon/icon_42.png";
  import icon_task_close from "assets/images/icon/icon_task_close.png";
  import zan from "assets/images/student/zan.png";

  import boy from '@/assets/images/userimg/boy-student.jpg'
  import girl from '@/assets/images/userimg/girl-teacher.jpg'
  import female from '@/assets/images/userimg/female-teacher.jpg'
  import man from '@/assets/images/userimg/man-teacher.jpg'


  import { getClassListApi } from 'api/api'

  import { getCourseListApi } from 'api/api'

  import { getChapterListApi } from 'api/api'

  import { teacherWorksListApi } from 'api/api'
  import { likeWorksApi } from 'api/api'
  import { unLikeWorksApi } from 'api/api'



  import axios from 'axios'

  export default {
    components: {WorkDetails},
    data() {
      return {
        boy,
        girl,
        female,
        man,

        classId:"",
        courseId:"",
        chapterId:"",
        workstype:"",
        pageSize:10,
        pageNo:0,

        workFileId:"",

        totalCount :0,

        worksList:[],
        classHoureName:"",

        itemInfo: {},
        detailsShow: false,
        icon_39,
        icon_40,
        icon_42,
        icon_task_close,
        zan,
        data: [],
        loading: true,
        col: 3,
        nameKey: "",
        classHoure: "",
        course: "",
        works: "",
        classes: "",
        worksCount: 978,
        classHoureOptions: [],
        courseOptions: [],
        worksOptions: [],
        classesOptions: []
      };
    },
    created() {
      setTimeout(() => {
        this.loading = false;
        this.loadmore ()
      }, 100);
      this.getSearchOptions();


      this.getClassList()

      this.getCourseList()

    },
    computed: {
      itemWidth() {
        return 138 * 0.5 * (document.documentElement.clientWidth / 375);
      },
      gutterWidth() {
        return 9 * 0.5 * (document.documentElement.clientWidth / 375);
      },
      showResult() {
        return (
          this.classHoure ||
          this.course ||
          this.works ||
          this.classes ||
          this.nameKey
        );
      }
    },
    methods: {

      changedetailsClose(){
        this.detailsShow = !this.detailsShow;

      },

      getStudentWorkList(){

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
          studentName: this.nameKey,
          pageSize: this.pageSize,
          pageNo: this.pageNo

        }

        axios.post(teacherWorksListApi, params,{
          headers: {
            'sid': localStorage.getItem("sid")
          }
        }).then(res => {
          let code = res.data.code

          if(code == "success" && res.data.result.datalist ){

            for (let i = 0; i < res.data.result.datalist.length; i++) {
              this.worksList.push(this.deepCloneUtil(res.data.result.datalist[i]))
            }
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


            this.totalCount = res.data.result.totalCount
            console.log("JSON.stringify(this.worksList)==" + this.worksList.length)
          }else{
            this.totalCount = 0;
          }

          setTimeout(() => {
            this.loading = false;
          }, 100);

        })

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
          if(code == "success"){
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

            this.classHoureOptions = res.data.result.datalist

          }

        })

      },

      // handleLike(listItem) {
      //   console.log(listItem);
      //   let index = this.data.findIndex(item => listItem.id === item.id);
      //   if (listItem.isLike) {
      //     this.data[index]["liked"] -= 1;
      //   } else {
      //     this.data[index]["liked"] += 1;
      //   }
      //   this.data[index]["isLike"] = !this.data[index]["isLike"];
      // },

      handleConditionChange(type) {

        if(type === 2){
          if(this.course != ''){
            this.getChapterList(this.course)
          } else {
            this.classHoureOptions = []
          }

        }

        console.log("classHoure===" + this.classHoure)

        for (let i = 0; i < this.classHoureOptions.length; i++) {

          let curHour = this.classHoureOptions[i]

          console.log("curHour===" + curHour.id)

          if(this.classHoure === curHour.id){

            this.classHoureName = curHour.name
            break;

          }

          if(i == this.classHoureOptions.length - 1){
            this.classHoureName = ""
          }

        }
        this.pageNo = 1
        this.worksList = []
        this.getStudentWorkList()

      },
      searchByName() {
        this.pageNo = 1
        this.worksList = []
        this.getStudentWorkList()
      },
      getSearchOptions() {
        setTimeout(() => {

          this.worksOptions = [
            {
              value: "1",
              label: "个人作品"
            },
            {
              value: "2",
              label: "小组作品"
            }
          ];
        }, 100);
      },
      mix() {
        this.$waterfall.mix();
      },
      switchCol(col) {
        this.col = col;
      },
      loadmore(index) {

        this.pageNo = 1 + this.pageNo
        this.getStudentWorkList()

      },
      changedetails(data){
        if(data.attchurl){
          this.itemInfo = data;
          this.detailsShow = !this.detailsShow;
          this.workFileId = data.id
        }else{
          this.$message.error('暂时没有文件的信息')
        }
        
      },
    }
  };
</script>
<style lang="scss">
  .el-tooltip__popper.is-dark{
    width:auto !important
  }
</style>
<style lang="scss" scoped>

  .taskimg {
    position: relative;
    .but {
      position: absolute;
      bottom: 0.1rem;
      width: 100%;
      text-align: center;
      display: none;
      img {width: 0.2rem;
        }
      .add {
        width: 0.26rem;
      }
      i {
        cursor: pointer;
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

  .teacher-works.container-tends {
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tendsHead {
      height: 1.24rem;
      background-color: #fff;
      border-radius: 0.06rem;
      margin: 0.3rem 0.14rem 0.2rem 0;
      padding: 0 0.2rem;
    }
    section {
      display: flex;
      height: 0.65rem;
      line-height: 0.65rem;
      border-bottom: 0.01rem solid #e4e8ed;
      position: relative;
      > img{
        position: absolute;
        width: 0.2rem;
        height: 0.18rem;
        top: 50%;
        left: 0.1rem;
        transform: translateY(-50%);
      }
      .title {
        flex: 1;
        height: 0.64rem;
        color: #333;
        position: relative;
        font-size: 0.18rem;
        font-weight: bold;
        padding-left: 0.4rem;
        /*&:after {*/
        /*  content: "";*/
        /*  position: absolute;*/
        /*  width: 0.18rem;*/
        /*  height: 0.2rem;*/
        /*  top: 0.25rem;*/
        /*  left: 0.1rem;*/
        /*  background-image: url("../../../../assets/images/icon/icon_mycourse.png");*/
        /*}*/
      }
    }
    .head {
      height: 0.58rem;
      line-height: 0.58rem;
      display: flex;
      h3 {
        color: #888;
        padding-left: 0.1rem;
        flex: 1;
        span {
          color: #333;
          font-weight: bold;
        }
      }
      .search-panel {
        font-size: 0;
        height: 0.32rem;
        line-height: 0.32rem;
        margin-top: 0.13rem;
        padding-right: 0.1rem;
        .search {
          width: 1.5rem;
          margin-left: 0.1rem;
        }
      }
      img {
        border-radius: 100%;
      }
      .tname {
        margin-left: 0.05rem;
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
        font-family: "MicrosoftYaHei";
        cursor: pointer;
      }
    }

    .cell-item {
      padding-right: 0.1rem;
      margin-bottom: 0.1rem;
      .item-body {
        padding: 0.17rem;
        background: #fff;
        border-radius: 0.05rem;
        .item-desc {
          color: #333;
          font-size: 0.13rem;
          line-height: 0.14rem;
          margin-bottom: 0.1rem;
        }
        .task-name {
          font-size: 0.13rem;
          color: #999;
          margin-bottom: 0.1rem;
        }
        .name {
          background-color: rgba(153, 153, 153, 0.1);
          display: inline-block;
          height: 0.24rem;
          line-height: 0.24rem;
          padding: 0 0.1rem;
          font-size: 0.12rem;
          font-weight: bold;
          color: rgba(153, 153, 153, 1);
          margin-bottom: 0.1rem;
        }
        .dianzan {
          display: flex;
          position: relative;
          .avatar-wraper {
            float: 1;
            display: flex;
            .avatar {
              display: inline-block;
              width: 0.3rem;
              height: 0.3rem;
              line-height: 0.3rem;
              border-radius: 50%;
              overflow: hidden;
            }
            .tname {
              height: 0.3rem;
              line-height: 0.3rem;
              margin-left: 0.08rem;
            }
          }
          .good {
            position: absolute;
            right: 0rem;
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
  .waterfall-wraper {
    overflow: auto;
    padding-right: 0.24rem;
    margin-right: 0.14rem;
    max-height: calc(100vh - 2.59rem);
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
    img {
      width: 100%;
    }
    &:nth-child(5n) {
      .cell-item {
        padding-right: 0;
      }
    }
  }
  .cell-item > div {
    overflow: hidden;
    border-radius: 0.04rem;
    border: 0.01rem solid rgba(228, 232, 237, 1);
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
<style lang="scss">
  .teacher-works {
    .search-by-name {
      padding: 0.12rem 0.1rem 0.12rem 0;
      height: 100%;
      box-sizing: border-box;
      font-size: 0;
      .teandsearchInput.el-input--small {
        float: left;
        width: 2.42rem;
        line-height: 0.4rem;
        .el-input__inner {
          width: 2.42rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.2rem;
          padding-left: 0.53rem;
          border-color: rgba(238, 242, 245, 1);
          background: rgba(238, 242, 245, 1);
          &::placeholder {
            color: #aaa;
          }
        }
        .el-input__prefix {
          left: 0.26rem;
          .el-icon-search {
            width: 0.18rem;
            font-size: 0.18rem;
            color: #ccc;
          }
        }
      }
      a {
        float: left;
        width: 0.7rem;
        height: 0.4rem;
        cursor: pointer;
        font-size: 0.15rem;
        line-height: 0.4rem;
        margin-left: 0.12rem;
        color: #fff;
        text-align: center;
        border-radius: 0.2rem;
        background-color: #f79727;
      }
    }
  }
</style>
