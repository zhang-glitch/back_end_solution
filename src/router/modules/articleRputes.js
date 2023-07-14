import layout from '@/views/layout/index.vue'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index.vue'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail/index.vue'),
      meta: {
        title: 'articleDetail'
      }
    },
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
