<template>
  <div class="kai">
    <div class="NavigationBar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/user">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="NavigationBar" style="background-color:rgb(0, 255, 255);height:50px;position: relative;">
      <input type="text" class="Text" placeholder="请输入筛选内容">
      <el-button type="primary" icon="el-icon-search" class="btn_one">搜索</el-button>
      <el-button type="success" round class="btn_two" @click="add = true">点击添加</el-button>

      <el-dialog title="添加用户" :visible.sync="add">
        <el-form :model="form" ref="addFormEl" :rules="addFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="add = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="biao">
      <table>
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
                  inactive-color="#ff4949">
                </el-switch>
              </td>
              <td>
                <el-button type="primary" size="medium" icon="el-icon-edit" circle></el-button>
                <el-button type="success" size="medium" icon="el-icon-setting" circle></el-button>
                <el-button type="danger" size="medium" icon="el-icon-delete" circle></el-button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getUserList, addUser } from '@/api/user'
export default {
  name: 'AppUser',
  data () {
    return {
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
      }
    }
  },
  async created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const datas = await getUserList({ pagenum: 1, pagesize: 50 })
      console.log(datas.data.users.length)
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
        window.location.reload(); // 重新加载用户数据列表
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
  .kai{
    width: 100%;
    height: 100%;
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
  table{
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px 10px 10px 10px;
  }
  tr{
    margin: 0 auto;
  }
  td{
    width: 16%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    border:1px solid rgb(53, 163, 214);
    border-radius: 10px 10px 10px 10px;
    margin-left: 5px;
    margin-top: 5px;
  }
  thead>tr>td{
    color: blueviolet
  }
  tbody>tr>td{
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
</style>
