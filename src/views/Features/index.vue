<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="adds">
      <el-form :model="formData" ref="addFormEl">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择当前角色" :label-width="formLabelWidth">
          <el-select v-model="formData.region" placeholder="请分配权限">
            <el-option label="请选择" value="-1"></el-option>
            <el-option v-for="item in roles"
            :label="item.roleName"
            :value="item.id"
            :key="item.id"></el-option>
          </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adds = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { edit, authorityAllocation } from '@/api/user'
import { getRoleList } from '@/api/role'
export default {
  data () {
    return {
      roles: [],
      adds: false,
      formData: {
        username: '',
        region: '',
        id: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async showEditRoleDialog (id) {
      const { data, meta } = await edit(id)
      if (meta.status === 200) {
        this.adds = true
        this.formData.username = data.username
        console.log(data)
        this.formData.region = data.rid
        this.formData.id = id
      }

      const { data: roleData, meta: roleMeta } = await getRoleList()

      if (roleMeta.status === 200) {
        this.roles = roleData
      }
    },
    async editRoles () {
      const SSS = await authorityAllocation(this.formData.id, this.formData.region)
      console.log(SSS.meta.status)
      if (SSS.meta.status === 200) {
        this.adds = false
        this.$message({
          message: SSS.meta.msg,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>
