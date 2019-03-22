<template>
  <div class="home">
    <div class="center">
      <div class="tou"><img src="../assets/1.png"></div>
      <form>
        <input type="text" v-model="Accounts" id="user" class="zhang" placeholder="账号：">
        <input type="password" v-model="password" id="pwd" class="password" placeholder="密码：">
        <button class="Login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      Accounts: '',
      password: ''
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
    padding-left: 25px;
  }
  .password{
    width: 300px;
    height: 30px;
    position: absolute;
    top: 140px;
    left: 80px;
    padding-left: 25px;
  }
  .Login{
    background-color: blue;
    color: #fff;
    width: 300px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    border:none;
    position: absolute;
    top: 200px;
    left: 95px;
  }
  .Login:hover{
    background-color:#fff;
    color: #006ae2;
    outline-style: none;
  }
</style>
