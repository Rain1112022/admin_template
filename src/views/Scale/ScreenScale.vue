<template>
  <div class="scale-box-container">
    <ScaleBox></ScaleBox>
  </div>
</template>

<script lang="ts" setup>
import { ScaleBox } from '@/components';
</script>

<style lang="scss" scoped>
.scale-box-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
