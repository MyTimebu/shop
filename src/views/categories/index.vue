<template>
  <div class="params-nav">
    <el-button type="primary" size="medium" @click="() => { this.$refs.Adds.LoadCateAdd() }">添加</el-button>
    <el-table
    :data="formData"
    style="width: 100%;margin-bottom: 20px;"
    border
    row-key="cat_id">
    <el-table-column
      prop="cat_name"
      label="分类名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="是否有效"
      sortable
      width="180">
      <template slot-scope="scope">
        {{ scope.row.cat_deleted ? '无效' : '有效'}}
      </template>
    </el-table-column>
    <el-table-column
      prop="cat_level"
      label="排序">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
      <el-tooltip class="item" effect="dark" content="编辑用户" placement="bottom-start">
      <el-button type="primary" size="medium" icon="el-icon-edit" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="权限管理" placement="bottom">
      <el-button type="success" size="medium" icon="el-icon-setting" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom-end">
      <el-button type="danger" size="medium" icon="el-icon-delete" circle></el-button>
      </el-tooltip>
    </el-table-column>
  </el-table>
  <AddCate ref="Adds" v-on:add-success="LoadCategories"></AddCate>
  </div>
</template>

<script>
import { GoodsCategories } from '@/api/goods'
import AddCate from './add.vue'

export default {
  name: 'categories',
  components: {
    AddCate
  },
  data() {
    return {
      tableData: [{
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }]
      }],
      formData: []
    }
  },
  created() {
    this.LoadCategories()
  },
  methods: {
    load (tree, treeNode, resolve) {
      resolve([
        {
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ])
    },
    async LoadCategories () {
      const { data, meta } = await GoodsCategories()
      if (meta.status === 200) {
        console.log(data,meta)
        this.formData = data
      }
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .params-nav{
    width: 90%;
    margin: 0 auto;
  }
</style>
