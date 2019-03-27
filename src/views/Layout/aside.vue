<template>
  <el-menu :router="true" default-active="1-4-1" class="el-menu-vertical-demo zheng" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
    <el-radio-group v-model="isCollapse" style="margin-left:2px;margin-bottom:15px;margin-top:10px;" class="tiao">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user">用户列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/role">角色列表</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/rights">权限列表</el-menu-item>
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
</template>

<script>
export default {
  name: 'Appaside',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
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
.tiao{
  margin: 0 auto;
}
.zheng{
  border-right: 1.4px rgb(34, 0, 156) solid !important;
}
.el-radio-button__inner{
  width: 62px;
}
</style>
