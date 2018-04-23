<template>
  <div>
    <el-tree
      :data = "options"
      show-checkbox>
    </el-tree>
  </div>
</template>

<script>
import ElTree from './tree/tree.vue'
export default {
  components: {
    ElTree
  },
  data () {
    return {
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

