<template>
  <div>
    <div class="NavigationBar clearfloat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/goods">商品管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加功能 -->
    <div
      class="NavigationBar clearfloat"
      style="box-sizing: border-box;background-color:rgb(0, 255, 255);height:30px;position: relative;text-align:right;padding-right:15px;line-height:30px;color:#fff"
    >添加商品信息</div>
    <!-- 步骤条 -->
    <div class="buzhoutiao">
      <el-steps :active="active">
        <el-step title="步骤 1" description="填写基本信息"></el-step>
        <el-step title="步骤 2" description="填写商品参数"></el-step>
        <el-step title="步骤 3" description="填写商品属性"></el-step>
        <el-step title="步骤 4" description="上传商品图片"></el-step>
        <el-step title="步骤 5" description="填写商品内容"></el-step>
      </el-steps>
    </div>
    <!-- 侧边导航 -->
    <div class="cebiandaohang">
      <el-tabs tab-position="left" style="min-height: 200px;" @tab-click="ActIve">
        <el-tab-pane label="基本信息">
          <el-form :model="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="form.goods_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth">
              <el-input v-model="form.goods_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" :label-width="formLabelWidth">
              <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" :label-width="formLabelWidth">
              <el-input v-model="form.goods_number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" :label-width="formLabelWidth">
              <el-cascader :options="opten" :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              }" v-model="form.goods_cat"></el-cascader>
            </el-form-item>
            <el-form-item label="是否促销" :label-width="formLabelWidth">
              <div>
                <el-radio v-model="form.radio7" :label="true" border>是</el-radio>
                <el-radio v-model="form.radio7" :label="false" border>否</el-radio>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-row class="attr-row" v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="2">{{ attr.attr_name }}</el-col>
          <el-col :span="22">
            <!--
              1. 它里面可以得到选中的多个节点的 value
            -->
            <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
              <el-checkbox
                :label="val"
                border
                v-for="val in attr.attr_vals.split(',')" :key="val.id"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :headers="uploadHeaders"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 保存按钮 -->
    <div class="save">
      <el-button type="info" plain @click="Add">添加</el-button>
    </div>
  </div>
</template>

<script>
import { GoodsCategories, AddGoods, canshu } from '@/api/goods'
import { getToken } from '@/utils/token'
export default {
  name: 'GoodAdd',
  data () {
    return {
      uploadHeaders: { // 上传组件自定义请求头
        Authorization: getToken()
      },
      goodsCategoryParams: [],
      goodsCategoryAttrs: [],
      active: 1,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        radio7: '',
        goods_cat: []
      },
      formLabelWidth: '120px',
      opten: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  created () {
    this.Load()
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    async Load () {
      const { data, meta } = await GoodsCategories()
      console.log(data)
      if (meta.status === 200) {
        this.opten = data
      }
    },
    ActIve (currentTab) {
      const { label } = currentTab

      if (label === '商品参数' || label === '商品属性') {
        // 根据在第一个 tab 选中的分类 id 动态请求加载商品参数
        const { goods_cat } = this.formData
        if (goods_cat.length === 0) {
          return this.$message({
            type: 'warning',
            message: '请选择商品分类'
          })
        }
      }

      if (label === "商品参数") {
        this.parameter()
      } else if (label === "商品属性"){
        this.shuxing()
      }

      if (this.active++ > 5) {
        this.active = 1
      }
    },

    async Add () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight } = this.form

       // 处理商品属性
      const categoryAttrs = this.goodsCategoryAttrs
        .map(attr => {
          return {
            attr_id: attr.attr_id,
            attr_value: attr.attr_selected_vals.join(',')
          }
        })
        .filter(attr => attr.attr_value.length > 0)

      // 处理商品参数
      const categoryParams = this.goodsCategoryParams.map(attr => {
        return {
          attr_id: attr.attr_id,
          attr_value: attr.attr_vals
        }
      })

      // 将商品属性和商品参数合并为一个数组提交给接口
      const attrs = [...categoryAttrs, ...categoryParams]

      const { data, meta } = await AddGoods({
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        attrs
      })
     if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },

    async parameter () {
      console.log(this.form.goods_cat[this.form.goods_cat.length-1])
      const { data, meta } = await canshu(this.form.goods_cat[this.form.goods_cat.length-1])

      if (meta.status === 200) {
        data.forEach(attr => {
          attr.attr_selected_vals = attr.attr_vals.split(',')
        })
        this.goodsCategoryAttrs = data
      }
    },
    async shuxing () {
      const { data, meta } = await canshu(this.form.goods_cat[this.form.goods_cat.length-1], 'only')
      console.log(data, meta)
      if (meta.status === 200) {
        this.goodsCategoryParams = data
      }
    },
    handleUploadSuccess (response, file, fileList) {
      console.log('response => ', response)
      console.log('file => ', file)
      console.log('fileList => ', fileList)

      // fileList 用于默认被展示的图片列表
      // 我们将上传成功的图片信息存储到这个数组中
      // 之后需要提交给添加商品接口
      this.fileList.push({
        name: file.name, // 接口要求名字叫 pic
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
    }
  }
}
</script>

<style>
.NavigationBar {
  width: 90%;
  height: 40px;
  padding-left: 20px;
  margin: 0 auto;
  background-color: rgb(9, 255, 0);
  border-radius: 13px 13px 13px 13px;
  margin-top: 10px;
}
.buzhoutiao {
  width: 90%;
  margin: 10px auto;
  background-color: darkgreen;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px 10px 10px 10px;
}
.cebiandaohang {
  width: 90%;
  margin: 10px auto;
}
.save{
  width: 90%;
  text-align: center;
  margin: 0 auto;
}
.attr-row{
  margin-bottom: 10px;
}
.el-checkbox.is-bordered.el-checkbox--small{
  margin-bottom: 10px;
}
</style>
