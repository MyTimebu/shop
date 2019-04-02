import request from '@/utils/reout'

export const addGoodsCategory = ({ cat_pid, cat_name, cat_level }) => request({
  method: 'POST',
  url: '/categories',
  data: { // POST 参数
    cat_pid,
    cat_name,
    cat_level
  }
}).then(res => res.data)
