<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-tree
      :data="data2"
      show-checkbox
      default-expand-all
      :default-checked-keys="defaultChecked"
      node-key="id"
      :props="defaultProps"
      ref="tree"
      @check-change="getChecked"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="edite">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRightsList } from '@/api/rights'
import { getRoleset } from '@/api/role'
export default {
  data () {
    return {
      id: '',
      dialogVisible: false,
      data2: [],
      getChecked: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async Up (item) {
      this.dialogVisible = true
      this.id = item.id
      this.loadRights()
      this.getRights(item.children)
    },

    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      console.log(data, meta)
      if (meta.status === 200) {
        this.data2 = data
      }
    },
    //
    getRights (rights) {
      const tem = []
      rights.forEach(element => {
        element.children.forEach(second => {
          second.children.forEach(third => tem.push(third.id))
        })
      })
      this.defaultChecked = tem
    },
    async edite () {
      const { data, meta } = await getRoleset(this.id, (this.$refs.tree.getCheckedKeys()).join(','))
      console.log(data, (this.$refs.tree.getCheckedKeys()).join(','))
      if (meta.status === 200) {
        console.log(123)
        this.dialogVisible = false
        this.$message({
          message: meta.msg,
          type: 'success'
        })
        this.$emit('edit-success')
      }
    }
  }
}
</script>
