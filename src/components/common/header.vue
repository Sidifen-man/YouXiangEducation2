<template>
  <header>
    <!-- <router-link :to="{path:'student'}" class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </router-link> -->
    <div class="userinfo">
<!--      <span class='msg'><img src="../../assets/images/icon/icon_message.png" alt=""></span>-->
<!--      <span @click='faq'><img src="../../assets/images/icon/icon_problem.png" alt=""></span>-->
      <div class="userinfo-menu">
        <div><img :src="userImg" alt=""></div>
        <div>
          <h3>{{userName}}</h3>
          <!-- <p>{{className}}</p> -->
        </div>
        <!-- <span><img src="../../assets/images/icon/icon_arrow_bottom.png" alt=""></span> -->
      </div>
    </div>
  </header>
</template>

<script>


  import boy from '@/assets/images/userimg/boy-student.jpg'
  import girl from '@/assets/images/userimg/girl-teacher.jpg'
  import female from '@/assets/images/userimg/female-teacher.jpg'
  import man from '@/assets/images/userimg/man-teacher.jpg'
export default {
  name: 'BHeader',

  created(){
    let curuser = JSON.parse(localStorage.getItem("loginuser"))
    if (!curuser) return; // 未登录

    this.userName = curuser.name

    if (curuser.teacher){
      if (curuser.phone != null && curuser.phone == '1'){
        this.userImg = man
      } else {
        this.userImg = female
      }
    } else {
      this.className = curuser.classInfo.name
      if (curuser.phone != null && curuser.phone == '1'){
        this.userImg = boy
      } else {
        this.userImg = girl
      }
    }


  },

  data () {
    return {
      userName:"",
      userImg:"",
      className:"",
      userSexImg:""
    }
  },
  methods: {
    faq() {
      console.log('跳转后续')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
  padding: 0 0.3rem;
  overflow: hidden;
  .logo {
    display: block;
    width: 2.09rem;
    float: left;
    img {
      width: 100%;
    }
  }
  .userinfo {
    float: right;
    display: flex;
    height:100%;
    align-items:center;
    & > span {
      margin-left: 0.4rem;
      cursor: pointer;
    }
    .userinfo-menu {
      overflow: hidden;
      width: 1.46rem;
      margin-left: 0.4rem;
      display: flex;
      align-items: center;
      & > div:nth-child(1) {
        // margin-top: 0.06rem;
        width: 0.36rem;
        height: 0.36rem;
        line-height: 0.36rem;
        margin-right: 0.12rem;
        float: left;
        img {
          border-radius: 50%;
          width:100%;
        }
      }
      & > div:nth-child(2) {
        // float: left;
        position: relative;
        h3 {
          font-size: 0.14rem;
          line-height: 0.36rem;
          // margin: 0.18rem 0 0.06rem;
        }
        p {
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #888;
        }
      }
      & > span {
        height: 0.2rem;
        line-height: 0.2rem;
        margin-top: 0.2rem;
        float: right;
      }
    }
  }
  .msg {
    position: relative;
    // &::after {
    //   position: absolute;
    //   content: "";
    //   width: 0.07rem;
    //   height: 0.07rem;
    //   background: rgba(242, 42, 24, 1);
    //   border-radius: 50%;
    //   top: 40%;
    //   right: 0;
    // }
  }
}
</style>
