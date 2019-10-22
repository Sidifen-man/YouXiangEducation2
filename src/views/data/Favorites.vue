<!-- ali -->
<template>
  <div class="favoriteContain">
    <div class="f_title flexCenterY">
      <p class="f_titleText flexCenterY">收藏夹列表</p>
      <p
        class="f_titleImg cursor"
        @click="$router.push('/global_data/activity/library/school_detail')"
      >
        <img src="../../images/global/favorites-collect.png" alt />
      </p>
    </div>
    <div class="f_navContain">
      <ul class="flexCenterY">
        <li
          class="cursor"
          :class="{active:index===currentIndex}"
          v-for="(item,index) in navList"
          :key="index"
          @click="handleNav(index)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="f_listContain">
      <template v-if="list.length">
        <div
          class="f_listItem flex"
          v-for="(item,idx) in list"
          :key="idx"
          @click="$router.push('/global_data/activity/library/school_detail')"
        >
          <img src="../../images/global/favorites-1.png" alt />
          <div class="f_itemInfoContain">
            <div class="f_itemInfo flexCenterY">
              <div class="f_itemTitle">{{item.name}}</div>
              <div class="f_itemTag">
                <span v-for="tag in item.tags" :key="tag">{{tag}}</span>
              </div>
              <img src="../../images/global/favorites-linkDetail.png" alt class="cursor" />
            </div>
            <div class="f_activeInfo flexCenterY">
              <img src="../../images/global/favorites-active-time.png" alt />
              <div class="f_itemTitle">活动时间：{{item.time}}</div>
            </div>
            <div class="f_activeInfo flexCenterY">
              <img src="../../images/global/favorites-active-age.png" alt />
              <div class="f_itemTitle">年龄要求：{{item.age}}</div>
            </div>
            <div
              class="f_activeDetail overflow1"
            >针对热爱击剑项目需要在击剑运动上有发展提高的学生进行规范、系统的训练针对热爱击剑项目需要在击剑运动上有发展提高的学生进行规范、系统的训练</div>
            <div class="f_action flex">
              <p>收藏： {{item.collect}}</p>
              <p>咨询： {{item.advisory}}</p>
              <p>报名： {{item.signUp}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!list.length">
        <div class="f_emptyImg flexCenterXY">
          <img src="../../images/global/favorites-empty.png" alt />
          <p>暂无相关收藏</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        "全部",
        "艺术与人文",
        "商业",
        "体育运动",
        "社会科学与社会服务",
        "科学、数字和技术",
        "专业技能"
      ],
      currentIndex: 0,
      list: [],
      list1: [
        {
          name: "击剑",
          tags: ["体育运动", "社团运动课"],
          time: "2019.01.02-2019.01.03",
          age: "K7,K8,K9,K10,K11,K12",
          collect: 0,
          advisory: 0,
          signUp: 1
        },
        {
          name: "击剑",
          tags: ["体育运动", "社团运动课"],
          time: "2019.01.02-2019.01.03",
          age: "K7,K8,K9,K10,K11,K12",
          collect: 0,
          advisory: 0,
          signUp: 1
        }
      ]
    };
  },

  components: {},
  created() {
    this.list = this.list1;
  },
  methods: {
    handleNav(i) {
      this.currentIndex = i;
      if (i == 1 || i == 4 || i == 6) {
        this.list = [];
      } else {
        this.list = this.list1;
      }
    },
    linkPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang='scss' scoped>
.flex {
  display: flex;
}
.flexCenterXY {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flexCenterY {
  display: flex;
  align-items: center;
}
.overflow1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cursor {
  cursor: pointer;
}
.favoriteContain {
  margin: 0 29px 404px 0px;
  box-shadow: 0px 1px 10px 0px rgba(157, 157, 157, 0.2);
  border-radius: 12px;
  .f_title {
    padding-top: 14px;
    padding-right: 25px;
    justify-content: space-between;
    .f_titleText {
      font-size: 14px;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 15px;
        background-color: #fc7927;
        margin-right: 33px;
      }
    }
    .f_titleImg {
      width: 131px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .f_navContain {
    margin: 7px 21px 0;
    ul {
      width: 692px;
      height: 36px;
      background: rgba(245, 245, 245, 1);
      border-radius: 6px;
      justify-content: space-between;
      padding-right: 17px;
      li {
        min-width: 70px;
        height: 100%;
        padding: 0 12px;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
        box-sizing: border-box;
        &.active {
          background-color: #ff8726;
          color: #fff;
        }
      }
    }
  }
  .f_listContain {
    margin: 31px 28px 0 21px;
    padding-bottom: 59px;
    .f_listItem {
      margin-bottom: 36px;
      &:last-child {
        margin-bottom: 0;
      }
      & > img {
        width: 207px;
        height: 161px;
        border-radius: 6px;
        margin-right: 23px;
      }
      .f_itemInfoContain {
        width: 0;
        flex-grow: 1;
        .f_itemInfo {
          .f_itemTitle {
            font-size: 16px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 40px;
            margin-right: 12px;
          }
          .f_itemTag {
            width: 0;
            flex-grow: 1;
            span {
              display: inline-block;
              padding: 0 10px;
              height: 20px;
              line-height: 20px;
              background: rgba(255, 135, 38, 0.1);
              border-radius: 10px;
              font-size: 14px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(255, 135, 38, 1);
              margin-right: 6px;
            }
          }
        }
        .f_activeInfo {
          margin-top: 13px;
          font-size: 13px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          & > img {
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
        }
        .f_activeDetail {
          font-size: 13px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-top: 15px;
        }
        .f_action {
          justify-content: flex-end;
          p {
            margin-top: 22px;
            font-size: 13px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            margin-right: 60px;
            &:last-child {
              margin-right: 0px;
              color: #ff8726;
            }
          }
        }
      }
    }
    .f_emptyImg {
      min-height: 448px;
      flex-direction: column;
      p {
        font-size: 16px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>