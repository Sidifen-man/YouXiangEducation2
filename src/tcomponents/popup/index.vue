<template>
  <div class="popup" v-show="value">
    <transition name="slide">
      <div class="popup-content" v-show="value" :class="positionClass" :style="{ contentStyle }">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const objTransitionSlideType = {
  bottom: "slide-bottom",
  left: "slide-left",
  top: "slide-top",
  right: "slide-right",
  center: "fade"
};
export default {
  name: "popup",
  props: {
    position: {
      type: String,
      default: "center"
    },
    value: {
      type: Boolean,
      required: true
    },
    // 点击遮罩层是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    hideMask: {
      type: Boolean,
      default: false
    },
    contentStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  computed: {
    positionClass() {
      return [`popup-${this.position}`];
    },
    transitionSlideType() {
      return objTransitionSlideType[this.position];
    }
  },

  watch: {
    value(newVal, oldVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  },

  methods: {
    $_cancel() {
      if (!this.closeOnClickOverlay) return;
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss" scoped>

$prefixCls: popup;

.#{$prefixCls} {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow: auto;
  // &-mask {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   z-index: 9999;
  // }
  &-content {
    // position: fixed;
    // background-color: #fff;
    z-index: 9999;
    margin: 15vh auto;
    &.#{$prefixCls}-top {
      left: 0;
      right: 0;
      top: 0;
    }
    &.#{$prefixCls}-bottom {
      left: 0;
      right: 0;
      bottom: 0;
    }
    &.#{$prefixCls}-left {
      top: 0;
      left: 0;
      width: 60%;
      bottom: 0;
    }
    &.#{$prefixCls}-right {
      top: 0;
      right: 0;
      width: 60%;
      bottom: 0;
    }
    &.#{$prefixCls}-center {
      // top: 50%;
      // left: 50%;
      // transform: translate3d(-50%, -50%, 0);
    }
  }
}

@keyframes slide-enter {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slide-leave {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}

.slide {
  &-enter-active {
    animation: slide-enter 0.3s both ease-out;
  }
  &-leave-active {
    animation: slide-leave 0.3s both ease-out;
  }
}
</style>

