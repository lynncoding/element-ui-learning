<template>
  <div>
    <!-- <el-tree
      :data = "options"
      show-checkbox>
    </el-tree> -->
    <editable-list v-model="data1" :maxLength="30"></editable-list>
  </div>
</template>

<script>
import EditableList from './editable_list/index.vue'
// import ElTree from './tree/tree.vue'
export default {
  components: {
    // ElTree
    EditableList
  },
  data () {
    return {
      data1: [
        {id: 'lynn1', name: '111', summary: '111111', weight: '1'},
        {id: 'lynn2', name: '222', summary: '222222', weight: '2'},
        {id: 'lynn3', name: '333', summary: '333333', weight: '3'}
      ],
      val: [],
      values: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'kaifazhinan',
          label: '开发指南',
          children: [{
            value: 'anzhuang',
            label: '安装'
          }, {
            value: 'guojihua',
            label: '国际化'
          }]
        }]
      }],
      selectedOptions2: []
    }
  }
}
</script>

<style lang="less">

</style>

