<template>
  <el-dialog title="编辑用户" :visible.sync="add">
        <el-form :model="form" ref="addFormEl" :rules="addFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="add = false">取 消</el-button>
          <el-button type="primary" @click="EDIT">确 定</el-button>
        </div>
      </el-dialog>
</template>

<script>
import { edit, EdIt } from '@/api/user'
export default {
  data () {
    return {
      add: false,
      form: {
        username: '',
        mobile: '',
        email: '',
        id: ''
      },
      formLabelWidth: '120px',
      addFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async Up (id) {
      const { data, meta } = await edit(id)
      if (meta.status === 200) {
        this.add = true
        this.form.username = data.username
        console.log(data)
        this.form.email = data.email
        this.form.mobile = data.mobile
        this.form.id = id
      }
    },
    async EDIT () {
      const shu = await EdIt(this.form.id, this.form.mobile, this.form.email)
      console.log(shu)
      if (shu.meta.status === 200) {
        this.add = false
        this.$emit('edit-success')
        this.$message({
          message: shu.meta.msg,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>
