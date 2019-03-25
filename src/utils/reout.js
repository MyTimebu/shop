import axios from 'axios'
import router from '../router'
import { getToken } from '@/utils/token'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    router.replace('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
