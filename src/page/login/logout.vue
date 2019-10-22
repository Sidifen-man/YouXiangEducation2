<template>
  <div>
    <p>课程中心注销</p>
  </div>
</template>

<script>

  export default {

    name: 'Logout',

    created () {
      this.logout()
    },

    methods: {

      handleClick (tab, event) {
        console.log(tab, event)
      },

      logout () {
        localStorage.removeItem("sid");
        localStorage.removeItem("yx_token");    // old version
        localStorage.removeItem("loginuser");
        
        console.log("Done logout");
        
        location.href = '/'
      }

    }

  }
</script>

<style lang="scss" scoped>
</style>
