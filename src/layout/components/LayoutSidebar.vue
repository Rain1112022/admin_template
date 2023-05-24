<script setup lang="ts">
import LayoutSidebarItem from './LayoutSidebarItem.vue';
import { usePermissionStore } from '@/stores/permission';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRoute } from 'vue-router';
const cssVariables: any = {
  menuBg: '#304156',
  menuText: '#bfcbd9',
  menuActiveText: '#409eff',
};
const appStore = useAppStore();
const isCollapse = computed(() => !appStore.getSidebarOpened);

const permissionStore = usePermissionStore();
const activeMenu = computed(() => {
  const route = useRoute();
  return route.path;
});
</script>

<template>
  <div>
    <div class="sidebar-title">
      <img
        class="sidebar-title-logo"
        src="@/assets/imgs/team.jpg"
        height="30"
        alt=""
      />
      <span class="sidebar-title-text">管理系统</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-menu"
        :background-color="cssVariables.menuBg"
        :text-color="cssVariables.menuText"
        :active-text-color="cssVariables.menuActiveText"
        :default-active="activeMenu"
        :collapse="isCollapse"
        mode="vertical"
        router
      >
        <LayoutSidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
