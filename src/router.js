import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/index.vue'
import Layout from './views/Layout'
import Home from './views/home.vue'
import User from './views/user.vue'
import Rights from './views/Rights'
import Role from './views/Rights/add'
import GoodList from './views/Good'
import goodsAdd from './views/Good/add'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: User },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Role },
        { path: '/goods', component: GoodList },
        { path: '/goods/Add', component: goodsAdd }
      ]
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
