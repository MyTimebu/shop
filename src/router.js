import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/index.vue'
import Layout from './views/Layout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { path } = to
  if (path !== '/login') {
    const token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
