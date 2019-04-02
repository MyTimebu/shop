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
}).then(res => res.data)

export const AddGoods = ({ goods_name, goods_cat, goods_price, goods_number, goods_weight, attrs = [], pics = [], goods_introduce = '' }) => request({
  method: 'POST',
  url: '/goods',
  data: {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    attrs,
    pics,
    goods_introduce
  }
}).then(res => res.data)

export const canshu = (id, sel = 'many') => request({
  methods: 'get',
  url: `categories/${id}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)

export const tupian = files => {
  const formData = new FormData()
  formData.append('file', files[0])
  return request({
    method: 'POST',
    url: '/upload',
    data: formData
  }).then(res => res.data)
}
