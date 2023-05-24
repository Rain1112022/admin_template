<template>
  <div
    class="screen-full-container"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <div class="scale-center-container">
      <h1 class="scale-item">居中</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { _throttle } from '@/utils/util';
import { ref, onMounted, onUnmounted } from 'vue';
const width = ref(1920);
const height = ref(1080);
const setScale = () => {
  console.log(111);
  width.value = window.innerWidth;
  height.value = window.innerHeight;
};
const resize = _throttle(
  () => {
    setScale();
  },
  50,
  1
);
onMounted(() => {
  setScale();
  window.addEventListener('resize', resize);
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
.screen-full-container {
  position: relative;
  border: 1px solid blue;
  background-image: url('@/assets/imgs/bg.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  .scale-center-container {
    width: 500px;
    height: 500px;
    border: 1px solid red;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .scale-item {
      color: #fff;
    }
  }
}
</style>
