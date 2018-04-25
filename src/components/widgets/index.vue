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
        isEditing: false,
        children: [{
          id: 2,
          isEditing: false,
          value: '1989',
          label: '1989',
          children: [{
            id: 3,
            isEditing: false,
            value: 'blankSpace',
            label: 'Blank Space'
          }, {
            id: 4,
            isEditing: false,
            value: 'style',
            label: 'Style'
          }, {
            id: 5,
            isEditing: false,
            value: 'outOfTheWoods',
            label: 'Out Of the Woods'
          }, {
            id: 6,
            isEditing: false,
            value: 'shakeItOff',
            label: 'Shake It Off'
          }]
        }, {
          id: 7,
          isEditing: false,
          value: 'reputation',
          label: 'Reputation',
          children: [{
            id: 8,
            isEditing: false,
            value: 'delicate',
            label: 'Delicate'
          }, {
            id: 9,
            isEditing: false,
            value: 'endGame',
            label: 'End Game'
          }]
        }]
      }],
      selectedOptions2: []
    }
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

