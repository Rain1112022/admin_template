<script setup lang="ts">
import { computed } from 'vue';
import LayoutSidebar from './components/LayoutSidebar.vue';
import LayoutNavbar from './components/LayoutNavbar.vue';
import LayoutMain from './components/LayoutMain.vue';
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
const classObj = computed(() => ({
  hideSidebar: !appStore.getSidebarOpened,
  openSidebar: appStore.getSidebarOpened,
  withoutAnimation: appStore.getSidebarWithoutAnimation,
}));
watch(classObj,(nv) => {
  console.log(nv);
  if(nv && nv.hideSidebar ){
    document.querySelector(".sidebar-container").style.setProperty("--sideWidth","54px")
    document.querySelector(".main-container").style.setProperty("--sideWidth","54px")
  }else{
    document.querySelector(".sidebar-container").style.setProperty("--sideWidth","210px")
    document.querySelector(".main-container").style.setProperty("--sideWidth","210px")
  }
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <LayoutSidebar class="sidebar-container" />
    <div class="main-container">
      <LayoutNavbar />
      <LayoutMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
