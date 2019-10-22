<template>
  <div class="g_main">
     <section class="main">
      <aside>
        <router-link :to="{path:'/teachers'}" class="logo">
          <img src="../../assets/images/logo.png" alt>
        </router-link>
        <img :src="userImg" alt="">
        <div class="user">{{userName}}
          <span v-if="userSexImg=='1'"><img src="../../assets/images/icon/icon_sex_nan.png" alt=""></span>
          <span v-if="userSexImg=='2'"><img src="../../assets/images/icon/icon_sex_nv.png" alt=""></span>
        </div>
        <p>{{className}}</p>
        <router-link style="cursor: pointer;" to="/teachers/course/mycourse" tag="div" :class="[{'active':isActive===1},'nav']">
          <span><img src="../../assets/images/icon/icon_course.png" alt=""></span>
          <span>课程中心</span>
        </router-link>
        <router-link style="cursor: pointer;" to="/teacher/task" tag="div" :class="[{'task':isActive===2},'nav']">
          <span><img src="../../assets/images/icon/icon_task.png" alt=""></span>
          <span>任务中心</span>
        </router-link>
      </aside>
      <section class="content">
        <BHeader></BHeader>
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<script>


  import boy from '@/assets/images/userimg/boy-student.jpg'
  import girl from '@/assets/images/userimg/girl-teacher.jpg'
  import female from '../../assets/images/userimg/female-teacher.jpg'
  import man from '../../assets/images/userimg/man-teacher.jpg'

import BHeader from "@/components/common/header.vue";
export default {
  name: "Teachers",
  components: {
    BHeader
  },
  data() {
    return {

      userName:"",
      userImg:"",
      className:"",
      userSexImg:"",
      isActive: 1
    };
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      if (newVal.indexOf('/task')>0) {
        this.isActive = 2;
      } else if (newVal === "/teachers/course/mycourse") this.isActive = 1;
    }
  },
  created() {

    let curuser = JSON.parse(localStorage.getItem("loginuser"))

    console.log("female teacher===" + curuser.teacher )

    this.userName = curuser.name

    if (curuser.teacher){
      if (curuser.phone != null && curuser.phone === '1'){
        this.userImg = man

        this.userSexImg = '1'
      } else {
        console.log("female teacher===" + curuser.teacher )
        this.userImg = female
        this.userSexImg = '2'
      }
    } else {
      if (curuser.phone != null && curuser.phone == '1'){
        this.userImg = boy
        this.userSexImg = '1'
      } else {
        this.userImg = girl
        this.userSexImg = '2'
      }
    }



    if (this.$router.currentRoute.fullPath === "/teachers/course/mycourse") {
      this.isActive = 1;
    } else if (
      this.$router.currentRoute.fullPath.indexOf('/task')>0
    ) {
      this.isActive = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
.g_main {
  width: 13.66rem;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.main {
  display: flex;
  height: 100%;
  & > aside {
    width: 1.5rem;
    height: 100%;
    min-height: 7rem;
    background-color: #fff;
    margin-top: 0.01rem;
    border-right: 0.01rem solid rgba(228, 232, 237, 1);
    text-align: center;
    padding-top: 0.2rem;
    & > img {
      width: 0.8rem;
      border-radius: 50%;
    }
    & .logo {
      width: 0.49rem;
      height: 0.49rem;
      display: block;
      margin: 0 auto;
      margin-bottom: 0.32rem;
    }
    & > .user {
      text-align: center;
      height: 0.16rem;
      line-height: 0.16rem;
      font-weight: 600;
      margin: 0.14rem 0 0.12rem;
      & > span {
        width: 0.16rem;
        display: inline-block;
        margin-left: 0.06rem;
        font-weight: 400;
      }
    }
    & > p {
      font-size: 0.13rem;
      line-height: 0.13rem;
      margin-bottom: 0.36rem;
      color: #888;
    }
    & > .nav {
      height: 0.66rem;
      margin-bottom: 0.11rem;
      text-align: left;
      font-size: 0.15rem;
      color: #666;
      cursor: pointer;
      &.active {
        border-left: 0.03rem solid #f79727;
        background: rgba(252, 244, 235, 1);
        font-size: 0.16rem;
        color: #f79727;
      }
      &.task {
        border-left: 0.03rem solid #3bd7bd;
        background: rgba(219, 253, 247, 1);
        color: #2cc7ad;
      }
      & > span:nth-child(1) {
        display: inline-block;
        width: 0.2rem;
        height: 0.22rem;
        line-height: 1;
        margin: 0.22rem 0.13rem 0 0.25rem;
      }
      & > span:nth-child(2) {
        display: inline-block;
        margin-top: 0.25rem;
      }
    }
  }
  & > section {
    flex: 1;
    width: calc(100% - 1.5rem);
    height: 100%;
  }
}
</style>
