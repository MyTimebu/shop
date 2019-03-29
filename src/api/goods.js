import request from '@/utils/reout'

export const Goods = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => request({
  method: 'GET',
  url: '/goods',
  params: { // GET 参数
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)

export const GoodsDelete = (id) => request({
  method: 'DELETE',
  url: `/goods/${id}`
}).then(res => res.data)

export const GoodsCategories = () => request({
  method: 'get',
  url: '/categories',
  data: {
    type: [1, 2, 3]
  }
})
