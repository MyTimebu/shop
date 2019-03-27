import reout from '@/utils/reout'

export const getRightsList = (type) => reout({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)
