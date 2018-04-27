<template>
  <span class="tree-item">
    <span class="tree-node" v-show="!data.isEditing">
      <span class="label">{{data.label}}</span>
      <span class="operation">
        <i class="el-icon-plus" @click.stop="append(store,data,node)"></i>
        <i class="el-icon-edit" @click.stop="edit(store,data,node)"></i>
      </span>
    </span>
    <span class="input" v-show="data.isEditing">
      <el-input class="edit" size="mini" autofocus
      prop
      v-model="data.label"
      :ref="'treeInput'+data.id"
      @click.stop.native
      @keyup.enter.stop.native="nodeEditPass(store,data,node)">
      </el-input>
      <i class="el-icon-check" @click.stop="submit(store,data,node)"></i>
      <i class="el-icon-close" @click.stop="remove(store,data,node)"></i>
    </span>
  </span>
</template>

<script>
  export default{
    props: ['node', 'data', 'store'],
    data () {
      return {
      }
    },
    methods: {
      append(s,d,n){
        this.$emit('appendNode',s,d,n)
      },
      edit(s,d,n){
        debugger //eslint-disable-line
        d.isEditing = true;
        this.$nextTick(() => {
          this.$refs['treeInput'+d.id].$refs.input.focus()
        })
        this.$emit('editNode',s,d,n)
      },
      remove (s,d,n) {
        d.isEditing = false
        this.$emit('deleteNode',s,d,n)
      },
      submit (s,d,n) {
        d.isEditing = false
        console.log(d);
        if(!d.label.trim()) {

        }
        this.$emit('submitNode',s,d,n)
      },
      nodeEditPass(s,d,n){
        d.isEditing = false;
      }
    }
  }
</script>
<style lang="less">
.tree-item {
  width: 80%;
  i {
    font-weight: bold;
  }
  .operation {
    display: none;
    position: absolute;
    right: 10px;
  }
  .el-input--mini {
    width: 50%;
  }
}
</style>
