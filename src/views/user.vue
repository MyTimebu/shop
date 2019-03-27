<template>
  <div class="kai clearfloat">
    <!-- 面包屑组件 -->
    <div class="NavigationBar clearfloat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/user">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加功能 -->
    <div class="NavigationBar clearfloat" style="background-color:rgb(0, 255, 255);height:50px;position: relative;">
      <input type="text" class="Text" v-model="texts" @keyup.enter="LoadUserS" placeholder="请输入筛选内容">
      <el-button type="primary" icon="el-icon-search" class="btn_one" @click="LoadUserS">搜索</el-button>
      <el-button type="success" round class="btn_two" @click="add = true">点击添加</el-button>

      <el-dialog title="添加用户" :visible.sync="add">
        <el-form :model="form" ref="addFormEl" :rules="addFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格内容渲染 -->
    <div class="biao clearfloat">
      <table class="clearfloat">
        <thead>
          <tr>
            <td>ID</td>
            <td>姓名</td>
            <td>邮箱</td>
            <td>电话</td>
            <td>用户状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in Datas" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.create_time }}</td>
              <td>
                <el-switch
                  v-model="item.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="zhuangtai(item.id,item.mg_state)">
                </el-switch>
              </td>
              <td>
                <el-tooltip class="item" effect="dark" content="编辑用户" placement="bottom-start">
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="$refs.reference.Up(item.id)" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="权限管理" placement="bottom">
                <el-button type="success" size="medium" icon="el-icon-setting" @click="$refs.userEditRoleEl.showEditRoleDialog(item.id)" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom-end">
                <el-button type="danger" size="medium" icon="el-icon-delete" @click="del(item.id)" circle></el-button>
                </el-tooltip>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页 -->
    <div class="fen clearfloat">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10,len]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(len)">
      </el-pagination>
    </div>
    <!-- 权限编辑 -->
    <quanxian ref="userEditRoleEl"></quanxian>
    <!-- 用户编辑 -->
    <EdiT ref="reference" v-on:edit-success="loadUser"></EdiT>
  </div>
</template>

<script>
import { getUserList, addUser, deleteById, status } from '@/api/user'
import quanxian from '@/views/Features'
import EdiT from '@/views/Features/Edit.vue'

export default {
  name: 'AppUser',
  data () {
    return {
      texts: '',
      Datas: [],
      add: false,
      form: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      formLabelWidth: '120px',
      addFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      currentPage4: 1,
      len: '',
      article: '',
      Pages: ''
    }
  },
  async created () {
    this.loadUser()
  },
  methods: {
    async loadUser (val, article, texts) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.Datas.splice(0, this.Datas.length)
      console.log(texts)
      const datas = await getUserList({ pagenum: val || 1, pagesize: article || 5, query: texts || '' })

      const datax = await getUserList({ pagenum: 1, pagesize: 200 })

      this.len = datax.data.users.length

      let len = datas.data.users.length

      for (let index = 0; index < len; index++) {
        let shuju = {
          id: datas.data.users[index].id,
          username: datas.data.users[index].username,
          email: datas.data.users[index].email,
          create_time: datas.data.users[index].create_time,
          mg_state: datas.data.users[index].mg_state
        }

        this.Datas.push(shuju)
      }
      loading.close()
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleAdd () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        this.submitAdd() // 验证通过，提交表单
      })
    },
    async submitAdd () {
      const shuju = await addUser(this.form)
      console.log(shuju)
      if (shuju.meta.status === 201) {
        this.$message({
          message: shuju.meta.msg,
          type: 'success'
        })
        console.log(123)
        this.$refs.addFormEl.resetFields() // 清空表单数据
        this.add = false // 隐藏对话框
        this.loadUser() // 重新加载用户数据列表
      }
    },
    handleSizeChange (val) {
      this.article = val
      this.loadUser(Number(this.Pages), Number(this.article), this.texts)
    },
    handleCurrentChange (val) {
      this.Pages = val
      this.loadUser(Number(this.Pages), Number(this.article), this.texts)
    },
    del (id) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(id)
        const { meta } = await deleteById(id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadUser()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async zhuangtai (id, type) {
      const { meta } = await status(id, type)
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: 'success'
        })
        this.loadUser(Number(this.Pages), Number(this.article), this.texts)
      }
    },
    LoadUserS () {
      this.loadUser(Number(this.Pages), Number(this.article), this.texts)
    }
  },
  components: {
    quanxian,
    EdiT
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
  .kai{
    width: 100%;
  }
  .biao{
    width: 90%;
    border:aqua solid 1px;
    border-radius: 10px 10px 10px 10px;
    margin: 0 auto;
    margin-top: 10px;
    padding-bottom: 10px
  }
  .el-breadcrumb{
    line-height: 40px !important;
  }
  .biao table{
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px 10px 10px 10px;
  }
  .biao tr{
    margin: 0 auto;
  }
  .biao td{
    width: 15.8%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    border:1px solid rgb(53, 163, 214);
    border-radius: 10px 10px 10px 10px;
    margin-left: 5px;
    margin-top: 5px;
  }
  .biao thead>tr>td{
    color: blueviolet
  }
  .biao tbody>tr>td{
    color:darkcyan;
  }
  .Text{
    width: 240px;
    height: 25px;
    position: absolute;
    right: 240px;
    top:10px;
    outline-style: none;
    padding-left: 10px;
    background-color: rgb(175, 135, 173);
    border: 2px solid rgb(138, 46, 243);
    color: aquamarine;
    border-radius: 10px 10px 10px 10px
  }
  .btn_one{
    position: absolute;
    right: 145px;
    top:5px;
  }
  .btn_two{
    position: absolute;
    right: 5px;
    top:5px;
  }
  .fen{
    width: 90%;
    height: 40px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 8px 7px -5px rgb(157, 16, 170);
    background-color: rgb(0, 149, 175);
  }
</style>
