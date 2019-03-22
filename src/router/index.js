/* eslint-disable eol-last */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router()
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
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
