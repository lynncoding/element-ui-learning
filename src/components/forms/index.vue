<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="form-items">
          <div class="title">multiple Cascader</div>
          <div class="content"><multiple-cascader :options="options" :values="values"></multiple-cascader></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="form-items"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import multipleCascader from './multiple_cascader.vue'
export default {
  components: {
    multipleCascader
  },
  data () {
    return {
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
        }]
      }]
    }
  }
}
</script>

<style lang="less">
.form-items {
  margin-right: 20px;
  height: 350px;
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

