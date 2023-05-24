import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: (): StoreApp => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
  }),

  getters: {
    getSidebarOpened: (state: StoreApp) => {
      return state.sidebar.opened;
    },
    getSidebarWithoutAnimation: (state: StoreApp) => {
      return state.sidebar.withoutAnimation;
    },
  },

  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
    },
  },
});
