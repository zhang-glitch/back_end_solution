export default {
  name: 'profile',
  path: '/',
  redirect: '/profile',
  component: () => import('@/views/layout/index.vue'),
  children: [
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/profile/index.vue'),
      meta: {
        title: 'profile',
        icon: 'el-icon',
        // icon: 'role',
        iconName: 'User'
      }
    }
  ]
}
