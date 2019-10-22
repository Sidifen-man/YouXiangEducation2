<template>
  <div class="category" ref="category">
    <section class="category-wrap">
      <div class="group-header-wrap">
        <div class="group-header clearfix">
          <div class="group-line is-inline"></div>
          <div class="group-title-1 is-inline">备课资料</div>
        </div>
      </div>
      <div class="lesson-content">
        <ul class="lesson-list">
          <li
            class="lesson-item"
            :class="{ 'is-mousemove': item.isHover == true }"
            v-for="(item, index) in prepareFiles"
            :key="index"
            @mouseover="handleOver(index)"
            @mouseleave="handleLeave(index)"
          >
            <div class="lesson-img">
              <img class="less-image" :src="item.thumbUrl" alt="">
              <div class="image-layer" v-show="item.isHover == true"></div>
              <div class="img-hover" v-show="item.isHover == true" @click="downloadFile(item.fileurl)" >
                <img src="../../../../assets/images/teacher/42.png" alt class="click-download">
              </div>
            </div>
            <div class="lesson-intro">
              <div
                class="lesson-title"
                :class="{ 'is-select': item.isHover == true }"
              >{{ item.filename }}</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {

      prepareFiles:{},

      showLesson: {
        type: Boolean,
        default: false
      },
      handleClose: {
        type: Function,
        default: () => {}
      },
      handleConfirm: {
        type: Function,
        default: () => {}
      },
      context: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        labelPosition: "left",
        visible: false,
        lessonList: []
      };
    },
    created() {},
    methods: {


      downloadFile(urlPath){

        window.open(urlPath, '_blank');

        //window.open(window.location.origin + '/courseware/'+item.id+'?type=studentTask')
      },

      handleOver(index) {
        this.prepareFiles[index].isHover = true;
      },
      handleLeave(index) {
        this.prepareFiles[index].isHover = false;
      },
    },
    mounted() {
    }
  };
</script>

<style lang="scss" scoped>
.category {
  .category-wrap {
    margin: 15vh auto;
    background: #fff;
    width: 11rem;
    max-height: 5.84rem;
    border-radius: 0.05rem;
    // z-index: 4445;
    animation: slide 0.5s ease-out;
    border-radius: 0.08rem;

    .category-title {
      font-size: 0.18rem;
      text-align: center;
      padding-bottom: 0.3rem;
    }

    .close-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.1rem;
      font-size: 0.2rem;
      color: #999;
      display: block;
      transition: all 0.5s ease;
      cursor: pointer;
    }
  }
}

.lesson-main-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding-left: 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  position: relative;
  border-bottom: 0.01rem solid #e4e8ed;
  margin-bottom: 0.1rem;

  &:before {
    content: "";
    display: inline-block;
    width: 0.03rem;
    height: 0.1rem;
    background: #f79727;
    border-radius: 0.03rem;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0.1rem;
  }
}

.lesson-content {
  padding-bottom: 0.05rem;
}

.lesson-list {
  width: 100%;
  overflow: auto;
  margin-bottom: 0.3rem;
  padding: 0 0.05rem;
  box-sizing: border-box;
  // max-height: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 4.2rem;
  padding: 0.2rem;
}
.lesson-item {
  width: 1.89rem;
  // height: 2.4rem;
  flex: 0 0 1.89rem;
  display: inline-block;
  margin-top: 0.1rem;
  border: 0.01rem solid #e4e8ed;
  border-radius: 0.04rem;
  cursor: pointer;
  margin-right: 0.2rem;

  &:nth-child(5n) {
    margin-right: 0;
  }

  &.is-mousemove {
    border-color: #f79727;
  }

  .lesson-img {
    position: relative;
    .less-image {
      width: 100%;
      height: 1.5rem;
    }
  }

  .image-layer {
    width: 100%;
    height: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }

  .img-hover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .online-view {
    margin-bottom: 0.14rem;
  }
}

.lesson-intro {
  padding: 0.1rem 0 0 0.12rem;
  text-align: left;
  font-size: 0.16rem;

  .lesson-title {
    font-weight: bold;

    &.is-select {
      color: #f79727;
    }
  }

    .lesson-title,
    .lesson-data,
    .lesson-teacher {
      padding-bottom: 0.16rem;
      color: #666666;
      font-size: 0.14rem;
    }

    .lesson-icon,
    .lesson-text {
      display: inline-block;
      vertical-align: middle;
    }

    .lesson-icon {
      width: 0.12rem;
    }
  }

  .group-header-wrap {
    height: 0.6rem;
    line-height: 0.6rem;
    border-bottom: 0.01rem solid #cccc;
    position: relative;
  }

  .group-header {
    padding-left: 0.3rem;
  }
  .group-opeator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.1rem;
    padding: 0.12rem 0;
    margin-right: 0.12rem;
  }

  .is-inline {
    display: inline-block;
    vertical-align: middle;
  }

  .group-line {
    width: 0.04rem;
    height: 0.16rem;
    background: orange;
    display: inline-block;
    width: 0.03rem;
    height: 0.1rem;
    background: rgba(247, 151, 39, 1);
    border-radius: 0.03rem;
  }

  .group-title-1 {
    font-size: 0.16rem;
    font-weight: bold;
    padding: 0 0.08rem 0 0.05rem;
  }

  .group-title-2 {
    font-size: 0.14rem;
    color: rgba(247, 151, 39, 1);
  }

  .group-min,
  .group-max {
    width: 0.1rem;
    height: 0.01rem;
    border: 0.01rem solid #000;
    box-sizing: border-box;
  }

  .group-min,
  .group-max,
  .group-close {
    vertical-align: middle;
  }

  .group-max {
    height: 0.1rem;
    margin: 0 0.2rem;
    margin-right: 0.3rem;
  }

  .group-close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 0.24rem;
    height: 0.24rem;
    text-align: center;
    line-height: 0.24rem;
    color: #fff;
    background: #f79727;
    border-radius: 100px;

    &:hover {
      color: #333;
    }
  }

  @keyframes slide {
    from {
      opacity: 0;
      // transform: translate(-50%, 0);
      margin-top: 50vh;
    }
    to {
      opacity: 1;
      // transform: translate(-50%, -50%);
      margin-top: 15vh;
    }
  }
</style>
