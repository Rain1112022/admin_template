<template>
  <div v-if="currentPath != '/scale'" class="basic-layout">
    <LayoutIndex></LayoutIndex>
  </div>
  <div v-else class="screen-scale">
    <ScreenScale></ScreenScale>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import LayoutIndex from './LayoutIndex.vue';
// import ScreenFull from '@/views/Scale/ScreenFull.vue';
import ScreenScale from '@/views/Scale/ScreenScale.vue';
const currentPath = computed(() => {
  const route = useRoute();
  return route.path;
});
</script>
<style scoped lang="scss">
.basic-layout {
  height: 100%;
  width: 100%;
}
.screen-scale {
  height: 100%;
  width: 100%;
  // position: relative;
}
</style>
