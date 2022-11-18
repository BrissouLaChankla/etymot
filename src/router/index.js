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
    path:'/:difficulty/randomword-game',
    name: 'RandomWord',
    component: RandomWord,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
