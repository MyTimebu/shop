<template>
  <div>
    <!-- 向导栏 -->
    <div class="NavigationBar clearfloat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a>权限管理</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/roles' }">角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加功能 -->
    <div class="NavigationBar clearfloat" style="background-color:rgb(0, 255, 255);height:50px;position: relative;">
      <input type="text" class="Text" placeholder="请输入筛选内容">
      <el-button type="primary" icon="el-icon-search" class="btn_one">搜索</el-button>
      <el-button type="success" round class="btn_two" @click="edi">点击添加</el-button>
    </div>
    <!-- 角色列表 -->
    <div style="width:90%;margin: 0 auto;margin-top:10px;">
      <el-table
      :data="Role_Rendering"

      style="width: 100%; border-radius: 10px 10px 10px 10px;">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row class="first" v-for="first in scope.row.right" :key="first.id">
              <!-- 一级 -->
              <el-col :span="4">
                <el-tag closable @close="handleDeleteRights(scope.row,first)">{{ first.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>

              <!-- 二级 -->
              <el-col :span="20">
                <el-row class="second" v-for="second in first.children" :key="second.id">
                  <el-col :span="4">
                    <el-tag closable type="success" @close="handleDeleteRights(scope.row,second)">{{ second.authName }}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>

                  <!-- 三级 -->
                  <el-col :span="20">
                    <el-tag class="third" v-for="third in second.children" :key="third.id" closable type="warning" @close="handleDeleteRights(scope.row,third)">{{ third.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="roleDesc">
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑角色" placement="bottom-start">
            <el-button type="primary" size="medium" icon="el-icon-edit" @click="$refs.kaishi.shuju(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="受权角色" placement="bottom">
            <el-button type="success" size="medium" icon="el-icon-setting" @click="$refs.qidong.Up(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="bottom-end">
            <el-button type="danger" size="medium" icon="el-icon-delete" @click="del(scope.row)"  circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /角色列表 -->

    <!-- 编辑控件 -->
    <EDIT ref="kaishi" v-on:edit-success="Rendering"></EDIT>
    <!-- 授权控件 -->
    <Authorization ref="qidong" v-on:edit-success="Rendering"></Authorization>
    <!-- 添加功能 -->
    <el-dialog title="添加角色" :visible.sync="edits">
      <el-form :model="form" ref="addFormEl" :rules="addFormRules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edits = false">取 消</el-button>
        <el-button type="primary" @click="tianjia">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, deletes, editAdd, deleteRights } from '@/api/role'
import Authorization from '@/views/Role/Authorization'
import EDIT from '@/views/Role/edit'

export default {
  name: 'Role',
  components: {
    Authorization,
    EDIT
  },
  data () {
    return {
      Role_Rendering: [],
      edits: false,
      form: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px',
      addFormRules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.Rendering()
  },
  methods: {
    async Rendering () {
      const { data, meta } = await getRoleList()
      if (meta.status === 200) {
        data.forEach(item => {
          item.right = item.children
          delete item.children
        })
        this.Role_Rendering = data
      }
    },
    del (item) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await deletes(item.id)
        if (meta.status === 200) {
          this.Rendering()
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
    },
    edi () {
      this.edits = true
    },
    tianjia () {
      this.$refs.addFormEl.validate(async valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        const { data, meta } = await editAdd(this.form.roleName, this.form.roleDesc)
        console.log(data, meta)
        if (meta.status === 201) {
          this.edits = false
          this.Rendering()
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        }
      })
    },
    async handleDeleteRights (role, rights) {
      console.log(role.id, rights.id)
      const { data, meta } = await deleteRights(role.id, rights.id)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        role.children = data
      }
    }
  }
}
</script>

<style>
  .NavigationBar{
    width: 90%;
    height: 40px;
    padding-left: 20px;
    margin: 0 auto;
    background-color: rgb(9, 255, 0);
    border-radius: 13px 13px 13px 13px;
    margin-top: 10px;
  }
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
  .first {
  margin-bottom: 10px;
}

.second, .third {
  margin-top: 5px;
}

.third {
  margin-right: 5px;
}
</style>
