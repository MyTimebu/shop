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
      <el-steps :active="1">
        <el-step title="步骤 1" description="填写基本信息"></el-step>
        <el-step title="步骤 2" description="填写商品参数"></el-step>
        <el-step title="步骤 3" description="填写商品属性"></el-step>
        <el-step title="步骤 4" description="上传商品图片"></el-step>
        <el-step title="步骤 5" description="填写商品内容"></el-step>
      </el-steps>
    </div>
    <!-- 侧边导航 -->
    <div class="cebiandaohang">
      <el-tabs tab-position="left" style="min-height: 200px;">
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
              <el-cascader :options="form.goods_cat" change-on-select></el-cascader>
            </el-form-item>
            <el-form-item label="是否促销" :label-width="formLabelWidth">
              <div>
                <el-radio v-model="form.radio7" label="1" border>是</el-radio>
                <el-radio v-model="form.radio7" label="2" border>否</el-radio>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
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
  </div>
</template>

<script>
import { GoodsCategories } from '@/api/goods'
export default {
  name: 'GoodAdd',
  data () {
    return {
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        radio7: '1',
        goods_cat: [{
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }]
          }]
        }]
      },
      formLabelWidth: '120px',
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
      const { data } = await GoodsCategories()
      console.log(data)
      if (data.meta.status === 200) {
        let shuju = [data.data]

        shuju.forEach(element => {
          // this.form.goods_cat.value = element.cat_id
          this.form.goods_cat = element
          console.log(this.form.goods_cat,element)
          // element.children.forEach(second => {
          //   second.children.forEach(third => tem.push(third))
          // })
        })
      }
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
</style>
