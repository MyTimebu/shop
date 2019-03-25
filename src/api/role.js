import reout from '@/utils/reout'

export const getRoleList = () => reout({
  method: 'get',
  url: '/roles'
}).then(res => res.data)
