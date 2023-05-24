<template>
  <div
    class="scale-box"
    ref="ScaleBoxRef"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ScaleBox',
});
</script>

<script lang="ts" setup>
import { _throttle } from '@/utils/util';
import { ref, onMounted, onUnmounted, withDefaults } from 'vue';
interface prop {
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<prop>(), {
  width: 1920,
  height: 1080,
});
const scale = ref(0);
const width = ref(props.width);
const height = ref(props.height);
const ScaleBoxRef = ref();
const getScale = () => {
  const wh = window.innerHeight / height.value;
  const ww = window.innerWidth / width.value;
  return ww < wh ? ww : wh;
};
const setScale = () => {
  scale.value = getScale();
  if (ScaleBoxRef.value) {
    ScaleBoxRef.value.style.setProperty('--scale', scale.value);
  }
};
const resize = _throttle(
  () => {
    setScale();
  },
  200,
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
.scale-box {
  box-sizing: border-box;
  transform: scale(var(--scale));
  transition: 0.3s;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/imgs/pageBg.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
