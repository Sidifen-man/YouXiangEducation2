<template>
  <div class="oNet">
    <ul>
      <li
        v-for="(item,index) in tabs"
        :class="activeName===index?'active':''"
        @click="handleClick(index)"
        :key="index"
      >{{item}}</li>
    </ul>
    <div class="tab_content" v-if="activeName===0">
      <onet1></onet1>
    </div>
    <div class="tab_content" v-if="activeName===1">
      <onet2></onet2>
    </div>
    <div class="tab_content" v-if="activeName===2">
      <professionalRecommendations></professionalRecommendations>
    </div>
  </div>
</template>

<script>
import CircleProgress from "../../tcomponents/circle-progress";
import onet1 from "../../tcomponents/oNet1";
import onet2 from '../../tcomponents/oNet2'
import professionalRecommendations from "../../tcomponents/professionalRecommendations";
export default {
  components: {
    CircleProgress,
    onet1,
    onet2,
    professionalRecommendations
  },
  data() {
    return {
      activeName: 0,
      tabs: ["职业兴趣", "职业价值观"]
    };
  },
  created(){
    let nowActive = Number(this.$cache.localStorage.get('oNetActive'))
    if(nowActive!==null){
      this.activeName = nowActive
    }
  },
  methods: {
    handleClick(index) {
      this.activeName = index;
      let LocalStorage = this.$cache.localStorage
      this.lang = LocalStorage.set('oNetActive',index);
    },
    fitlerdes() {
      let text =
        "Oner职业兴趣测评是美国劳工部与教育部联合研发，通过20年积累的成熟问卷。问卷结果基于大数据库算法。与数据库中1000多个职业进行匹配。</br>Onet测评结果首先与霍兰德职业兴趣代码相匹配，获得6个唯度的得分。基于你的得分，系统进一步基于算法得出与你的职业兴趣结果相匹配的职业，并按照教育水平由高到低展示，下面开始推荐职业的探索吧";
      return text.slice(0, 173) + "...";
    },
  },
  beforeRouteEnter(to, from, next){
    if(from.fullPath.indexOf('oNet')== -1){ 
      localStorage.setItem('oNetActive',0);
    }
    next()
  }
};
</script>

<style lang="less" scoped>
.oNet {
  ul {
    padding: 0 0 0 26px;
    background-color: #fff;
    li {
      display: inline-block;
      list-style: none;
      width: 100px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      background: rgba(255, 135, 38, 0.1);
      border-radius: 3px;
      color: #ff8726;
      font-size: 11px;
      margin-right: 11px;
      text-align: center;
      cursor: pointer;
      &.active {
        background: rgba(255, 135, 38, 1);
        border-radius: 3px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
