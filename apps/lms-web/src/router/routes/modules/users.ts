import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ep:user-filled',
      keepAlive: true,
      order: 1000,
      title: '用户',
    },
    name: 'Users',
    path: '/users',
    children: [
      {
        meta: {
          title: '用户管理',
        },
        name: 'UsersIndex',
        path: '/users',
        component: () => import('#/views/users/index.vue'),
      },
      // {
      //   meta: {
      //     title: $t('users.profile'),
      //   },
      //   name: 'UsersProfile',
      //   path: '/users/profile',
      //   component: () => import('#/views/users/profile.vue'),
      // },
    ],
  },
];

export default routes;
