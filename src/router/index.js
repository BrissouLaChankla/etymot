import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DailyWord from '../views/DailyWord.vue'
import RandomWord from '../views/RandomWord.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/dailyword-game',
    name: 'DailyWord',
    component: DailyWord
  },
  {
    path:'/randomword-game',
    name: 'RandomWord',
    component: RandomWord
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
