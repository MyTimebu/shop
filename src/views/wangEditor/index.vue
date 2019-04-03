<template>
    <div>
      <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
import { tupian } from '@/api/goods'

export default {
  name: 'editor',
  props: ['title'],
  data () {
    return {}
  },
  methods: {},
  mounted () {
    var editor = new E(this.$refs.editor)

    editor.customConfig.uploadImgServer = ''

    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      const { data, meta } = await tupian(files)
      // 上传代码返回结果之后，将图片插入到编辑器中
      console.log(data, meta)
      if (meta.status === 200) {
        insert(`http://localhost:8888/${data.tmp_path}`)
      }
    }

    editor.customConfig.onchange = (html) => {
      this.$emit('update:title', html)
    }

    editor.create()
  }
}
</script>

<style scoped>
</style>
