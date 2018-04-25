<template>
  <el-tree ref="expandMenuList" class="editable-tree"
    :data="data"
    node-key="id"
    highlight-current
    :props="defaultProps"
    :expand-on-click-node="false"
    :render-content="renderContent"
    default-expand-all></el-tree>
</template>
<script>
import TreeRender from './tree_render'
import { generateId } from 'element-ui/src/utils/util'

export default {
  props: {
    data: Array,
    props: Object
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    renderContent(h,{node,data,store}){
      let that = this;
      return h(TreeRender,{
        props: {
          data: data,
          node: node,
          store: store
        },
        on: {
          appendNode: ((s,d,n) => that.appendNode(s,d,n)),
          editNode: ((s,d,n) => that.editNode(s,d,n)),
          deleteNode: ((s,d,n) => that.deleteNode(s,d,n)),
          submitNode: ((s,d,n) => that.submitNode(s,d,n))
        }
      });
    },
    appendNode (store, data, node) {
      if(node.level >= 5){
        this.$message.error("最多只支持五级！")
        return false;
      }
      const newChild = { id: this.id, isEditing: true, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.unshift(newChild);
    },
    editNode (store, data, node) {

    },
    deleteNode (store, data, node) {
      console.log(store, data, node);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    submitNode (store, data, node) {
    }
  },
  computed: {
    id() {
      return generateId();
    }
  }
}
</script>
<style lang="less">
.editable-tree {
  .el-tree-node__content {
    height: 40px;
    &:hover .operation {
      display: inline-block;
    }
  }
}
</style>

