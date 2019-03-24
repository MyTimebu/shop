import reout from '@/utils/reout'

export const getUserList = ({ pagenum = 1, pagesize = 5 }) => reout({
  method: 'get',
  url: '/users',
  params: {
    pagenum,
    pagesize
  }
}).then(res => res.data)

export const addUser = ({ username, password, email, mobile }) => reout({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)
