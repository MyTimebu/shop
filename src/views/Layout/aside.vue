<template>
  <el-menu :router="true" default-active="1-4-1" class="el-menu-vertical-demo zheng" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
    <el-radio-group v-model="isCollapse" style="margin-left:2px;margin-bottom:15px;margin-top:10px;" class="tiao">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-submenu :index="String(first.id)" v-for="first in menus" :key="first.id">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ first.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="`/${second.path}`" v-for="second in first.children" :key="second.id">{{ second.authName }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getRightsMenu } from '@/api/rights'

export default {
  name: 'Appaside',
  data () {
    return {
      menus: '',
      isCollapse: true
    }
  },
  created () {
    this.loadRightsMenu()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async loadRightsMenu () {
      const { data, meta } = await getRightsMenu()
      console.log(data, meta)
      if (meta.status === 200) {
        this.menus = data
      }
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
