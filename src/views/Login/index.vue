<template>
  <div class="home">
    <div class="center">
      <div class="tou"><img src="../../assets/1.png"></div>
      <form>
        <input type="text" v-model="Form.username" id="user"  name="username" class="zhang" placeholder="账号：" required="required">
        <input type="password" v-model="Form.password" id="pwd" name="password" class="password" placeholder="密码：" required="required">
        <button class="Login" @click.prevent="onSubmit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setToken } from '@/utils/token'

export default {
  name: 'login',
  data () {
    return {
      Form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      let user = this.Form.username.trim()
      let pwd = this.Form.password.trim()
      if (user === '' || pwd === '') {
        return this.$notify({
          title: '提示',
          message: '用户名或密码不能为空',
          type: 'warning'
        })
      }
      const resData = await axios.post('http://localhost:8888/api/private/v1/login', this.Form)
      console.log(resData)
      console.log(this.Form)
      if (resData.data.meta.status !== 200) {
        this.$notify.error({
          title: '警告',
          message: '用户名或密码错误'
        })
      } else {
        setToken(resData.data.data.token)
        this.$notify({
          title: `欢迎${resData.data.data.username}`,
          message: '我们欢迎您的登录',
          type: 'success'
        })
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    position: relative;
    background-color: #006ae2
  }
  .center{
    width: 500px;
    height: 300px;
    background-color: #fff;
    position: relative;
    border-radius: 10px 10px 10px 10px
  }
  .tou{
    width: 120px;
    position: absolute;
    left: 172px;
    top:-90px;
    height: 120px;
    border: 10px solid #fff;
    border-radius: 50%;
    box-shadow: 1px 10px 15px 1px;
  }
  .tou>img{
    width: 100%;
    height: 100%;
    border-radius: 50%
  }
  .zhang{
    width: 300px;
    height: 30px;
    position: absolute;
    top: 90px;
    left: 80px;
    padding-left: 10px;
    border-radius: 6px 6px 6px 6px
  }
  .password{
    width: 300px;
    height: 30px;
    position: absolute;
    top: 140px;
    left: 80px;
    padding-left: 10px;
    border-radius: 6px 6px 6px 6px
  }
  .Login{
    background-color: blue;
    color: #fff;
    width: 300px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    border:none;
    border-radius: 10px 10px 10px 10px;
    position: absolute;
    top: 200px;
    left: 97px;
  }
  .Login:hover{
    background-color:#fff;
    color: #006ae2;
    outline-style: none;
  }
</style>
