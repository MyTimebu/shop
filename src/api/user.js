import reout from '@/utils/reout'

export const getUserList = ({ pagenum = 1, pagesize = 5, query }) => reout({
  method: 'get',
  url: '/users',
  params: {
    pagenum,
    pagesize,
    query
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

export const deleteById = id => reout({
  method: 'delete',
  url: `users/${id}`
}).then(res => res.data)

export const edit = (id) => reout({
  method: 'get',
  url: `users/${id}`
}).then(res => res.data)

export const authorityAllocation = (userID, roleID) => reout({
  method: 'put',
  url: `/users/${userID}/role`,
  data: {
    rid: roleID
  }
}).then(res => res.data)

export const EdIt = (id, email, mobile) => reout({
  method: 'put',
  url: `users/${id}`,
  data: {
    email,
    mobile
  }
}).then(res => res.data)

export const status = (id, type) => reout({
  method: 'put',
  url: `users/${id}/state/${type}`
}).then(res => res.data)
