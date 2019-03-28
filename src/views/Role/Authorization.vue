<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-tree
      :data="data2"
      ref="tree"
      show-checkbox
      default-expand-all
      :default-checked-keys="defaultChecked"
      node-key="id"
      :props="defaultProps"
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
      const rid= [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()].join(',')

      const { data, meta } = await getRoleset(this.id, rid)
      console.log(data)
      if (meta.status === 200) {
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
