<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="items">
          <div class="title">Editable Tree</div>
          <div class="content">
            <editable-tree :data="options"></editable-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="items"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EditableTree from './editable_tree/index.vue'
export default {
  components: {
    EditableTree
  },
  data () {
    //TODO: 数据处理，源数据加上isEditing
    return {
      val: [],
      values: [],
      options: [{
        id: 1,
        value: 'album',
        label: 'Album',
        children: [{
          id: 2,
          value: '1989',
          label: '1989',
          children: [{
            id: 3,
            value: 'blankSpace',
            label: 'Blank Space'
          }, {
            id: 4,
            value: 'style',
            label: 'Style'
          }, {
            id: 5,
            value: 'outOfTheWoods',
            label: 'Out Of the Woods'
          }, {
            id: 6,
            value: 'shakeItOff',
            label: 'Shake It Off'
          }]
        }, {
          id: 7,
          value: 'reputation',
          label: 'Reputation',
          children: [{
            id: 8,
            value: 'delicate',
            label: 'Delicate'
          }, {
            id: 9,
            value: 'endGame',
            label: 'End Game'
          }]
        }]
      }],
      selectedOptions2: []
    }
  },
  created () {
    let options = this.options
    const traverse = function(options) {
      options.forEach(option => {
        option.isEditing = false
        if(option.children) {
          traverse(option.children)
        }
      });
    }
    traverse(this.options)
    console.log(this.options);
  },
  methods: {

  }
}
</script>

<style lang="less">
.items {
  margin-right: 20px;
  min-height: 350px;
  background-color: #fff;
}
.title {
  padding: 20px;
  background-color: #9cc96b;
  color: #fff;
}
.content {
  padding: 10px;
}
</style>

