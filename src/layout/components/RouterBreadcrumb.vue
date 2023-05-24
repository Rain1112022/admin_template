<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, type RouteRecordRaw } from 'vue-router';

let matchedList = ref<RouteRecordRaw[]>([]);
const route = useRoute();

const getBreadcrumb = () => {
  matchedList.value = route.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

watchEffect(getBreadcrumb);
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in matchedList" :key="item.path">{{
      item?.meta?.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
