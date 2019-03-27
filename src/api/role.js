import reout from '@/utils/reout'

export const getRoleList = () => reout({
  method: 'get',
  url: '/roles'
}).then(res => res.data)

export const getRoleset = (id, types) => reout({
  method: 'post',
  url: `/roles/${id}/rights`,
  data: {
    rids: types
  }
}).then(res => res.data)

export const deletes = (id) => reout({
  method: 'delete',
  url: `roles/${id}`
}).then(res => res.data)

// 添加
export const editAdd = (roleName, roleDesc) => reout({
  method: 'post',
  url: `/roles`,
  data: {
    roleName, roleDesc
  }
}).then(res => res.data)

// 获取
export const Edit = (id) => reout({
  method: 'get',
  url: `roles/${id}`
}).then(res => res.data)

// 编辑
export const AddEdit = (id, roleName, roleDesc) => reout({
  method: 'put',
  url: `/roles/${id}`,
  data: {
    roleName, roleDesc
  }
}).then(res => res.data)
