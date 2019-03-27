<template>
  <div class="rights_title">
    <!-- 向导栏 -->
    <div class="NavigationBar clearfloat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a>权限管理</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 权限列表 -->
    <div class="rights_table">
      <el-table
        ref="singleTable"
        :data="rights"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 90%;margin: 0 auto; border-radius: 10px 10px 10px 10px;">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="authName"
          label="权限名称"
          width="120">
        </el-table-column>
        <el-table-column
          property="path"
          label="路径"
          width="120">
        </el-table-column>
        <el-table-column
          label="层级">
          <template slot-scope="scope">
            {{ ['一级','二级','三级'][scope.row.level] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /权限列表 -->
  </div>
</template>

<script>
import { getRightsList } from '@/api/rights'
export default {
  name: 'Rights',
  created () {
    this.setTable()
  },
  data () {
    return {
      rights: [],
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    async setTable () {
      const { data, meta } = await getRightsList('list')
      if (meta.status === 200) {
        this.rights = data
      }
    }
  }
}
</script>

<style>
  .rights_title{
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
  .rights_table{
    margin-top: 10px;
  }
</style>
