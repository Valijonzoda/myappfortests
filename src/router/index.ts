import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/quotes',
    name: 'Quotes',
    component: () => import('@/views/Quotes/index.vue')
  },
  {
    path: '/quote/create',
    name: 'QuotesCreate',
    component: () => import('@/views/Quotes/create.vue')
  },
  {
    path: '/quotes/:id',
    name: 'Quote',
    component: () => import('@/views/Quotes/_id.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('@/views/Genres/index.vue')
  },
  {
    path: '/genre/create',
    name: 'GenresCreate',
    component: () => import('@/views/Genres/create.vue')
  },
  {
    path: '/genres/:id',
    name: 'GenreEdit',
    component: () => import('@/views/Genres/_id.vue')
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'PageNotFount',
    component: () => import('@/views/404.vue')
  }
]



export const router = createRouter({
  history: createWebHistory(),
  routes
})