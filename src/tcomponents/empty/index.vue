<template>
  <div class="empty-wraper">
    <img :src="empty" alt="">
  </div>
</template>
<script>
import empty from 'assets/images/empty.jpg';
export default {
  data() {
    return {empty}
  }
}
</script>
<style lang="scss" scoped>
  .empty-wraper {
    height: 2rem;
    width: 100%;

    position: relative;
    img {
      position: absolute;
      width: 16%;
      min-width: 1.4rem;
      max-width: 2rem;
      height: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>


