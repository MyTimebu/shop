<template>
  <div class="fix">
    <nav>
      <img src="./logo.jpg">
      <h1>电商管理</h1>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="tiao">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <input type="text" class="in" disabled="disabled" placeholder="此功能暂未开放，敬请期待！">
      <p><a @click="rollOut">退出</a></p>
    </nav>
    <div class="bigbox">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo zheng" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">角色列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">商品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="3-2">分类参数</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">数据报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    rollOut () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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
  nav>.tiao{
    position: absolute;
    left: 310px;
    top:40px
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
    display: flex;
  }
  .el-menu-item-group__title{
    display: none !important;
  }
</style>
