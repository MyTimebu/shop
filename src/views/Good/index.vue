<template>
  <div class="goods_wrap">
    <div class="NavigationBar clearfloat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/goods">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加功能 -->
    <div class="NavigationBar clearfloat" style="background-color:rgb(0, 255, 255);height:50px;position: relative;">
      <input type="text" class="Text" v-model="txt" @keyup.enter="() => {this.LadchGoods()}" placeholder="请输入筛选内容">
      <el-button type="primary" icon="el-icon-search" class="btn_one" @click="() => {this.LadchGoods()}">搜索</el-button>
      <el-button type="success" round class="btn_two" @click="Add">点击添加</el-button>
    </div>
    <!-- 表格 -->
    <div class="tab">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods_state"
          label="商品状态">
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.upd_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑用户" placement="bottom-start">
          <el-button type="primary" size="medium" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="权限管理" placement="bottom">
          <el-button type="success" size="medium" icon="el-icon-setting" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom-end">
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="del(scope.row)" circle></el-button>
          </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, Math.ceil(len * 0.1), Math.ceil(len * 0.2), Math.floor(len * 0.3), Math.floor(len * 0.4), Math.floor(len * 0.5), len]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(len)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Goods, GoodsDelete } from '@/api/goods'
export default {
  name: 'GoodList',
  created () {
    this.LadchGoods()
  },
  methods: {
    indexMethod (index) {
      return (this.ye - 1) * this.tiao + index + 1
    },
    handleSizeChange (val) {
      console.log(val)
      this.tiao = val
      this.LadchGoods()
    },
    handleCurrentChange (val) {
      this.ye = val
      this.LadchGoods()
    },
    async LadchGoods () {
      const { data, meta } = await Goods({ query: this.txt, pagenum: this.ye || 1, pagesize: this.tiao || 5 })
      console.log(data, meta)
      if (meta.status === 200) {
        this.len = data.total
        this.tableData = data.goods
      }
    },
    Add () {
      this.$router.push('/goods/Add')
    },
    del (item) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(item.goods_id)
        const id = item.goods_id
        const { meta } = await GoodsDelete(id)
        console.log(meta)
        if (meta.status === 200) {
          this.LadchGoods()
        }
        this.$message({
          type: 'success',
          message: meta.msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },

  data () {
    return {
      tableData: [],
      currentPage4: 1,
      ye: 1,
      tiao: 5,
      len: '',
      txt: ''
    }
  }
}
</script>

<style>
  .fenye{
    width: 90%;
    margin: 10px auto;
    background-color: rgb(229, 75, 243);
    box-shadow: 0px 8px 12px #04adf0;
    text-align: center;
  }
  .goods_wrap{
    width: 100%;
  }
  .NavigationBar{
    width: 90%;
    height: 40px;
    padding-left: 20px;
    margin: 0 auto;
    background-color: rgb(9, 255, 0);
    border-radius: 13px 13px 13px 13px;
    margin-top: 10px;
  }
  .tab{
    width: 90%;
    margin: 10px  auto;
  }
</style>
