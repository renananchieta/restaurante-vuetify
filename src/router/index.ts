// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Restaurante',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'categoria',
        name: 'Categoria',
        component: () => import('@/views/Categoria.vue'),
      },
      {
        path: 'produtos',
        name: 'Produtos',
        component: () => import('@/views/Produtos.vue'),
      },
      {
        path: 'cardapio',
        name: 'Cardapio',
        component: () => import('@/views/Cardapio.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
