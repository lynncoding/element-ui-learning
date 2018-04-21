<template>
  <div class="hello">
    <div>
      <multiple-cascader :options="options" :values="values"></multiple-cascader>
    </div>
  </div>
</template>

<script>
import multipleCascader from './multiple_cascader.vue'
export default {
  components: {
    multipleCascader
  },
  name: 'Dashboard',
  data () {
    return {
      values: ['yizhi'],
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
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }]
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
