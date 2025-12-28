import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Courses from '../pages/Courses.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/courses', name: 'courses', component: Courses },
  { path: '/profile', name: 'profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
