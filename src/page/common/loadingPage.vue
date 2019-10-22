<template>


  <div>
    <transition name="slide-fade">
      <div class="coverSelect" v-if="isShowModal"></div>

    </transition>
    <transition name="slide-fade">
      <div class="myalert" v-if="isShowModal">

        <div>
          <div class="spinner" style="margin-bottom: 30px;">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          </div>

          <div style="color:#F36611;">
            <div style="text-align:center;font-size: 14px;">
              L O A D I N G
            </div>
          </div>

        </div>

      </div>
    </transition>
  </div>

</template>

<script>

  export default {
    name: 'loadingPage',
    props: ['isShowModal'],
    data () {
      return {
      }
    },

    computed: {

    },

    created() {

      setTimeout(() => {
        console.log("isShowModal==" + this.isShowModal)
      }, 100);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @import url('../../assets/css/style.css');
</style>



// WEBPACK FOOTER //
// src/components/common/loadingPage.vue
