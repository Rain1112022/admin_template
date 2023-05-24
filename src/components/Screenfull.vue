<template>
  <div class="screenfull-comp">
    <el-icon
      style="vertical-align: middle"
      :size="20"
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="handleFullScreen"
      ><FullScreen
    /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Screenfull',
});
</script>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue';
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus';
const isFullscreen = ref(false);
init();

function handleFullScreen() {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning',
    });
  }
  screenfull.toggle();
}
function change() {
  isFullscreen.value = screenfull.isFullscreen;
}
function init() {
  if (screenfull.isEnabled) {
    screenfull.on('change', change);
  }
}
function destroy() {
  if (screenfull.isEnabled) {
    screenfull.off('change', change);
  }
}
onBeforeUnmount(() => {
  destroy();
});
</script>

<style scoped lang="scss">
.screenfull-comp {
  width: 24px;
  height: 24px;
}
</style>
