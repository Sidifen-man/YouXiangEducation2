<template>
  <div>
    <p>课程中心登陆</p>
  </div>
</template>

<script>

  import { phpLoginApi,remoteLoginApi } from 'api/api'
  import axios from 'axios'

  export default {

    name: 'Login',

    created () {
      this.getUserDetail()
    },

    methods: {

      handleClick (tab, event) {
        console.log(tab, event)
      },

      getUserDetail () {
        //{{ $route.params.phpToken}}

        console.log("$route.params.phpToken===" + this.$route.params.phpToken);
        let params = {
          php_token: this.$route.params.phpToken
        }

        axios.post(phpLoginApi, params).then(res => {

          console.log("isSuccess===")
          let isSuccess = res.data.success

          console.log("isSuccess===" + isSuccess)

          if(isSuccess){

            let sid = res.data.sid

            let curUser = res.data.user

            localStorage.setItem("sid", sid)
            localStorage.setItem("loginuser", JSON.stringify(curUser))

            console.log("curUser.teacher: " + curUser.teacher + ", curUser.student:" + curUser.student)
            
            if(curUser.student){
              location.href = '/#/student/course/mycourse'

            } else if(curUser.teacher){
              location.href = '/#/teachers/course/mycourse'

            } else {

              location.href = remoteLoginApi

            }

          } else {

            location.href = remoteLoginApi

          }


        })

      }

    }

  }
</script>

<style lang="scss" scoped>
</style>
