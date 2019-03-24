<template>
  <div class="fix">
    <nav>
      <img src="./logo.jpg">
      <h1>电商管理</h1>
      <input type="text" class="in" disabled="disabled" placeholder="此功能暂未开放，敬请期待！">
      <p><a @click="rollOut">退出</a></p>
    </nav>
    <div class="bigbox">
      <Appaside></Appaside>
      <div class="rights">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Appaside from './aside.vue'

export default {
  name: 'layout',
  methods: {
    rollOut () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  components: {
    Appaside
  }
}
</script>

<style>
  .el-submenu:hover .el-icon-menu{
    color: aqua;
  }
  .el-submenu:hover span{
    color: rgb(0, 153, 255);
  }
  .el-menu-item:hover{
    color: rgb(0, 255, 34)
  }
  .fix{
    height: 100%;
  }
  nav{
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(82, 82, 82) ;
  }
  nav>img{
    width: 200px;
    height: 90px;
    border-radius: 10px 10px 10px 10px
  }
  nav>h1{
    width: 210px;
    text-align: center;
    position: absolute;
    left: 10px;
    font-size: 50px;
    text-shadow: 3px 3px 0px rgb(233, 233, 233);
    cursor: pointer;
    color: rgb(85, 85, 85);
  }
  nav>h1:hover{
    background-color: rgb(48, 48, 48);
    text-shadow: 3px 3px 0px rgb(131, 131, 131);
    color: #fff
  }
  nav>.in{
    width: 300px;
    height: 50px;
    border-radius:37px 40px 45px 40px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    right: 240px;
    color: blueviolet;
    text-align: center;
    cursor:not-allowed;
  }
  nav>p>a{
    font-size: 30px;
    color: rgb(147, 0, 233);
    position: absolute;
    right: 25px;
    top: 30px;
    cursor: pointer;
  }
  nav>p>a:hover{
    color:rgb(255, 0, 157)
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px
  }
  .zheng{
    height: 100%;
    border-right: 1.4px rgb(34, 0, 156) solid !important;
  }
  .bigbox{
    width: 100%;
    height: 100%;
    background-color:rgb(255, 255, 231);
    display: flex;
  }
  .el-menu-item-group__title{
    display: none !important;
  }
  .rights{
    width: 100%;
    height: 100%;
  }
</style>
