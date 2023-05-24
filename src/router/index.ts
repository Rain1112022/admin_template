import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import BasicLayout from '@/layout/BasicLayout.vue';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';
// import { markRaw } from 'vue';

//静态路由，与权限无关，所有用户都可以访问

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'HomeFilled' },
    children: [
      {
        path: 'data',
        component: () => import('@/views/Home/DataScreen.vue'),
        meta: { title: '数据' },
      },
      {
        path: 'dashboard',
        component: () => import('@/views/Home/Dashboard.vue'),
        meta: { title: '可视化' },
      },
    ],
  },
  {
    path: '/list',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/List/Detail.vue'),
        meta: { title: '列表', icon: 'List' },
      },
    ],
  },
  {
    path: '/nest',
    component: BasicLayout,
    meta: { title: '路由嵌套', icon: 'Box' },
    children: [
      {
        path: 'nest1',
        component: () => import('@/views/Other/MenuSecond.vue'),
        // alwaysShow: true,
        meta: {
          title: '菜单1',
          // breadcrumb: false
        },
        children: [
          {
            path: 'nest1-1',
            component: () => import('@/views/Other/MenuThird.vue'),
            meta: { title: '菜单1-1' },
          },
          {
            path: 'nest1-2',
            component: () => import('@/views/Other/MenuThird.vue'),
            meta: { title: '菜单1-2' },
          },
        ],
      },
      {
        path: 'nest2',
        component: () => import('@/views/Other/MenuSecond.vue'),
        meta: { title: '菜单2' },
      },
    ],
  },
  {
    path: '/scale',
    component: BasicLayout,
    children: [
      {
        path: '',
        meta: { title: '适配', icon: 'Grid' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    hidden: true,
  },
];

//动态路由，配置了 roles 的路由，只有用户拥有该角色时可以访问

export const asyncRoutes: AppRouteRecordRaw[] = [
  // {
  //   path: '/permission',
  //   component: markRaw(LayoutIndex),
  //   redirect: '/permission/page',
  //   alwaysShow: true,
  //   meta: { title: '权限测试', icon: 'Lock', roles: ['admin', 'editor'] },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/Permission/PagePermission.vue'),
  //       meta: { title: '页面权限', roles: ['admin'] },
  //     },
  //     {
  //       path: 'button',
  //       component: () => import('@/views/Permission/ButtonPermission.vue'),
  //       meta: { title: '按钮权限' },
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes as RouteRecordRaw[],
});

//全局路由守卫（每次切换路由前执行
//如果没有 token，跳转到登录页， 如果有 token，进一步判断是否有角色，有角色就进入路由，如果没有角色就获取角色，然后根据获取到的角色过滤动态路由，最终将过滤后的动态路由添加到路由表中

router.beforeEach((to) => {
  const token = sessionStorage.getItem('token');
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  if (token) {
    if (to.path === '/login') {
      return '/';
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0;
      if (!hasRoles) {
        return userStore.getUserInfo().then(({ roles }) => {
          const accessedRoutes = permissionStore.generateRoutes(roles);
          accessedRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route);
          });
          return to.fullPath;
        });
      }
    }
  } else {
    if (to.path !== '/login') {
      return '/login';
    }
  }
});

export default router;
