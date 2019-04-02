<template>
  <el-dialog title="添加类别" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth">
        <el-input v-model="form.cat_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别分类" :label-width="formLabelWidth">
        <el-cascader :options="opten" clearable change-on-select :props="{
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        }" v-model="form.cat_pid"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="FormVisible">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { GoodsCategories } from '@/api/goods'
import { addGoodsCategory } from '@/api/categonrise'

export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        cat_name: '',
        cat_pid: [],
        ccat_levelat: ''
      },
      opten: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    async LoadCateAdd () {
      this.dialogFormVisible = true
      const { data, meta } = await GoodsCategories()
      if (meta.status === 200) {
        console.log(data,meta)
        this.opten = data
      }
    },
    async FormVisible () {
      const { cat_pid, cat_name, cat_level } = this.form

      const { data, meta } = await addGoodsCategory({
        cat_name,
        cat_pid: cat_pid[cat_pid.length - 1] || 0,
        cat_level: cat_pid.length // 0 是一级、1 是 二级、2 是三级
      })

      if (meta.status === 201) {
        this.dialogFormVisible = false
        this.$emit('add-success')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
