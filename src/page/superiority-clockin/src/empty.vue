<template>
  <div class="empty">
    <img :src="empty" alt="">
    <p class="first">在右侧选中你参加的活动，进行打卡</p>
    <p  class="second">每个活动的打卡将为你赢得<span>+20</span>优势行动力积分</p>
  </div>
</template>
<script>
import empty from 'assets/images/superiority/empty.png';

export default {
  data() {
    return {
      empty
    }
  }
}
</script>
<style lang="scss" scoped>
.empty {
  text-align: center;
  img {
    width: 2.58rem;
    height: 1.36rem;
    margin-top: 1.98rem;
  }
  p:nth-of-type(1) {
    color: #333;
    font-size: 0.18rem;
    margin-top: 0.44rem;
  }
  p:nth-of-type(2) {
    color: #999;
    font-size: 0.16rem;
    margin-top: 0.15rem;
    span {
      color: #F79727;
    }
  }
}
</style>


