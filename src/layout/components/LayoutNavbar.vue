<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import Hamburger from './Humburger.vue';
import RouterBreadcrumb from './RouterBreadcrumb.vue';
import { Screenfull } from '@/components';

const userStore = useUserStore();
const appStore = useAppStore();
const handleLogout = () => {
  userStore.logout();
};
const sidebarOpened = computed(() => appStore.sidebar.opened);

function toggleSideBar() {
  appStore.toggleSideBar();
}
</script>

<template>
  <el-row class="navbar">
    <el-col :span="12" class="navbar-left">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <RouterBreadcrumb
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </el-col>
    <el-col :span="12" class="navbar-right">
      <Screenfull class="fullscreen-icon"></Screenfull>
      <div class="right-menu">
        <el-dropdown class="dropdown" trigger="click">
          <div class="el-dropdown-link">
            {{ userStore.name }}
            <el-icon style="margin-left: 4px">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .navbar-left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      line-height: 50px;
      height: 100%;
    }
  }
  .navbar-right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .fullscreen-icon {
      line-height: 50px;
      height: 100%;
    }
    .right-menu {
      height: 100%;
      line-height: 50px;
      padding: 0 20px;
      .dropdown {
        .el-dropdown-link {
          height: 50px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
