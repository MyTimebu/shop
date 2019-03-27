<template>
  <el-dialog title="编辑角色" :visible.sync="edits">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edits = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { Edit, AddEdit } from '@/api/role'
export default {
  data () {
    return {
      edits: false,
      id: '',
      form: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async shuju (item) {
      const { data, meta } = await Edit(item.id)
      console.log(data, meta)
      this.id = item.id
      if (meta.status === 200) {
        this.form.roleName = data.roleName
        this.form.roleDesc = data.roleDesc
        this.edits = true
      }
    },
    async queding () {
      const { data, meta } = await AddEdit(this.id, this.form.roleName, this.form.roleDesc)
      if (meta.status === 200) {
        console.log(data, meta)
        this.edits = false
        this.$emit('edit-success')
      }
    }
  }
}
</script>

<style>

</style>
