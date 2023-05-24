<template>
  <div class="app-main">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.app-main {
  box-sizing: border-box;
  height: calc(100vh - 50px);
  padding: 20px;
  width: 100%;
  overflow-y: scroll;
}
</style>
